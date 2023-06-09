import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario;
  constructor( private sidebarService: SidebarService,
    private router:Router,
    private usuarioService:UsuarioService

    ) {
        this.menuItems = sidebarService.menu;
        this.usuario = usuarioService.usuario;
        console.log(this.usuario);
  }

  ngOnInit(): void {

  }
  logout(){

    this.usuarioService.logout();
  }

}
