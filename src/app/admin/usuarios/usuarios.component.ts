import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id_user', 'name', 'email'];
  dataSource: any =  [];
  constructor(private usuarioservice: UsuariosServiceService) {

  }

  ngOnInit(): void {
    this.getUsuarios()
  }
  getUsuarios(){
    this.usuarioservice.getUsuarios().then((result: any)=>{
      this.dataSource = result.users
    })
  }
}
