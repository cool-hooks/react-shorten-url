import { useEffect } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';
import { useGroupState } from 'react-group-state';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

interface State {
  readonly loading: boolean;
  readonly error: Error | null;
  readonly data?: BitlyLink;
}

export const useShortenUrl = (url: string) => {
  const [state, setState] = useGroupState<State>({
    loading: false,
    error: null,
    data: undefined,
  });

  const { bitly } = useSafeContext(ShortenUrlContext);

  useEffect(() => {
    const shorten = async () => {
      setState({ loading: true });

      try {
        setState({
          data: await bitly.shorten(url),
          loading: false,
        });
      } catch (err) {
        setState({
          error: err,
          loading: false,
        });
      }
    };

    shorten();
  }, [bitly, setState, url]);

  return state;
};
