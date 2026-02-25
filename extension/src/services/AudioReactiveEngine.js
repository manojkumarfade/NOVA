
class AudioReactiveEngine {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.source = null;
        this.isInitialized = false;
        this.mode = 'idle'; // idle, listening, speaking
    }

    async init(stream) {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512; // Resolution

            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);

            if (stream) {
                this.source = this.audioContext.createMediaStreamSource(stream);
                this.source.connect(this.analyser);
            }

            this.isInitialized = true;
            console.log("[AudioReactiveEngine] Initialized");
        } catch (e) {
            console.error("[AudioReactiveEngine] Init Error:", e);
        }
    }

    setMode(mode) {
        this.mode = mode;
        // Resume context if needed
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    getFrequencyData() {
        if (!this.isInitialized) return new Uint8Array(this.bufferLength).fill(0);

        // REAL MIC DATA
        if (this.mode === 'listening') {
            this.analyser.getByteFrequencyData(this.dataArray);
            return this.dataArray;
        }

        // SIMULATED TTS DATA
        if (this.mode === 'speaking') {
            return this.simulateAudioData(true);
        }

        // IDLE
        return this.simulateAudioData(false);
    }

    /**
     * Returns a single normalized value (0.0 - 1.0) representing current audio intensity.
     * Useful for simple animations like sphere scaling.
     */
    getAudioData() {
        const data = this.getFrequencyData();
        if (!data) return 0;

        // Average the lower frequencies (Bass)
        let sum = 0;
        // Optimization: Check only first 20 bins
        const sampleLimit = Math.min(data.length, 20);
        for (let i = 0; i < sampleLimit; i++) {
            sum += data[i];
        }

        // Normalize: sum / (255 * count)
        // Boost it a bit (* 1.5)
        return Math.min((sum / (255 * sampleLimit)) * 1.5, 1.0);
    }

    // [NEW] Silence Detection Configuration
    silenceThreshold = 0.02; // Tune this based on mic sensitivity
    silenceDuration = 1500; // ms
    lastSpeechTime = Date.now();
    isSilenceDetecting = false;
    onSilenceCallback = null;
    silenceCheckInterval = null;

    setOnSilence(callback) {
        this.onSilenceCallback = callback;
    }

    startSilenceDetection() {
        if (this.isSilenceDetecting) return;
        this.isSilenceDetecting = true;
        this.lastSpeechTime = Date.now();

        console.log("[AudioReactiveEngine] Starting VAD...");

        // Check every 100ms
        this.silenceCheckInterval = setInterval(() => {
            if (!this.isInitialized || this.mode !== 'listening') return;

            const rms = this.calculateRMS();

            // If sound detected, reset timer
            if (rms > this.silenceThreshold) {
                this.lastSpeechTime = Date.now();
                // Optional: Trigger "speech detected" callback for UI
            } else {
                // If silent for longer than duration
                const silenceLength = Date.now() - this.lastSpeechTime;
                if (silenceLength > this.silenceDuration) {
                    console.log("[AudioReactiveEngine] Silence Detected (" + silenceLength + "ms)");
                    if (this.onSilenceCallback) {
                        this.onSilenceCallback();
                        // Prevent multiple triggers until speech resumes
                        this.lastSpeechTime = Date.now();
                    }
                }
            }
        }, 100);
    }

    stopSilenceDetection() {
        this.isSilenceDetecting = false;
        if (this.silenceCheckInterval) {
            clearInterval(this.silenceCheckInterval);
            this.silenceCheckInterval = null;
        }
    }

    calculateRMS() {
        if (!this.analyser || !this.dataArray) return 0;

        // We need Time Domain Data for RMS
        // Re-use dataArray (it's Uint8, so 128 is zero)
        this.analyser.getByteTimeDomainData(this.dataArray);

        let sum = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            const x = (this.dataArray[i] - 128) / 128.0; // Normalize -1 to 1
            sum += x * x;
        }
        const rms = Math.sqrt(sum / this.bufferLength);
        return rms;
    }

    simulateAudioData(isActive) {
        const arr = new Uint8Array(this.bufferLength);
        if (!isActive) {
            // Low rumble for idle
            for (let i = 0; i < this.bufferLength; i++) {
                arr[i] = Math.random() * 10;
            }
            return arr;
        }

        // Active Speaking Simulation (Perlin-ish noise + sine waves)
        const time = Date.now() / 100;
        for (let i = 0; i < this.bufferLength; i++) {
            // Bass moves slower, highs move faster
            const noise = Math.sin(i * 0.1 + time) * Math.cos(i * 0.5 + time * 2);
            arr[i] = Math.abs(noise * 150) + 50;
        }
        return arr;
    }

    cleanup() {
        if (this.audioContext) {
            this.audioContext.close();
        }
        this.isInitialized = false;
    }
}

export default new AudioReactiveEngine();
