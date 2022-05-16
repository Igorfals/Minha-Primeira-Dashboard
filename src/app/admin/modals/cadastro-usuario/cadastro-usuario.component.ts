import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  @Input() usuario: any = {}
  @Input() tipo: number = 1
  loading: boolean = false
  @Output() passEntry: EventEmitter<any> = new EventEmitter()
  constructor(private toastr: ToastrService, private usuarioservice: UsuariosServiceService, private modal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }
  dismiss() {
    this.modal.close()
    this.passEntry.emit(1)

  }
  save(): any {
    if (!this.usuario.email) {
      return this.toastr.warning('Por favor digite o email!', 'ATENÇÂO')
    }
    if (!this.usuario.password) {
      return this.toastr.warning('Por favor digite o password!', 'ATENÇÂO')
    }
    this.loading = true
    this.usuarioservice.cadastrar(this.usuario).then((result: any) => {
      this.loading = false
      if (result.status) {
        return this.toastr.warning('ERRO ao cadastrar usuario', 'Desculpe!')
      }
      this.dismiss()
      return this.toastr.success('Sucesso ao cadastrar usuario!', 'Sucesso!')
    })
  }
  alterar(): any {
    if (!this.usuario.email) {
      return this.toastr.warning('Por favor digite o email!', 'ATENÇÂO')
    }
    if (!this.usuario.password) {
      return this.toastr.warning('Por favor digite o password!', 'ATENÇÂO')
    }
    this.loading = true
    this.usuarioservice.alterar(this.usuario, this.usuario.id_user).then((result: any) => {
      this.loading = false
      if (result.status) {
        return this.toastr.warning('ERRO ao alterar o usuario!', 'Desculpe!')
      }
      this.dismiss()
      return this.toastr.success('Sucesso ao alterar o usuario!', 'Sucesso!')
    })
  }

}
