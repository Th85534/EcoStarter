import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

interface LoadingRouteProps {
  children: React.ReactNode;
}

export default function LoadingRoute({ children }: LoadingRouteProps) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}