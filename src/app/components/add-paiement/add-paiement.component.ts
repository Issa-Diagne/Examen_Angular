// add-paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Dette } from '../../models/dette.model';
import { Paiement } from '../../models/paiement.model';
import { DetteService } from '../../services/dette.service';
import { PaiementService } from '../../services/paiement.service';

@Component({
  selector: 'app-add-paiement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  paiementForm!: FormGroup;
  dette: Dette | null = null;
  detteId!: number;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private detteService: DetteService,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    this.detteId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadDette();
  }

  initForm(): void {
    this.paiementForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(1)]],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  loadDette(): void {
    this.detteService.getDette(this.detteId).subscribe({
      next: (data) => {
        this.dette = data;
        // Mettre à jour la validation du montant maximum
        this.paiementForm.patchValue({
          montant: ['', [Validators.required, Validators.min(1), Validators.max(data.montantRestant)]]
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la dette:', error);
      }
    });
  }

  get f() { return this.paiementForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.paiementForm.invalid) {
      return;
    }

    const montantPaiement = Number(this.paiementForm.value.montant);
    
    // Vérifier que le montant ne dépasse pas le montant restant
    if (this.dette && montantPaiement > this.dette.montantRestant) {
      alert('Le montant du paiement ne peut pas dépasser le montant restant de la dette.');
      return;
    }

    this.loading = true;

    const paiement: Paiement = {
      detteId: this.detteId,
      montant: montantPaiement,
      date: this.paiementForm.value.date
    };

    this.paiementService.createPaiement(paiement).subscribe({
      next: (response) => {
        // Mettre à jour la dette
        if (this.dette) {
          const nouveauMontantPaye = this.dette.montantPaye + montantPaiement;
          const nouveauMontantRestant = this.dette.montantDette - nouveauMontantPaye;
          
          const detteUpdated: Dette = {
            ...this.dette,
            montantPaye: nouveauMontantPaye,
            montantRestant: nouveauMontantRestant
          };

          this.detteService.updateDette(this.detteId, detteUpdated).subscribe({
            next: () => {
              this.loading = false;
              this.router.navigate(['/dettes', this.detteId, 'paiements']);
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour de la dette:', error);
              this.loading = false;
            }
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du paiement:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dettes', this.detteId, 'paiements']);
  }
}
