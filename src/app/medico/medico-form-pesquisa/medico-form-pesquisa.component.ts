import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-medico-form-pesquisa',
  templateUrl: './medico-form-pesquisa.component.html',
  styleUrls: ['./medico-form-pesquisa.component.css']
})
export class MedicoFormPesquisaComponent implements OnInit {
  modalRef: BsModalRef;
  nome: string;
  medicos = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.medicos.length;
  pages = [1];
  idMedico: number;
  closeResult: string;

  constructor(
    private medicoService: MedicoService,
    private toast: ToastService,
    private modalService: BsModalService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Médico');
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

    await this.medicoService
      .getAll(filtros)
      .then(response => {
        this.medicos = response.Content;
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

    await this.medicoService
      .delete(this.idMedico)
      .then(() => {
        this.getAll();
        this.toast.success('Médico excluído');
      })
      .catch(message => this.toast.error(message));
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.idMedico = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
