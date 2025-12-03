import '../styles/globals.css';
import Layout from '../components/Layout';
import { useEffect } from 'react';

// Suppress hydration warnings
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Hydration')) return;
    originalError.apply(console, args);
  };
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('SW registered'))
        .catch((error) => console.log('SW registration failed'));
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
