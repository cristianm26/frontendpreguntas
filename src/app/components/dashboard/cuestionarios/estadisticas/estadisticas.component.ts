import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  idCuestionario: number;
  loading = false;
  listRespuestaCuestionario: any[] = [];


  constructor(private aRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private toastr: ToastrService) {
    this.idCuestionario = +Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }

  getListCuestionarioService(): void {
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario)
      .subscribe(data => {
        this.loading = false;
        this.listRespuestaCuestionario = data
      }
      );
  }

  eliminarRespuestaCuestionario(idRtaCuestionario: number): void {
    this.loading = true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(
      data => {
        this.loading = false;
        this.toastr.error('La respuesta al Cuestionario fue eliminada con éxito', 'Registro Eliminado');
        this.getListCuestionarioService();
      }, error => {
        this.loading = false;
      }
    )
  }
}
