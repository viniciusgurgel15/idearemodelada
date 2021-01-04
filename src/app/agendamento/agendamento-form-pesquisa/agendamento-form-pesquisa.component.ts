import { Component, OnInit, TemplateRef } from '@angular/core';
import { MedicoService } from 'src/app/medico/medico.service';
import { ToastService } from 'src/app/shared/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-agendamento-form-pesquisa',
  templateUrl: './agendamento-form-pesquisa.component.html',
  styleUrls: ['./agendamento-form-pesquisa.component.css']
})
export class AgendamentoFormPesquisaComponent implements OnInit {
  medicos = [];
  agendamentos = [];
  idMedico: number;
  idPaciente: number;
  idAgendamento: number;

  exibeAgendamentos = false;

  modalRef: BsModalRef;
  page = 1;
  pageSize = 4;
  collectionSize = this.agendamentos.length;
  pages = [1];
  closeResult: string;

  constructor(
    private medicoService: MedicoService,
    private agendamentoService: AgendamentoService,
    private toast: ToastService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getMedicos();
  }

  async getMedicos() {
    await this.medicoService
      .getAll()
      .then(response => {
        this.medicos = response.Content;
      })
      .catch(message => this.toast.error(message));
  }

  async getAll() {
    if (!this.idMedico) {
      this.toast.error('Favor selecionar o médico');
      return;
    }

    if (this.page !== 1 && this.page > this.pages.length) {
      this.page = this.pages.length;
      return;
    }

    if (this.page < 1) {
      this.page = 1;
      return;
    }

    const filtros = {
      idMedico: this.idMedico,
      page: this.page,
      size: this.pageSize
    };

    await this.agendamentoService
      .getAll(filtros)
      .then(response => {
        this.agendamentos = response.Content;
        this.collectionSize = response.TotalLength;
        this.exibeAgendamentos = true;
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

    await this.agendamentoService
      .delete(this.idAgendamento)
      .then(() => {
        this.getAll();
        this.toast.success('Agendamento excluído');
      })
      .catch(message => this.toast.error(message));
  }

  openConfirmDelete(template: TemplateRef<any>, id: number) {
    this.idAgendamento = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
