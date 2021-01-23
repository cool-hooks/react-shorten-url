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
        setData(await bitly.shorten(url));

        setLoading(false);
      } catch (err) {
        setError(err);

        setLoading(false);
      }
    };

    shorten();
  }, [bitly, url]);

  return { loading, error, data };
};
