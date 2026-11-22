import React from 'react';

export default function GaneshaIcon({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Crown / Mukut */}
      <path
        d="M 50 12 L 44 26 L 56 26 Z M 47 26 L 50 18 L 53 26"
        strokeWidth="2.4"
        fill="none"
      />
      <circle cx="50" cy="10" r="2" fill="currentColor" />

      {/* Head & Forehead Tilak */}
      <path
        d="M 40 32 C 40 26, 60 26, 60 32"
        strokeWidth="2.2"
      />
      {/* Tilak / Trishul */}
      <path
        d="M 50 28 V 38 M 46 31 C 48 35, 52 35, 54 31"
        strokeWidth="2"
      />

      {/* Ears */}
      <path
        d="M 38 34 C 26 30, 24 46, 36 50 M 62 34 C 74 30, 76 46, 64 50"
        strokeWidth="2.4"
      />

      {/* Trunk (Sond) curving gracefully to the left */}
      <path
        d="M 48 40 C 48 52, 42 62, 34 64 C 28 66, 26 58, 32 56 C 36 54, 40 58, 42 62"
        strokeWidth="2.6"
      />
      {/* Modak on Trunk Tip */}
      <circle cx="30" cy="56" r="2.5" fill="currentColor" />

      {/* Eyes */}
      <path d="M 43 38 Q 45 37 47 38" strokeWidth="2.2" />
      <path d="M 53 38 Q 55 37 57 38" strokeWidth="2.2" />

      {/* Body & Om Contour */}
      <path
        d="M 38 68 C 30 70, 26 78, 34 84 C 44 92, 58 92, 68 84 C 74 78, 70 68, 62 68 C 55 68, 52 74, 50 74 C 48 74, 45 68, 38 68 Z"
        strokeWidth="2.4"
      />

      {/* Tusk */}
      <path d="M 43 45 L 39 48" strokeWidth="2.2" />
      <path d="M 55 45 L 59 47" strokeWidth="2.2" />
    </svg>
  );
}
