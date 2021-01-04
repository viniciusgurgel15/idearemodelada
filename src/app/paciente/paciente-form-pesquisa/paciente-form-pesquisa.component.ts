import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastService } from 'src/app/shared/toast.service';
import { Title } from '@angular/platform-browser';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-form-pesquisa',
  templateUrl: './paciente-form-pesquisa.component.html',
  styleUrls: ['./paciente-form-pesquisa.component.css']
})
export class PacienteFormPesquisaComponent implements OnInit {
  modalRef: BsModalRef;
  nome: string;
  pacientes = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.pacientes.length;
  pages = [1];
  idPaciente: number;
  closeResult: string;

  constructor(
    private pacienteService: PacienteService,
    private toast: ToastService,
    private modalService: BsModalService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Paciente');
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

    await this.pacienteService
      .getAll(filtros)
      .then(response => {
        this.pacientes = response.Content;
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

    await this.pacienteService
      .delete(this.idPaciente)
      .then(() => {
        this.getAll();
        this.toast.success('Paciente excluído');
      })
      .catch(message => this.toast.error(message));
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.idPaciente = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
