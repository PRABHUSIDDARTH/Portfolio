// Used only at build time to render each route to HTML, so crawlers that skip JavaScript can read it.
import { renderToString } from 'react-dom/server';
import App from './App';
export { PAGES, SITE, headFor } from './seo';

export const render = (path: string) => renderToString(<App path={path} />);
