import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input,inject, computed, signal, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TagService } from '@services/tag.service';
import { ProductionService } from '@services/production.service';
import { ProductionItem } from '@interfaces/production';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-edit-production',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editProduction.component.html',
  styleUrl: './editProduction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductionComponent implements OnInit{ 

  @Input({required: true})  productItem!: ProductionItem; 
  @Input() show?: boolean; 

  public tagsService = inject(TagService);
  public itemsService = inject(ProductService);
  public productService = inject(ProductionService);
  public current: number = 35;
  public currentUtility: number = 4.75;

  public showSignal = signal<boolean>(false)
  public showSignal2 = signal<boolean>(false)
  public showCompute = computed(() => this.showSignal());
  public showCompute2 =  computed(() => this.showSignal2());

  submitted = false;

  addForm = new FormGroup(
    {
      name: new FormControl<string>('', [ Validators.required, Validators.minLength(50), Validators.pattern("[a-zA-Z ]*")]),
      creationDate: new FormControl<Date>(new Date(), [ Validators.required]),
      dueDate: new FormControl<Date>(new Date(), [ Validators.required]),
      quantity: new FormControl<number>(0, [ Validators.required, Validators.min(0.00)]),
    }
  );

  ngOnInit(): void {
    this.addForm = new FormGroup(
      {
        name: new FormControl<string>(this.productItem.name, [ Validators.required, Validators.minLength(50), Validators.pattern("[a-zA-Z ]*")]),
        creationDate: new FormControl<Date>(this.productItem.creationDate, [ Validators.required]),
        dueDate: new FormControl<Date>(this.productItem.dueDate, [ Validators.required]),
        quantity: new FormControl<number>(this.productItem.quantity, [ Validators.required, Validators.min(0.00)]),
      }
    );
  }

  constructor(private toastrService: ToastrService) {
  
  }


  get addControls() {
    return this.addForm.controls;
  }

  get placeholderCurrentStock(): number {
    // this.addForm.controls['quantity'].value
    return this.current;
  }

  get placeholderCurrentUtility(): number {
    // this.addForm.controls['quantity'].value
    return this.currentUtility;
  }

  get placeholderPredictedStock(): number {
    // this.addForm.controls['quantity'].value
    const quantity =  Number(this.addForm.controls['quantity'].value)  ?? 0.0 as number;
    const result = quantity  + Number(this.current);
    return result;
  }

  get placeholderPredictedRevenue(): number {
    const quantity =  Number(this.addForm.controls['quantity'].value)  ?? 0.0 as number;
    const result = quantity  * Number(this.currentUtility);
    return result;
  }

  showComputedChangeProduct(){
  }

  showComputedChangeStock(){

  }


  capitalizeName(event: any) {
    let inputValue: string = event.target.value;
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    this.addForm.patchValue({
      name: inputValue
    });
  }

  positiveStock(event: any) {
    let inputValue: number = event.target.value;
    if(inputValue < 0){
      inputValue = inputValue*(-1);
    }
    this.addForm.patchValue({
      quantity: inputValue
    });
  }





  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      return;
    }

    if(this.submitted) {
      const uuid = this.productItem.id;
      const quantity = this.addForm.controls['quantity'].value;
      const revenue = Number(quantity) * Number(this.productService.products()[0].utility);
      const production: ProductionItem = {
        id: uuid,
        pin: false,
        guid: 'assets/images/product/photo/queque_mediano.jpg',
        name: this.addForm.controls['name'].value ?? '',
        cost: this.productService.products()[0].cost,
        price: this.productService.products()[0].price,
        quantity: Number(quantity) ?? 0.0,
        utility: this.productService.products()[0].utility,
        revenue: revenue,
        due: false,
        removed: false,
        creationDate: this.addForm.controls['creationDate'].value ?? new Date(),
        dueDate: this.addForm.controls['dueDate'].value ?? new Date()
      };

    this.productService.addProduct(production);
    console.log('submit');
    this.toastrService.success(`Producción ${this.addForm.controls['name'].value} - ${this.productItem.dueDate} editada.`, '¡Correcto!', { timeOut: 5000 });
  }
    this.submitted = false;
    console.log('cancel');
  }

  onReset(): void {
    this.submitted = false;
    this.addForm.reset();
    console.log('rechazado');
  }




}
