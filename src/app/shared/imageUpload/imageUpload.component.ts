import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './imageUpload.component.html',
  styleUrl: './imageUpload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {


  @Input() imageURL ?: SafeUrl;



}
