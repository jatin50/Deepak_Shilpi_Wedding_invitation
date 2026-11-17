const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const durationSeconds = 20;
const totalSamples = sampleRate * durationSeconds;

const notes = {
  Sa3: 146.83,
  Pa3: 220.00,
  Sa: 293.66,
  Re: 329.63,
  Ga: 369.99,
  Pa: 440.00,
  Dha: 493.88,
  SaHigh: 587.33,
};

const melody = [
  ['Sa', 0.5, 2.2, 0.35],
  ['Re', 2.8, 1.8, 0.38],
  ['Ga', 4.8, 2.6, 0.40],
  ['Pa', 7.5, 2.4, 0.38],
  ['Dha', 10.0, 1.8, 0.40],
  ['SaHigh', 12.0, 2.8, 0.42],
  ['Dha', 15.0, 1.6, 0.36],
  ['Pa', 16.8, 1.6, 0.35],
  ['Ga', 18.5, 1.4, 0.32],
];

const header = Buffer.alloc(44);
const dataSize = totalSamples * 2; // 16-bit mono = 2 bytes per sample

// RIFF header
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);

// fmt sub-chunk
header.write('fmt ', 12);
header.writeUInt32LE(16, 16); // PCM subchunk size
header.writeUInt16LE(1, 20); // Audio format 1 = PCM
header.writeUInt16LE(1, 22); // Num channels = 1 (mono)
header.writeUInt32LE(sampleRate, 24); // Sample rate
header.writeUInt32LE(sampleRate * 2, 28); // Byte rate (sampleRate * numChannels * bitsPerSample/8)
header.writeUInt16LE(2, 32); // Block align
header.writeUInt16LE(16, 34); // Bits per sample

// data sub-chunk
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const sampleBuffer = Buffer.alloc(dataSize);

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;

  // 1. Tanpura drone (warm resonant strings)
  const tanpura1 = Math.sin(2 * Math.PI * notes.Sa3 * t) * 0.12;
  const tanpura2 = Math.sin(2 * Math.PI * notes.Pa3 * t * 1.002) * 0.08;
  const tanpuraHarmonic = Math.sin(2 * Math.PI * notes.Sa * t) * 0.04;
  let signal = tanpura1 + tanpura2 + tanpuraHarmonic;

  // 2. Bansuri flute melody
  for (const [noteName, start, dur, vol] of melody) {
    if (t >= start && t < start + dur) {
      const noteT = t - start;
      const freq = notes[noteName];
      const vibrato = 1 + 0.005 * Math.sin(2 * Math.PI * 5.2 * noteT);
      const instantFreq = freq * vibrato;

      let env = 1;
      const attack = 0.3;
      const release = 0.4;
      if (noteT < attack) {
        env = Math.sin((noteT / attack) * (Math.PI / 2));
      } else if (noteT > dur - release) {
        const relT = (dur - noteT) / release;
        env = Math.sin(Math.max(0, relT) * (Math.PI / 2));
      }

      const fundamental = Math.sin(2 * Math.PI * instantFreq * noteT);
      const h2 = 0.3 * Math.sin(2 * Math.PI * (instantFreq * 2) * noteT);
      const h3 = 0.12 * Math.sin(2 * Math.PI * (instantFreq * 3) * noteT);
      const breath = 0.015 * (Math.random() * 2 - 1);

      signal += (fundamental + h2 + h3 + breath) * env * vol;
    }
  }

  signal = Math.max(-1, Math.min(1, signal));
  const intVal = signal < 0 ? Math.floor(signal * 0x8000) : Math.floor(signal * 0x7fff);
  sampleBuffer.writeInt16LE(intVal, i * 2);
}

const fullAudio = Buffer.concat([header, sampleBuffer]);

const outputDir = path.join(__dirname, '..', 'public', 'audio');
fs.mkdirSync(outputDir, { recursive: true });

// Write both instrumental.mp3 and instrumental.wav so standard browsers play with maximum compatibility
fs.writeFileSync(path.join(outputDir, 'instrumental.mp3'), fullAudio);
fs.writeFileSync(path.join(outputDir, 'instrumental.wav'), fullAudio);

console.log('Successfully generated authentic Indian wedding flute melody!');
console.log('File size:', fullAudio.length, 'bytes');
