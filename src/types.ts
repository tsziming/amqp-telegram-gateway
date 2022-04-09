export interface Response {
  status: 'error' | 'success';
  data?: unknown;
  err?: unknown;
}

export interface Request {
  name: string;
  arguments: unknown;
}
