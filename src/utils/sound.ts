
// A simple synthesizer for chess sounds using Web Audio API
// This avoids external dependencies or asset loading issues.

class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, delay: number = 0) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  }

  playMove() {
    // A solid "thock" sound
    this.playTone(150, 'triangle', 0.1, 0.1);
    this.playTone(100, 'sine', 0.1, 0.1);
  }

  playCapture() {
    // A sharper, higher pitched "crack"
    this.playTone(400, 'triangle', 0.05, 0.1);
    this.playTone(600, 'sawtooth', 0.05, 0.05);
  }

  playCheck() {
    // An alerting double-tone
    this.playTone(600, 'sine', 0.2, 0.1);
    this.playTone(800, 'sine', 0.2, 0.05, 0.1); // delayed slightly
  }

  playGameEnd() {
    // A major chord fanfare
    this.playTone(440, 'triangle', 0.8, 0.1);       // A4
    this.playTone(554.37, 'triangle', 0.8, 0.1, 0.1); // C#5
    this.playTone(659.25, 'triangle', 0.8, 0.1, 0.2); // E5
  }
}

export const soundEngine = new SoundEngine();
