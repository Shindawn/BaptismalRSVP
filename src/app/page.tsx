'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Sound Effects (Web Audio API) ─────────────────────────────

function getAudioContext(): AudioContext {
  const W = window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext: typeof AudioContext };
  return W.AudioContext || W.webkitAudioContext;
}

function playNote(ctx: AudioContext, freq: number, startTime: number, duration: number, volume: number = 0.15, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playLullaby() {
  const ctx = new (getAudioContext())();
  const now = ctx.currentTime;
  // Brahms Lullaby melody - simplified, gentle piano
  const notes = [
    // "Brahms Lullaby" opening melody (key of F)
    { freq: 349.23, time: 0, dur: 0.6 },      // F4
    { freq: 392.00, time: 0.5, dur: 0.6 },      // G4
    { freq: 440.00, time: 1.0, dur: 0.6 },      // A4
    { freq: 392.00, time: 1.5, dur: 0.5 },      // G4
    { freq: 349.23, time: 2.0, dur: 0.6 },      // F4
    { freq: 329.63, time: 2.5, dur: 0.6 },      // E4
    { freq: 293.66, time: 3.0, dur: 0.6 },      // D4
    { freq: 293.66, time: 3.5, dur: 0.5 },      // D4
    { freq: 261.63, time: 4.0, dur: 0.8 },      // C4
    { freq: 293.66, time: 4.7, dur: 0.5 },      // D4
    { freq: 329.63, time: 5.2, dur: 0.6 },      // E4
    { freq: 349.23, time: 5.7, dur: 0.5 },      // F4
    { freq: 329.63, time: 6.2, dur: 0.4 },      // E4
    { freq: 293.66, time: 6.5, dur: 0.6 },      // D4
    { freq: 349.23, time: 7.1, dur: 0.6 },      // F4
    { freq: 392.00, time: 7.6, dur: 0.5 },      // G4
    { freq: 440.00, time: 8.1, dur: 0.6 },      // A4
    { freq: 392.00, time: 8.7, dur: 0.5 },      // G4
    { freq: 349.23, time: 9.1, dur: 0.8 },      // F4
    { freq: 329.63, time: 9.8, dur: 0.6 },      // E4
    { freq: 293.66, time: 10.3, dur: 1.2 },     // D4
  ];

  // Play melody
  notes.forEach((n) => {
    playNote(ctx, n.freq, now + n.time, n.dur, 0.12, 'sine');
    // Add a soft octave harmonic for richness
    playNote(ctx, n.freq * 2, now + n.time, n.dur * 0.8, 0.04, 'sine');
  });

  // Auto-close context after melody
  setTimeout(() => ctx.close(), 12000);
}

function playClick() {
  const ctx = new (getAudioContext())();
  const now = ctx.currentTime;
  // Soft "pop" click
  playNote(ctx, 600, now, 0.08, 0.1, 'sine');
  playNote(ctx, 800, now + 0.02, 0.06, 0.06, 'sine');
  setTimeout(() => ctx.close(), 500);
}

function playSuccess() {
  const ctx = new (getAudioContext())();
  const now = ctx.currentTime;
  // Ascending chime - happy sound
  playNote(ctx, 523.25, now, 0.3, 0.12, 'sine');       // C5
  playNote(ctx, 659.25, now + 0.12, 0.3, 0.12, 'sine');   // E5
  playNote(ctx, 783.99, now + 0.24, 0.4, 0.15, 'sine');   // G5
  playNote(ctx, 1046.50, now + 0.36, 0.6, 0.10, 'sine');  // C6
  setTimeout(() => ctx.close(), 1500);
}

function playSoftWhoosh() {
  const ctx = new (getAudioContext())();
  const now = ctx.currentTime;
  // Gentle descending tone
  playNote(ctx, 400, now, 0.15, 0.06, 'sine');
  playNote(ctx, 300, now + 0.05, 0.15, 0.04, 'sine');
  setTimeout(() => ctx.close(), 500);
}

function useSounds() {
  const lullabyPlayed = useRef(false);

  const playLullabyOnce = useCallback(() => {
    if (!lullabyPlayed.current) {
      lullabyPlayed.current = true;
      playLullaby();
    }
  }, []);

  return { playLullabyOnce, playClick, playSuccess, playSoftWhoosh };
}

// ─── SVG Components ───────────────────────────────────────────

function TeddyBear({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left ear */}
      <circle cx="30" cy="25" r="18" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      <circle cx="30" cy="25" r="10" fill="#f0dcc0" />
      {/* Right ear */}
      <circle cx="90" cy="25" r="18" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      <circle cx="90" cy="25" r="10" fill="#f0dcc0" />
      {/* Head */}
      <ellipse cx="60" cy="50" rx="35" ry="32" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      {/* Muzzle */}
      <ellipse cx="60" cy="58" rx="16" ry="12" fill="#f0dcc0" />
      {/* Eyes */}
      <circle cx="47" cy="44" r="3.5" fill="#5d4037" />
      <circle cx="73" cy="44" r="3.5" fill="#5d4037" />
      <circle cx="48.5" cy="42.5" r="1.2" fill="white" />
      <circle cx="74.5" cy="42.5" r="1.2" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="52" rx="4" ry="3" fill="#8b5a2b" />
      <ellipse cx="59" cy="51" rx="1.5" ry="0.8" fill="#a67c5b" opacity="0.6" />
      {/* Mouth */}
      <path d="M56 55 Q60 59 64 55" stroke="#8b5a2b" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="60" cy="100" rx="30" ry="35" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      {/* Belly */}
      <ellipse cx="60" cy="105" rx="18" ry="20" fill="#f0dcc0" />
      {/* Left arm */}
      <ellipse cx="28" cy="90" rx="10" ry="18" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" transform="rotate(-15 28 90)" />
      {/* Right arm */}
      <ellipse cx="92" cy="90" rx="10" ry="18" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" transform="rotate(15 92 90)" />
      {/* Left leg */}
      <ellipse cx="45" cy="132" rx="12" ry="8" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      <ellipse cx="45" cy="132" rx="7" ry="5" fill="#f0dcc0" />
      {/* Right leg */}
      <ellipse cx="75" cy="132" rx="12" ry="8" fill="#e6cfa7" stroke="#d4b896" strokeWidth="1.5" />
      <ellipse cx="75" cy="132" rx="7" ry="5" fill="#f0dcc0" />
      {/* Bow tie */}
      <g transform="translate(60 78)">
        <path d="M-10 0 L0 -6 L0 6 Z" fill="#8b6b8b" />
        <path d="M10 0 L0 -6 L0 6 Z" fill="#8b6b8b" />
        <circle cx="0" cy="0" r="2.5" fill="#6b4226" />
      </g>
    </svg>
  );
}

function PinkCloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 80 Q30 60 50 55 Q45 35 65 30 Q80 15 100 25 Q115 10 135 20 Q155 15 160 35 Q180 35 180 55 Q190 60 185 75 Q185 85 170 85 L35 85 Q20 85 20 75 Q20 65 30 60 Z"
        fill="#f8d7da"
        opacity="0.5"
      />
    </svg>
  );
}

function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="0" width="10" height="60" rx="2" fill="#8b6b8b" opacity="0.6" />
      <rect x="0" y="15" width="40" height="10" rx="2" fill="#8b6b8b" opacity="0.6" />
    </svg>
  );
}

function HeartIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#8b6b8b"
      />
    </svg>
  );
}

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="#d4a574"
      />
    </svg>
  );
}

function DoveIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 12 C20 8, 8 16, 12 28 C8 24, 4 28, 8 32 C4 32, 4 36, 10 36 C8 38, 12 40, 16 38 C18 42, 24 48, 32 48 C36 48, 40 46, 42 42 L46 38 C48 34, 52 30, 56 28 C52 26, 48 24, 44 24 C42 18, 38 14, 32 12Z"
        fill="#e8d5e8"
        stroke="#b89ab8"
        strokeWidth="1"
      />
      <circle cx="20" cy="24" r="2" fill="#5d4037" />
      <path d="M16 30 L10 32" stroke="#b89ab8" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ─── Confetti Component ───────────────────────────────────────

function Confetti() {
  const colors = ['#8b6b8b', '#f8d7da', '#d4a574', '#e6cfa7', '#b89ab8', '#e8d5e8', '#5d4037'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: piece.shape === 'rect' ? `${piece.size * 0.6}px` : `${piece.size}px`,
            borderRadius: piece.shape === 'circle' ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Envelope Opening Component ───────────────────────────────

function EnvelopeOpening({ onOpen, onLullaby }: { onOpen: () => void; onLullaby?: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'opened'>('closed');

  useEffect(() => {
    const t1 = setTimeout(() => { setPhase('opening'); onLullaby?.(); }, 800);
    const t2 = setTimeout(() => setPhase('opened'), 2400);
    const t3 = setTimeout(() => onOpen(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onOpen, onLullaby]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      animate={phase === 'opened' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        {/* Envelope body */}
        <motion.div
          className="relative w-72 h-48 sm:w-80 sm:h-56 rounded-lg overflow-hidden"
          style={{ backgroundColor: '#f0ebe5', boxShadow: '0 4px 20px rgba(139,107,139,0.2)' }}
        >
          {/* Inner card */}
          <motion.div
            className="absolute inset-x-4 bottom-4 top-6 bg-white rounded-sm flex flex-col items-center justify-center p-4"
            animate={phase === 'opening' || phase === 'opened' ? { y: -60 } : { y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <CrossIcon className="w-6 h-8 mb-2 opacity-60" />
            <p className="font-serif text-mauve text-sm text-center leading-relaxed">
              You&apos;re Invited to
            </p>
            <p className="font-[family-name:var(--font-script)] text-mauve text-2xl mt-1">
              Tala&apos;s Baptism
            </p>
          </motion.div>

          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-28 origin-top"
            style={{
              background: 'linear-gradient(135deg, #e0d5cc 0%, #d4c8be 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            }}
            animate={phase === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* Bottom triangle */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20"
            style={{
              background: 'linear-gradient(315deg, #e0d5cc 0%, #d4c8be 100%)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
        </motion.div>

        {/* Heart seal */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2"
          animate={phase === 'opening' ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <HeartIcon className="w-8 h-8 animate-heartbeat" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Types ───────────────────────────────────────────────

type RsvpEntry = {
  id: string;
  name: string;
  message: string | null;
  response: string;
  createdAt: string;
};

// ─── Main Page Component ──────────────────────────────────────

export default function Home() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rsvpResponse, setRsvpResponse] = useState<'yes' | 'no' | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showGuestList, setShowGuestList] = useState(false);
  const [guestList, setGuestList] = useState<RsvpEntry[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const { playLullabyOnce, playClick, playSuccess, playSoftWhoosh } = useSounds();

  const handleEnvelopeOpen = useCallback(() => {
    setEnvelopeOpened(true);
  }, []);

  const handleRsvp = (response: 'yes' | 'no') => {
    playClick();
    setRsvpResponse(response);
    if (response === 'yes') {
      setTimeout(() => playSuccess(), 300);
      setShowConfetti(true);
      setTimeout(() => setShowDetails(true), 300);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setTimeout(() => playSoftWhoosh(), 200);
    }
  };

  const fetchGuestList = useCallback(async () => {
    setLoadingGuests(true);
    try {
      const res = await fetch('/api/rsvp');
      if (res.ok) {
        const data = await res.json();
        setGuestList(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingGuests(false);
    }
  }, []);

  const handleOpenGuestList = () => {
    playClick();
    setShowGuestList(true);
    fetchGuestList();
  };

  const handleRsvpSubmit = async () => {
    if (rsvpName.trim()) {
      try {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: rsvpName.trim(),
            message: rsvpMessage.trim() || null,
            response: rsvpResponse!,
          }),
        });
        if (res.ok) {
          playClick();
          playSuccess();
          setRsvpSubmitted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      } catch {
        setRsvpSubmitted(true);
      }
    }
  };

  const baptismDate = new Date('2026-06-13');

  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!envelopeOpened) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = baptismDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [envelopeOpened]);

  return (
    <>
      {/* Envelope opening animation */}
      <AnimatePresence>
        {!envelopeOpened && <EnvelopeOpening onOpen={handleEnvelopeOpen} onLullaby={playLullabyOnce} />}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {envelopeOpened && (
          <motion.div
            className="relative min-h-screen paper-texture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* ─── Floating Decorations ─── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <PinkCloud className="absolute -top-8 -left-16 w-48 h-24 opacity-40 animate-float-slow" />
              <PinkCloud className="absolute top-32 -right-20 w-56 h-28 opacity-30 animate-float" />
              <PinkCloud className="absolute bottom-48 -left-24 w-40 h-20 opacity-25 animate-float-slow" style={{ animationDelay: '2s' }} />
              <PinkCloud className="absolute bottom-20 right-10 w-44 h-22 opacity-20 animate-float" style={{ animationDelay: '4s' }} />

              {/* Sparkle stars */}
              <StarIcon className="absolute top-20 left-[15%] w-3 h-3 animate-sparkle opacity-60" />
              <StarIcon className="absolute top-60 right-[20%] w-2 h-2 animate-sparkle opacity-40" style={{ animationDelay: '1s' }} />
              <StarIcon className="absolute top-[40%] left-[8%] w-2.5 h-2.5 animate-sparkle opacity-50" style={{ animationDelay: '0.5s' }} />
              <StarIcon className="absolute bottom-[30%] right-[12%] w-3 h-3 animate-sparkle opacity-40" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* ─── Teddy Bear Corners ─── */}
            <TeddyBear className="teddy-corner fixed top-4 left-2 w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 z-10 animate-float" />
            <TeddyBear className="teddy-corner fixed top-4 right-2 w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 z-10 animate-float" style={{ animationDelay: '1s', transform: 'scaleX(-1)' }} />
            <TeddyBear className="teddy-corner fixed bottom-4 left-2 w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 z-10 animate-float-slow" style={{ animationDelay: '2s' }} />
            <TeddyBear className="teddy-corner fixed bottom-4 right-2 w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 z-10 animate-float-slow" style={{ animationDelay: '3s', transform: 'scaleX(-1)' }} />

            {/* ─── HERO SECTION ─── */}
            <section className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center px-4">
              <motion.div
                className="text-center"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Cross ornament */}
                <CrossIcon className="w-8 h-12 mx-auto mb-4 opacity-40" />

                <p className="font-serif text-mauve text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
                  We joyfully invite you to the
                </p>
                <h1 className="font-[family-name:var(--font-script)] text-mauve text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 leading-tight">
                  Baptism
                </h1>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 sm:w-24 h-px bg-mauve-light opacity-50" />
                  <DoveIcon className="w-8 h-8 opacity-50" />
                  <div className="w-16 sm:w-24 h-px bg-mauve-light opacity-50" />
                </div>

                {/* Baby name */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
                >
                  <p className="font-serif text-brown-light text-sm sm:text-base tracking-[0.2em] uppercase mb-2">
                    of
                  </p>
                  <h2 className="font-[family-name:var(--font-script)] text-brown text-4xl sm:text-5xl md:text-6xl mb-2">
                    Tala Gielly
                  </h2>
                  <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-1">
                    Magtangob
                  </p>
                  <p className="font-serif text-brown-light text-sm italic mt-2">
                    &quot;Tally&quot;
                  </p>
                </motion.div>
              </motion.div>
            </section>

            {/* ─── COUNTDOWN SECTION ─── */}
            <section className="relative z-10 py-10 px-4">
              <div className="max-w-lg mx-auto text-center">
                <p className="font-serif text-mauve text-xs tracking-[0.25em] uppercase mb-6">
                  Counting Down to
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Mins' },
                    { value: timeLeft.seconds, label: 'Secs' },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-mauve-pale/40"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 + idx * 0.15 }}
                    >
                      <p className="font-serif text-mauve text-2xl sm:text-3xl md:text-4xl font-semibold">
                        {String(item.value).padStart(2, '0')}
                      </p>
                      <p className="font-serif text-brown-light text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-script)] text-mauve text-xl sm:text-2xl mt-5">
                  June 13, 2026
                </p>
              </div>
            </section>

            {/* ─── INVITATION MESSAGE ─── */}
            <section className="relative z-10 py-10 px-4">
              <div className="max-w-md mx-auto text-center">
                <motion.div
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <HeartIcon className="w-6 h-6 mx-auto mb-4 opacity-50" />
                  <p className="font-serif text-brown text-sm sm:text-base leading-relaxed italic">
                    &ldquo;A new little blessing has arrived,
                    <br />
                    and we would be truly delighted
                    <br />
                    to share this precious moment
                    <br />
                    with you.&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <div className="w-8 h-px bg-mauve-light opacity-40" />
                    <StarIcon className="w-3 h-3 opacity-40" />
                    <div className="w-8 h-px bg-mauve-light opacity-40" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ─── RSVP PROMPT ─── */}
            <section className="relative z-10 py-12 px-4">
              <div className="max-w-md mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {!rsvpResponse ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-px bg-mauve-light opacity-40" />
                        <DoveIcon className="w-6 h-6 opacity-50" />
                        <div className="w-10 h-px bg-mauve-light opacity-40" />
                      </div>
                      <p className="font-serif text-mauve text-xs tracking-[0.25em] uppercase mb-2">
                        We would love to know...
                      </p>
                      <h3 className="font-[family-name:var(--font-script)] text-mauve text-3xl sm:text-4xl mb-8">
                        Can you make it?
                      </h3>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                        <motion.button
                          onClick={() => handleRsvp('yes')}
                          className="group relative w-full sm:w-auto bg-mauve hover:bg-mauve/90 text-white font-serif text-sm sm:text-base px-10 sm:px-12 py-3.5 rounded-full shadow-lg shadow-mauve/20 transition-all duration-300 hover:shadow-xl hover:shadow-mauve/30 hover:scale-105 active:scale-95"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <HeartIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Yes, see you there!
                          </span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleRsvp('no')}
                          className="w-full sm:w-auto bg-white/60 hover:bg-white/80 text-mauve font-serif text-sm sm:text-base px-10 sm:px-12 py-3.5 rounded-full border border-mauve-pale/50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          No, I'm sorry
                        </motion.button>
                      </div>
                    </>
                  ) : rsvpResponse === 'yes' ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                    >
                      <HeartIcon className="w-12 h-12 mx-auto mb-3 animate-heartbeat text-mauve" />
                      <h3 className="font-[family-name:var(--font-script)] text-mauve text-3xl sm:text-4xl mb-2">
                        Yey, see you!
                      </h3>
                      <p className="font-serif text-brown text-sm sm:text-base leading-relaxed">
                        Thank you for saying yes!
                        <br />
                        We can&apos;t wait to celebrate this
                        <br />
                        special day with you.
                        <br />
                        <span className="font-[family-name:var(--font-script)] text-mauve text-base mt-2 inline-block">
                        Here are the details:
                        </span>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                    >
                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30">
                        <div className="text-3xl mb-3">🤍</div>
                        <h3 className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-4">
                        We regret you can&apos;t make it
                        </h3>
                        <p className="font-serif text-brown text-sm sm:text-base leading-relaxed mb-4">
                          We understand that things don&apos;t always go as planned, and we truly respect your decision. Your presence will be deeply missed on Baby Tala&apos;s special day.
                        </p>
                        <p className="font-serif text-brown text-sm sm:text-base leading-relaxed mb-4">
                          But please know that your love, prayers, and good wishes mean the world to us and our little Tally. Whether near or far, you are always part of our family.
                        </p>
                        <p className="font-serif text-mauve text-sm italic leading-relaxed mb-5">
                          &ldquo;Thank you for taking the time to let us know. We love you just the same, and we hope to see you soon!&rdquo;
                        </p>
                        <div className="flex items-center justify-center gap-3 mb-5">
                          <div className="w-10 h-px bg-mauve-light opacity-30" />
                          <HeartIcon className="w-3.5 h-3.5 opacity-40" />
                          <div className="w-10 h-px bg-mauve-light opacity-30" />
                        </div>
                        <p className="font-[family-name:var(--font-script)] text-brown-light text-base mb-1">
                          With love,
                        </p>
                        <p className="font-[family-name:var(--font-script)] text-mauve text-xl">
                          Mimi Timmy &amp; DaDa Daboy
                        </p>
                        <motion.button
                          onClick={() => { playClick(); setRsvpResponse(null); setShowDetails(false); }}
                          className="mt-6 font-serif text-mauve text-sm underline underline-offset-4 decoration-mauve-pale/50 hover:text-mauve-light hover:decoration-mauve-light transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          Changed my mind, let me back!
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </section>

            {/* ─── DETAILS SECTION (shown when YES) ─── */}
            <AnimatePresence>
              {showDetails && rsvpResponse === 'yes' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  {/* Church Details */}
                  <section className="relative z-10 py-10 px-4">
                    <div className="max-w-md mx-auto text-center">
                      <motion.div
                        className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <CrossIcon className="w-8 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-serif text-mauve text-xs tracking-[0.25em] uppercase mb-2">
                          The Ceremony
                        </p>
                        <h3 className="font-[family-name:var(--font-script)] text-mauve text-3xl sm:text-4xl mb-4">
                          Holy Baptism
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-[family-name:var(--font-script)] text-brown text-xl sm:text-2xl">
                              June 13, 2026
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-serif text-brown text-sm sm:text-base">
                              10:00 AM
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-serif text-brown text-sm sm:text-base">
                              Saint Anthony of Padua Parish
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-serif text-brown-light text-sm">
                              Bagamanoc, Catanduanes
                            </p>
                          </div>
                        </div>

                        {/* Decorative dividers */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                          <div className="w-12 h-px bg-mauve-light opacity-40" />
                          <HeartIcon className="w-3 h-3 opacity-40" />
                          <div className="w-12 h-px bg-mauve-light opacity-40" />
                        </div>

                        {/* Parents */}
                        <div className="mt-6">
                          <p className="font-serif text-mauve text-xs tracking-[0.2em] uppercase mb-3">
                            Loving Parents
                          </p>
                          <div className="flex flex-col items-center gap-1">
                            <p className="font-[family-name:var(--font-script)] text-brown text-xl">
                              Mimi Timmy
                            </p>
                            <p className="font-serif text-brown-light text-xs italic">
                              &amp;
                            </p>
                            <p className="font-[family-name:var(--font-script)] text-brown text-xl">
                              DaDa Daboy
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  {/* Reception Details */}
                  <section className="relative z-10 py-6 px-4">
                    <div className="max-w-md mx-auto text-center">
                      <motion.div
                        className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <StarIcon className="w-5 h-5 mx-auto mb-3 opacity-50" />
                        <p className="font-serif text-mauve text-xs tracking-[0.25em] uppercase mb-2">
                          The Celebration
                        </p>
                        <h3 className="font-[family-name:var(--font-script)] text-mauve text-3xl sm:text-4xl mb-4">
                          Reception
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-[family-name:var(--font-script)] text-brown text-xl sm:text-2xl">
                              Bonifacio&apos;s House
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-mauve-light" />
                            <p className="font-serif text-brown-light text-sm">
                              Brgy. Poblacion
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  {/* Gift Ideas */}
                  <section className="relative z-10 py-8 px-4">
                    <div className="max-w-md mx-auto text-center">
                      <motion.div
                        className="bg-blush/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pink-cloud/40"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <StarIcon className="w-5 h-5 mx-auto mb-3 opacity-50" />
                        <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-4">
                          A Note on Gifts
                        </p>
                        <p className="font-serif text-brown text-sm sm:text-base leading-relaxed italic">
                          With all that we have, we&apos;ve been truly blessed.
                          Your presence and prayers are all that we request.
                          But if you desire to give nonetheless,
                          a monetary gift is one we suggest.
                        </p>
                      </motion.div>
                    </div>
                  </section>

                  {/* Dress Code */}
                  <section className="relative z-10 py-8 px-4">
                    <div className="max-w-md mx-auto text-center">
                      <motion.div
                        className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <DoveIcon className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-4">
                          Dress Code
                        </p>
                        <p className="font-serif text-brown text-sm sm:text-base leading-relaxed">
                          For godparents, we encourage you to wear
                          <span className="text-mauve font-semibold"> white casual clothes</span>.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-4">
                          <div className="w-3 h-3 rounded-full bg-white border border-mauve-pale shadow-sm" />
                          <div className="w-3 h-3 rounded-full bg-mauve-pale" />
                          <div className="w-3 h-3 rounded-full bg-cream-dark border border-mauve-pale/30" />
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  {/* RSVP Form */}
                  <section className="relative z-10 py-10 px-4 pb-6">
                    <div className="max-w-md mx-auto text-center">
                      <motion.div
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-mauve-pale/30"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        {!rsvpSubmitted ? (
                          <>
                            <HeartIcon className="w-6 h-6 mx-auto mb-3 opacity-50 animate-heartbeat" />
                            <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-2">
                              Let Us Know
                            </p>
                            <p className="font-serif text-brown-light text-xs sm:text-sm mb-6">
                              Please confirm your attendance
                            </p>

                            <div className="space-y-4">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Your Name"
                                  value={rsvpName}
                                  onChange={(e) => setRsvpName(e.target.value)}
                                  className="w-full bg-white/70 border border-mauve-pale/40 rounded-xl px-4 py-3 font-serif text-brown text-sm placeholder:text-brown-light/40 focus:outline-none focus:border-mauve-light focus:ring-2 focus:ring-mauve-pale/30 transition-all"
                                />
                              </div>
                              <div>
                                <textarea
                                  placeholder="Message for Baby Tala (optional)"
                                  value={rsvpMessage}
                                  onChange={(e) => setRsvpMessage(e.target.value)}
                                  rows={3}
                                  className="w-full bg-white/70 border border-mauve-pale/40 rounded-xl px-4 py-3 font-serif text-brown text-sm placeholder:text-brown-light/40 focus:outline-none focus:border-mauve-light focus:ring-2 focus:ring-mauve-pale/30 transition-all resize-none"
                                />
                              </div>
                              <motion.button
                                onClick={handleRsvpSubmit}
                                className="w-full bg-mauve hover:bg-mauve/90 text-white font-serif text-sm px-6 py-3 rounded-full shadow-lg shadow-mauve/20 transition-all duration-300 hover:shadow-xl hover:shadow-mauve/30"
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Send My RSVP
                                <HeartIcon className="w-3.5 h-3.5 inline-block ml-1.5 opacity-70" />
                              </motion.button>
                            </div>

                            <div className="mt-5 pt-4 border-t border-mauve-pale/20 space-y-3">
                              <p className="font-serif text-brown-light text-xs">
                                To cancel your RSVP, kindly message or call the parents directly:
                              </p>
                              <p className="font-[family-name:var(--font-script)] text-mauve text-base">
                                Mimi Timmy &amp; DaDa Daboy
                              </p>
                              <a
                                href="tel:09129282905"
                                className="font-serif text-mauve text-sm hover:text-mauve-light transition-colors underline underline-offset-2 decoration-mauve-pale/40"
                              >
                                0912 928 2905
                              </a>
                            </div>
                          </>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                          >
                            <div className="text-4xl mb-3">👼</div>
                            <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-2">
                              Thank You!
                            </p>
                            <p className="font-serif text-brown text-sm">
                              Your RSVP has been received, <span className="font-semibold text-mauve">{rsvpName}</span>.
                            </p>
                            {rsvpMessage && (
                              <p className="font-serif text-brown-light text-sm italic mt-2">
                                &ldquo;{rsvpMessage}&rdquo;
                              </p>
                            )}
                            <p className="font-serif text-brown-light text-xs mt-4">
                              We can&apos;t wait to celebrate with you!
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── VIEW GUEST BOOK BUTTON ─── */}
            <section className="relative z-10 py-8 px-4">
              <div className="max-w-md mx-auto text-center">
                <motion.button
                  onClick={handleOpenGuestList}
                  className="group inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 text-mauve font-serif text-sm sm:text-base px-8 sm:px-10 py-3 rounded-full border border-mauve-pale/40 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">📖</span>
                  View Guest Book
                </motion.button>
                <p className="font-serif text-brown-light text-[10px] sm:text-xs mt-2 opacity-60">
                  See who&apos;s coming and their messages for Baby Tala
                </p>
              </div>
            </section>

            {/* ─── GUEST LIST VIEW ─── */}
            <AnimatePresence>
              {showGuestList && (
                <motion.div
                  className="fixed inset-0 z-40 bg-cream overflow-y-auto"
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                >
                  {/* Back button */}
                  <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md py-4 px-4 border-b border-mauve-pale/20">
                    <div className="max-w-md mx-auto flex items-center justify-between">
                      <motion.button
                        onClick={() => { playSoftWhoosh(); setShowGuestList(false); }}
                        className="flex items-center gap-2 text-mauve font-serif text-sm hover:text-mauve-light transition-colors"
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Invitation
                      </motion.button>
                      <p className="font-[family-name:var(--font-script)] text-mauve text-lg">
                        Guest Book
                      </p>
                    </div>
                  </div>

                  {/* Guest list content */}
                  <div className="max-w-md mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="text-4xl mb-2">👼</div>
                      <p className="font-[family-name:var(--font-script)] text-mauve text-2xl sm:text-3xl mb-1">
                        Messages for Baby Tala
                      </p>
                      <p className="font-serif text-brown-light text-xs">
                        Love and prayers from our dear guests
                      </p>
                    </div>

                    {/* Guest entries */}
                    {loadingGuests ? (
                      <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-2 border-mauve-pale border-t-mauve rounded-full animate-spin" />
                        <p className="font-serif text-brown-light text-sm mt-4">
                          Loading guests...
                        </p>
                      </div>
                    ) : guestList.length === 0 ? (
                      <div className="text-center py-12 bg-white/40 rounded-2xl p-8 border border-mauve-pale/20">
                        <div className="text-4xl mb-3">💭</div>
                        <p className="font-[family-name:var(--font-script)] text-mauve text-xl mb-2">
                          No guests yet
                        </p>
                        <p className="font-serif text-brown-light text-sm">
                          Be the first to send your love to Baby Tala!
                        </p>
                        <motion.button
                          onClick={() => { playClick(); setShowGuestList(false); }}
                          className="mt-5 bg-mauve hover:bg-mauve/90 text-white font-serif text-sm px-6 py-2.5 rounded-full shadow-lg shadow-mauve/20 transition-all duration-300"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Go to RSVP
                          <HeartIcon className="w-3.5 h-3.5 inline-block ml-1.5 opacity-70" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Attending count */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <HeartIcon className="w-4 h-4 text-mauve animate-heartbeat" />
                          <p className="font-serif text-mauve text-sm">
                            <span className="font-semibold">{guestList.filter(g => g.response === 'yes').length}</span>
                            <span className="text-brown-light"> guest{guestList.filter(g => g.response === 'yes').length !== 1 ? 's' : ''} attending</span>
                          </p>
                        </div>

                        {guestList.map((guest, idx) => (
                          <motion.div
                            key={guest.id}
                            className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-mauve-pale/25"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.08 }}
                          >
                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mauve-pale/50 flex items-center justify-center">
                                <span className="font-[family-name:var(--font-script)] text-mauve text-lg">
                                  {guest.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-[family-name:var(--font-script)] text-brown text-base">
                                    {guest.name}
                                  </p>
                                  {guest.response === 'yes' ? (
                                    <span className="inline-flex items-center gap-1 bg-mauve/10 text-mauve text-[10px] font-serif px-2 py-0.5 rounded-full">
                                      <HeartIcon className="w-2.5 h-2.5" /> Attending
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-brown-light/10 text-brown-light text-[10px] font-serif px-2 py-0.5 rounded-full">
                                      Can&apos;t make it
                                    </span>
                                  )}
                                </div>
                                {guest.message && (
                                  <p className="font-serif text-brown text-sm italic leading-relaxed">
                                    &ldquo;{guest.message}&rdquo;
                                  </p>
                                )}
                                <p className="font-serif text-brown-light/40 text-[10px] mt-2">
                                  {new Date(guest.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Cancel note */}
                        <div className="bg-blush/30 rounded-xl p-4 mt-6 border border-pink-cloud/20">
                          <p className="font-serif text-brown text-xs leading-relaxed text-center">
                            Need to cancel your RSVP? Kindly message or call the parents directly:
                          </p>
                          <div className="text-center mt-2">
                            <p className="font-[family-name:var(--font-script)] text-mauve text-sm">
                              Mimi Timmy &amp; DaDa Daboy
                            </p>
                            <a
                              href="tel:09129282905"
                              className="font-serif text-mauve text-xs hover:text-mauve-light transition-colors underline underline-offset-2 decoration-mauve-pale/40"
                            >
                              0912 928 2905
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── FOOTER ─── */}
            <footer className="relative z-10 py-10 px-4 mt-auto">
              <div className="max-w-md mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-px bg-mauve-light opacity-30" />
                  <CrossIcon className="w-5 h-7 opacity-30" />
                  <div className="w-12 h-px bg-mauve-light opacity-30" />
                </div>
                <p className="font-[family-name:var(--font-script)] text-mauve text-xl sm:text-2xl mb-1">
                  Tala Gielly Magtangob
                </p>
                <p className="font-serif text-brown-light text-xs tracking-wider">
                  June 13, 2026 &bull; Saint Anthony of Padua Parish
                </p>
                <p className="font-serif text-brown-light/60 text-[10px] mt-3 tracking-wider uppercase">
                  Created by Family
                </p>
              </div>
            </footer>

            {/* Bottom spacing for teddy bears */}
            <div className="h-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
