export interface ICrypt {
  compare(plainTextPassword: string, hashedPassword: string): Promise<boolean | Error>;
  hash(PlainTextpassword: string, saltRounds: number): Promise<string>;
}
