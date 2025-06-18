import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dette } from '../models/dette.model';

@Injectable({
  providedIn: 'root'
})
export class DetteService {
  private apiUrl = 'http://localhost:3000/dettes';

  constructor(private http: HttpClient) { }

  getDettes(): Observable<Dette[]> {
    return this.http.get<Dette[]>(this.apiUrl);
  }

  getDettesByClient(clientId: number): Observable<Dette[]> {
    return this.http.get<Dette[]>(`${this.apiUrl}?clientId=${clientId}`);
  }

  getDette(id: number): Observable<Dette> {
    return this.http.get<Dette>(`${this.apiUrl}/${id}`);
  }

  createDette(dette: Dette): Observable<Dette> {
    return this.http.post<Dette>(this.apiUrl, dette);
  }

  updateDette(id: number, dette: Dette): Observable<Dette> {
    return this.http.put<Dette>(`${this.apiUrl}/${id}`, dette);
  }

  deleteDette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
