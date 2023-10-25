
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  name: string = "";
  lastname: string = "";
  carrera: string = "";
  isSupported = false;

  constructor(private navCtrl: NavController, private router: Router, private alertController: AlertController) { }

  imagenes:any[]=[];
  imagen: any;

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


  ngOnDestroy(): void {
  }

}


