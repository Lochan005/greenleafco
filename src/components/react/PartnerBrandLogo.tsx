import { useState } from 'react';

interface Props {
  name: string;
  logoSrc?: string;
}

export default function PartnerBrandLogo({ name, logoSrc }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showLogo = Boolean(logoSrc) && !imageFailed;

  return (
    <figure className="flex h-full min-h-32 flex-col items-center justify-center border border-line bg-paper px-4 py-8 transition-colors duration-300 ease-out group-hover:border-botanical/25 sm:min-h-36 sm:px-6">
      {showLogo ? (
        <img
          src={logoSrc}
          alt={`${name} logo`}
          width={200}
          height={72}
          loading="lazy"
          decoding="async"
          className="max-h-16 w-full max-w-[12.5rem] object-contain object-center"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <figcaption className="font-display text-center text-lg leading-snug text-pretty text-botanical sm:text-xl">
          {name}
        </figcaption>
      )}
    </figure>
  );
}
