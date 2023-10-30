import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from '../services/storage.service';
import { SharedService } from '../services/shared.service';
import { HelperService } from '../services/helper.service';
import { AlertController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)
  modal!: IonModal;




  constructor(private router: Router,
    private alertController: AlertController,
    private storageService:StorageService,
    private sharedService:SharedService,
    private helper: HelperService) { }

  nombre: string = "";
  clave: string = "";
  nuevaClave: string = "";

  ngOnInit() {
  }

  clearFields() {
    this.nombre = '';
    this.clave = '';
  }

  async mostrarAlertaClaveInvalida() {
    const alert = await this.alertController.create({
      header: 'Error en el ingreso de datos',
      message: 'Los datos ingresados son incorrectos.',
      buttons: ['Aceptar']
    });
    this.clearFields();
    await alert.present();
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.nombre == JSON.stringify(this.storageService.getUsuario())) {
      this.modal.dismiss(this.nuevaClave, 'confirm');
    } else {
      console.log('Nombre de usuario o contraseña incorrectos');
      this.mostrarAlertaClaveInvalida();
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      localStorage.setItem('password', this.nuevaClave);
      console.log("Clave actualizada")
    }
  }

  async login() {
    const usuario = this.nombre;
    const contrasena = this.clave;

    const usuariosAlmacenados = await this.storageService.getUsuario();


    const usuarioEncontrado = usuariosAlmacenados.find((user) => user.usuario === usuario && user.contrasena === contrasena);

    if (usuarioEncontrado) {
      const { usuario, carrera } = usuarioEncontrado;
      this.sharedService.setUsuario(usuarioEncontrado.usuario);
      this.sharedService.setCarrera(usuarioEncontrado.carrera);
      

      this.router.navigate(['/inicio']);
    } else {

      this.helper.showAlert('Credenciales incorrectas','Error');
    }
  }
}  
