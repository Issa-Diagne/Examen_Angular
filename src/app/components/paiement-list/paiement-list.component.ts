// paiement-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dette } from '../../models/dette.model';
import { Paiement } from '../../models/paiement.model';
import { DetteService } from '../../services/dette.service';
import { PaiementService } from '../../services/paiement.service';

@Component({
  selector: 'app-paiement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.css']
})
export class PaiementListComponent implements OnInit {
  dette: Dette | null = null;
  paiements: Paiement[] = [];
  detteId!: number;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detteService: DetteService,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    this.detteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDette();
    this.loadPaiements();
  }

  loadDette(): void {
    this.detteService.getDette(this.detteId).subscribe({
      next: (data) => {
        this.dette = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la dette:', error);
      }
    });
  }

  loadPaiements(): void {
    this.paiementService.getPaiementsByDette(this.detteId).subscribe({
      next: (data) => {
        this.paiements = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des paiements:', error);
        this.loading = false;
      }
    });
  }

  getTotalPaiements(): number {
    return this.paiements.reduce((total, paiement) => total + paiement.montant, 0);
  }

  goToAddPaiement(): void {
    this.router.navigate(['/dettes', this.detteId, 'add-paiement']);
  }

  goBack(): void {
    // Retourner à la liste des dettes du client
    if (this.dette) {
      this.router.navigate(['/clients', this.dette.clientId, 'dettes']);
    }
  }

  deletePaiement(paiementId: number, montantPaiement: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      this.paiementService.deletePaiement(paiementId).subscribe({
        next: () => {
          // Mettre à jour la dette
          if (this.dette) {
            const nouveauMontantPaye = this.dette.montantPaye - montantPaiement;
            const nouveauMontantRestant = this.dette.montantDette - nouveauMontantPaye;
            
            const detteUpdated: Dette = {
              ...this.dette,
              montantPaye: nouveauMontantPaye,
              montantRestant: nouveauMontantRestant
            };

            this.detteService.updateDette(this.detteId, detteUpdated).subscribe({
              next: () => {
                this.loadDette();
                this.loadPaiements();
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour de la dette:', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du paiement:', error);
        }
      });
    }
  }
}