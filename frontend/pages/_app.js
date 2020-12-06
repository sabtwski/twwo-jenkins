// Importing Ant Design css for components
import 'antd/dist/antd.css';
// Import stylesheets for written components

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
