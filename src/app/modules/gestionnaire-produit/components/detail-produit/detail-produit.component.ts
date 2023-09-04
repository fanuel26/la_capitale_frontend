import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProduitService } from '../../common/produit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/common/sweet-alert.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss'],
})
export class DetailProduitComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id!: number;
  detailProduit: any;
  prixVente: any;
  lotProduit: any = [];
  stateProduit: any;
  nbrStock: number = 0;
  nomProduit!: string;

  toUpdate: boolean = false
  dataToUpdate: any;

  venteForm!: FormGroup;
  lotForm!: FormGroup;

  activeTigger!: any;

  dtOptions: DataTables.Settings = {
    paging: true,
    searching: true,
    responsive: true,
  };

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private produitService: ProduitService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.getDetailProduit(this.id);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    // this.getDetailProduit(this.id)

    this.venteForm = new FormGroup({
      prix_vente_unique: new FormControl('', Validators.required),
    });

    this.lotForm = new FormGroup({
      qte: new FormControl('', Validators.required),
      prix_achat: new FormControl('', Validators.required),
    });
  }

  onSubmitLot() {
    if (this.lotForm.get('qte')?.value > 0) {
      let body = {
        id_produit: this.id,
        qte: this.lotForm.get('qte')?.value,
        prix_achat: this.lotForm.get('prix_achat')?.value,
      };

      console.log(body);
      this.produitService.saveLotProduit(body).subscribe((value) => {
        if (value.status == true) {
          this.getDetailProduit(this.id);
          this.lotForm.reset();
          this.sweetAlert.showSuccessAlert(
            'Opération effectuer!',
            'Mise en stock effectuer avec avec success'
          );
        }
      });
    } else {
      this.sweetAlert.showErrorAlert('Error', 'Quantité saisis incorrect (qté > 0)')
    }
  }

  onSubmitVente() {
    if (this.prixVente == null) {
      let body = {
        id_produit: this.id,
        prix_vente_unique: this.venteForm.get('prix_vente_unique')?.value,
      };

      this.produitService.savePrixVenteProduit(body).subscribe((value) => {
        if (value.status == true) {
          this.getDetailProduit(this.id);
          this.venteForm.reset();
          this.sweetAlert.showSuccessAlert(
            'Opération effectuer!',
            'Prix de vente renseigner avec success'
          );
        }
      });
    } else {
      let body = {
        prix_vente_unique: this.venteForm.get('prix_vente_unique')?.value,
      };

      this.produitService
        .updatePrixVenteProduit(this.prixVente.id, body)
        .subscribe((value) => {
          if (value.status == true) {
            this.getDetailProduit(this.id);
            this.venteForm.reset();
            this.sweetAlert.showSuccessAlert(
              'Opération effectuer!',
              'Prix de vente mise à jour avec success'
            );
          }
        });
    }
  }

  getDetailProduit(id: number) {
    if (this.activeTigger == true) {
      this.ngOnDestroy();
    }

    this.produitService.detailProduit(id).subscribe((value) => {
      console.log(value);
      if (value.status == true) {
        this.detailProduit = value.data;
      }
    });

    this.produitService.getPrixVenteProduit(id).subscribe((value) => {
      console.log(value);
      if (value.status == true) {
        this.prixVente = value.data;
      }
    });

    this.produitService.listeLotProduitByIdProduit(id).subscribe((value) => {
      if (value.status == true) {
        console.log(value);
        this.lotProduit = value.data;

        this.launshTigger();
      }
    });

    this.produitService.getStatProduit(id).subscribe((value) => {
      if (value.status == true) {
        console.log(value.data);
        this.stateProduit = value.data;
        this.nbrStock =
          this.stateProduit.nbrQte ?? 0 - this.stateProduit.nbrQteVente ?? 0;
      }
    });
  }

  launshTigger() {
    console.log('okkay');
    console.log(this.activeTigger);
    this.dtTrigger.next('');
    this.activeTigger = true;
  }

  getValueName(e: any) {
    if (e.target.value) {
      this.nomProduit = e.target.value
    }
  }

  selectToUpdate(data: any) {
    this.toUpdate = true
    this.dataToUpdate = data
    this.lotForm.patchValue({
      qte: this.dataToUpdate.qte,
      prix_achat: this.dataToUpdate.prix_achat
    })
  }

  updatName() {
    if (this.nomProduit != '') {
      let body = {
        libelle: this.nomProduit
      }
      this.produitService.updateProduit(this.detailProduit.id, body).subscribe(value => {
        console.log(value)
        if (value.status == true) {
          this.sweetAlert.showSuccessAlert('Success', 'Modification effectuer avec sucess')
          this.getDetailProduit(this.id);
        }
      })
    } else {
      this.sweetAlert.showErrorAlert('Danger', 'Nom du produit incorrecte!!!')
    }
  }

  updatLotProduit() {
    if (this.lotForm.get('qte')?.value > 0) {
      if ((this.lotForm.get('qte')?.value - this.dataToUpdate.qte) >= this.detailProduit.stock) {
        console.log(this.dataToUpdate.id)
        console.log(this.lotForm.get('qte')?.value)
        console.log(this.lotForm.get('prix_achat')?.value)
        let body = {
          qte: this.lotForm.get('qte')?.value,
          prix_achat: this.lotForm.get('prix_achat')?.value,
          diff: this.lotForm.get('qte')?.value - this.dataToUpdate.qte,
          id_produit: this.detailProduit.id
        }
        this.produitService.updateLotProduit(this.dataToUpdate.id, body).subscribe(value => {
          console.log(value)
          if (value.status == true) {
            this.sweetAlert.showSuccessAlert('Success', 'Modification effectuer avec sucess')
            this.getDetailProduit(this.id);
            this.lotForm.reset()
            this.toUpdate = false
          }
        })
      }else {
        this.sweetAlert.showErrorAlert('Error', 'Quantité saisis incorrect La quantité est trop inferieur au stock')
      }
    } else {
      this.sweetAlert.showErrorAlert('Error', 'Quantité saisis incorrect (qté > 0)')
    }
  }
}
