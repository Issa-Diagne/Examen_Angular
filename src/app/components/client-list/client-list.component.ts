// client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  loading = true;
  showAddForm = false;
  newClient: Client = {
    nom: '',
    telephone: '',
    adresse: ''
  };

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
        this.loading = false;
      }
    });
  }

  viewClientDetails(clientId: number): void {
    this.router.navigate(['/clients', clientId]);
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addClient(): void {
    if (this.newClient.nom && this.newClient.telephone && this.newClient.adresse) {
      this.clientService.createClient(this.newClient).subscribe({
        next: (client) => {
          this.clients.push(client);
          this.resetForm();
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du client:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.newClient = {
      nom: '',
      telephone: '',
      adresse: ''
    };
  }
}