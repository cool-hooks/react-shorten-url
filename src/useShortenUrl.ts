import { useState, useEffect, useCallback } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

interface Options {
 readonly enabled: boolean;
  onSuccess: (data: any) => any // TODO
  onError: (err: any) => any // TODO
}

// useShortenUrl = () => {}
// useShortenUrl = (url: string, enabled: boolean) => {}
export const useShortenUrl = (url: string, { enabled = true, onSuccess, onError }: Options) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<BitlyLink>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'stale'>('stale')

  const { bitly } = useSafeContext(ShortenUrlContext);

  const shorten = useCallback(async () => {
    setLoading(true);
    setStatus('loading')

    try {
      const res = await bitly.shorten(url)

      setData(res);
      onSuccess(res)
      setStatus('success')
    } catch (err) {
      setError(err);
      onError(err)
      setStatus('error')
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      shorten();
    }
  }, [bitly, url]);

  return { loading, error, data, refetch: shorten, status };
  // return { loading, error, data, refetch: shorten };
};

// refetch -> trigger/call


// const {loading, error, data, status, refetch} = useShortenUrl()
// refetch(url)???

// params
// { onError, onSuccess }
