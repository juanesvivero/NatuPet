import { useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/AppShell';
import { snackLines, getSnackById } from './data/mockData';
import { LandingPage } from './pages/LandingPage';
import { TraceabilityPage } from './pages/TraceabilityPage';
import { CalculatorPage } from './pages/CalculatorPage';

function parseRoute(hash) {
  const cleanHash = hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = cleanHash.split('?');
  const params = new URLSearchParams(queryString);

  if (path === '/' || path === '') {
    return {
      page: 'landing',
      snackId: snackLines[0].id
    };
  }

  if (path.startsWith('/calculadora')) {
    return {
      page: 'calculator',
      snackId: params.get('snack') || snackLines[0].id
    };
  }

  const lotMatch = path.match(/^\/lote\/(.+)$/);
  return {
    page: 'traceability',
    snackId: lotMatch?.[1] || snackLines[0].id
  };
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/';
    }

    const onHashChange = () => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setHash(window.location.hash);
        });
      } else {
        setHash(window.location.hash);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const route = useMemo(() => parseRoute(hash), [hash]);
  const snack = getSnackById(route.snackId);

  return (
    <AppShell currentPage={route.page}>
      {route.page === 'landing' ? (
        <LandingPage />
      ) : route.page === 'calculator' ? (
        <CalculatorPage snack={snack} showSnackSelect={true} />
      ) : (
        <TraceabilityPage snack={snack} />
      )}
    </AppShell>
  );
}



