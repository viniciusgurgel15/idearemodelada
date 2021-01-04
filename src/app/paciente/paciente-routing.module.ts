import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteFormPesquisaComponent } from './paciente-form-pesquisa/paciente-form-pesquisa.component';
import { PacienteFormDadosComponent } from './paciente-form-dados/paciente-form-dados.component';

const routes: Routes = [
  { path: 'pacientes', component: PacienteFormPesquisaComponent },
  { path: 'pacientes/novo', component: PacienteFormDadosComponent },
  { path: 'pacientes/:id', component: PacienteFormDadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule {}
