import { useEffect, useMemo } from 'react';

/** Injects JSON-LD structured data for Google rich results */
export default function JsonLd({ data }) {
  const json = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    const id = 'jsonld-seo';
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = json;

    return () => {
      script?.remove();
    };
  }, [json]);

  return null;
}
