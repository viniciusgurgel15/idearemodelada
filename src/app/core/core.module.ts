import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioModule } from '../usuario/usuario.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AppRoutingModule } from './app-routing-module';
import { PacienteModule } from '../paciente/paciente.module';
import { MedicoModule } from '../medico/medico.module';
import { AgendamentoModule } from '../agendamento/agendamento.module';

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    UsuarioModule,
    PacienteModule,
    MedicoModule,
    AgendamentoModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent],
  providers: [Title]
})
export class CoreModule {}
