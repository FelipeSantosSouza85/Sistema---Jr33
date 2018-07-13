import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlunoPage } from './aluno';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlunoPage),
    FormsModule,
    TextMaskModule

  ],
})
export class AlunoPageModule {}
