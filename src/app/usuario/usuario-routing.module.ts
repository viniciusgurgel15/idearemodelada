import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioFormPesquisaComponent } from '../usuario/usuario-form-pesquisa/usuario-form-pesquisa.component';
import { UsuarioFormDadosComponent } from '../usuario/usuario-form-dados/usuario-form-dados.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuarioFormPesquisaComponent },
  { path: 'usuarios/novo', component: UsuarioFormDadosComponent },
  { path: 'usuarios/:id', component: UsuarioFormDadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}
