import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  log(): void {
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }
    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      this.loading = false;
      this.loginService.setLocalStorage(data.usuario)
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    })
    /*   setTimeout(() => {
        if (usuario.nombreUsuario === 'cristian26' && usuario.password === '123456') {
          this.login.reset();
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('Usuario o Contraseña Incorrectos', 'Error');
          this.login.reset();
        }
        this.loading = false;
        console.log(usuario);
      }, 3000); */

  }
}
