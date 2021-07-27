import React from 'react';
import { BitlyClient } from 'bitly';
import { BitlyConfig } from 'bitly/dist/types';

interface Config {
  readonly accessToken: string;
  readonly options?: BitlyConfig;
}

export const ShortenUrlContext = React.createContext({} as BitlyClient);

ShortenUrlContext.displayName = 'ShortenUrlContext';

export const ShortenUrlProvider: React.FC<{ readonly config: Config }> = ({
  children,
  config,
}) => {
  const { accessToken, options = {} } = config;

  const bitly = new BitlyClient(accessToken, options);

  return (
    <ShortenUrlContext.Provider value={bitly}>
      {children}
    </ShortenUrlContext.Provider>
  );
};

ShortenUrlProvider.displayName = 'ShortenUrlProvider';
