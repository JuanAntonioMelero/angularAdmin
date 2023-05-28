import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap,map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  public usuario:Usuario;
  // public usuario:Usuario= {
  //     nombre: '',
  //     email: '',
  //     password: '',
  //     img: '',
  //     google: false,
  //     role: '',
  //     uid: '',
  // } ;
  constructor(
    private router:Router,
    private http:HttpClient) { }

  crearUsuario(formData: any){
    console.log(formData.nombre);
    return this.http.post(base_url+"/usuarios", formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    );
  }

  login (formData: any){

    return this.http.post(base_url+"/login", formData)
    .pipe(
      tap( (resp: any) => {

        localStorage.setItem('token', resp.token );
        this.validarToken().subscribe(
          resp => {

            console.log(resp);
        }
        );
      })
    );

  }
  validarToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
         const { email, google, nombre, role, img = '', uid } = resp.usuario;
      this.usuario = resp.usuario;

      console.log(this.usuario);
      //localStorage.setItem('token', resp.token );
      return true;
    }),
      catchError( error => of(false) )
    );

  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    //console.log("pasando por el logout")
  }
  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }
}
