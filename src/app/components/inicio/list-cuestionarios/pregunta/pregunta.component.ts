import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from '../../../../models/pregunta';
import { RespuestaCuestionarioDetalle } from '../../../../models/respuestaCuestionarioDetalle';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario!: number;
  listPreguntas: any[] = [];
  loading = false;
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada!: any;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];



  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService, private router: Router) { }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio']);
      return
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas = [];
  }
  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.listPreguntas = data.listPreguntas;
      this.loading = false;
      this.respuestaCuestionarioService.cuestionario = data;
    })
  }
  obtenerPregunta(): string {
    return this.listPreguntas[this.index].descripcion;

  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, idRespuesta: number): void {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta: any): any {
    if (respuesta === this.opcionSeleccionada) {
      return 'active text-light';
    }
  }

  siguiente(): void {
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

    // Creamos un objeto Respuesta Detalle 
    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    }

    // Agregamos el objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);

    if (this.index === this.listPreguntas.length - 1) {
      /* this.router.navigate(['/inicio/respuestaCuestionario']) */
      this.guardarRespuestaCuestionario();
    }


    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = null;


  }

  guardarRespuestaCuestionario(): void {
    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle
    };
    this.loading = true;
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/inicio/listCuestionarios/respuestaCuestionario']);
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }
}
