import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';
import { MedicoService } from '../medico.service';

class Medico {
  Id: number;
  Nome: string;
  Cpf: string;
  Rg: string;
  Email: string;
  Endereco: Endereco;
  Telefone: Telefone;
}

class Endereco {
  Cep: string;
  Logradouro: string;
  Numero: number;
  Cidade: string;
  Estado: string;
}

class Telefone {
  Ddd: number;
  Numero: number;
  Tipo: TelefoneTipo;
}

class TelefoneTipo {
  Id: number;
  Nome: number;
}

@Component({
  selector: 'app-medico-form-dados',
  templateUrl: './medico-form-dados.component.html',
  styleUrls: ['./medico-form-dados.component.css']
})
export class MedicoFormDadosComponent implements OnInit {
  medico = new Medico();

  constructor(
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private title: Title
  ) {
    this.medico.Endereco = new Endereco();
    this.medico.Telefone = new Telefone();
    this.medico.Telefone.Tipo = new TelefoneTipo();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.title.setTitle('Edição - Médico');
      this.get(id);
    } else {
      this.title.setTitle('Cadastro - Médico');
    }
  }

  async get(id: number) {
    this.medicoService
      .get(id)
      .then(response => (this.medico = response.Content))
      .catch(error => this.toast.error(error));
  }

  private async put() {
    await this.medicoService
      .put(this.medico)
      .then(() => this.toast.success('Médico atualizado'))
      .catch(error => this.toast.error(error));
  }

  private async post() {
    await this.medicoService
      .post(this.medico)
      .then(response => {
        this.toast.success('Médico cadastrado');
        this.router.navigate(['/medicos', response.Content.Id]);
      })
      .catch(error => this.toast.error(error));
  }

  async save() {
    if (this.medico.Id) {
      this.put();
      return;
    }
    this.post();
  }
}
