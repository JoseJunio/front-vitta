import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../services/medicos.service';
import { Medico } from '../../models/medico';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-medicos',
  templateUrl: './cadastro-medicos.component.html',
  styleUrls: ['./cadastro-medicos.component.styl']
})
export class CadastroMedicosComponent implements OnInit {

  medico = {} as Medico;
  medicos: Medico[];

  constructor(private medicoService:MedicosService) { }

  ngOnInit() {
    this.getMedicos();
  }

  saveMedico(form: NgForm) {
    if (this.medico.id !== undefined) {
      this.medicoService.updateMedico(this.medico).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.medicoService.saveMedico(this.medico).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getMedicos() {
    this.medicoService.getMedico().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });
  }

  deleteMedico(medico: Medico) {
    this.medicoService.deleteMedico(medico).subscribe(() => {
      this.getMedicos();
    });
  }

  editMedico(medico: Medico) {
    this.medico = { ...medico };
  }

  cleanForm(form: NgForm) {
    this.getMedicos();
    form.resetForm();
    this.medico = {} as Medico;
  }

}
