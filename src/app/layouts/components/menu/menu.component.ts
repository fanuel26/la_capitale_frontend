import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  link: any
  role!: number
  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.link = this.router.url
    }, 500)

    this.role = parseInt(localStorage.getItem('typeCompte')!)
  }

}
