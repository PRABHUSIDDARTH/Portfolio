import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Cursor, Footer, Nav } from './components/Chrome';
import Home from './pages/Home';
import NexusCloud from './pages/NexusCloud';
import Swara from './pages/Swara';
import SiddAi from './pages/SiddAi';
import Coedit from './pages/Coedit';
import { Link, RouterProvider, useRouter } from './lib/router';
import { useMeta } from './lib/motion';
import { initSmoothScroll } from './lib/smooth';

function NotFound() {
  useMeta('Not found | Prabhu Siddarth', 'This page does not exist.');
  return (
    <main id="main" className="page">
      <section className="hero" style={{ justifyContent: 'center' }}>
        <span className="mono muted">Error 404</span>
        <h1 className="display h-xl" style={{ margin: '1rem 0 2rem' }}>Lost in <span className="italic">the reel.</span></h1>
        <Link to="/" className="pill solid"><span className="dot" /> Back to the index</Link>
      </section>
      <Footer />
    </main>
  );
}

function Routes() {
  const { path } = useRouter();
  switch (path) {
    case '/': return <Home key="home" />;
    case '/nexuscloud': return <NexusCloud key="nexuscloud" />;
    case '/swara': return <Swara key="swara" />;
    case '/coedit': return <Coedit key="coedit" />;
    case '/sidd-ai': return <SiddAi key="sidd-ai" />;
    default: return <NotFound key="404" />;
  }
}

export default function App({ path }: { path?: string }) {
  useEffect(() => initSmoothScroll(), []);
  return (
    <RouterProvider initialPath={path}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <Cursor />
      <Routes />
      <Analytics />
    </RouterProvider>
  );
}
