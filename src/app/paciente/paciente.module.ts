import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteFormPesquisaComponent } from './paciente-form-pesquisa/paciente-form-pesquisa.component';
import { PacienteFormDadosComponent } from './paciente-form-dados/paciente-form-dados.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PacienteRoutingModule } from './paciente-routing.module';

@NgModule({
  declarations: [PacienteFormPesquisaComponent, PacienteFormDadosComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CurrencyMaskModule,
    PacienteRoutingModule
  ]
})
export class PacienteModule {}
