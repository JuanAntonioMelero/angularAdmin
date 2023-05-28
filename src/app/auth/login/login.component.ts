import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  public formSubmitted = false;
  public loginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: false

  });
  constructor( private router: Router,
    private fb:FormBuilder,
    private usuarioService:UsuarioService
    ) { }

  login() {
    console.log( this.loginForm.value );
    this.formSubmitted = true;
    if ( this.loginForm.invalid && this.formSubmitted) {
      return;
    }
    //this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
        this.router.navigateByUrl('/dashboard');
        console.log(resp);
    }, (err)=> {
      console.log(err);
      Swal.fire( 'Error',
      err.error.msg,
      'error')
    });
  }

  campoNoValido( campo: string ): boolean {

    if (  this.loginForm.get(campo)?.invalid
    && this.formSubmitted
    ) {
      return true;
    } else {
      return false;
    }

  }
  passwordInvalida(campo: string): boolean{
    if (  this.loginForm.get(campo)?.invalid
    && (this.formSubmitted)
    ) {
      return true;
    } else {
      return false;
    }

  }
}
