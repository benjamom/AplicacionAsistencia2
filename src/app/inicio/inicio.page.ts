
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  name:string = "";
  lastname:string = "";
  carrera:string = "";
  isSupported = false;
  latitud: number =0;
  longitud: number = 0;
  isModalOpen = false;

  

  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  constructor(private navCtrl: NavController,
    private router: Router, 
    private alertController: AlertController,
    private storageService:StorageService) { }

  imagenes:any[]=[];



  ngOnInit() {

    this.name = JSON.stringify(localStorage.getItem('name'));
    this.lastname = JSON.stringify(localStorage.getItem('lastname'));
    this.carrera = JSON.stringify(localStorage.getItem('carrera'));
    
    defineCustomElements(window);
    
  }

  async takePhoto() {

    var cSource = CameraSource.Prompt;

    if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 100,
        height: 1024,
        width: 1024,
        source: CameraSource.Camera,
      });

      if (image.webPath) {
        var blob = (await fetch(image.webPath)).blob();
        this.imagenes.unshift({ fname: 'foto.' + image.format, src: image.webPath, file: blob })

      }

      console.log("Imagenes guardadas ===>", this.imagenes);

    }
  }
    
  async geoLocalizacion(){

    const coordenadas = await Geolocation.getCurrentPosition();
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
  }
  ngOnDestroy(): void {
  }

}


