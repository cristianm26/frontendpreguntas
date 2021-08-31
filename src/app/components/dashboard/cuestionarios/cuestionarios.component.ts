import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  nombreUsuario!: string;
  listCuestionarios: Cuestionario[] = [];
  loading = false;
  constructor(private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getNombreUsuario();
    this.getCuestionarios();
  }

  getNombreUsuario(): void {
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }

  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data => {
      this.listCuestionarios = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;

    })
  }

  eliminarCuestionario(idCuestionario: number): void {
    if (confirm('Esta seguro que desea eliminar el cuestionario?')) {
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data => {
        this.loading = false;
        this.toastr.success('El cuestionario fue eliminado con éxito', 'Registro Eliminado')
        this.getCuestionarios();
      }, error => {
        this.loading = false;
        this.toastr.error('Ops Ocurrio un error', 'Error')
      })
    }
  }

}
