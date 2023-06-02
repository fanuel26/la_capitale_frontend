import { HttpService } from './../../../common/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  constructor(private httpService: HttpService) { }

  listeAddVente() {
    return this.httpService.getRequest('/add/vente/list');
  }

  listeAddVenteByIdUser(id: number) {
    return this.httpService.getRequest(`/add/vente/getByIdUser/${id}`)
  }

  saveAddVente(body: any) {
    return this.httpService.postRequest('/add/vente/save', body)
  }

  deleteAddVente(id: number) {
    return this.httpService.deleteRequest(`/add/vente/delete/${id}`)
  }

  listeVenteByUser(id: number) {
    return this.httpService.getRequest(`/vente/getByIdUser/${id}`)
  }

  saveVente(body: any) {
    return this.httpService.postRequest('/vente/save', body)
  }
}
