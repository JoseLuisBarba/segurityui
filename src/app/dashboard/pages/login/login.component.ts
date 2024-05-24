import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '@shared/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {


  email: string = 'j.barba@pepes.alimentos.com';
  password: string = '1234abcd';

  submitted: boolean = false;
  imageUrl!:SafeUrl; 
  imageBannerUrl!:SafeUrl;
  loginForm = new FormGroup(
    {
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),

    }
  );

  create = new FormGroup(
    {
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    }
  );
  

  constructor(
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const imgRoute = 'assets/images/product/photo/banner.png';
    const imgBannerRoute = 'assets/images/login/login.svg';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
    this.imageBannerUrl = this.sanitizer.bypassSecurityTrustUrl(imgBannerRoute);
  }

  get f() {
    return this.loginForm.controls;
  }

  get f2() {
    return this.create.controls;
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid && this.submitted) {

      const user = this.loginForm.controls['email'].value as string;
      const pass =  this.loginForm.controls['password'].value as string;
      if (user != this.email) {
        this.toastrService.error(`Correo electrónico ingresado no encontrado.`, '¡Error!', { timeOut: 5000 });   
      }
      else if (pass !== this.password) {
        this.toastrService.error(`Contraseña ingresada no válida.`, '¡Error!', { timeOut: 5000 });
      } else if (user === '' || pass === '') {
        this.toastrService.error(`Llene todos los campos.`, '¡Error!', { timeOut: 5000 });
      }
      
      else {
        this.toastrService.success(`Iniciando sesión`, '¡Correcto!', { timeOut: 5000 });
        this.router.navigate(['/dashboard'])
        
      }
      
      
    }


    this.submitted = false;
    console.log(this.loginForm.value);
  }
  onSubmit2(): void {
    console.log(this.loginForm.value);
  }
}
