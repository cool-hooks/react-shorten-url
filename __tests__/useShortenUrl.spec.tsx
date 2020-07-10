import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { BitlyConfig } from 'bitly/dist/types';

import { ShortenUrlProvider, useShortenUrl } from '../src';

interface Config {
  accessToken: string;
  options?: BitlyConfig;
}

jest.mock('bitly', () => ({
  BitlyClient: (..._: any) => ({
    shorten: () => jest.fn().mockReturnValue('https://bit.ly/2BN8vLY'),
  }),
}));

describe('useShortenUrl', () => {
  const makeWrapper = (config: Config): React.FC => ({ children }) => (
    <ShortenUrlProvider config={config}>{children}</ShortenUrlProvider>
  );

  it('should return shorten URL', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useShortenUrl('http://example.com/'),
      {
        wrapper: makeWrapper({ accessToken: 'q1w2e3r4t5y6' }),
      }
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe('https://bit.ly/2BN8vLY');
  });
});
