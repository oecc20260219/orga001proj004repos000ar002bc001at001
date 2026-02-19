/*http-response.ts*/

export class HttpResponse<T = any> {
  constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly message?: string,
  ) {}

  static ok<T>(data: T, message?: string): HttpResponse<T> {
    return new HttpResponse<T>(true, data, message);
  }

  static error(message: string, data?: any): HttpResponse<any> {
    return new HttpResponse<any>(false, data, message);
  }
}
