/** Set false to disable the intro splash without removing the component. */
export const splashVideoEnabled = true;

export const splashSessionStorageKey = 'greenleaf-splash-seen';

/** Silent H.264 MP4 in `/public/splash/`. */
export const splashVideoMp4 = '/splash/splashVideo.mp4';

/** Optional WebM (`/splash/intro.webm`); leave undefined until the file exists. */
export const splashVideoWebm: string | undefined = undefined;

/** Optional poster (`/splash/intro-poster.jpg`); leave undefined until the file exists. */
export const splashVideoPoster: string | undefined = undefined;
