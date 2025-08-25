export class Contato {
  private _id: number;
  private _nome: string;
  private _telefone: string;
  private _dataNascimento?: string;
  private _genero?: string;

  constructor(nome: string, telefone: string, dataNascimento?: string, genero?: string) {
      let chave = new Date();
      this._id = chave.getTime();
      this._nome = nome;
      this._telefone = telefone;
      this._dataNascimento = dataNascimento;
      this._genero = genero;
  }

  public get id():number{
      return this._id;
  }
  public get nome(): string {
      return this._nome;
  }
  public set nome(value: string) {
      this._nome = value;
  }

  public get telefone(): string {
      return this._telefone;
  }
  public set telefone(value: string) {
      this._telefone = value;
  }

 public get dataNascimento(): string | undefined {
      return this._dataNascimento;
  }

  public set dataNascimento(value: string | undefined) {
      this._dataNascimento = value;
  }

  public get genero(): string | undefined {
      return this._genero;
  }

  public set genero(value: string | undefined) {
      this._genero = value;
  }
}
  
  