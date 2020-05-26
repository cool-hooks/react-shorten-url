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

### ShortenUrlProvider

#### Config Param Values

| Name        | Type        | Default | Description             |
| ----------- | ----------- | ------- | ----------------------- |
| accessToken | string      | ` `     | Bitly access token      |
| options     | BitlyConfig | `{}`    | Additional Bitly config |

### useShortenUrl

#### Options

| Name | Type   | Default | Description    |
| ---- | ------ | ------- | -------------- |
| url  | string | ` `     | URL to shorten |

#### Returned Values

| Name    | Type      | Description              |
| ------- | --------- | ------------------------ |
| loading | boolean   | Is data loading          |
| error   | Error     | Error shortening URL     |
| data    | BitlyLink | Data returned from Bitly |

## Example

**• Import `ShortenUrlProvider` from library in your React app, wrap main component and set config values:**

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

**• Then use `useShortenUrl` Hook:**

```js
// App.js

import React from 'react';
import { useShortenUrl } from 'react-shorten-url';

const App = () => {
  const { loading, error, data } = useShortenUrl('http://example.com/');

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

  return <h1>{data.link}</h1>;
};

export default App;
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
