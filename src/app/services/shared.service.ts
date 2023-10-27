import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private usuario!: string;
  private carrera!: string;

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  setCarrera(carrera: string) {
    this.carrera = carrera;
  }


  getUsuario(): string {
    return this.usuario;
  }

  getCarrera(): string {
    return this.carrera;
  }

}