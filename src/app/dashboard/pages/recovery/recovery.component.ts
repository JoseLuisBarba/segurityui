import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '@shared/header/header.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecoveryComponent {

  imageUrl!:SafeUrl; 
  imageIconUrl!:SafeUrl;
  recoveryForm = new FormGroup(
    {
      email: new FormControl('', [ Validators.required, Validators.email]),
    }
  );
  

  constructor(
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) {
    const imgRoute = 'assets/images/product/photo/banner.png';
    const imgProtec = 'assets/images/product/photo/protec.svg';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
    this.imageIconUrl = this.sanitizer.bypassSecurityTrustUrl(imgProtec);
  }

  get f() {
    return this.recoveryForm.controls;
  }

  onSubmit(): void {
    this.toastrService.success(`Enlace de confirmación enviado. Revise su corro.`, '¡Listo!', { timeOut: 5000 });
  }



}
