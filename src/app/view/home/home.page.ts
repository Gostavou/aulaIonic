import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline, trash } from 'ionicons/icons'
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';

addIcons({add:add, 'create-outline':createOutline})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router,
    private contatoService: ContatoService
  ) { 
    this.contatos = this.contatoService.contatos;
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"])
  }
  detalhar(contato: Contato){
  
  this.router.navigateByUrl('/detalhar', {state: {objeto:contato}})
}
}