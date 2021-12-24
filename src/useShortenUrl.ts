import { useState, useEffect, useCallback } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';
// import { useGroupState } from 'react-group-state';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

type BitlyError = Error | null | unknown; // TODO update type
type Status = 'loading' | 'success' | 'error' | 'stale';

interface Options {
  readonly enabled: boolean;
  readonly onSuccess: (data: BitlyLink) => void;
  readonly onError: (err: BitlyError) => void;
}

// interface State {
//   readonly loading: boolean;
//   readonly error: BitlyError;
//   readonly data?: BitlyLink;
//   readonly status: Status;
// }

export const useShortenUrl = (
  url: string,
  { enabled = true, onSuccess, onError } = {} as Options
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BitlyError>(null);
  const [data, setData] = useState<BitlyLink>();
  const [status, setStatus] = useState<Status>('stale');

  const {
    bitly: { shorten: bitlyShorten },
  } = useSafeContext(ShortenUrlContext);

  const shorten = useCallback(async () => {
    setLoading(true);
    setStatus('loading');

    try {
      const res = await bitlyShorten(url);

      setData(res);
      onSuccess(res);
      setStatus('success');
    } catch (err) {
      // TODO typeguard
      setError(err);
      onError(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [onError, onSuccess, bitlyShorten, url]);

  useEffect(() => {
    if (enabled) {
      shorten();
    }
  }, [shorten, enabled]);

  return { loading, error, data, refetch: shorten, status };
};
