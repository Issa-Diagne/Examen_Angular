// add-dette.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Dette } from '../../models/dette.model';
import { Client } from '../../models/client.model';
import { DetteService } from '../../services/dette.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-dette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-dette.component.html',
  styleUrls: ['./add-dette.component.css']
})
export class AddDetteComponent implements OnInit {
  detteForm!: FormGroup;
  client: Client | null = null;
  clientId!: number;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private detteService: DetteService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadClient();
  }

  initForm(): void {
    this.detteForm = this.formBuilder.group({
      montantDette: ['', [Validators.required, Validators.min(1)]],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
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

  get f() { return this.detteForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.detteForm.invalid) {
      return;
    }

    this.loading = true;

    const dette: Dette = {
      clientId: this.clientId,
      date: this.detteForm.value.date,
      montantDette: Number(this.detteForm.value.montantDette),
      montantPaye: 0,
      montantRestant: Number(this.detteForm.value.montantDette)
    };

    this.detteService.createDette(dette).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/clients', this.clientId]);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la dette:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clients', this.clientId]);
  }
}