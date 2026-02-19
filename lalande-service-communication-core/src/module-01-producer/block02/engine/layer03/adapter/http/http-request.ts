/*http-request.ts*/

export class HttpRequest<T> {
  constructor(
    public readonly data: T,
    public readonly metadata?: {
      requestId?: string;
      source?: string;
      version?: string;
    },
  ) {}
}
