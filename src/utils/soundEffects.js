// Sound effects for games using Web Audio API
// Generates cheerful sounds for correct/incorrect feedback

class SoundEffects {
    constructor() {
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Play a cheerful "ding ding!" sound for correct answers
     */
    playCorrect() {
        this.init();

        const now = this.audioContext.currentTime;

        // Play two ascending notes (happy sound)
        this.playTone(523.25, now, 0.15, 0.3);       // C5
        this.playTone(659.25, now + 0.15, 0.15, 0.3); // E5
        this.playTone(783.99, now + 0.3, 0.2, 0.4);  // G5
    }

    /**
     * Play a gentle "boop" sound for wrong answers (not scary!)
     */
    playWrong() {
        this.init();

        const now = this.audioContext.currentTime;

        // Play two descending notes (gentle "oops" sound)
        this.playTone(392, now, 0.15, 0.2);      // G4
        this.playTone(329.63, now + 0.15, 0.2, 0.2); // E4
    }

    /**
     * Play a celebratory sound for game completion
     */
    playVictory() {
        this.init();

        const now = this.audioContext.currentTime;

        // Play an ascending arpeggio (celebration!)
        this.playTone(523.25, now, 0.1, 0.3);        // C5
        this.playTone(659.25, now + 0.1, 0.1, 0.3);  // E5
        this.playTone(783.99, now + 0.2, 0.1, 0.3);  // G5
        this.playTone(1046.5, now + 0.3, 0.3, 0.4);  // C6
    }

    /**
     * Play a single tone
     */
    playTone(frequency, startTime, duration, volume = 0.3) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, startTime);

        // Envelope for smooth sound
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    /**
     * Play a click sound for button interactions
     */
    playClick() {
        this.init();
        this.playTone(800, this.audioContext.currentTime, 0.05, 0.1);
    }
}

// Singleton instance
const soundFx = new SoundEffects();

export default soundFx;
