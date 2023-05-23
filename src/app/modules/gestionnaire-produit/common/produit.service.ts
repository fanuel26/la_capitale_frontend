import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/common/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private httpService: HttpService) { }

  listeProduit() {
    return this.httpService.getRequest('/produit/list');
  }

  saveProduit(body: any) {
    return this.httpService.postRequest('/produit/save', body);
  }

  detailProduit(id: number) {
    return this.httpService.getRequest(`/produit/getById/${id}`)
  }

  getPrixVenteProduit(id: number) {
    return this.httpService.getRequest(`/param/vente/getByIdProduit/${id}`)
  }

  savePrixVenteProduit(body: any) {
    return this.httpService.postRequest(`/param/vente/save`, body)
  }

  updatePrixVenteProduit(id: number, body: any) {
    return this.httpService.updateRequest(`/param/vente/update/${id}`, body)
  }

  listeLotProduitByIdProduit(id: number) {
    return this.httpService.getRequest(`/produit/lot/getByIdProduit/${id}`)
  }

  saveLotProduit(body: any) {
    return this.httpService.postRequest(`/produit/lot/save`, body)
  }

  getStatProduit(id: number) {
    return this.httpService.getRequest(`/produit/lot/getStateVente/${id}`)
  }
}
