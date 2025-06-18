// paiement.model.ts
export interface Paiement {
  id?: number;
  detteId: number;
  montant: number;
  date: string;
}