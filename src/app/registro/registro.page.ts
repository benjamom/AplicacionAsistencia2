import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() { }
  usuario = "";
  password = "";
  carrera ="";
  name = "";
  lastname = "";

  ngOnInit() {
  }

  inicio(){
    localStorage.setItem('usuario', this.usuario)
    localStorage.setItem('password', this.password)
    localStorage.setItem('carrera', this.carrera)
    localStorage.setItem('name', this.name)
    localStorage.setItem('lastname', this.lastname)
  }

}
