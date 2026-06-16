export class AudioManager {
  constructor() {
    this.ctx = null;
    this.musicPlaying = false;
    this.musicNodes = [];
  }

  ensureContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSpin() {
    try {
      this.ensureContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.5);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 1.0);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.0);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 1.0);
    } catch (e) { console.warn('Audio error:', e); }
  }

  playSwing() {
    try {
      this.ensureContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) { console.warn('Audio error:', e); }
  }

  playBreak() {
    try {
      this.ensureContext();

      const noise = this.ctx.createBufferSource();
      const bufSize = this.ctx.sampleRate * 0.3;
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2);
      }
      noise.buffer = buf;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      noise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(this.ctx.currentTime);

      for (let i = 0; i < 5; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400 + Math.random() * 600, this.ctx.currentTime + i * 0.03);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.03 + 0.2);

        osc.start(this.ctx.currentTime + i * 0.03);
        osc.stop(this.ctx.currentTime + i * 0.03 + 0.2);
      }
    } catch (e) { console.warn('Audio error:', e); }
  }

  playCelebration() {
    try {
      this.ensureContext();
      const melody = [523, 659, 784, 1047];

      melody.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.15);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.15 + 0.3);

        osc.start(this.ctx.currentTime + i * 0.15);
        osc.stop(this.ctx.currentTime + i * 0.15 + 0.3);
      });
    } catch (e) { console.warn('Audio error:', e); }
  }

  playMiss() {
    try {
      this.ensureContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) { console.warn('Audio error:', e); }
  }

  startMusic() {
    if (this.musicPlaying) return;
    this.musicPlaying = true;
    this.playPolkaLoop();
  }

  stopMusic() {
    this.musicPlaying = false;
    for (const node of this.musicNodes) {
      try { node.stop(); } catch (e) { }
    }
    this.musicNodes = [];
  }

  playPolkaLoop() {
    if (!this.musicPlaying) return;
    this.ensureContext();

    const notes = [
      392, 440, 494, 523, 494, 440, 392, 330,
      349, 392, 440, 494, 440, 392, 349, 330,
      294, 330, 349, 392, 440, 494, 523, 587,
      523, 494, 440, 392, 349, 330, 294, 262,
    ];

    const beatDuration = 0.2;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = i % 2 === 0 ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * beatDuration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * beatDuration);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * beatDuration + beatDuration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * beatDuration + beatDuration);

      osc.start(this.ctx.currentTime + i * beatDuration);
      osc.stop(this.ctx.currentTime + i * beatDuration + beatDuration);

      this.musicNodes.push(osc);
    });

    const loopDuration = notes.length * beatDuration * 1000;
    setTimeout(() => this.playPolkaLoop(), loopDuration);
  }

  dispose() {
    this.stopMusic();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}
