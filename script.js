// --- Floating Cute Elements ---
const floatingEmojis = ['🌸', '✨', '☁️', '🍓', '🎀', '🧸', '💖', '⭐', '🌷'];
const floatingContainer = document.getElementById('floatingBg');

function createFloatingElement() {
  const item = document.createElement('div');
  item.classList.add('floating-item');
  item.innerText = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
  item.style.left = Math.random() * 95 + 'vw';
  item.style.animationDuration = Math.random() * 6 + 8 + 's';
  item.style.fontSize = Math.random() * 1.5 + 1.2 + 'rem';
  floatingContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 14000);
}

// Initial batch and interval
for (let i = 0; i < 7; i++) {
  setTimeout(createFloatingElement, i * 600);
}
setInterval(createFloatingElement, 1800);

// --- Mascot Click Interaction ---
const mascot = document.getElementById('mainMascot');
const mascotFaces = ['🐰', '🐹', '🐻', '🐱', '🐣', '🐶', '💖'];
let mascotIndex = 0;
mascot.addEventListener('click', () => {
  mascotIndex = (mascotIndex + 1) % mascotFaces.length;
  mascot.innerText = mascotFaces[mascotIndex];
  triggerMiniConfetti();
});

// --- Tab Switching ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    const targetEl = document.getElementById(targetId);
    if (targetEl) targetEl.classList.add('active');
  });
});

// --- Sweet Quotes Generator ---
const sweetQuotes = [
  "Kamu itu jauh lebih kuat, lebih hebat, dan lebih berharga dari apa yang lagi bikin kamu sedih hari ini. 🌸",
  "Nggak apa-apa buat istirahat dulu, Lyra. Bunga aja butuh waktu buat mekar lagi. 🌷",
  "Kamu udah berjuang keras banget hari ini! Bangga banget sama kamu. 🧸✨",
  "Pelan-pelan ya... Satu langkah kecil setiap harinya tetaplah sebuah kemajuan. Semangat Lyra! 🌤️",
  "Ingat ya, setelah hujan badai, selalu ada pelangi yang cantik banget menunggu kamu! 🌈💖",
  "Apapun yang terjadi, kamu adalah orang yang berharga dan disayangi banyak orang. Jangan berkecil hati ya! 🍓",
  "Tarik nafas dalam-dalam... hembuskan. Masalah ini cuma sementara, kebahagiaanmu bakal segera balik lagi! 🕊️"
];

const quoteText = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
  quoteText.style.opacity = '0';
  setTimeout(() => {
    const randomQuote = sweetQuotes[Math.floor(Math.random() * sweetQuotes.length)];
    quoteText.textContent = randomQuote;
    quoteText.style.opacity = '1';
  }, 200);
  triggerMiniConfetti();
});

// --- Stress Relief Pop Bubbles ---
const bubbleArena = document.getElementById('bubbleArena');
const popCountEl = document.getElementById('popCount');
const resetBubbleBtn = document.getElementById('resetBubbleBtn');
let poppedCount = 0;

const bubbleIcons = ['🫧', '💭', '🧼', '✨', '🌸', '🍭'];

function generateBubbles() {
  bubbleArena.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = bubbleIcons[Math.floor(Math.random() * bubbleIcons.length)];
    bubble.addEventListener('click', () => {
      if (!bubble.classList.contains('popped')) {
        bubble.classList.add('popped');
        poppedCount++;
        popCountEl.textContent = poppedCount;
        playPopSound();
      }
    });
    bubbleArena.appendChild(bubble);
  }
}

resetBubbleBtn.addEventListener('click', () => {
  generateBubbles();
});

generateBubbles();

// Web Audio API Synthesizer for Cute Sound Effects
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playPopSound() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(450 + Math.random() * 200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 200, audioCtx.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.09);
}

// Chime sound for hug/confetti
function playChimeSound() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    }, idx * 100);
  });
}

// Background Lofi Melody Generator (No external MP3 needed!)
let isPlayingMelody = false;
let melodyInterval = null;
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

const lofiNotes = [
  261.63, 329.63, 392.00, 523.25, // C chord
  220.00, 261.63, 329.63, 440.00, // A minor
  174.61, 220.00, 261.63, 349.23, // F major
  196.00, 246.94, 293.66, 392.00  // G major
];

function playLofiNote() {
  if (!isPlayingMelody) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  const freq = lofiNotes[Math.floor(Math.random() * lofiNotes.length)];
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 1.3);
}

musicBtn.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  isPlayingMelody = !isPlayingMelody;
  if (isPlayingMelody) {
    musicBtn.classList.add('playing');
    musicIcon.innerText = '🎶';
    melodyInterval = setInterval(playLofiNote, 700);
  } else {
    musicBtn.classList.remove('playing');
    musicIcon.innerText = '🎵';
    clearInterval(melodyInterval);
  }
});

// --- Confetti & Hug Actions ---
function triggerMiniConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff85a1', '#fbb1bd', '#fff3b0', '#d8f3dc']
    });
  }
}

const sparkleBtn = document.getElementById('sparkleBtn');
sparkleBtn.addEventListener('click', () => {
  playChimeSound();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff758c', '#ff7eb3', '#fbb1bd', '#ffd166', '#a0c4ff', '#ffc6ff']
    });
  }
});

// Modal Logic
const hugBtn = document.getElementById('hugBtn');
const hugModal = document.getElementById('hugModal');
const closeHugBtn = document.getElementById('closeHugBtn');

hugBtn.addEventListener('click', () => {
  hugModal.classList.add('active');
  playChimeSound();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff85a1', '#ffd1dc', '#ffe3ea', '#ff9aa2']
    });
  }
});

closeHugBtn.addEventListener('click', () => {
  hugModal.classList.remove('active');
});

hugModal.addEventListener('click', (e) => {
  if (e.target === hugModal) {
    hugModal.classList.remove('active');
  }
});