import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  name: string = "";
  lastname: string = "";
  carrera: string = "";
  resultadoScan: string = "";
  isSupported = false;

  constructor() { }

  ngOnInit() {
    this.name = JSON.stringify(localStorage.getItem('name'));
    this.lastname = JSON.stringify(localStorage.getItem('lastname'));
    this.carrera = JSON.stringify(localStorage.getItem('carrera'));
  }
  async scan() {
    const resultadoQr = JSON.stringify(await BarcodeScanner.startScan());
    this.resultadoScan = resultadoQr;
  }
  ngOnDestroy(): void {

  }
}
