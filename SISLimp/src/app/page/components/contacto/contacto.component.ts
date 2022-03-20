import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';
import { MessageService } from 'primeng/api';
import { EmailService } from '../../../sislimp/shared/services/email.service';
import { BasicEmailModel } from '../../../sislimp/shared/models/emails.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [MessageService]
})
export class ContactoComponent implements OnInit {
  formContact: FormGroup = new FormGroup({});
  initialState: any;

  constructor(
    private formBuider: FormBuilder,
    public sharedFuntions: FuntionsSharedService,
    private messageService: MessageService,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.construcForm();
  }
  construcForm() {
    this.formContact = this.formBuider.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    }, {validator: this.sharedFuntions.emailValidator('email')});
    this.initialState = this.formContact.value;
  }
  onSendMenssage(){
    this.formContact.markAllAsTouched();
    if(!this.formContact.valid){
      this.messageService.add({ severity: 'error', detail: 'Formulario invalido' });
    } else {
      this.sendEmail(this.formContact);
    }
  }
  sendEmail(form: FormGroup) {
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = 'qtandres17@gmail.com';
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.preheader = 'Información de contacto';

    resetBodyEmail.name = form.controls.name.value;
    resetBodyEmail.message = form.controls.message.value;
    resetBodyEmail.contactEmail = form.controls.email.value;
    resetBodyEmail.subject = form.controls.subject.value;

    this.emailService.sendContactForm(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        this.messageService.add({ severity: 'success', detail: 'Mensaje enviado' });
        this.formContact.reset(this.initialState);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar mensaje' });
      }
    });
  }

}
