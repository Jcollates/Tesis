import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../sharedAll/serviceShared/auth.service';
import { UsersGeneralService } from '../../../page/components/login/users-general.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserGeneralModel, LoginUser } from '../../../sharedAll/models/usergeneral.model';
import { MessageService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { CataloguesService } from '../../../sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';
import { CatalgogueItem } from '../../../sharedAll/models/catalogue';
import { BasicEmailModel } from '../../shared/models/emails.model';
import { EmailService } from '../../shared/services/email.service';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
  providers: [MessageService]

})
export class UsersManagementComponent implements OnInit {


  formUser: FormGroup = new FormGroup({});
  newUSer: UserGeneralModel = new UserGeneralModel();
  loginUser: LoginUser = new LoginUser();
  loginuser_codeuser: number = 0;
  activeIndex1: number = 0;
  dataFromdb: UserGeneralModel[] = [];
  pageSize: number = 10;
  sizeRecords: number = 10
  cols: any[] = [];
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  dropCityTwo: CatalgogueItem;
  dropRol: SelectItem[] = [
    { value: '', label: 'Seleccione' },
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'USER', label: 'Usuario' },
  ];

  clonedUSer: { [s: string]: UserGeneralModel; } = {};
  initialValues: any;
  loginUsers: LoginUser[] = [];

  constructor(
    private authService: AuthService,
    private userService: UsersGeneralService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private catalogueService: CataloguesService,
    public sharedFuntions: FuntionsSharedService,
    private emailService: EmailService
  ) {
    this.createForm();
    this.createCols();
    this.getLoginUsers();
  }

  ngOnInit(): void {
    this.getCatalogues();
  }
  createCols() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido' },
      { field: 'email', header: 'Correo electrónico' },
      { field: 'phone', header: 'Teléfono' },
      { field: 'province', header: 'Provincia' },
      { field: 'city', header: 'Ciudad' },
      { field: 'date', header: 'Usuario' },
      { field: '', header: 'Rol' },
      { field: '', header: 'Resetear contraseña' },
      { field: '', header: 'Editar/Eliminar' },
    ]
  }
  createForm() {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      username: ['', Validators.required],
      rol: ['', Validators.required],

    }, {
      validators: [this.sharedFuntions.emailValidator('email'),
      this.sharedFuntions.validateUsername('username')],
    },
    );
    this.initialValues = this.formUser.value;

  }
  onSaveUser() {
    this.formUser.markAllAsTouched();
    if (!this.formUser.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario imcompleto' });
    } else {
      this.fillContainerLoginUSer(this.formUser);
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
    if (this.loginuser_codeuser != 0) {
      this.userService.saveUser(this.newUSer).then(rest => {
        if (rest) {
          this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
          this.getUsers(null);
          this.getLoginUsers();
          this.getCatalogues();
          this.formUser.reset(this.initialValues);
          this.loginuser_codeuser = 0;
          this.activeIndex1 = 0;
        } else {
          this.messageService.add({ severity: 'error', detail: 'Error al registrar' });
        }
      })
    }

  }
  async fillContainerLoginUSer(form: FormGroup) {
    const genericPasswordNewUser: string = Math.random().toString(36).slice(-8);
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();

    resetBodyEmail.emailTo = this.formUser.controls.email.value;
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.password = genericPasswordNewUser;
    resetBodyEmail.preheader = 'Nuevo usuario - Sislimp';
    resetBodyEmail.subject = 'Nuevo usuario con contraseña generica';
    resetBodyEmail.username = this.formUser.controls.name.value + " " + this.formUser.controls.lastname.value;

    this.loginUser.username = form.controls.username.value;
    this.loginUser.password = genericPasswordNewUser;
    this.loginUser.changepassnextenter = 'YES';
    this.loginUser.status = 'ACTIVO';
    this.loginUser.loginusercol = form.controls.rol.value;

    await this.userService.createLoginUSer(this.loginUser).then(rest => {
      if (rest.codeuser != null && rest.codeuser != 0) this.loginuser_codeuser = rest.codeuser;
    });

    await this.emailService.sendNewGenericPassEmail(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL", rest);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    })
    this.fillContainer(this.formUser);
  }

  getUsers(event: LazyLoadEvent) {
    this.userService.getUsers(localStorage.getItem('role')).then(rest => {
      if (rest.hasOwnProperty('message')) {
        this.messageService.add({ severity: 'error', detail: rest.message });
      } else {
        this.dataFromdb = rest;
        console.log("users", this.dataFromdb);
      }
    });
  }
  getLoginUsers() {
    this.userService.getLoginUsers(localStorage.getItem('role')).then(rest => {
      if (rest.hasOwnProperty('message')) {
        this.messageService.add({ severity: 'error', detail: rest.message });
      } else {
        this.loginUsers = rest;
        console.log("login users", this.loginUsers)
      }
    })
  }
  async getCatalogues() {
    await this.catalogueService.getCataloguebyCodeCat(PROVINCECAT).then(rest => {
      this.dropProvince = this.catalogueService.constructModel(rest);
    });
    await this.catalogueService.getCataloguebyCodeCat(CITYCAT).then(rest => {
      this.dropCityTwo = rest;
    });
  }
  onChangueProvince(event: any) {
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.value).then(rest => {
      this.dropCity = this.catalogueService.constructModel(rest);
    });
  }
  onRowEditInit(user: UserGeneralModel) {
    this.clonedUSer[user.sequser] = { ...user };
  }

  onRowEditSave(user: UserGeneralModel) {
    this.userService.saveUser(user).then(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.getUsers(null);
        this.getLoginUsers();
        this.getCatalogues();
        delete this.clonedUSer[user.sequser];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(user: UserGeneralModel, index: number) {
    this.dataFromdb[index] = this.clonedUSer[user.sequser];
    delete this.clonedUSer[user.sequser];
  }
  deleteUserGeneral(sequser: any, seqloginuser: any) {
    this.userService.deleteUSer(sequser).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' });
        this.getUsers(null);
        this.deleteLoginUserAsosiated(seqloginuser)
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al eliminar' });

      }
    })
  }
  deleteLoginUserAsosiated(seqloginuser: any) {
    this.userService.deleteLoginUser(seqloginuser).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Usuario asosiado eliminado' });
      } else
        this.messageService.add({ severity: 'error', detail: 'Error al eliminar' });
    });
  }
  async resetPassword(data: UserGeneralModel) {
    const genericPassword: string = Math.random().toString(36).slice(-8);
    const loginUserToUpdate: LoginUser = this.loginUsers.find(item => item.codeuser === Number(data.loginuser_codeuser));
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();

    resetBodyEmail.emailTo = data.email;
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.password = genericPassword;
    resetBodyEmail.preheader = 'Resetear Contraseña - Sislimp';
    resetBodyEmail.subject = 'Resetear Contraseña';
    resetBodyEmail.username = data.name + "" + data.lastname;

    loginUserToUpdate.password = genericPassword;
    loginUserToUpdate.changepassnextenter = 'YES';

    await this.userService.updateLoginUSer(loginUserToUpdate).then(rest => {
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
  cancelForm(){
    this.formUser.reset(this.initialValues);
    this.getUsers(null);
    this.activeIndex1 = 0;
  }
}
