import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../../services/respuesta-cuestionario.service';
import { Cuestionario } from '../../../../../models/cuestionario';
import { RespuestaCuestionarioDetalle } from '../../../../../models/respuestaCuestionarioDetalle';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {

  idRespuesta!: number;
  loading = false;
  cuestionario!: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = []
  constructor(private aRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService) {
    this.idRespuesta = +Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario() {
    this.loading = true;
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(
      data => {
        this.cuestionario = data.cuestionario;
        this.respuestas = data.respuestas;
        this.loading = false;
      }
    )
  }
}
