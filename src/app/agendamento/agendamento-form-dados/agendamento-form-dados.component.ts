import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/paciente/paciente.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AgendamentoService } from '../agendamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MedicoService } from 'src/app/medico/medico.service';
import * as moment from 'moment';

class Agendamento {
  Id: number;
  Data: Date;
  MedicoId: number;
  PacienteId: number;
}

@Component({
  selector: 'app-agendamento-form-dados',
  templateUrl: './agendamento-form-dados.component.html',
  styleUrls: ['./agendamento-form-dados.component.css']
})
export class AgendamentoFormDadosComponent implements OnInit {
  pacientes = [];
  medicos = [];
  agendamento = new Agendamento();

  constructor(
    private pacienteService: PacienteService,
    private agendamentoService: AgendamentoService,
    private medicoService: MedicoService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.getPacientes();
    this.getMedicos();

    const id = this.route.snapshot.params.id;
    if (id) {
      this.title.setTitle('Edição - Agendamento');
      this.get(id);
    } else {
      this.title.setTitle('Cadastro - Agendamento');
    }
  }

  async getPacientes() {
    await this.pacienteService
      .getAll()
      .then(response => {
        this.pacientes = response.Content;
      })
      .catch(message => this.toast.error(message));
  }

  async getMedicos() {
    await this.medicoService
      .getAll()
      .then(response => {
        this.medicos = response.Content;
      })
      .catch(message => this.toast.error(message));
  }

  async get(id: number) {
    this.agendamentoService
      .get(id)
      .then(response => {
        this.agendamento = response.Content;
        console.log('response');
        console.log(response);
        this.agendamento.MedicoId = response.Content.Medico.Id;
        this.agendamento.PacienteId = response.Content.Paciente.Id;
      })
      .catch(error => this.toast.error(error));
  }

  private async put() {
    await this.agendamentoService
      .put(this.agendamento)
      .then(() => this.toast.success('Agendamento atualizado'))
      .catch(error => this.toast.error(error));
  }

  private async post() {
    await this.agendamentoService
      .post(this.agendamento)
      .then(response => {
        this.toast.success('Agendamento cadastrado');
        this.router.navigate(['/agendamentos', response.Content.Id]);
      })
      .catch(error => this.toast.error(error));
  }

  async save(form: any) {
    console.log(form);
    if (!this.agendamento.PacienteId) {
      this.toast.error('Favor informar o paciente');
      return;
    }
    if (!this.agendamento.MedicoId) {
      this.toast.error('Favor informar o médico');
      return;
    }

    this.agendamento.Data = moment(form.value.data, 'DD/MM/YYYY').toDate();
    if (this.agendamento.Id) {
      this.put();
      return;
    }
    this.post();
  }
}
