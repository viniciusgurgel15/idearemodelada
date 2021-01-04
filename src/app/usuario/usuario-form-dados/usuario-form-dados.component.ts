import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';

class Usuario {
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
  selector: 'app-usuario-form-dados',
  templateUrl: './usuario-form-dados.component.html',
  styleUrls: ['./usuario-form-dados.component.css']
})
export class UsuarioFormDadosComponent implements OnInit {
  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private title: Title
  ) {
    this.usuario.Endereco = new Endereco();
    this.usuario.Telefone = new Telefone();
    this.usuario.Telefone.Tipo = new TelefoneTipo();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.title.setTitle('Edição - Usuário');
      this.get(id);
    } else {
      this.title.setTitle('Cadastro - Usuário');
    }
  }

  async get(id: number) {
    this.usuarioService
      .get(id)
      .then(response => (this.usuario = response.Content))
      .catch(error => this.toast.error(error));
  }

  private async put() {
    await this.usuarioService
      .put(this.usuario)
      .then(() => this.toast.success('Usuário atualizado'))
      .catch(error => this.toast.error(error));
  }

  private async post() {
    await this.usuarioService
      .post(this.usuario)
      .then(response => {
        this.toast.success('Usuário cadastrado');
        this.router.navigate(['/usuarios', response.Content.Id]);
      })
      .catch(error => this.toast.error(error));
  }

  async save() {
    if (this.usuario.Id) {
      this.put();
      return;
    }
    this.post();
  }
}
