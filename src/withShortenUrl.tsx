import React from 'react';

import { useShortenUrl } from './useShortenUrl';

export const withShortenUrl = () => (
  WrappedComponent: React.ComponentType<any>
) => (props: React.ComponentProps<any>) => (
  <WrappedComponent {...props} {...useShortenUrl()} />
);
