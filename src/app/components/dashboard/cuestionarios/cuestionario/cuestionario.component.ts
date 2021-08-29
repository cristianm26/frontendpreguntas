import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from '../../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {
  idCuestionario: number;
  loading = false;
  cuestionario: any = { };

  constructor(private cuestionarioService: CuestionarioService,
    private aRoute: ActivatedRoute) {

    this.idCuestionario = +Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(parseInt(this.idCuestionario.toString())).subscribe(data => {
      this.loading = false;
      this.cuestionario = data;
    })
  }

}