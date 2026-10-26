import {
  splashSessionStorageKey,
  splashVideoMp4,
  splashVideoPoster,
  splashVideoWebm,
} from '@/lib/content/splashVideo';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  mp4Src?: string;
  webmSrc?: string;
  posterSrc?: string;
}

type Phase = 'checking' | 'playing' | 'hidden';

export default function VideoSplash({
  mp4Src = splashVideoMp4,
  webmSrc = splashVideoWebm,
  posterSrc = splashVideoPoster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('checking');

  const releaseScroll = useCallback(() => {
    document.body.style.overflow = '';
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(splashSessionStorageKey, '1');
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    releaseScroll();
    setPhase('hidden');
  }, [releaseScroll]);

  useEffect(() => {
    if (sessionStorage.getItem(splashSessionStorageKey)) {
      setPhase('hidden');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem(splashSessionStorageKey, '1');
      setPhase('hidden');
      return;
    }

    document.body.style.overflow = 'hidden';
    setPhase('playing');
    return () => releaseScroll();
  }, [releaseScroll]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.currentTime = 0;
    void video.play().catch(() => dismiss());
  }, [dismiss, phase]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dismiss, phase]);

  if (phase === 'checking' || phase === 'hidden') {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site introduction"
      className="fixed inset-0 z-[100] flex flex-col bg-botanical-deep text-canvas"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        autoPlay
        muted
        preload="auto"
        poster={posterSrc || undefined}
        onEnded={dismiss}
        onError={dismiss}
      >
        {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        <source src={mp4Src} type="video/mp4" />
      </video>

      <div className="relative z-10 flex justify-end p-4 sm:p-6">
        <button
          type="button"
          className="min-h-11 border border-canvas/40 bg-botanical-deep/60 px-4 text-xs font-bold tracking-[0.1em] uppercase backdrop-blur-sm hover:border-canvas hover:bg-botanical-deep/80"
          onClick={dismiss}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
