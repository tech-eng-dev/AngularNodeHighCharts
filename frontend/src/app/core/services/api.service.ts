import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Repositories } from '../models/repositories.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  fetchData(language: string, count: number): Observable<Repositories> {
    return this.http.get<Repositories>(`${this.API_URL}/repositories?q=language:${language}&sort=stars&order=desc&page=1&per_page=${count}`);
  }

}
