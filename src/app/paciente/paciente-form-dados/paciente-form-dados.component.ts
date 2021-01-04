import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';
import { PacienteService } from '../paciente.service';

class Paciente {
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
  selector: 'app-paciente-form-dados',
  templateUrl: './paciente-form-dados.component.html',
  styleUrls: ['./paciente-form-dados.component.css']
})
export class PacienteFormDadosComponent implements OnInit {
  paciente = new Paciente();

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private title: Title
  ) {
    this.paciente.Endereco = new Endereco();
    this.paciente.Telefone = new Telefone();
    this.paciente.Telefone.Tipo = new TelefoneTipo();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.title.setTitle('Edição - Paciente');
      this.get(id);
    } else {
      this.title.setTitle('Cadastro - Paciente');
    }
  }

  async get(id: number) {
    this.pacienteService
      .get(id)
      .then(response => (this.paciente = response.Content))
      .catch(error => this.toast.error(error));
  }

  private async put() {
    await this.pacienteService
      .put(this.paciente)
      .then(() => this.toast.success('Paciente atualizado'))
      .catch(error => this.toast.error(error));
  }

  private async post() {
    await this.pacienteService
      .post(this.paciente)
      .then(response => {
        this.toast.success('Paciente cadastrado');
        this.router.navigate(['/pacientes', response.Content.Id]);
      })
      .catch(error => this.toast.error(error));
  }

  async save() {
    if (this.paciente.Id) {
      this.put();
      return;
    }
    this.post();
  }
}
