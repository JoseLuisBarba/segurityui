import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input,inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TagService } from '@services/tag.service';
import { ProductService } from '@services/product.service';
import { ProductItem } from '@interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addProduct.component.html',
  styleUrl: './addProduct.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddProductComponent{
  
  @Input() show?: boolean; 

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


  constructor(private toastrService: ToastrService) {
    
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
    this.toastrService.success(`Producto ${this.addForm.controls['name'].value} creado`, '¡Correcto!', { timeOut: 5000 })
  }

  onReset(): void {
    this.submitted = false;
    this.addForm.reset();
    console.log('rechazado');
  }

  
}
