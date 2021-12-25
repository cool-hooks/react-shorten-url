import { useEffect, useCallback } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';
import { useGroupState } from 'react-group-state';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

type BitlyError = Error | null | unknown; // TODO update type

interface Options {
  readonly enabled: boolean;
  readonly onSuccess: (data: BitlyLink) => void;
  readonly onError: (err: BitlyError) => void;
}

interface StateLoading {
  readonly status: 'loading';
  readonly loading: true;
  readonly error: null;
  readonly data: undefined;
}

interface StateSuccess {
  readonly status: 'success';
  readonly loading: false;
  readonly error: null;
  readonly data: BitlyLink;
}

interface StateError {
  readonly status: 'error';
  readonly loading: false;
  readonly error: BitlyError;
  // readonly error: Error;
  readonly data: undefined;
}

interface StateStale {
  readonly status: 'stale';
  readonly loading: false;
  readonly error: null;
  readonly data: undefined;
}

type State = StateLoading | StateSuccess | StateError | StateStale;

export const useShortenUrl = (
  url: string,
  { enabled = true, onSuccess, onError } = {} as Options
) => {
  // TODO make full object required
  const [state, setState] = useGroupState<State>({
    status: 'stale',
    loading: false,
    error: null,
    data: undefined,
  });

  const {
    bitly: { shorten: bitlyShorten },
  } = useSafeContext(ShortenUrlContext);

  const shorten = useCallback(async () => {
    setState({
      status: 'loading',
      loading: true,
      error: null,
      data: undefined,
    });

    try {
      const res = await bitlyShorten(url);

      setState({
        status: 'success',
        loading: false,
        error: null,
        data: res,
      });

      onSuccess(res);
    } catch (err) {
      // TODO typeguard
      setState({
        status: 'error',
        loading: false,
        error: err,
        data: undefined,
      });

      onError(err);
    }
  }, [bitlyShorten, onError, onSuccess, setState, url]);

  useEffect(() => {
    if (enabled) {
      shorten();
    }
  }, [shorten, enabled]);

  return { ...state, refetch: shorten };
};
