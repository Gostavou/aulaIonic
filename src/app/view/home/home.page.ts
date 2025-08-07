import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { DatePipe, CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [DatePipe]
})
export class HomePage {
  contatos: any[];

  constructor(
    private router: Router,
    private contatoService: ContatoService,
    private datePipe: DatePipe
  ) {
    this.contatos = this.contatoService.contatos;
  }

  formatarData(data: string): string {
    if (!data) return 'Não informada';
    return this.datePipe.transform(data, 'dd/MM/yyyy') || data;
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }
}
