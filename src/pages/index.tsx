'use client';

import Login from '@/components/login';
import { useEffect, useState } from 'react';

export default function Home() {
  const messages = [
    'Connecting to server...',
    'Checking system status...',
    'Running background process...',
    'Preventing sleep mode...',
    'Loading AI model...',
    'Sending request...',
    'Process completed!',
  ];

  const [terminalText, setTerminalText] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  useEffect(() => {
    if (index < messages.length) {
      let i = 0;
      const interval = setInterval(() => {
        setTerminalText((prev) => prev + messages[index][i]);
        i++;
        if (i >= messages[index].length) {
          clearInterval(interval);
          setTimeout(() => {
            setTerminalText((prev) => prev + '\n');
            setIndex((prev) => prev + 1);
          }, 500);
        }
      }, 50);
    }
  }, [index]);

  useEffect(() => {
    const preventSleep = () => {
      return setInterval(() => {
        const event = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        document.dispatchEvent(event);
        console.log('Preventing sleep...');
      }, 50000);
    };

    const intervalId = preventSleep();

    return () => clearInterval(intervalId);
  }, []);

  if (!isAuthenticated) {
    return <Login setAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'limegreen',
        fontFamily: 'monospace',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <pre>{terminalText}</pre>
    </div>
  );
}
