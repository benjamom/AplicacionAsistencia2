import { Component, OnInit } from '@angular/core';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private helper:HelperService,private locationService:LocationService) { }
  usuario:string= '';
  password:string= '';
  carrera:string= '';
  name:string= '';
  lastname:string= '';
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  selComuna:boolean = true;

  ngOnInit() {
    this.cargarRegion();
  }

  inicio(){
    localStorage.setItem('usuario', this.usuario)
    localStorage.setItem('password', this.password)
    localStorage.setItem('carrera', this.carrera)
    localStorage.setItem('name', this.name)
    localStorage.setItem('lastname', this.lastname)
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.selComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

  validacionRegistro(){
    if (this.usuario == '') {
      this.helper.showAlert("Debe ingresar un correo","Error");
      return;
    }
    if (this.password == '') {
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }
  }

}
