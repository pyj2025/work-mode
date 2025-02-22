'use client';

import { useEffect, useState } from 'react';
import Login from '@/components/login';
import Main from '@/components/main';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login setAuthenticated={setIsAuthenticated} />;
  }

  return <Main />;
}
