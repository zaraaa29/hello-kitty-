import React, { useState } from 'react';

export function RibbonBowIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 11.5C13.2 7.5 6.8 3.5 3.5 6.2C1.2 8.1 2.4 13.8 6.5 14.5C9.7 15.1 13.2 13.5 16 11.5Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path
        d="M16 11.5C18.8 7.5 25.2 3.5 28.5 6.2C30.8 8.1 29.6 13.8 25.5 14.5C22.3 15.1 18.8 13.5 16 11.5Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path
        d="M14.2 13.2L9.5 21.5L13.2 20L15.8 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8 13.2L22.5 21.5L18.8 20L16.2 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="11.5" r="2.7" fill="#FFF9F7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CherryIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12.5 3.5C11 6.8 8.5 11.5 7 15M12.5 3.5C14.5 6.5 16.5 11.2 17 15.2M12.5 3.5C14.8 3.2 17.5 4.3 18.5 6.2"
        stroke="#5A7247"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="7" cy="17" r="3.6" fill="#E63950" />
      <circle cx="17" cy="17.2" r="3.6" fill="#E63950" />
      <circle cx="5.8" cy="15.8" r="0.9" fill="#FFF9F7" fillOpacity="0.85" />
      <circle cx="15.8" cy="16" r="0.9" fill="#FFF9F7" fillOpacity="0.85" />
    </svg>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ResilientImage({ src, alt, className = '' }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FCE4EC] via-[#FFF9F7] to-[#FFF0B3] text-[#6E515B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <RibbonBowIcon className="w-10 h-10 text-[#E63950] mb-2 opacity-80" />
        <span className="text-xs font-medium text-[#2B1920] line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
