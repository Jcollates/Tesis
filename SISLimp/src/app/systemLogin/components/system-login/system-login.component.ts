import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersGeneralService } from 'src/app/page/components/login/users-general.service';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';

@Component({
  selector: 'app-system-login',
  templateUrl: './system-login.component.html',
  styleUrls: ['./system-login.component.css'],
  providers: [MessageService]
})
export class SystemLoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  constructor(
    private loginService: AuthService,
    private userGeneralService: UsersGeneralService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.construcForm();
  }
  construcForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onLogin() {
    this.loginService.login(this.formLogin.value).subscribe(rest => {
      if (rest) {
        this.router.navigate(['system'])
      }
    })
  }

}
