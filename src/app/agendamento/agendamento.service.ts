import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface AgendamentoFiltros {
  idMedico: number;
  page: number;
  size: number;
}

export interface Agendamento {
  Id: number;
  Data: Date;
  MedicoId: number;
  PacienteId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.baseUrl}/api/agendamentos`;
  }
  async post(agendamento: Agendamento): Promise<any> {
    return await this.http
      .post(this.url, agendamento)
      .toPromise()
      .catch(response => this.reject(response));
  }

  async getAll(filtros: AgendamentoFiltros): Promise<any> {
    const params = new HttpParams()
      .set('idMedico', filtros.idMedico.toString())
      .set('page', filtros.page.toString())
      .set('size', filtros.size.toString());

    return this.http
      .get(this.url, { params })
      .toPromise()
      .catch(response => this.reject(response));
  }

  async get(id: number): Promise<any> {
    return await this.http
      .get(`${this.url}/${id}`)
      .toPromise()
      .catch(response => this.reject(response));
  }

  async delete(id: number): Promise<void> {
    await this.http
      .delete(`${this.url}/${id}`)
      .toPromise()
      .catch(response => this.reject(response));
  }

  async put(agendamento: Agendamento): Promise<any> {
    return await this.http
      .put(`${this.url}/${agendamento.Id}`, agendamento)
      .toPromise()
      .catch(response => this.reject(response));
  }

  reject(response: any) {
    return Promise.reject(
      JSON.parse(JSON.stringify(response)).error.Messages[0]
    );
  }
}
