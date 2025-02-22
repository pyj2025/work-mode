import { useEffect, useState } from 'react';

const initialMessages = [
  'Connecting to server...',
  'Checking system status...',
  'Running background process...',
  'Preventing sleep mode...',
  'Loading AI model...',
  'Sending request...',
  'Process completed!',
];

const randomLogs = [
  'GET 200 /api/data',
  'POST 201 /auth/login',
  'PUT 204 /user/settings',
  'DELETE 200 /user/account',
  'Compiled in 81ms (301 modules)',
  'Hot reload complete in 32ms',
  'Warning: Deprecated API used',
  'Error: Connection timeout... Retrying',
];

const getRandomLog = () => {
  return randomLogs[Math.floor(Math.random() * randomLogs.length)];
};

const Main = () => {
  const [terminalText, setTerminalText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    if (!isLooping && index < initialMessages.length) {
      if (charIndex < initialMessages[index].length) {
        const timeout = setTimeout(() => {
          setTerminalText((prev) => prev + initialMessages[index][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const lineBreakTimeout = setTimeout(() => {
          setTerminalText((prev) => prev + '\n');
          setIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(lineBreakTimeout);
      }
    } else {
      setIsLooping(true);
      const loopInterval = setInterval(() => {
        setTerminalText((prev) => prev + getRandomLog() + '\n');
      }, Math.random() * 5000 + 1000);
      return () => clearInterval(loopInterval);
    }
  }, [index, charIndex, isLooping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

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
      <pre>
        {terminalText}
        {cursorVisible ? '_' : ' '}
      </pre>
    </div>
  );
};

export default Main;
