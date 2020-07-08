import React from 'react';
import { render } from '@testing-library/react';

import { ShortenUrlProvider, useShortenUrl } from '../src';

describe('useShortenUrl', () => {
  it('should ', () => {
    const Component: React.FC = () => {
      const { loading, error, data } = useShortenUrl('http://example.com/');

      return <p data-testid="result">{}</p>;
    };

    const { container } = render(
      <ShortenUrlProvider config={{ accessToken: '' }}>
        <Component />
      </ShortenUrlProvider>
    );

    expect(container.firstChild!.textContent!).toBe();
  });
});
