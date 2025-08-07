import { Injectable } from '@angular/core';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos: Contato[] = [];

  public get contatos(): Contato[] {
    return this._contatos;
  }

  public create (contato: Contato):void{
    this._contatos.push(contato);
  }

  constructor() { }
}