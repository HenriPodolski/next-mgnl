import React from 'react';
import '../styles/global.scss';

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default App;
