import { NgIf } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private usuarioService: UsuarioService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // console.log('paso por el guard');
      // if(localStorage.getItem("token")){
      //   return true;
      // }
      // else{
      //   this.router.navigateByUrl('/login');
      //   return false;
      // }
      return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado =>  {
          console.log(estaAutenticado);
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );

  }

}
