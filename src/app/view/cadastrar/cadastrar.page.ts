import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';   
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';
import { addIcons } from 'ionicons'; 
import { personOutline, callOutline } from 'ionicons/icons'; 

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  maxDate!: string;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private alertController: AlertController
  ) { 
    const hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0];
    
    addIcons({
      'person-outline': personOutline,
      'call-outline': callOutline
    });
  }

  ngOnInit() {}

  cadastrar() {
    const camposObrigatorios = [
      { nome: 'nome', valor: this.nome, label: 'Nome' },
      { nome: 'telefone', valor: this.telefone, label: 'Telefone' }
    ];

    const erroValidacao = this.validarCamposObrigatorios(camposObrigatorios);

    if (erroValidacao) {
      this.mostrarAlerta('Erro ao Cadastrar', erroValidacao);
      return;
    }

    const contato: Contato = new Contato(
      this.nome,
      this.telefone,
      this.genero,
      this.dataNascimento || ''
    );

    this.contatoService.create(contato);
    this.mostrarAlerta('Sucesso', 'Contato Cadastrado');
    this.router.navigate(['/home']);
  }

  private validarCamposObrigatorios(campos: Array<{nome: string, valor: any, label: string}>): string | null {
    for (const campo of campos) {
      if (!this.campoValido(campo.valor)) {
        return `Campo obrigatório: ${campo.label}`;
      }
    }
    return null;
  }

  private campoValido(campo: any): boolean {
    return campo != null && campo.toString().trim().length > 0;
  }

  private async mostrarAlerta(subheader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subheader,
      message: message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}