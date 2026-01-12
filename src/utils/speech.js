// Speech synthesis utility for dinosaur name pronunciation and page reading
// Uses Web Speech API with North American English voice

/**
 * Speak text using the Web Speech API with a North American English voice.
 * @param {string} text - The text to speak.
 * @param {number} rate - Speech rate (0.1 to 2, default 0.9 for kids).
 * @param {number} pitch - Speech pitch (0 to 2, default 1.1 for friendly tone).
 */
export const speak = (text, rate = 0.9, pitch = 1.1) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to find a US English voice
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(voice =>
        voice.lang === 'en-US' && voice.name.includes('Samantha') // macOS default
    ) || voices.find(voice =>
        voice.lang === 'en-US'
    ) || voices.find(voice =>
        voice.lang.startsWith('en')
    );

    if (usVoice) {
        utterance.voice = usVoice;
    }

    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    window.speechSynthesis.speak(utterance);
};

/**
 * Speak the dinosaur name clearly and slowly.
 * @param {string} name - The dinosaur name to pronounce.
 */
export const pronounceName = (name) => {
    speak(name, 0.8, 1.0);
};

/**
 * Read the entire dinosaur detail page content.
 * @param {object} dino - The dinosaur object with all properties.
 */
export const readDinoPage = (dino) => {
    const script = `
    Meet ${dino.name}, known as "${dino.nickname}"!
    This dinosaur lived during the ${dino.period} period.
    It was a ${dino.diet}.
    Fun fact: ${dino.funFact}
  `;
    speak(script, 0.85, 1.1);
};

/**
 * Stop any ongoing speech.
 */
export const stopSpeaking = () => {
    window.speechSynthesis.cancel();
};

/**
 * Check if speech synthesis is currently speaking.
 * @returns {boolean}
 */
export const isSpeaking = () => {
    return window.speechSynthesis.speaking;
};

// Preload voices when the module loads
if (typeof window !== 'undefined') {
    window.speechSynthesis.getVoices();
    // Some browsers need a slight delay to load voices
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}
