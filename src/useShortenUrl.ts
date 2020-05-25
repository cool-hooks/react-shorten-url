import { useContext } from 'react';

import { ShortenUrlContext } from './context';

export const useShortenUrl = () => {
  const { bitly } = useContext(ShortenUrlContext);

  const shorten = async (url: string) => {
    return await bitly.shorten(url);
  };

  return { shorten };
};
