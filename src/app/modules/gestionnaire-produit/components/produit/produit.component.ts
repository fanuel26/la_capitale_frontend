import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../common/produit.service';
import { __values } from 'tslib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/common/sweet-alert.service';

declare var $:any;

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitComponent implements OnInit {
  dataProduit: any;
  produitForm!: FormGroup
  idProduit!: number
  constructor(private produitService: ProduitService, private sweetAlert: SweetAlertService) {}

  ngOnInit(): void {

    this.produitForm = new FormGroup({
      libelle: new FormControl("", Validators.required),
    });
    this.getListProduit()

  }

  getListProduit() {
    this.produitService.listeProduit().subscribe((__values) => {
      console.log(__values);
      if (__values.status == true) {
        this.dataProduit = __values.data
      }
    });
  }

  onSubmit() {
    let value = {
      libelle: this.produitForm.get('libelle')?.value
    }

    console.log(value)

    this.produitService.saveProduit(value).subscribe(value => {
      if (value.status == true) {
        this.sweetAlert.showSuccessAlert('Enregistrement effectuée!', 'Produit enregistrer avec success')
        this.produitForm.reset()
        $('#staticBackdrop').modal('hide')
        this.getListProduit()
      }
    })
  }

  getDetail(id: number) {
    this.idProduit = id
    console.log("coucou")
    $('#detail').modal('show')
  }
}
