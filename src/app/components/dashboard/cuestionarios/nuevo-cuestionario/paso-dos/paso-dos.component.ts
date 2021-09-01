import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { Pregunta } from '../../../../../models/pregunta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from '../../../../../models/cuestionario';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario!: string;
  descripcionCuestionario!: string;
  listPreguntas: Pregunta[] = [];
  loading = false;

  constructor(
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
  }

  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1)
  }

  guardarCuestionario(): void {
    const cuestionario: any = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    }
    this.loading = true;
    //  Enviamos cuestionario al back
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(
      data => {
        this.toastr.success('El cuestionario fue registrado con exito', 'Cuestionario Registrado')
        this.router.navigate(['/dashboard'])
        this.loading = false;
      }, error => {
        this.toastr.error('Oops Ocurrió un Error', 'Error')
        this.router.navigate(['/dashboard'])
        this.loading = false;
      }
    )
  }
}
