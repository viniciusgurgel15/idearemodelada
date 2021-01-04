import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoFormPesquisaComponent } from './agendamento-form-pesquisa/agendamento-form-pesquisa.component';
import { AgendamentoFormDadosComponent } from './agendamento-form-dados/agendamento-form-dados.component';

const routes: Routes = [
  { path: 'agendamentos', component: AgendamentoFormPesquisaComponent },
  { path: 'agendamentos/novo', component: AgendamentoFormDadosComponent },
  { path: 'agendamentos/:id', component: AgendamentoFormDadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule {}
