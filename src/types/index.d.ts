// export as namespace Net;

declare interface IResponse<T> {
  code: number;
  data: T;
  msg: string;
}
