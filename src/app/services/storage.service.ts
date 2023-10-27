import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

Injectable({
  providedIn: 'root'
})

const stgUser = 'dataUsuario';

export class StorageService {

  constructor() { }
  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor})
  }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  } 

  async saveUsuario(user:any[]){
    var userStorage = await this.getUsuario();

    for (const i of userStorage) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(stgUser,JSON.stringify(user));
  }

  async getUsuario(){
    const storageData = await this.getItem(stgUser);

    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);

    if (data) {
      return data;
    }
    else{
      return [];
    }
  }
}
