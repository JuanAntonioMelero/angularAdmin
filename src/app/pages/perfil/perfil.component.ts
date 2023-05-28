import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  implements OnInit{

  public perfilForm: FormGroup = this.fb.group({
    nombre:'',
    email:'',
    role:'USER'
  })

  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb:FormBuilder,
    private usuarioService: UsuarioService,
    ){
      this.usuario = usuarioService.usuario;
    }

  ngOnInit():void{
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
      role:'USER'
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
    .subscribe( (resp) => {
      console.log(resp);
      const { nombre, email,role  } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  };
  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return this.imgTemp;
  }

  subirImagen(){}
}
