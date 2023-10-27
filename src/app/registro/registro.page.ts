import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController ,NavController} from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Comuna } from '../models/comuna';
import { Region } from '../models/region';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private helper:HelperService,
    private locationService:LocationService,
    private router:Router,
    private storage:StorageService) { }
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


    if (this.usuario === '') {
      this.helper.showAlert("Debe ingresar un usuario","Error");
    } else if (this.password === '') {
      this.helper.showAlert("Debe ingresar una contraseña","Error");
    } if (this.carrera === '') {
      this.helper.showAlert("Debe ingresar un carrera", "Error");
    } if (this.regionSel === 0) {
      this.helper.showAlert("Debe seleccionar una región", "Error");
    } if (this.comunaSel === 0) {
      this.helper.showAlert("Debe seleccionar una comuna", "Error");
    }else{
      localStorage.setItem('usuario', this.usuario)
      localStorage.setItem('password', this.password)
      localStorage.setItem('carrera', this.carrera)
      localStorage.setItem('name', this.name)
      localStorage.setItem('lastname', this.lastname)
    }

    var user = [{
      usuario: this.usuario,
      contrasena: this.password,
      carrera: this.carrera,
      region: this.regionSel,
      comuna: this.comunaSel 
    }];

    this.storage.saveUsuario(user)
      .then(() => {
        this.helper.showAlert('Usuario registrado correctamente.', 'Información');
        this.router.navigate(['/home']);
      })



  }

}
