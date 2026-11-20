import http.server
import socketserver
import json
import sqlite3
import os
import sys

PORT = 8080
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sahayak.db")

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    
    # 1. Grievances table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS grievances (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        authority TEXT NOT NULL,
        severity TEXT,
        status TEXT NOT NULL,
        submitted_at TEXT NOT NULL,
        updates_json TEXT
    )
    """)
    
    # 2. Appointments table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        doctor TEXT NOT NULL,
        facility TEXT NOT NULL,
        mode TEXT NOT NULL,
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        status TEXT NOT NULL
    )
    """)
    
    # 3. Care requests table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS care_requests (
        id TEXT PRIMARY KEY,
        service TEXT NOT NULL,
        recipient TEXT NOT NULL,
        start_date TEXT NOT NULL,
        frequency TEXT NOT NULL,
        agency TEXT NOT NULL,
        status TEXT NOT NULL
    )
    """)

    # 4. Ambulance requests table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS ambulance_requests (
        id TEXT PRIMARY KEY,
        condition TEXT NOT NULL,
        amb_type TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        status TEXT NOT NULL,
        eta TEXT NOT NULL,
        vehicle_no TEXT NOT NULL,
        driver_name TEXT NOT NULL,
        driver_phone TEXT NOT NULL,
        hospital_notified TEXT NOT NULL,
        dispatched_at TEXT NOT NULL
    )
    """)

    # 5. Patient consent table (single-row record)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS patient_consent (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        granted INTEGER NOT NULL,
        timestamp TEXT,
        expires_at TEXT,
        doctor_access_code TEXT
    )
    """)

    # Seed initial data if tables are empty
    cur.execute("SELECT COUNT(*) FROM grievances")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO grievances (id, category, description, location, authority, severity, status, submitted_at, updates_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "CIVIC-2026-9041",
            "Streetlight Malfunction",
            "Two streetlights on Main Ring Road Sector 4 have been dark for 4 nights.",
            "Sector 4 Market Circle, New Delhi",
            "Municipal Corporation of Delhi (MCD / BSES)",
            "Medium",
            "Assigned to Ward Engineer",
            "2026-11-18 14:20",
            json.dumps([
                {"time": "2026-11-18 14:20", "note": "Ticket registered & routed to Electrical Div."},
                {"time": "2026-11-19 09:15", "note": "Inspection scheduled for 21-Nov-2026"}
            ])
        ))

    cur.execute("SELECT COUNT(*) FROM appointments")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO appointments (id, doctor, facility, mode, date, time_slot, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            "APT-8092",
            "Dr. Priya Nair (General Physician)",
            "Max Super Speciality / Home Care",
            "Home Visit",
            "2026-11-25",
            "10:30 AM",
            "Confirmed"
        ))

    cur.execute("SELECT COUNT(*) FROM care_requests")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO care_requests (id, service, recipient, start_date, frequency, agency, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            "CARE-1044",
            "Elder Daily Companion & Physiotherapy",
            "Sunita Sharma (62 yrs)",
            "2026-11-22",
            "3 days / week",
            "Vimla ElderCare Certified Angels",
            "Active"
        ))

    cur.execute("SELECT COUNT(*) FROM patient_consent")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO patient_consent (id, granted, timestamp, expires_at, doctor_access_code)
        VALUES (1, 0, NULL, NULL, NULL)
        """)

    conn.commit()
    conn.close()

init_db()

class SahayakHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "database": "sqlite3", "file": DB_FILE}).encode())
            return

        if self.path == '/api/state':
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()

            # Grievances
            cur.execute("SELECT * FROM grievances ORDER BY submitted_at DESC")
            grievances = []
            for row in cur.fetchall():
                d = dict(row)
                d['updates'] = json.loads(d['updates_json']) if d['updates_json'] else []
                del d['updates_json']
                grievances.append(d)

            # Appointments
            cur.execute("SELECT * FROM appointments ORDER BY date DESC")
            appointments = [dict(row) for row in cur.fetchall()]

            # Care requests
            cur.execute("SELECT * FROM care_requests ORDER BY start_date DESC")
            care_requests = [dict(row) for row in cur.fetchall()]

            # Active ambulance
            cur.execute("SELECT * FROM ambulance_requests ORDER BY dispatched_at DESC LIMIT 1")
            amb_row = cur.fetchone()
            ambulance = dict(amb_row) if amb_row else None

            # Consent
            cur.execute("SELECT granted, timestamp, expires_at, doctor_access_code FROM patient_consent WHERE id = 1")
            consent_row = cur.fetchone()
            consent = {
                "granted": bool(consent_row['granted']),
                "timestamp": consent_row['timestamp'],
                "expiresAt": consent_row['expires_at'],
                "doctorAccessCode": consent_row['doctor_access_code']
            } if consent_row else {"granted": False, "timestamp": None, "expiresAt": None, "doctorAccessCode": None}

            conn.close()

            payload = {
                "grievances": grievances,
                "appointments": appointments,
                "careRequests": care_requests,
                "ambulanceRequest": ambulance,
                "patientConsent": consent,
                "databaseConnected": True,
                "databaseType": "SQLite3 (Disk Persistent)"
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(payload).encode())
            return

        # Fallback to static files
        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8')) if post_data else {}

        conn = sqlite3.connect(DB_FILE)
        cur = conn.cursor()

        if self.path == '/api/grievances':
            cur.execute("""
            INSERT INTO grievances (id, category, description, location, authority, severity, status, submitted_at, updates_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                data['id'],
                data['category'],
                data['description'],
                data['location'],
                data['authority'],
                data.get('severity', 'Medium'),
                data['status'],
                data['submittedAt'],
                json.dumps(data.get('updates', []))
            ))
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "id": data['id']})
            return

        if self.path == '/api/appointments':
            cur.execute("""
            INSERT INTO appointments (id, doctor, facility, mode, date, time_slot, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                data['id'],
                data['doctor'],
                data['facility'],
                data['mode'],
                data['date'],
                data['timeSlot'],
                data['status']
            ))
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "id": data['id']})
            return

        if self.path == '/api/care':
            cur.execute("""
            INSERT INTO care_requests (id, service, recipient, start_date, frequency, agency, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                data['id'],
                data['service'],
                data['recipient'],
                data['startDate'],
                data['frequency'],
                data['agency'],
                data['status']
            ))
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "id": data['id']})
            return

        if self.path == '/api/ambulance':
            cur.execute("""
            INSERT OR REPLACE INTO ambulance_requests 
            (id, condition, amb_type, address, phone, status, eta, vehicle_no, driver_name, driver_phone, hospital_notified, dispatched_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                data['id'],
                data['condition'],
                data['ambType'],
                data['address'],
                data['phone'],
                data['status'],
                data['eta'],
                data['vehicleNo'],
                data['driverName'],
                data['driverPhone'],
                data['hospitalNotified'],
                data['dispatchedAt']
            ))
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "id": data['id']})
            return

        if self.path == '/api/consent':
            cur.execute("""
            UPDATE patient_consent
            SET granted = ?, timestamp = ?, expires_at = ?, doctor_access_code = ?
            WHERE id = 1
            """, (
                1 if data.get('granted') else 0,
                data.get('timestamp'),
                data.get('expiresAt'),
                data.get('doctorAccessCode')
            ))
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "granted": data.get('granted')})
            return

        conn.close()
        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        if self.path == '/api/ambulance':
            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute("DELETE FROM ambulance_requests")
            conn.commit()
            conn.close()
            self.send_json_response({"success": True, "deleted": True})
            return
        self.send_response(404)
        self.end_headers()

    def send_json_response(self, obj):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(obj).encode())

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), SahayakHandler) as httpd:
    print(f"Sahayak Seva SQLite Backend running on http://localhost:{PORT}")
    print(f"Connected SQLite database file: {DB_FILE}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
