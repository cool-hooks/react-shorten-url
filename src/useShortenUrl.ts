import { useEffect } from 'react';
import { useGroupState } from 'react-group-state';
import { useSafeContext } from 'react-safe-context-hooks';
import { BitlyLink } from 'bitly/dist/types';

import { ShortenUrlContext } from './context';

interface State {
  readonly loading: boolean;
  readonly error: Error | null;
  readonly data?: BitlyLink;
}

export const useShortenUrl = (url: string) => {
  const context = useSafeContext(ShortenUrlContext);

  const { bitly } = context;

  const [state, setState] = useGroupState<State>({
    loading: false,
    error: null,
    data: undefined,
  });

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bitly, url]);

  return state;
};
