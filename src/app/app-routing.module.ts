import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroMedicosComponent } from './components/cadastro-medicos/cadastro-medicos.component';
import { CadastroUsuariosComponent } from './components/cadastro-usuarios/cadastro-usuarios.component';
import { PrescricaoComponent } from './components/prescricao/prescricao.component';

const routes: Routes = [
    {path:'cadastro-medicos', component: CadastroMedicosComponent},
    {path:'cadastro-usuarios', component: CadastroUsuariosComponent},
    {path:'prescricao', component: PrescricaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
