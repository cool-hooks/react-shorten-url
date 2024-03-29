import React from 'react';
import { BitlyClient } from 'bitly';
import { BitlyConfig } from 'bitly/dist/types';

interface Config {
  accessToken: string;
  options?: BitlyConfig;
}

export const ShortenUrlContext = React.createContext<{
  readonly bitly: BitlyClient;
}>({
  bitly: {} as BitlyClient,
});

ShortenUrlContext.displayName = 'ShortenUrlContext';

export const ShortenUrlProvider: React.FC<{ readonly config: Config }> = ({
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
