import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { BitlyConfig } from 'bitly/dist/types';

import { ShortenUrlProvider, useShortenUrl } from '../src';

jest.mock('bitly', () => ({
  BitlyClient: (accessToken: string, options: BitlyConfig) => ({
    shorten: () => 'https://bit.ly/2BN8vLY',
  }),
}));

describe('useShortenUrl', () => {
  it('should return shorten URL', async () => {
    const makeWrapper = (config: any): React.FC => ({
      children,
    }: {
      children?: React.ReactNode;
    }) => <ShortenUrlProvider config={config}>{children}</ShortenUrlProvider>;

    const { result, waitForNextUpdate } = renderHook(
      () => useShortenUrl('http://example.com/'),
      {
        wrapper: makeWrapper({ accessToken: '' }),
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
