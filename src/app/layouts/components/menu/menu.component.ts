import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/modules/gestionnaire-produit/common/produit.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  link: any
  role!: number

  stats: any;
  constructor(private router: Router, private produitService: ProduitService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.link = this.router.url
    }, 500)

    this.role = parseInt(localStorage.getItem('typeCompte')!)

    this.getStatistique()
  }

  getStatistique() {
    this.produitService.statistique().subscribe(value => {
      console.log(value)
      if (value.status == true) {
        this.stats = value.data
        console.log(this.stats)
      }
    })
  }
}
