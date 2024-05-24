import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '@shared/header/header.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './userCreate.component.html',
  styleUrl: './userCreate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class UserCreateComponent { 

  imageUrl!:SafeUrl; 
  imageBannerUrl!:SafeUrl;
  loginForm = new FormGroup(
    {
      username: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      dni: new FormControl('', [ Validators.required, Validators.minLength(7)]),
      birthdate: new FormControl('', [ Validators.required ]),
      phone: new FormControl('', [ Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    }
  );
  

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    const imgRoute = 'assets/images/create-user/make-decisions.jpg';
    const imgBannerRoute = 'assets/images/login/login.svg';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
    this.imageBannerUrl = this.sanitizer.bypassSecurityTrustUrl(imgBannerRoute);
  }

  

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }

}
