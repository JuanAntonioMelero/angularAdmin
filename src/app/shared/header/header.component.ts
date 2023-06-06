import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  base_url = environment.base_url;
  constructor( private usuarioService:UsuarioService) {
    console.log(this.base_url);
    this.usuario = usuarioService.usuario;
  }
  public usuario: Usuario;

  ngOnInit(): void {
  }
  logout(){
    this.usuarioService.logout();
  }
}
