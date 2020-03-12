import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { MedicosService } from '../../services/medicos.service';
import { Medico } from '../../models/medico';
import { MedicamentosService } from '../../services/medicamentos.service';
import { Medicamentos } from '../../models/medicamentos';
import { InteracaoMedicamentosaService } from '../../services/interacao-medicamentosa.service';
import { InteracaoMedicamentosa } from '../../models/interacaoMedicamentosa';
import { PrescricoesService } from '../../services/prescricoes.service';
import { Prescricoes } from '../../models/prescricoes';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.styl']
})
export class PrescricaoComponent implements OnInit {

  prescricaoObject = {} as Prescricoes;

  usuarios: Usuario[];
  medicos: Medico[];
  medicamentos: Medicamentos[];
  prescricao: Prescricoes[];
  interacaoMedicamentosas: InteracaoMedicamentosa[];
  
  qtdRemedios = 0;
  selectedUser:string;
  selectedMedico:string;
  selectedMedicamento:string;

  prescricoes: any[] = [{
    farmacos: '',
    posologia: '',
    viaAdministracao: '',
  }];

  constructor(private usuarioService:UsuariosService, 
              private medicoService:MedicosService, 
              private medicamentoService:MedicamentosService,
              private interacaoMedicamentosaService:InteracaoMedicamentosaService,
              private prescricoesService:PrescricoesService,
              private _snackBar:MatSnackBar
              ) { }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });

    this.medicoService.getMedico().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });

    this.medicamentoService.getMedicamentos().subscribe((medicamentos: Medicamentos[]) => {
      this.medicamentos = medicamentos;
    });

    this.medicamentoService.getMedicamentos().subscribe((medicamentos: Medicamentos[]) => {
      this.medicamentos = medicamentos;
    });

    this.interacaoMedicamentosaService.getInteracaoMedicamentosa().subscribe((interacaoMedicamentosas: InteracaoMedicamentosa[]) => {
      this.interacaoMedicamentosas = interacaoMedicamentosas;
    });

    this.getPrescricoes();

  }

  criarPrescricoes(index:number){
    this.prescricoes = [];
    for (let n = 0; n < index; ++n) {
      this.prescricoes.push({
        farmacos: '',
        posologia: '',
        viaAdministracao: '',
      });
    }
  }

  setMedicamentoPrescricao(prescricao:{}, nome:string){
    prescricao["medicamento"] = nome;
  }

  savePrescricao(){

    if(!this.selectedUser){
      this._snackBar.open('Favor selecionar o usuario', 'Fechar');
      return;
    }

    if(!this.selectedMedico){
      this._snackBar.open('Favor selecionar o médico', 'Fechar');
      return;
    }

    let farmacos = '';

    if(this.prescricoes.length >= 2){
      for(let i=0; i<(this.prescricoes.length -1); i++){
        farmacos = this.prescricoes[i].farmacos + ' x ' + this.prescricoes[i+1].farmacos;
        for(let j=0; j<this.interacaoMedicamentosas.length; j++){
            let interacaoMedicamentosa = this.interacaoMedicamentosas[j];
  
            if((this.prescricoes[i].farmacos.indexOf(interacaoMedicamentosa["Farmaco1"]) > -1 && this.prescricoes[i+1].farmacos.indexOf(interacaoMedicamentosa["Farmaco2"]) > -1) ||
                (this.prescricoes[i+1].farmacos.indexOf(interacaoMedicamentosa["Farmaco1"]) > -1 && this.prescricoes[i].farmacos.indexOf(interacaoMedicamentosa["Farmaco2"]) > -1)){
                  let message = "Farmacos: " + farmacos + '\n';
                  message += "Descrição: " + interacaoMedicamentosa.Descricao;

                  this._snackBar.open(message, 'Fechar');
                  break;
            }
        }
      }
    } else {
      farmacos = this.prescricoes[0].farmacos
    }

    this.prescricaoObject.usuario = this.selectedUser;
    this.prescricaoObject.medico = this.selectedMedico;
    this.prescricaoObject.data = new Date(Date.now()).toLocaleString();
    this.prescricaoObject.farmacos = farmacos;
    
    this.prescricoesService.savePrescricao(this.prescricaoObject).subscribe(() => {
      this.getPrescricoes();
    });

  }

  deletePrescricao(prescricao: Prescricoes) {
    this.prescricoesService.deletePrescricao(prescricao).subscribe(() => {
      this.getPrescricoes();
    });
  }

  getPrescricoes() {
    this.prescricoesService.getPrescricoes().subscribe((prescricao: Prescricoes[]) => {
      this.prescricao = prescricao;
    });
  }
  
  setFarmacos(prescicao:any, nome:any){
    prescicao.farmacos = nome;
  }

  
}
