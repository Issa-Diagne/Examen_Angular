// client-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { Dette } from '../../models/dette.model';
import { ClientService } from '../../services/client.service';
import { DetteService } from '../../services/dette.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client | null = null;
  dettes: Dette[] = [];
  loading = true;
  clientId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private detteService: DetteService
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClientDetails();
    this.loadClientDettes();
  }

  loadClientDetails(): void {
    this.clientService.getClient(this.clientId).subscribe({
      next: (data) => {
        this.client = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du client:', error);
        this.loading = false;
      }
    });
  }

  loadClientDettes(): void {
    this.detteService.getDettesByClient(this.clientId).subscribe({
      next: (data) => {
        this.dettes = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dettes:', error);
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

  goToAddDette(): void {
    this.router.navigate(['/clients', this.clientId, 'add-dette']);
  }

  goToDettes(): void {
    this.router.navigate(['/clients', this.clientId, 'dettes']);
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }
}