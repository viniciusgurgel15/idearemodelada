import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AgendamentoFormDadosComponent } from './agendamento-form-dados/agendamento-form-dados.component';
import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoFormPesquisaComponent } from './agendamento-form-pesquisa/agendamento-form-pesquisa.component';

@NgModule({
  declarations: [
    AgendamentoFormPesquisaComponent,
    AgendamentoFormDadosComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CurrencyMaskModule,
    AgendamentoRoutingModule
  ]
})
export class AgendamentoModule {}
