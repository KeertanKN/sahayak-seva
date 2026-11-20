/**
 * Configuration for Regional Services, Emergency Numbers, and Authorities
 * Configurable for each supported region
 */

export const REGIONS = {
  national: {
    id: 'national',
    name: 'National / All India (Pan-India)',
    state: 'All States',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '108',
      womenHelpline: '1091',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '14567',
      cyberCrime: '1930',
      disasterManagement: '1078'
    },
    authorities: {
      civicPortal: 'CPGRAMS / National Grievance Portal',
      aadhaarCenter: 'UIDAI Regional Seva Kendra',
      panAuthority: 'Protean / NSDL & UTIITSL',
      electionCommission: 'Election Commission of India (voterportal.eci.gov.in)'
    },
    localServices: [
      { name: 'AIIMS Central Care', type: 'Hospital', contact: '011-26588500', location: 'New Delhi' },
      { name: 'National Health Authority (ABHA/AB-PMJAY)', type: 'Health Scheme', contact: '14555', location: 'Pan-India' },
      { name: 'Senior Citizen Support Helpline', type: 'Elder Care', contact: '14567', location: 'Pan-India' }
    ]
  },
  delhi: {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'National Capital Territory of Delhi',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '102 / 108',
      womenHelpline: '1091',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '14567',
      cyberCrime: '1930',
      disasterManagement: '1077'
    },
    authorities: {
      civicPortal: 'Municipal Corporation of Delhi (MCD 311 App)',
      waterBoard: 'Delhi Jal Board (DJB) - 1916',
      electricity: 'BSES Rajdhani / Yamuna (19123 / 19124)',
      aadhaarCenter: 'UIDAI Center, Pragati Maidan / Connaught Place',
      panAuthority: 'Income Tax Department, Civic Centre, New Delhi',
      electionCommission: 'Chief Electoral Officer, Delhi (ceodelhi.gov.in)'
    },
    localServices: [
      { name: 'AIIMS Emergency Trauma Centre', type: 'Emergency Hospital', contact: '011-26593677', location: 'Ansari Nagar, New Delhi' },
      { name: 'Safdarjung Hospital Casualty', type: 'Emergency Hospital', contact: '011-26165060', location: 'Ring Road, New Delhi' },
      { name: 'MCD Care & Senior Daycare Center', type: 'Elder Care', contact: '011-23225211', location: 'Civil Lines, Delhi' }
    ]
  },
  karnataka: {
    id: 'karnataka',
    name: 'Karnataka (Bengaluru & Urban)',
    state: 'Karnataka',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100 / 112',
      fire: '101',
      ambulance: '108 (Arogya Kavacha)',
      womenHelpline: '1091 / 080-22943225 (Vanitha Sahayavani)',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '1090 / 14567',
      cyberCrime: '1930',
      disasterManagement: '1070'
    },
    authorities: {
      civicPortal: 'Bruhat Bengaluru Mahanagara Palike (BBMP Sahaaya - 1533)',
      waterBoard: 'BWSSB (Bangalore Water Supply) - 1916',
      electricity: 'BESCOM - 1912',
      aadhaarCenter: 'Bengaluru Aadhaar Seva Kendra, Vijayanagar / Indiranagar',
      panAuthority: 'Aayakar Bhavan, Queens Road, Bengaluru',
      electionCommission: 'CEO Karnataka (ceokarnataka.kar.nic.in)'
    },
    localServices: [
      { name: 'Victoria Hospital Emergency & Trauma', type: 'Emergency Hospital', contact: '080-26701150', location: 'K.R. Market, Bengaluru' },
      { name: 'Bowring & Lady Curzon Hospital', type: 'General & Childcare Hospital', contact: '080-25591325', location: 'Shivajinagar, Bengaluru' },
      { name: 'Karnataka State Senior Citizens Association', type: 'Elder Care', contact: '080-22238499', location: 'Bengaluru' }
    ]
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra (Mumbai / Pune)',
    state: 'Maharashtra',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '108 (MEMS)',
      womenHelpline: '103 (Mumbai Police Women Helpline)',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '1090 / 14567 (Elderline)',
      cyberCrime: '1930',
      disasterManagement: '1916 (BMC Disaster Control)'
    },
    authorities: {
      civicPortal: 'Brihanmumbai Municipal Corporation (BMC 1916 / MyBMC App)',
      waterBoard: 'BMC Hydraulic Engineering Dept - 1916',
      electricity: 'BEST / Adani Electricity / MSEDCL (19122)',
      aadhaarCenter: 'UIDAI Regional Office, Cuffe Parade / Bandra Kurla Complex',
      panAuthority: 'Income Tax Office, Aayakar Bhavan, Marine Lines, Mumbai',
      electionCommission: 'CEO Maharashtra (ceo.maharashtra.gov.in)'
    },
    localServices: [
      { name: 'KEM Hospital & Casualty', type: 'Emergency Hospital', contact: '022-24107000', location: 'Parel, Mumbai' },
      { name: 'Sion Hospital Trauma Centre', type: 'Emergency Hospital', contact: '022-24076381', location: 'Sion, Mumbai' },
      { name: 'Dignity Foundation Senior Citizen Services', type: 'Elder Care', contact: '022-61381100', location: 'Mumbai & Pune' }
    ]
  },
  tamilnadu: {
    id: 'tamilnadu',
    name: 'Tamil Nadu (Chennai & Urban)',
    state: 'Tamil Nadu',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '108',
      womenHelpline: '1091',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '14567 / 1253',
      cyberCrime: '1930',
      disasterManagement: '1070 / 1077'
    },
    authorities: {
      civicPortal: 'Greater Chennai Corporation (GCC 1913 / Namma Chennai App)',
      waterBoard: 'CMWSSB (Chennai Metro Water) - 044-45674567',
      electricity: 'TANGEDCO (Minnagam - 94987 94987)',
      aadhaarCenter: 'UIDAI Center, Koyambedu / Anna Nagar',
      panAuthority: 'Aayakar Bhavan, Nungambakkam, Chennai',
      electionCommission: 'CEO Tamil Nadu (elections.tn.gov.in)'
    },
    localServices: [
      { name: 'Rajiv Gandhi Government General Hospital (GH)', type: 'Emergency Hospital', contact: '044-25305000', location: 'Park Town, Chennai' },
      { name: 'Institute of Child Health (ICH)', type: 'Childcare & Pediatrics', contact: '044-28191982', location: 'Egmore, Chennai' },
      { name: 'HelpAge India Tamil Nadu Chapter', type: 'Elder Care', contact: '044-26412154', location: 'Kilpauk, Chennai' }
    ]
  },
  westbengal: {
    id: 'westbengal',
    name: 'West Bengal (Kolkata & Urban)',
    state: 'West Bengal',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '108 / 102',
      womenHelpline: '1091',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '14567 / 9830088884 (Pronam)',
      cyberCrime: '1930',
      disasterManagement: '1070'
    },
    authorities: {
      civicPortal: 'Kolkata Municipal Corporation (KMC Control: 033-22861212)',
      waterBoard: 'KMC Water Supply Dept - 033-22861313',
      electricity: 'CESC (1912) / WBSEDCL (19121)',
      aadhaarCenter: 'UIDAI Regional Office, Salt Lake, Kolkata',
      panAuthority: 'Aayakar Bhavan, P-7 Chowringhee Square, Kolkata',
      electionCommission: 'CEO West Bengal (ceowestbengal.nic.in)'
    },
    localServices: [
      { name: 'SSKM & IPGMER Emergency Care', type: 'Emergency Hospital', contact: '033-22231589', location: 'Bhowanipore, Kolkata' },
      { name: 'Calcutta National Medical College', type: 'Emergency & General', contact: '033-22844834', location: 'Benlapukur, Kolkata' },
      { name: 'Pronam (Kolkata Police & Dignity for Seniors)', type: 'Elder Care', contact: '033-24190740', location: 'Ballygunge, Kolkata' }
    ]
  },
  gujarat: {
    id: 'gujarat',
    name: 'Gujarat (Ahmedabad & Urban)',
    state: 'Gujarat',
    emergencyNumbers: {
      allEmergency: '112',
      police: '100',
      fire: '101',
      ambulance: '108 (GVK EMRI)',
      womenHelpline: '181 (Abhayam)',
      domesticViolence: '181',
      childline: '1098',
      seniorHelpline: '14567',
      cyberCrime: '1930',
      disasterManagement: '1070 / 1077'
    },
    authorities: {
      civicPortal: 'Ahmedabad Municipal Corporation (AMC CC: 155303)',
      waterBoard: 'AMC Water Works Dept - 155303',
      electricity: 'Torrent Power (079-22555555) / UGVCL (19122)',
      aadhaarCenter: 'UIDAI Aadhaar Seva Kendra, Ashram Road, Ahmedabad',
      panAuthority: 'Aayakar Bhavan, Navrangpura, Ahmedabad',
      electionCommission: 'CEO Gujarat (ceo.gujarat.gov.in)'
    },
    localServices: [
      { name: 'Civil Hospital Trauma Centre', type: 'Emergency Hospital', contact: '079-22683721', location: 'Asarwa, Ahmedabad' },
      { name: 'SVP Hospital', type: 'Multi-specialty & Pediatrics', contact: '079-26577621', location: 'Ellisbridge, Ahmedabad' },
      { name: 'Senior Citizens Welfare Association Gujarat', type: 'Elder Care', contact: '079-26462211', location: 'Ahmedabad' }
    ]
  }
};
