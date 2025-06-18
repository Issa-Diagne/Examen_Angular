// dette-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dette } from '../../models/dette.model';
import { Client } from '../../models/client.model';
import { DetteService } from '../../services/dette.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dette-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dette-list.component.html',
  styleUrls: ['./dette-list.component.css']
})
export class DetteListComponent implements OnInit {
  dettes: Dette[] = [];
  client: Client | null = null;
  clientId!: number;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detteService: DetteService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClient();
    this.loadDettes();
  }

  loadClient(): void {
    this.clientService.getClient(this.clientId).subscribe({
      next: (data) => {
        this.client = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du client:', error);
      }
    });
  }

  loadDettes(): void {
    this.detteService.getDettesByClient(this.clientId).subscribe({
      next: (data) => {
        this.dettes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dettes:', error);
        this.loading = false;
      }
    });
  }

  getTotalDettes(): number {
    return this.dettes.reduce((total, dette) => total + dette.montantDette, 0);
  }

  getTotalPaye(): number {
    return this.dettes.reduce((total, dette) => total + dette.montantPaye, 0);
  }

  getTotalRestant(): number {
    return this.dettes.reduce((total, dette) => total + dette.montantRestant, 0);
  }

  getDetteStatus(dette: Dette): string {
    if (dette.montantRestant === 0) return 'Soldée';
    if (dette.montantPaye > 0) return 'En cours';
    return 'Non payée';
  }

  getStatusClass(dette: Dette): string {
    if (dette.montantRestant === 0) return 'bg-green-100 text-green-800';
    if (dette.montantPaye > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }

  viewPaiements(detteId: number): void {
    this.router.navigate(['/dettes', detteId, 'paiements']);
  }

  addPaiement(detteId: number): void {
    this.router.navigate(['/dettes', detteId, 'add-paiement']);
  }

  goBack(): void {
    this.router.navigate(['/clients', this.clientId]);
  }

  goToAddDette(): void {
    this.router.navigate(['/clients', this.clientId, 'add-dette']);
  }
}