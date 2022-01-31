import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SytemloginRoutingModule } from './systemlogin-routing.module';
import { SystemLoginComponent } from './components/system-login/system-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    SystemLoginComponent
  ],
  imports: [
    CommonModule,
    SytemloginRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    InputNumberModule,
    InputMaskModule,
    InputTextareaModule,

  ]
})
export class SytemloginModule { }
