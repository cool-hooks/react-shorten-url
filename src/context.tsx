import React from 'react';
import { BitlyClient } from 'bitly';
import { BitlyConfig } from 'bitly/dist/types';

interface ContextProps {
  readonly bitly: BitlyClient;
}

export const ShortenUrlContext = React.createContext<ContextProps>({
  bitly: {} as BitlyClient,
});

interface Config {
  readonly accessToken: string;
  readonly options?: BitlyConfig;
}

interface Props {
  readonly children: React.ReactNode;
  readonly config: Config;
}

export const ShortenUrlProvider = ({ children, config }: Props) => {
  const { accessToken, options = {} } = config;

  const bitly = new BitlyClient(accessToken, options);

  return (
    <ShortenUrlContext.Provider value={{ bitly }}>
      {children}
    </ShortenUrlContext.Provider>
  );
};
