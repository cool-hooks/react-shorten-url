# [react-shorten-url](https://github.com/cool-hooks/react-shorten-url)

[![NPM version](http://img.shields.io/npm/v/react-shorten-url.svg?style=flat-square)](https://www.npmjs.com/package/react-shorten-url)
[![NPM downloads](http://img.shields.io/npm/dm/react-shorten-url.svg?style=flat-square)](https://www.npmjs.com/package/react-shorten-url)

## About

Bitly implementation to React hook

## How to Install

First, install the library in your project by npm:

```sh
$ npm install react-shorten-url
```

Or Yarn:

```sh
$ yarn add react-shorten-url
```

## Getting Started

#### Returned Values

#### Example

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { ShortenUrlProvider } from 'react-shorten-url';

import App from './App';

ReactDOM.render(
  <ShortenUrlProvider config={{ accessToken: 'bitly_access_token' }}>
    <App />
  </ShortenUrlProvider>,
  document.getElementById('root')
);
```

**`useShortenUrl` hook:**

```js
import React from 'react';
import { useShortenUrl } from 'react-shorten-url';

const App = () => {
  const { shorten } = useShortenUrl();

  const shortenUrl = shorten('http://example.com/');

  return <h1>{shortenUrl}</h1>;
};

export default App;
```

**`withShortenUrl` HOC:**

```js
import React from 'react';
import { withShortenUrl } from 'react-shorten-url';

const App = ({ shorten }) => {
  const shortenUrl = shorten('http://example.com/');

  return <h1>{shortenUrl}</h1>;
};

export default withShortenUrl()(App);
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
