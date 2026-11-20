/**
 * Voice and Accessibility Speech Synthesis & Recognition Services
 * Web Speech API integration for text-to-speech read-aloud and voice query
 */

class VoiceAssistant {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.voices = [];
    
    if (this.synth) {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
        };
      }
    }
  }

  getLangCode(lang) {
    const map = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN'
    };
    return map[lang] || 'en-IN';
  }

  speak(text, lang = 'en', onEnd = null) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this browser environment.");
      if (onEnd) onEnd();
      return;
    }

    // Stop ongoing speech
    this.stop();

    if (!text || text.trim() === '') return;

    // Clean text of markdown/symbols
    const cleanText = text.replace(/[*#_`>-]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetCode = this.getLangCode(lang);
    utterance.lang = targetCode;

    // Find suitable voice
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    const matchingVoice = this.voices.find(v => v.lang.startsWith(targetCode.split('-')[0]) || v.lang === targetCode);
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 0.95; // Slightly slower for clarity & elderly comprehension
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const voiceService = new VoiceAssistant();
