# [react-shorten-url](https://github.com/cool-hooks/react-shorten-url)

[![NPM version](https://img.shields.io/npm/v/react-shorten-url?style=flat-square)](https://www.npmjs.com/package/react-shorten-url)
[![NPM downloads](https://img.shields.io/npm/dm/react-shorten-url?style=flat-square)](https://www.npmjs.com/package/react-shorten-url)
[![NPM license](https://img.shields.io/npm/l/react-shorten-url?style=flat-square)](https://www.npmjs.com/package/react-shorten-url)
[![Codecov](https://img.shields.io/codecov/c/github/cool-hooks/react-shorten-url?style=flat-square)](https://codecov.io/gh/cool-hooks/react-shorten-url)
[![Travis](https://img.shields.io/travis/com/cool-hooks/react-shorten-url/main?style=flat-square)](https://travis-ci.com/cool-hooks/react-shorten-url)
[![Bundle size](https://img.shields.io/bundlephobia/min/react-shorten-url?style=flat-square)](https://bundlephobia.com/result?p=react-shorten-url)

## About

[Bitly](https://github.com/tanepiper/node-bitly/) implementation to React hook

### Demo

**[Playground – play with the library in CodeSandbox](https://codesandbox.io/s/react-shorten-url-9t2gc)**

### Similar Projects

- [bitly-field-react](https://github.com/massoprod/bitly-field-react/) by [patrik_masiar](https://github.com/massoprod/)

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
  const { loading, error, data } = useShortenUrl('https://example.com/');

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

  return <h1>{data.link}</h1>;
};

export default App;
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
