import React, { useMemo } from 'react';
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

interface Props {
  readonly config: Config;
  readonly children: React.ReactNode;
}

export const ShortenUrlProvider = ({ children, config }: Props) => {
  const { accessToken, options = {} } = config;

  const bitly = useMemo(
    () => new BitlyClient(accessToken, options),
    [accessToken, options]
  );

  return (
    <ShortenUrlContext.Provider value={{ bitly }}>
      {children}
    </ShortenUrlContext.Provider>
  );
};
