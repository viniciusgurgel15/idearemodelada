import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface UsuarioFiltros {
  nome: string;
  page: number;
  size: number;
}

export interface Usuario {
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
export class UsuarioService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.baseUrl}/api/usuarios`;
  }

  async post(usuario: Usuario): Promise<any> {
    return await this.http
      .post(this.url, usuario)
      .toPromise()
      .catch(response => this.reject(response));
  }

  async getAll(filtros: UsuarioFiltros): Promise<any> {
    // const headers = new Headers();

    const params = new HttpParams()
      .set('nome', filtros.nome || '')
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

  async put(usuario: Usuario): Promise<any> {
    return await this.http
      .put(`${this.url}/${usuario.Id}`, usuario)
      .toPromise()
      .catch(response => this.reject(response));
  }

  reject(response: any) {
    return Promise.reject(
      JSON.parse(JSON.stringify(response)).error.Messages[0]
    );
  }
}
