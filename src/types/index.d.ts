// export as namespace Net;
import * as Prism from 'prismjs';

declare global {
  interface Window {
    Prism: typeof Prism;
  }

  interface IResponse<T> {
    code: number;
    data: T;
    msg: string;
  }
}
