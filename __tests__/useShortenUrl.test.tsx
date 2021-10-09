import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { BitlyConfig } from 'bitly/dist/types';

import { ShortenUrlProvider, useShortenUrl } from '../src';
import { Config } from '../src/context';

jest.mock('bitly', () => ({
  BitlyClient: (accessToken: string, _?: BitlyConfig) => ({
    shorten: () => {
      if (accessToken) {
        return jest.fn().mockReturnValueOnce('https://bit.ly/3DlLL0o');
      } else {
        throw new Error();
      }
    },
  }),
}));

describe('useShortenUrl', () => {
  const makeWrapper =
    (config: Config): React.FC =>
    ({ children }) =>
      <ShortenUrlProvider config={config}>{children}</ShortenUrlProvider>;

  it('should return a shortened URL', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useShortenUrl('https://example.com/'),
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
    expect(result.current.data).toBe('https://bit.ly/3DlLL0o');
  });

  it('should throw an error', async () => {
    const { result } = renderHook(() => useShortenUrl('https://example.com/'), {
      wrapper: makeWrapper({
        accessToken: '',
        options: {
          debug: true,
        },
      }),
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toMatchObject(new Error());
    expect(result.current.data).toBe(undefined);
  });
});
