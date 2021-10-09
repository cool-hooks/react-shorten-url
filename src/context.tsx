import React from 'react';
import { BitlyClient } from 'bitly';
import { BitlyConfig } from 'bitly/dist/types';

export interface Config {
  readonly accessToken: string;
  readonly options?: BitlyConfig;
}

export const ShortenUrlContext = React.createContext<
  | {
      readonly bitly: BitlyClient;
    }
  | undefined
>(undefined);

ShortenUrlContext.displayName = 'ShortenUrlContext';

export const ShortenUrlProvider = ({
  children,
  config,
}: {
  readonly config: Config;
  readonly children: React.ReactNode;
}) => {
  const { accessToken, options = {} } = config;

  const bitly = new BitlyClient(accessToken, options);

  return (
    <ShortenUrlContext.Provider value={{ bitly }}>
      {children}
    </ShortenUrlContext.Provider>
  );
};
