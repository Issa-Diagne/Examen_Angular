// paiement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:3000/paiements';

  constructor(private http: HttpClient) { }

  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  getPaiementsByDette(detteId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}?detteId=${detteId}`);
  }

  getPaiement(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`);
  }

  createPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }

  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${id}`, paiement);
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

