import { SweetAlertService } from 'src/app/shared/common/sweet-alert.service';
import { ProduitService } from './../../../gestionnaire-produit/common/produit.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VenteService } from '../../common/vente.service';
import * as printJS from 'print-js';
import { style } from '@angular/animations';
import { formatDate } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-liste-caissier',
  templateUrl: './liste-caissier.component.html',
  styleUrls: ['./liste-caissier.component.scss'],
})
export class ListeCaissierComponent implements OnInit {
  dataProduit: any;
  dataAddVente: any;
  dataVente: any;
  dataSearch: any;
  produitSelect: any;
  user: any;
  qte!: number;
  prixTotal!: number;
  prixAmener!: number;
  prixRemettre: number = 0;
  formattedDate: any;

  
  dataAddVenteDetail: any;
  prixTotalDetail!: number;
  dataVenteDetail: any;

  constructor(
    private produitService: ProduitService,
    private sweetAlertService: SweetAlertService,
    private venteService: VenteService
  ) {}

  ngOnInit(): void {
    const date = new Date(); // Replace with your actual date
    const locale = 'fr-FR'; // Set the locale to French

    this.formattedDate = date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

    this.user = JSON.parse(localStorage.getItem('infoUser')!);

    this.listeProduit();
    this.listeVente(this.user.id);
    this.listeAddVente(this.user.id);
  }

  listeVente(idUser: number) {
    this.venteService.listeVenteByUser(idUser).subscribe((value) => {
      if (value.status == true) {
        this.dataVente = value.data;
      }
    });
  }

  launchModalVente() {
    setTimeout(() => {
      $('#recherche').focus();
    }, 1000);
  }

  deleteAddVente(id: number) {
    this.venteService.deleteAddVente(id).subscribe((value) => {
      if (value.status == true) {
        this.sweetAlertService.showSuccessAlert(
          'Retrait effectuer!',
          'Retrait de produit effectuer avec success'
        );
        console.log(this.user);
        this.listeAddVente(this.user.id);
      }
    });
  }

  setQte(e: any) {
    this.qte = e.target.value;
  }

  CalculePrixAmener() {
    this.prixRemettre = this.prixAmener - this.prixTotal;
  }

  addPrixAmener(e: any) {
    this.prixAmener = e.target.value;
    console.log(this.prixAmener);
    this.prixRemettre = this.prixAmener - this.prixTotal;
  }

  listeProduit() {
    this.produitService.listeProduit().subscribe((value) => {
      console.log(value);
      if (value.status == true) {
        this.dataProduit = value.data;
        for (let i = 0; i < this.dataProduit.length; i++) {
          this.getDetailProduit(this.dataProduit[i].id, i);
          if (i == this.dataProduit.length - 1) {
            setTimeout(() => {
              this.dataSearch = this.dataProduit;
            }, 1500);
          }
        }
      }
    });
  }

  listeAddVente(id: number) {
    this.venteService.listeAddVenteByIdUser(id).subscribe((value) => {
      if (value.status == true) {
        this.dataAddVente = value.data;

        this.prixTotal = 0;
        for (let i = 0; i < this.dataAddVente.length; i++) {
          this.prixTotal += this.dataAddVente[i].prix_total;

          console.log(this.prixTotal);

          this.CalculePrixAmener();
        }
      }
    });
  }

  launchSearch(e: any) {
    console.log(e.target.value);
    let sh = e.target.value.toLowerCase();
    this.dataProduit = this.dataSearch.filter((value: any) => {
      let val = value.libelle.toLowerCase();
      console.log(val.includes(sh));
      if (val.includes(sh) == true && value.prixVente) {
        return value;
      }
    });
    console.log(this.dataProduit);
  }

  AddToSell(item: any) {
    if (item.nbrStock > 0) {
      this.produitSelect = item;
      $('#qte').focus();
      $('#qte').val(null);
    } else {
      this.sweetAlertService.showErrorAlert(
        'Erreur de selection!',
        `Produit en rupture de stock, veillez vous ravitailler en ${item.libelle}`
      );
    }
  }

  getDetailProduit(id: number, i: number) {
    this.produitService.getPrixVenteProduit(id).subscribe((value) => {
      console.log(value);
      if (value.status == true) {
        let prixVente = value.data;
        this.dataProduit[i].prixVente = prixVente?.prix_vente_unique;
      }
    });

    this.produitService.getStatProduit(id).subscribe((value) => {
      if (value.status == true) {
        console.log('Verification vente');
        console.log(id);
        console.log(value.data);
        let stateProduit = value.data;
        let nbrStock =
          parseInt(stateProduit.nbrQte ?? 0) -
          parseInt(stateProduit.nbrQteVente ?? 0);

        this.dataProduit[i].nbrStock = nbrStock;

        console.log(this.dataProduit);
      }
    });
  }

  onSubmitAddProduit() {
    if (this.produitSelect) {
      console.log('coucou');
      let user = JSON.parse(localStorage.getItem('infoUser')!);
      let body = {
        id_produit: this.produitSelect.id,
        id_user: user.id,
        qte: this.qte,
        prix_total: this.produitSelect.prixVente * this.qte,
      };
      this.venteService.saveAddVente(body).subscribe((value) => {
        if (value.status == true) {
          this.sweetAlertService.showSuccessAlert(
            'Ajout de produit!',
            'Ajout de produit effectuer avec success'
          );
          this.listeAddVente(this.user.id);
        }
      });
    } else {
      this.sweetAlertService.showErrorAlert(
        "Erreur d'ajout de produit",
        'Veuillez selectionner le produit que vous voulez vendre'
      );
    }
  }

  printDataRecu() {
    const printCSS = `
      @page {
        size: 80mm 80mm;
        margin: 0 !important;
        font-size: 8px
      }
      @media print {
        #printDiv {
          width: 80mm;
          height: 80mm;
          font-size: 8px
        }
      }
    `;

    printJS({
      printable: 'printDiv', // Corrected id to match the div id
      type: 'html',
      targetStyles: ['*'],
      style: printCSS
    });
  }

  printDataRecuDetail() {
    const printCSS = `
      @page {
        size: 80mm 80mm;
        margin: 0 !important;
        font-size: 8px
      }
      @media print {
        #printDiv {
          width: 80mm;
          height: 80mm;
          font-size: 8px
        }
      }
    `;

    printJS({
      printable: 'printDivDetail', // Corrected id to match the div id
      type: 'html',
      targetStyles: ['*'],
      style: printCSS
    });
  }

  saveVente() {
    // this.printDataRecu();
    if (this.prixAmener >= this.prixTotal) {
      let body = {
        id_user: this.user.id,
        prix_total: this.prixTotal,
        prix_client: this.prixAmener,
        monais_client: this.prixRemettre,
      };
      this.venteService.saveVente(body).subscribe((value) => {
        console.log(value);
        if (value.status == true) {
          this.printDataRecu();
          this.sweetAlertService.showSuccessAlert(
            'Vente effectuer!',
            'Vente effectuée avec success'
          );
          this.ngOnInit();
          this.prixAmener = 0
          this.prixRemettre = 0
          this.produitSelect = null
          $('#recherche').focus()
          $('#qte').val(null)
          $('#sommeApporter').val(null)
        }
      });
    } else {
      this.sweetAlertService.showErrorAlert('Erreur de vente', 'Montant amener est inferieur au prix total des produit')
    }
  }

  listeAddVenteDetail(id: number) {
    this.venteService.listeDetailProduitByIdProduit(id).subscribe((value) => {
      if (value.status == true) {
        this.dataAddVenteDetail = value.data;

        this.prixTotalDetail = 0;
        for (let i = 0; i < this.dataAddVenteDetail.length; i++) {
          this.prixTotalDetail += this.dataAddVenteDetail[i].prix_total;
        }
      }
    });
  }

  getDetail(id: number, data: any) {
    console.log(id)
    $('#detailVente').modal('show')
    this.dataVenteDetail = data
    this.listeAddVenteDetail(id)
  }
}
