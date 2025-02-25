import { StatusCodes, ApiPaths } from '../types/terminal';

export const statusCodes: StatusCodes = {
  GET: [200, 304, 404, 403, 500],
  POST: [201, 400, 401, 403, 500],
  PUT: [200, 204, 400, 401, 403],
  DELETE: [200, 204, 400, 403, 404],
  PATCH: [200, 204, 400, 404, 500],
};

export const apiPaths: ApiPaths = {
  base: ['/api', '/v1', '/v2', '/api/v1', '/api/v2'],
  resources: [
    'user',
    'account',
    'data',
    'posts',
    'comments',
    'auth',
    'settings',
    'products',
    'orders',
  ],
  subResources: [
    'profile',
    'preferences',
    'settings',
    'history',
    'statistics',
    'details',
    'metadata',
  ],
};

export const systemLogs: string[] = [
  'Compiled successfully in {time}ms ({modules} modules)',
  'webpack {version} compiled successfully in {time}ms',
  'Hot Module Replacement enabled',
  '[HMR] Waiting for update signal from WDS...',
  'ℹ Compiling...',
  '✓ Compiled successfully',
  'Warning: Deprecated API call detected in module {module}',
  'Error: Connection timeout... Retrying ({attempt}/3)',
  '[webpack-dev-server] Project is running at: http://localhost:{port}/',
  'Node.js v{version} started',
  'MongoDB connected successfully',
  'Redis cache initialized',
  'Starting development server...',
  'Watching for file changes...',
];

export const initialMessages: string[] = [
  'Initializing system components...',
  'Checking network connectivity...',
  'Establishing secure connection...',
  'Loading configuration files...',
  'Starting background services...',
  'Initializing cache layer...',
  'Running system checks...',
  'Validating environment variables...',
  'Starting development server...',
  'Process completed successfully!',
  'IMPORTANT: Please keep this browser tab in focus for optimal performance.',
];
