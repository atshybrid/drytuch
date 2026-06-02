import { useState } from 'react';
import { IMG } from '../../constants/images';

/**
 * fit: contain = full product visible (default, no crop)
 * fit: cover   = fill frame (banners only)
 */
export default function ProductImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  fit = 'contain',
  pad = true,
  ...props
}) {
  const fallback = IMG.fallback;
  const [url, setUrl] = useState(src || fallback);
  const [loaded, setLoaded] = useState(false);

  const isCover = fit === 'cover';
  const objectClass = isCover ? 'object-cover object-center' : 'object-contain object-center';
  const padClass = !isCover && pad ? 'p-2 sm:p-3 md:p-4' : '';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100/80 ${padClass} ${className}`}
    >
      {!loaded ? <div className="absolute inset-0 shimmer" aria-hidden /> : null}
      <img
        src={url}
        alt={alt}
        className={`h-full w-full ${objectClass} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (url !== fallback) {
            setUrl(fallback);
            setLoaded(false);
          }
        }}
        {...props}
      />
    </div>
  );
}
