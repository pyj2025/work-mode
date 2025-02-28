import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginProps {
  setAuthenticated: (value: boolean) => void;
}

const Login = ({ setAuthenticated }: LoginProps) => {
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      setAuthenticated(true);
    } else {
      alert(
        'Incorrect password! If you forgot the password, please contact joon 😊'
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 relative">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              alt="WorkMode Logo"
              width={32}
              height={32}
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl text-center font-bold text-white">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12"
            />
          </div>
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Login
          </Button>
        </CardContent>
        <div className="text-center text-gray-500 text-xs pb-4">
          Designed & Developed by Joon
        </div>
      </Card>
    </div>
  );
};

export default Login;
