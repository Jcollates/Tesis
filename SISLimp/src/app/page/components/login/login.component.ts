import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { LoginUser, UserGeneralModel } from 'src/app/sharedAll/models/usergeneral.model';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { UsersGeneralService } from './users-general.service';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';
import { CataloguesService } from '../../../sharedAll/serviceShared/catalogues.service';
import { EmailService } from '../../../sislimp/shared/services/email.service';
import { BasicEmailModel } from '../../../sislimp/shared/models/emails.model';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  active;
  formLogin: FormGroup = new FormGroup({});
  formNewUser: FormGroup = new FormGroup({});
  formPassword: FormGroup = new FormGroup({});
  cities: any[] = [];
  provinces: any[] = [];
  newUSer: UserGeneralModel = new UserGeneralModel();
  loginUser: LoginUser = new LoginUser();
  loginuser_codeuser: number = 0;
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  codeUser: number;
  mustChange: boolean;
  loginUserUpdate: LoginUser = new LoginUser();
  showChangePass: boolean = false;

  //forget password
  showForgotPass: boolean = false;
  formForgotPassword: FormGroup = new FormGroup({});
  confirmDialog: boolean = false;
  initialState: any;
  constructor(
    private loginService: AuthService,
    private userGeneralService: UsersGeneralService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    public sharedFuntions: FuntionsSharedService,
    private catalogueService: CataloguesService,
    private emailService: EmailService,

  ) {
    this.codeUser = this.loginService.codeUser;
  }

  ngOnInit() {
    this.active = 1;
    this.construcForm();
    this.getCatalogues();
  }

  async getCatalogues() {
    await this.catalogueService.getCataloguebyCodeCat(PROVINCECAT).then(rest => {
      this.provinces = this.catalogueService.constructModel(rest);
    });
  }
  onChangueProvince(event: any) {
    if (event) {
      if (event.target.value) {
        this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.target.value).then(rest => {
          this.cities = this.catalogueService.constructModel(rest);
        });
      } else {
        this.cities = []
      }
    }


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

    this.formNewUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      conditions: ['', Validators.required]
    }, {
      validators: [
        this.MustMatch("password", "passwordConfirmation"),
        this.sharedFuntions.emailValidator('email'),
        this.sharedFuntions.validateUsername('email'), 
      ]
    });
    this.formForgotPassword = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.initialState = this.formNewUser.value;
  }
  //prevalidate antes de hacer login pro seguridad
  async onLogin() {
    this.formLogin.markAllAsTouched();
    //prevalidar
    if (!this.formLogin.valid) {
      this.messageService.add({ severity: 'error', detail: 'Ingrese usuario y contraseña' });
    } else {
      this.loginService.login(this.formLogin.value).subscribe(async rest => {
        if (rest.hasOwnProperty('codeuser')) {
          this.messageService.add({ severity: 'success', detail: 'Acceso exitoso' });
          await this.prevalidatePassword(Number(localStorage.getItem('code')));
          if (this.mustChange) {
            this.showChangePass = true;
          } else {
            this.router.navigate(['user']);
          }
        } else {
          this.messageService.add({ severity: 'error', detail: rest.message });
        }

      })
    }
  }
  async prevalidatePassword(code: number) {
    let response: boolean;
    await this.userGeneralService.getUniqueLoginUser(code).then(rest => {
      console.log("Esta entrando");
      if (rest.changepassnextenter === "YES") {
        this.loginUserUpdate = rest;
        response = true;
      } else {
        response = false;
      }
    });
    return this.mustChange = response;
  }

  onPasschangedCancel() {
    this.showChangePass = false;
    this.formPassword.reset({ newpassword: '', repassword: '' });
    this.logOut();
    this.formLogin.reset({ username: '', password: '' });
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

  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatchs) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatchs: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  onSaveUser() {
    this.formNewUser.markAllAsTouched();
    if (!this.formNewUser.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario imcompleto' });
      console.log('FORM', this.formNewUser.value);
    } else {
      this.fillContainerLoginUSer(this.formNewUser);
    }
  }
  fillContainer(form: FormGroup) {
    this.newUSer.name = form.controls.name.value;
    this.newUSer.lastname = form.controls.lastname.value;
    this.newUSer.email = form.controls.email.value;
    this.newUSer.phonenumber = form.controls.phoneNumber.value;
    this.newUSer.province = form.controls.province.value;
    this.newUSer.city = form.controls.city.value;
    this.newUSer.loginuser_codeuser = this.loginuser_codeuser;
    this.userGeneralService.saveUser(this.newUSer).then(rest => {
      if (rest) {
        console.log("SAVED newUSer ?", rest);
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formNewUser.reset(this.initialState);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al guardar' });
      }


    })
  }
  async fillContainerLoginUSer(form: FormGroup) {
    this.loginUser.username = form.controls.email.value;
    this.loginUser.password = form.controls.password.value;
    this.loginUser.changepassnextenter = 'NO';
    this.loginUser.status = 'ACTIVO';
    this.loginUser.loginusercol = 'USER';
    await this.userGeneralService.createLoginUSer(this.loginUser).then(rest => {
      console.log("SAVED loginUser ?", rest);
      if (rest.codeuser != null && rest.codeuser != 0) this.loginuser_codeuser = rest.codeuser;
    });
    this.fillContainer(this.formNewUser);
  }

  forgotPassWord(event: any) {
    event.preventDefault();
    this.showForgotPass = true;
  }
  onPassForgot() {
    this.formForgotPassword.markAllAsTouched();
    if (this.formForgotPassword.valid) {
      this.userGeneralService.validateUsername(this.formForgotPassword.controls.username.value).then(rest => {
        console.log(rest);
        if (rest.code === '01') {
          this.messageService.add({ severity: 'success', detail: 'Usuario encontrado' });
          this.getDataUserAndUpdate(rest.codeUser);
          this.confirmDialog = true;
        } else {
          this.messageService.add({ severity: 'error', detail: 'EL usuario no existe' });
        }
      })
    }
    console.log("AL mostrar", this.formForgotPassword.value);

  }
  onPassForgotCancel() {
    this.formForgotPassword.reset({ username: '' });
    this.showForgotPass = false;
    this.formLogin.reset({ username: '', password: '' });
  }
  hideLastDialog() {
    this.confirmDialog = false;
    this.onPassForgotCancel();
  }
  logOut() {
    this.loginService.logOut();
    this.router.navigate(['page/login']);
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
        console.log("EMAIL EMIAL", rest);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });
  }
  onHide(event: any) {
    this.onPasschangedCancel();
  }
  onHideFogot(event: any) {
    this.onPassForgotCancel();
  }
}
