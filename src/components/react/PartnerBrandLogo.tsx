import type { PartnerBentoShape } from '@/lib/content/partnerBrands';
import { useState } from 'react';

interface Props {
  name: string;
  logoSrc?: string;
  shape?: PartnerBentoShape;
}

const imageSizeClasses: Record<PartnerBentoShape, string> = {
  square: 'max-h-24 max-w-[10.5rem] sm:max-h-28 sm:max-w-[12rem]',
  wide: 'max-h-20 max-w-[16rem] sm:max-h-24 sm:max-w-[20rem]',
  tall: 'max-h-36 max-w-[11rem] sm:max-h-44 sm:max-w-[13rem]',
  feature: 'max-h-40 max-w-[15rem] sm:max-h-52 sm:max-w-[18rem]',
};

const wordmarkSizeClasses: Record<PartnerBentoShape, string> = {
  square: 'text-lg sm:text-xl',
  wide: 'text-xl sm:text-2xl',
  tall: 'text-xl sm:text-2xl',
  feature: 'text-2xl sm:text-3xl',
};

export default function PartnerBrandLogo({ name, logoSrc, shape = 'square' }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showLogo = Boolean(logoSrc) && !imageFailed;

  return (
    <figure className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-5 transition-colors duration-300 ease-out group-hover:border-botanical/35 sm:p-7">
      {showLogo ? (
        <>
          <img
            src={logoSrc}
            alt={`${name} logo`}
            width={280}
            height={160}
            loading="lazy"
            decoding="async"
            className={`w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${imageSizeClasses[shape]}`}
            onError={() => setImageFailed(true)}
          />
          <figcaption className="mt-3 text-center text-[0.7rem] font-semibold tracking-[0.08em] text-muted/85 uppercase">
            {name}
          </figcaption>
        </>
      ) : (
        <figcaption
          className={`font-display text-center leading-snug text-pretty text-botanical ${wordmarkSizeClasses[shape]}`}
        >
          {name}
        </figcaption>
      )}
    </figure>
  );
}
