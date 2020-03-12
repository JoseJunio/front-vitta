import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.styl']
})
export class CadastroUsuariosComponent implements OnInit {

  usuario = {} as Usuario;
  usuarios: Usuario[];

  constructor(private usuarioService:UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  saveUsuario(form: NgForm) {
    if (this.usuario.id !== undefined) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getUsuarios() {
    this.usuarioService.getUsuario().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  deleteUsuario(usuario: Usuario) {
    this.usuarioService.deleteUsuario(usuario).subscribe(() => {
      this.getUsuarios();
    });
  }

  editUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
  }

  cleanForm(form: NgForm) {
    this.getUsuarios();
    form.resetForm();
    this.usuario = {} as Usuario;
  }

}
