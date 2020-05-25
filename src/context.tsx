import React from 'react';
import { BitlyClient } from 'bitly';

interface Config {
  accessToken: string;
  options: any;
}

export const ShortenUrlContext = React.createContext<{
  bitly: BitlyClient;
}>({
  bitly: {} as BitlyClient,
});

export const ShortenUrlProvider: React.FC<{ config: Config }> = ({
  children,
  config,
}) => {
  const { accessToken, options = {} } = config;

  const bitly = new BitlyClient(accessToken, options);

  return (
    <ShortenUrlContext.Provider value={{ bitly }}>
      {children}
    </ShortenUrlContext.Provider>
  );
};
