export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type StatusCodes = {
  [key in HttpMethod]: number[];
};

export interface ApiPaths {
  base: string[];
  resources: string[];
  subResources: string[];
}
