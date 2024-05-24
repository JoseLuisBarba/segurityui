import { CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, Input,OnInit,inject, OnDestroy} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TagService } from '@services/tag.service';
import { ProductService } from '@services/product.service';
import { ProductItem } from '@interfaces/product';
import { ImageUploadComponent } from '@shared/imageUpload/imageUpload.component';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadComponent
  ],
  templateUrl: './editarProducto.component.html',
  styleUrl: './editarProducto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarProductoComponent  implements OnInit, OnDestroy{

  @Input({required: true})  productItem!: ProductItem; 

  public tagsService = inject(TagService);
  public productService = inject(ProductService);

  submitted = false;

  addForm = new FormGroup(
    {
      name: new FormControl<string>('', [ Validators.required, Validators.minLength(50), Validators.pattern("[a-zA-Z ]*")]),
      tag: new FormControl<string>('', [ Validators.required, Validators.maxLength(15)]),
      cost: new FormControl<number>(0.00, [ Validators.required, Validators.min(0.00)]),
      price: new FormControl<number>(0.00, [ Validators.required, Validators.min(0.00)]),
    }
  );

  ngOnInit(): void {
    this.addForm = new FormGroup(
      {
        name: new FormControl<string>(this.productItem.name, [ Validators.required, Validators.minLength(50), Validators.pattern("[a-zA-Z ]*")]),
        tag: new FormControl<string>(this.productItem.tag, [ Validators.required, Validators.maxLength(15)]),
        cost: new FormControl<number>(this.productItem.cost, [ Validators.required, Validators.min(0.00)]),
        price: new FormControl<number>(this.productItem.price, [ Validators.required, Validators.min(0.00)]),
      }
    );
  }

  constructor() {

  }


  get addControls() {
    return this.addForm.controls;
  }

  get placeholderText(): string {
    // Calcula la diferencia entre price y cost
    const price = this.addForm.controls['price'].value ?? 0;
    const cost = this.addForm.controls['cost'].value ?? 0;
    const difference = price - cost;

    // Retorna la expresión como texto para el placeholder
    return `${difference}`;
  }

  capitalizeName(event: any) {
    let inputValue: string = event.target.value;
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    this.addForm.patchValue({
      name: inputValue
    });
  }

  positiveCost(event: any) {
    let inputValue: number = event.target.value;
    if(inputValue < 0){
      inputValue = inputValue*(-1);
    }
    
    this.addForm.patchValue({
      cost: inputValue
    });
  }
  positivePrice(event: any) {
    let inputValue: number = event.target.value;
    if(inputValue < 0){
      inputValue = inputValue*(-1);
    }
    
    this.addForm.patchValue({
      price: inputValue
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      return;
    }

    if(this.submitted) {
      const myId = crypto.randomUUID();
      const cost = this.addForm.controls['cost'].value ?? 1;
      const price  =  this.addForm.controls['price'].value ?? 1;
      const utitiliy = price - cost;

      const product: ProductItem = {
        id: myId,
        pin: false,
        img: 'assets/images/product/photo/queque_mediano.jpg',
        name: this.addForm.controls['name'].value ?? '',
        tag: this.addForm.controls['tag'].value ?? '',
        cost: this.addForm.controls['cost'].value ?? 0.00,
        price: this.addForm.controls['price'].value ?? 0.00,
        stock: 0,
        utility: utitiliy ?? 0,
        percent: utitiliy * 100 / price,
        revenue: 0 * utitiliy,
        due: false,
        removed: false,
        creationDate:  new Date(),
        modificationDate:  new Date()
      };
      this.productService.addProduct(product);
      console.log('submit');
    }
    this.submitted = false;
  }

  onReset(): void {
    this.submitted = false;
    this.addForm.reset();
    console.log('rechazado');
  }
 ngOnDestroy(): void {
     
 }
  

}
