import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersGeneralService } from 'src/app/page/components/login/users-general.service';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { LoginUser, UserGeneralModel } from '../../../sharedAll/models/usergeneral.model';
import { BasicEmailModel } from '../../../sislimp/shared/models/emails.model';
import { EmailService } from '../../../sislimp/shared/services/email.service';

@Component({
  selector: 'app-system-login',
  templateUrl: './system-login.component.html',
  styleUrls: ['./system-login.component.css'],
  providers: [MessageService]
})
export class SystemLoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});


  formForgotPassword: FormGroup = new FormGroup({});
  formPassword: FormGroup = new FormGroup({});
  showChangePass: boolean = false;
  showForgotPass: boolean = false;
  confirmDialog: boolean = false;
  codeUser: number;
  mustChange: boolean;
  loginUserUpdate: LoginUser = new LoginUser();



  constructor(
    private loginService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private userGeneralService: UsersGeneralService,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.construcForm();
  }
  construcForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formPassword = this.formBuilder.group({
      newpassword: ['', Validators.required],
      repassword: ['', Validators.required]
    }, { validator: this.MustMatch("newpassword", "repassword") });
    this.formForgotPassword = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
  async onLogin() {
    this.formLogin.markAllAsTouched();
    this.formLogin.markAsDirty();
    if (!this.formLogin.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
    } else {
      this.loginService.login(this.formLogin.value).subscribe(async rest => {
        if (rest.hasOwnProperty('codeuser')) {
          this.messageService.add({ severity: 'success', detail: 'Acceso exitoso' });
          await this.prevalidatePassword(Number(localStorage.getItem('code')));
          if (this.mustChange) {
            this.showChangePass = true;
          } else {
            this.router.navigate(['system']);
          }

        } else {
          this.messageService.add({ severity: 'error', detail: rest.message });
        }
      });
    }
  }
  async prevalidatePassword(code: number) {
    let response: boolean;
    await this.userGeneralService.getUniqueLoginUser(code).then(rest => {
      if (rest.changepassnextenter === "YES") {
        this.loginUserUpdate = rest;
        response = true;
      } else {
        response = false;
      }
    });
    return this.mustChange = response;
  }

  goToPage() {
    this.router.navigate(['page'])
  }

  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  forgotPassWord(event: any) {
    event.preventDefault();
    this.showForgotPass = true;
  }

  onPasschangedCancel() {
    this.showChangePass = false;
    this.formPassword.reset({ newpassword: '', repassword: '' });
    this.logOut();
    this.formLogin.reset({ username: '', password: '' });
  }
  onPassForgotCancel() {
    this.formForgotPassword.reset({ username: '' });
    this.showForgotPass = false;
    this.formLogin.reset({ username: '', password: '' });
  }
  logOut() {
    this.loginService.logOut();
    this.router.navigate(['system/login']);
  }
  onHide(event: any) {
    this.onPasschangedCancel();
  }
  onHideFogot(event: any) {
    this.onPassForgotCancel();
  }
  onPasschanged() {
    this.formPassword.markAllAsTouched()
    if (!this.formPassword.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario incompleto' });
    } else {
      this.loginUserUpdate.password = this.formPassword.controls.newpassword.value;
      this.loginUserUpdate.changepassnextenter = 'NO';
      this.userGeneralService.updateLoginUSer(this.loginUserUpdate).then(rest => {
        if (rest) {
          this.messageService.add({ severity: 'success', detail: 'Contraseña actualizada' });
          this.showChangePass = false;
          this.loginService.logOut();
        } else {
          this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
        }
      })
    }
  }
  onPassForgot() {
    this.formForgotPassword.markAllAsTouched();
    if (this.formForgotPassword.valid) {
      this.userGeneralService.validateUsername(this.formForgotPassword.controls.username.value).then(rest => {
        if (rest.code === '01') {
          this.messageService.add({ severity: 'success', detail: 'Usuario encontrado' });
          this.getDataUserAndUpdate(rest.codeUser);
          this.confirmDialog = true;
        } else {
          this.messageService.add({ severity: 'error', detail: 'EL usuario no existe' });
        }
      })
    }
  }
  async getDataUserAndUpdate(codeUser: number) {
    await this.userGeneralService.getUserExtraData(codeUser).then(rest => {
      this.resetPassword(rest, codeUser);
    })
  }
  async resetPassword(data: UserGeneralModel, codeUser: number) {
    const genericPassword: string = Math.random().toString(36).slice(-8);
    let loginUserToUpdate: LoginUser;
    await this.userGeneralService.getUniqueLoginUser(codeUser).then(rest => {
      loginUserToUpdate = rest;
    });
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = data.email;
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.password = genericPassword;
    resetBodyEmail.preheader = 'Resetear Contraseña - Sislimp';
    resetBodyEmail.subject = 'Resetear Contraseña';
    resetBodyEmail.username = data.name + "" + data.lastname;

    loginUserToUpdate.password = genericPassword;
    loginUserToUpdate.changepassnextenter = 'YES';

    await this.userGeneralService.updateLoginUSer(loginUserToUpdate).then(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Contraseña reestablecida' });
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al reestrablecer' });
      }
    });

    this.emailService.sendRestorePasswordEmail(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL");
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });
  }
  hideLastDialog() {
    this.confirmDialog = false;
    this.onPassForgotCancel();
  }

}
