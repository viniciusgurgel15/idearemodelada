import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoFormPesquisaComponent } from './medico-form-pesquisa/medico-form-pesquisa.component';
import { MedicoFormDadosComponent } from './medico-form-dados/medico-form-dados.component';

const routes: Routes = [
  { path: 'medicos', component: MedicoFormPesquisaComponent },
  { path: 'medicos/novo', component: MedicoFormDadosComponent },
  { path: 'medicos/:id', component: MedicoFormDadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule {}
