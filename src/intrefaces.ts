export type TTarget = '_self' | '_blank' | '_parent' | '_top';

export interface ITextExists {
  [key: string]: boolean;
  inner: boolean;
  arg: boolean;
}

export interface IUserOptions {
  urlRegEx?: RegExp;
  target?: TTarget;
  disableWarnings?: boolean;
};

export interface IOptions {
  urlRegEx: RegExp;
  target: TTarget;
  disableWarnings: boolean;
}
