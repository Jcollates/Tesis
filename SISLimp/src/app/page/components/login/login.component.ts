import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  active;
  formLogin: FormGroup = new FormGroup({});
  cities: any[] = [];
  provinces: any[] = [];
  constructor(
    private loginService: AuthService, 
    private formBuilder: FormBuilder,
    private  router: Router
  ) { }

  ngOnInit() {
    this.active = 1;
    this.construcForm();
    this.cities = [
      { name: 'Ciudad 1', code: 1 },
      { name: 'Ciudad 2', code: 2 },
      { name: 'Ciudad 3', code: 3 },
    ]
    this.provinces = [
      { name: 'Provincia 1', code: 1 },
      { name: 'Provincia 2', code: 2 },
      { name: 'Provincia 3', code: 3 },
    ]
    console.log(this.cities);
  }
  construcForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onLogin(){
    this.loginService.login(this.formLogin.value).subscribe(rest =>{
      if(rest){
        this.router.navigate(['user'])
      }
    })
  }

}
