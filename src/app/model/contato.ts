export class Contato {
    constructor(
        private _nome: string,
        private _telefone: string,
        private _dataNascimento: string, 
        private _genero: string
    ) {}

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
    
    public get dataNascimento(): string {
        return this._dataNascimento;
    }
    public set dataNascimento(value: string) {
        this._dataNascimento = value;
    }

    public get genero(): string {
        return this._genero;
    }
    public set genero(value: string) {
        this._genero = value;  
    }
}