import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';



export const logeado = () => {

    const router = inject(Router);

    if (localStorage.getItem('usuario')) {
        return true;
    } else {
        console.log('Debes registrate primero');
        
        router.navigate(['/registro']);
        return false;

    }
}


