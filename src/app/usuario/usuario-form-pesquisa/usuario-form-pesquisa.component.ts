import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UsuarioService } from '../usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-form-pesquisa',
  templateUrl: './usuario-form-pesquisa.component.html',
  styleUrls: ['./usuario-form-pesquisa.component.css']
})
export class UsuarioFormPesquisaComponent implements OnInit {
  modalRef: BsModalRef;

  nome: string;
  usuarios = [];

  page = 1;
  pageSize = 4;
  collectionSize = this.usuarios.length;
  pages = [1];
  idUsuario: number;

  closeResult: string;

  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastService,
    private modalService: BsModalService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Usuário');
    this.getAll();
  }

  async getAll() {
    if (this.page !== 1 && this.page > this.pages.length) {
      this.page = this.pages.length;
      return;
    }

    if (this.page < 1) {
      this.page = 1;
      return;
    }

    const filtros = {
      nome: this.nome,
      page: this.page,
      size: this.pageSize
    };

    await this.usuarioService
      .getAll(filtros)
      .then(response => {
        this.usuarios = response.Content;
        this.collectionSize = response.TotalLength;

        this.pages = [];
        const totalPages = Math.ceil(this.collectionSize / this.pageSize);

        for (let i = 0; i < totalPages; i++) {
          this.pages.push(i + 1);
        }
      })
      .catch(message => this.toast.error(message));
  }

  async delete() {
    this.modalRef.hide();

    await this.usuarioService
      .delete(this.idUsuario)
      .then(() => {
        this.getAll();
        this.toast.success('Usuário excluído');
      })
      .catch(message => this.toast.error(message));
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.idUsuario = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
