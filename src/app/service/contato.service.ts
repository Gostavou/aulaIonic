import { Injectable } from '@angular/core';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos: Contato[] = [];

  constructor(){
    let contato: Contato = new Contato("teste", "123");
    contato.genero = "masculino"
    contato.dataNascimento = "2022-08-10"
    this.create(contato)
  }

  public get contatos(): Contato[] {
    return this._contatos;
  }

  public create (contato: Contato):boolean{
    this._contatos.push(contato);
    return true;
  }
  public editar(contato : Contato, nome : string, telefone : string,
        genero : string, data_nascimento : string) : boolean{
        for(let i = 0; i < this._contatos.length; i++){
        if((this._contatos[i].id) == (contato.id)){
        this._contatos[i].nome = nome;
        this._contatos[i].telefone = telefone;
        this._contatos[i].genero = genero;
        this._contatos[i].dataNascimento = data_nascimento;
 return true;
 }
 }
 return false;
 }
  public delete(contato: Contato):boolean{
    for(let i = 0; i < this.contatos.length; i++){
      if(contato.id == this.contatos [i].id){
        this._contatos.splice(i,1);
        return true
  }}
  return false
}
}