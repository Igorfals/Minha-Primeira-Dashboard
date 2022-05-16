import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CadastroUsuarioComponent } from 'src/app/admin/modals/cadastro-usuario/cadastro-usuario.component';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id_user', 'name', 'email'];
  dataSource: any = [];
  loading: boolean = false
  constructor(private usuarioservice: UsuariosServiceService, private modal: NgbModal, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getUsuarios()
  }
  getUsuarios() {
    this.usuarioservice.getUsuarios().then((result: any) => {
      this.dataSource = result.users
    })
  }
  open() {
    const open = this.modal.open(CadastroUsuarioComponent)
    open.componentInstance.tipo = 1
    open.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.getUsuarios()
    })
  }
  alterar(usuario: any) {
    delete usuario.password
    const open = this.modal.open(CadastroUsuarioComponent)
    open.componentInstance.usuario = usuario
    open.componentInstance.tipo = 2
    open.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.getUsuarios()
    })
  }
  apagar(item: any){
    this.usuarioservice.apagar(item.id_user).then((result: any) => {
      this.loading = false
      if (result.status) {
        return this.toastr.warning('ERRO ao apagar usuario!', 'Desculpe!')
      }
      this.getUsuarios()
      return this.toastr.success('Sucesso ao apagar o usuario!', 'Sucesso!')
    })
  }
}
