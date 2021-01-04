import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { UsuarioFormPesquisaComponent } from './usuario-form-pesquisa/usuario-form-pesquisa.component';
import { UsuarioFormDadosComponent } from './usuario-form-dados/usuario-form-dados.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioFormPesquisaComponent, UsuarioFormDadosComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CurrencyMaskModule,
    UsuarioRoutingModule
  ],
  exports: [],
  providers: []
})
export class UsuarioModule {}
