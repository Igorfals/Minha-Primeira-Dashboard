import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;
  credentials: any = {}
  constructor(private loginservice: LoginService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
  }
  login(): any {
    if (!this.credentials.email) {
      return this.toastr.warning('Por favor digite o email!', 'ATENÇÂO')
    }
    if (!this.credentials.password) {
      return this.toastr.warning('Por favor digite o password!', 'ATENÇÂO')
    }
    this.loading = true
    this.loginservice.login(this.credentials).then((result: any) => {
      this.loading = false
      if (result.status) {
        return this.toastr.warning('Email ou Senha invalido!', 'ATENÇÂO!');
      }
      sessionStorage.setItem('token',result.token)
      this.router.navigate(['/dashboard'])
      return this.toastr.success('Login efetuado com sucesso!', 'ATENÇÂO!');
    })
  }

}
