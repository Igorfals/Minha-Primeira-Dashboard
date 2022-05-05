import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosServiceService } from '../services/usuarios-service.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario: any = {}
  public loading = false;
  constructor(private usuarioservice: UsuariosServiceService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
  }
  cadastrar(): any {
    if (!this.usuario.email) {
      return this.toastr.warning('Por favor digite o email!', 'ATENÇÂO')
    }
    if (!this.usuario.password) {
      return this.toastr.warning('Por favor digite o password!', 'ATENÇÂO')
    }
    this.loading=true
    this.usuarioservice.cadastrar(this.usuario).then((result: any) => {
      this.loading=false
      if (result.status) {
        return this.toastr.warning('ERRO ao cadastrar usuario', 'Desculpe!')
      }
      this.router.navigate(['login'])
      return this.toastr.success('Sucesso ao cadastrar usuario!', 'Sucesso!')

    })
  }

}
