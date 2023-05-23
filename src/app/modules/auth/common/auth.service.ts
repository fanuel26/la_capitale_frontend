import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { HttpService } from 'src/app/common/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate = false;

  constructor(
    private httpService: HttpService,
    private route: Router,
  ) {}

  login(body: any): Observable<any> {
    return this.httpService
      .postRequest("/auth/login", body)
      .pipe(
        first(),
        map((value) => {
          console.log(value)
          const token = value.data.token;
          const infoUser = value.data.infoUser
          localStorage.setItem("token", `Bearer ${token.token}`);
          localStorage.setItem("infoUser", JSON.stringify(infoUser));
          if (token) {
            localStorage.setItem("isAuthenticate", "1");
            if (infoUser.role == 1) {
              localStorage.setItem("typeCompte", infoUser.role);
              this.route.navigate(["/caissier"]);
            }else {
              localStorage.setItem("typeCompte", infoUser.role);
              this.route.navigate(["/gestionnaire"]);
            }
          }
        })
      );
  }

  // getProfile() {
  //   this.httpService.postRequest('/me', {}).pipe(first(), map(value => {
  //     if (value.status == true) {
  //       let token = 'coucou';
  //       this.isAuthenticate = true;
  //     }
  //   }))
  // }

  logout() {
    localStorage.clear();
    this.route.navigate(["/"], {
      queryParams: {},
    });
  }

}
