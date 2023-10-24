
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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

  ngOnInit() {

    this.name = JSON.stringify(localStorage.getItem('name'));
    this.lastname = JSON.stringify(localStorage.getItem('lastname'));
    this.carrera = JSON.stringify(localStorage.getItem('carrera'));
  }


  ngOnDestroy(): void {
  }

}


