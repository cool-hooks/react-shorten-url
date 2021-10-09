import { useState, useEffect, useCallback } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

type BitlyError = Error | null | unknown; // TODO update type
type Status = 'loading' | 'success' | 'error' | 'stale';

interface Options {
  readonly enabled: boolean;
  onSuccess: (data: BitlyLink) => void;
  onError: (err: BitlyError) => void;
}

export const useShortenUrl = (
  url: string,
  { enabled = true, onSuccess, onError }: Options
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BitlyError>(null);
  const [data, setData] = useState<BitlyLink>();
  const [status, setStatus] = useState<Status>('stale');

  const { bitly } = useSafeContext(ShortenUrlContext);

  const shorten = useCallback(async () => {
    setLoading(true);
    setStatus('loading');

    try {
      const res = await bitly.shorten(url);

      setData(res);
      onSuccess(res);
      setStatus('success');
    } catch (err) {
      setError(err);
      onError(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [bitly, onError, onSuccess, url]);

  useEffect(() => {
    if (enabled) {
      shorten();
    }
  }, [bitly, enabled, shorten, url]);

  return { loading, error, data, refetch: shorten, status };
};
