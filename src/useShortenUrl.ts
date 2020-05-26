import { useState, useEffect, useContext } from 'react';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

export const useShortenUrl = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<BitlyLink>();

  const { bitly } = useContext(ShortenUrlContext);

  useEffect(() => {
    const shorten = async () => {
      setLoading(true);

      try {
        setLoading(false);

        setData(await bitly.shorten(url));
      } catch (err) {
        setLoading(false);

        setError(err);
      }
    };

    shorten();
  }, [bitly, url]);

  return { loading, error, data };
};
