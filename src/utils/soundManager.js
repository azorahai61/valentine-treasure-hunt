let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export function initAudio() {
  getAudioContext();
}

function playTone(ctx, frequency, startTime, duration, volume) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gainNode.gain.setValueAtTime(volume, startTime + duration - 0.05);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, 523.25, now, 0.15, 0.3);
    playTone(ctx, 659.25, now + 0.15, 0.2, 0.3);
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
}

export function playFinaleSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      playTone(ctx, freq, now + i * 0.15, 0.25, 0.4);
    });

    setTimeout(() => {
      try {
        const ctx2 = getAudioContext();
        const now2 = ctx2.currentTime;
        [523.25, 659.25, 783.99].forEach((freq) => {
          playTone(ctx2, freq, now2, 0.8, 0.2);
        });
      } catch (e) {
        console.warn("Sound playback failed:", e);
      }
    }, 700);
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
}
