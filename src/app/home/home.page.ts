import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)
  modal!: IonModal;




  constructor(private router: Router, private alertController: AlertController) { }

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
      header: 'Erro en el ingreso de datos',
      message: 'Los datos ingresados son incorrectos.',
      buttons: ['Aceptar']
    });

    this.clearFields();
    await alert.present();
  }

  validarUsuario() {
    const datosUsuario = localStorage.getItem('usuario');
    const passUsuario = localStorage.getItem('password');
    if (datosUsuario === this.nombre && passUsuario === this.clave) {
      // Los datos coinciden, el usuario está autenticado
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/inicio'])

      // Puedes realizar redirecciones u otras acciones aquí
    } else {
      console.log('Nombre de usuario o contraseña incorrectos');
      this.mostrarAlertaClaveInvalida();
    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.nombre == localStorage.getItem('usuario')) {
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
}  
