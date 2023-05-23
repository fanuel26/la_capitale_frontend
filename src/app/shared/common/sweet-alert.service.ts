import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessAlert(title: string, message: string, yesBtn: string = "Ok") {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonColor: "#ae3764",
      confirmButtonText: yesBtn,
    });
  }

  showErrorAlert(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonColor: "#ae3764",
    });
  }
}
