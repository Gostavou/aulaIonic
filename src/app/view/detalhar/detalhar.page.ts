import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule  } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';
import { AlertController  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalharPage implements OnInit {
  contato!: Contato;
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  editar: boolean = true;
  maxDate!: string;

  constructor(private router: Router, private alertController: AlertController, private contatoService: ContatoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if(nav?.extras?.state?.['objeto']) {
      this.contato = nav?.extras?.state?.['objeto'];
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.dataNascimento = this.contato.dataNascimento || '';
      this.genero = this.contato.genero || '';
    }
  }

  salvar() {
    this.dataNascimento = this.dataNascimento.split('T')[0];
    
    const camposObrigatorios = [
      { nome: 'nome', valor: this.nome, label: 'Nome' },
      { nome: 'telefone', valor: this.telefone, label: 'Telefone' }
    ];

    const erroValidacao = this.validarCamposObrigatorios(camposObrigatorios);

    if (erroValidacao) {
      this.mostrarAlerta('Erro ao Editar', erroValidacao);
      return;
    }

    if(this.contatoService.editar(this.contato, this.nome, this.telefone, this.genero, this.dataNascimento)){
      this.mostrarAlerta('Atualizar', 'Contato atualizado com sucesso');
      this.router.navigate(['/home']);
    }else{
      this.mostrarAlerta('Atualizar', 'Erro ao atualizar contato');
    }
  }

  excluir() {
    this.mostrarAlertaConfirmacao(
      "Excluir Contato",
      "Você realmente deseja excluir o contato?",
      () => this.excluirContato()  
    );
  }

  excluirContato() {
    if(this.contatoService.delete(this.contato)){
      this.mostrarAlerta("Excluir", "Exclusão efetuada com sucesso");
      this.router.navigate(['/home']);
    }else{
      this.mostrarAlerta("Erro ao Excluir", "Contato não Encontrado");
    }
  }

  alterarEdicao() {
    this.editar = !this.editar;
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
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async mostrarAlertaConfirmacao(subHeader: string, message: string, acao: () => void) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
        { text: 'Confirmar', handler: () => { acao(); } }
      ],
    });
    await alert.present();
  }
}