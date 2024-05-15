export interface IToken {
  sign(data: any, privateKey: string, algorithm: string): Promise<string>;
}
