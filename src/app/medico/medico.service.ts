import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MedicoFiltros {
  nome: string;
  page: number;
  size: number;
}

export interface Medico {
  Id: number;
  Nome: string;
  Cpf: string;
  Rg: string;
  Email: string;
  Endereco: Endereco;
  Telefone: Telefone;
}

export interface Endereco {
  Cep: string;
  Logradouro: string;
  Numero: number;
  Cidade: string;
  Estado: string;
}

export interface Telefone {
  Ddd: number;
  Numero: number;
  Tipo: TelefoneTipo;
}

export interface TelefoneTipo {
  Id: number;
  Nome: number;
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.baseUrl}/api/medicos`;
  }

  async post(medico: Medico): Promise<any> {
    return await this.http
      .post(this.url, medico)
      .toPromise()
      .catch(response => this.reject(response));
  }

  async getAll(filtros: MedicoFiltros = null): Promise<any> {
    let params: HttpParams;

    if (filtros) {
      params = new HttpParams()
        .set('nome', filtros.nome || '')
        .set('page', filtros.page.toString())
        .set('size', filtros.size.toString());
    }

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

  async put(medico: Medico): Promise<any> {
    return await this.http
      .put(`${this.url}/${medico.Id}`, medico)
      .toPromise()
      .catch(response => this.reject(response));
  }

  reject(response: any) {
    return Promise.reject(
      JSON.parse(JSON.stringify(response)).error.Messages[0]
    );
  }
}
