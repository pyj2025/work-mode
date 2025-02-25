import { useEffect, useState, useRef } from 'react';
import {
  statusCodes,
  apiPaths,
  systemLogs,
  initialMessages,
} from '@/constants/terminal';
import { HttpMethod } from '@/types/terminal';

const generateRandomApiPath = (): string => {
  const base = apiPaths.base[Math.floor(Math.random() * apiPaths.base.length)];
  const resource =
    apiPaths.resources[Math.floor(Math.random() * apiPaths.resources.length)];
  const includeSubResource = Math.random() > 0.5;
  const subResource = includeSubResource
    ? '/' +
      apiPaths.subResources[
        Math.floor(Math.random() * apiPaths.subResources.length)
      ]
    : '';
  const includeId = Math.random() > 0.7;
  const id = includeId ? '/' + Math.floor(Math.random() * 1000) : '';

  return `${base}/${resource}${subResource}${id}`;
};

const replacePlaceholders = (log: string): string => {
  return log
    .replace(/{time}/g, Math.floor(Math.random() * 1000).toString())
    .replace(/{modules}/g, Math.floor(Math.random() * 500).toString())
    .replace(
      /{version}/g,
      `${Math.floor(Math.random() * 3)}.${Math.floor(
        Math.random() * 10
      )}.${Math.floor(Math.random() * 10)}`
    )
    .replace(
      /{module}/g,
      apiPaths.resources[Math.floor(Math.random() * apiPaths.resources.length)]
    )
    .replace(/{attempt}/g, (Math.floor(Math.random() * 3) + 1).toString())
    .replace(/{port}/g, (Math.floor(Math.random() * 1000) + 3000).toString());
};

const generateRandomLog = (): string => {
  if (Math.random() > 0.7) {
    const log = systemLogs[Math.floor(Math.random() * systemLogs.length)];
    return replacePlaceholders(log);
  } else {
    const methods = Object.keys(statusCodes) as HttpMethod[];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const possibleCodes = statusCodes[method];
    const statusCode =
      possibleCodes[Math.floor(Math.random() * possibleCodes.length)];
    const path = generateRandomApiPath();
    const time = Math.floor(Math.random() * 1000);
    return `${method} ${statusCode} ${path} ${time}ms`;
  }
};

const Main = () => {
  const [terminalText, setTerminalText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

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
        const newLog = generateRandomLog();
        setTerminalText((prev) => {
          const lines = prev.split('\n');

          if (lines.length > 100) {
            return lines.slice(-100).join('\n') + '\n' + newLog;
          }

          return prev + '\n' + newLog;
        });
      }, Math.random() * 2000 + 500);
      return () => clearInterval(loopInterval);
    }
  }, [index, charIndex, isLooping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 1000);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalText]);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        console.error('Failed to acquire wake lock:', err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    requestWakeLock();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      wakeLockRef.current?.release().catch(console.error);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#1a1a1a] p-5 font-mono text-[#00FF00] overflow-hidden">
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto whitespace-pre-wrap break-all"
      >
        <pre className="m-0">
          {terminalText}
          {cursorVisible ? '▊' : ' '}
        </pre>
      </div>
    </div>
  );
};

export default Main;
