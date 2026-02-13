let audioContext = null;

function getAudioContext() {
  // If the context is closed or doesn't exist, create a fresh one
  if (!audioContext || audioContext.state === "closed") {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // If suspended (common on mobile after idle), resume it
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export function initAudio() {
  try {
    const ctx = getAudioContext();
    // Play a silent buffer to fully unlock audio on iOS/Android
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch (e) {
    console.warn("Audio init failed:", e);
  }
}

function playTone(ctx, frequency, startTime, duration, volume, type = "triangle") {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  // Smooth exponential envelope — prevents mobile clicks/pops
  gainNode.gain.setValueAtTime(0.001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.05);
  gainNode.gain.setValueAtTime(volume, startTime + duration - 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.01);
}

function playEchoTone(ctx, frequency, startTime, duration, volume, type = "triangle") {
  // Primary tone
  playTone(ctx, frequency, startTime, duration, volume, type);
  // Soft echo — 60% quieter, 80ms delayed, shorter — creates gentle reverb warmth
  playTone(ctx, frequency, startTime + 0.08, duration * 0.7, volume * 0.3, type);
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // C5 → E5 → G5 ascending major arpeggio — warm and happy
    playEchoTone(ctx, 523.25, now, 0.18, 0.2);         // C5
    playEchoTone(ctx, 659.25, now + 0.12, 0.18, 0.2);  // E5 (overlaps slightly)
    playEchoTone(ctx, 783.99, now + 0.24, 0.25, 0.18); // G5 (longer sustain, softer)
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
}

export function playFinaleSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Part 1: Rising 5-note melody — the "reveal" moment
    const melody = [
      { freq: 523.25, time: 0, dur: 0.22, vol: 0.2 },     // C5
      { freq: 587.33, time: 0.15, dur: 0.22, vol: 0.22 },  // D5
      { freq: 659.25, time: 0.30, dur: 0.22, vol: 0.24 },  // E5
      { freq: 783.99, time: 0.45, dur: 0.25, vol: 0.26 },  // G5
      { freq: 1046.5, time: 0.62, dur: 0.35, vol: 0.22 },  // C6 (octave resolve)
    ];

    melody.forEach(({ freq, time, dur, vol }) => {
      playEchoTone(ctx, freq, now + time, dur, vol);
    });

    // Part 2: Sustained shimmer chord — NO setTimeout, all Web Audio scheduled
    const chordStart = now + 1.0;
    const chordNotes = [
      { freq: 523.25, vol: 0.12 },  // C5
      { freq: 659.25, vol: 0.12 },  // E5
      { freq: 783.99, vol: 0.12 },  // G5
      { freq: 1046.5, vol: 0.10 },  // C6
    ];

    chordNotes.forEach(({ freq, vol }) => {
      // Main chord tone — long sustain
      playTone(ctx, freq, chordStart, 1.2, vol);

      // Shimmer: gentle vibrato via LFO frequency modulation
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, chordStart);

      // LFO: +/- 2Hz wobble at 4Hz rate
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4, chordStart);
      lfoGain.gain.setValueAtTime(2, chordStart);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, chordStart);
      gain.gain.exponentialRampToValueAtTime(vol * 0.5, chordStart + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, chordStart + 1.2);

      osc.start(chordStart);
      osc.stop(chordStart + 1.3);
      lfo.start(chordStart);
      lfo.stop(chordStart + 1.3);
    });
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
}

export function playAcceptanceSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Joyful ascending sparkle — quick bright notes
    const sparkle = [
      { freq: 783.99, time: 0, dur: 0.12, vol: 0.15 },     // G5
      { freq: 880.0, time: 0.08, dur: 0.12, vol: 0.15 },   // A5
      { freq: 987.77, time: 0.16, dur: 0.12, vol: 0.15 },  // B5
      { freq: 1046.5, time: 0.24, dur: 0.12, vol: 0.18 },  // C6
      { freq: 1318.5, time: 0.32, dur: 0.15, vol: 0.18 },  // E6
      { freq: 1568.0, time: 0.42, dur: 0.20, vol: 0.15 },  // G6
    ];

    sparkle.forEach(({ freq, time, dur, vol }) => {
      playEchoTone(ctx, freq, now + time, dur, vol);
    });

    // Warm sustained major chord after the sparkle
    const chordStart = now + 0.65;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq) => {
      playTone(ctx, freq, chordStart, 1.5, 0.08);
    });
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
}
