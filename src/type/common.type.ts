export interface CountType {
  count: number;
}

export interface ResponseType<T> {
  data: T;
  message: string;
  status: number;
}
