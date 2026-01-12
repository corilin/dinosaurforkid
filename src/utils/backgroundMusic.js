// Background music manager for games
// Uses royalty-free children's music loop

class BackgroundMusicManager {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3; // Keep music soft so it doesn't distract
    }

    // Initialize audio with a fun, upbeat melody using Web Audio API
    init() {
        if (this.audio) return;

        // Create an AudioContext to generate simple music
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // We'll create a simple cheerful melody using oscillators
        this.createMelody();
    }

    createMelody() {
        // Simple cheerful notes (C major scale melody)
        this.melodyNotes = [
            { freq: 523.25, duration: 0.3 }, // C5
            { freq: 587.33, duration: 0.3 }, // D5
            { freq: 659.25, duration: 0.3 }, // E5
            { freq: 523.25, duration: 0.3 }, // C5
            { freq: 659.25, duration: 0.3 }, // E5
            { freq: 587.33, duration: 0.3 }, // D5
            { freq: 523.25, duration: 0.6 }, // C5
            { freq: 0, duration: 0.3 },      // Rest
        ];
        this.currentNoteIndex = 0;
        this.melodyInterval = null;
    }

    playNote(frequency, duration) {
        if (!this.audioContext || frequency === 0) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    play() {
        if (this.isPlaying) return;

        this.init();

        // Resume audio context if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.isPlaying = true;
        this.currentNoteIndex = 0;

        // Play melody in a loop
        const playNextNote = () => {
            if (!this.isPlaying) return;

            const note = this.melodyNotes[this.currentNoteIndex];
            this.playNote(note.freq, note.duration);

            this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

            this.melodyTimeout = setTimeout(playNextNote, note.duration * 1000);
        };

        playNextNote();
    }

    pause() {
        this.isPlaying = false;
        if (this.melodyTimeout) {
            clearTimeout(this.melodyTimeout);
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }

    cleanup() {
        this.pause();
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
}

// Singleton instance
const bgMusic = new BackgroundMusicManager();

export default bgMusic;
