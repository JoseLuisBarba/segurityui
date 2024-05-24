import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  signal, computed, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductItem } from '@interfaces/product';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { FormsModule,  } from '@angular/forms';
import AddProductComponent from './addProduct/addProduct.component';
import { ProductService } from '@services/product.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditarProductoComponent } from './editarProducto/editarProducto.component';


interface Column {
  icon: SafeUrl,
  name: string,
  dataPopover: string,
  isAscending: boolean,
  sort?: (isAscending: boolean) => void
}


interface Filter {
  name: string,
  options: number,
}

interface OptionFilter {
  name: string,
  options: number,
  input: string,
}


interface Inference {
  name: string,
  option: OptionFilter[],
  numValue: number,
  strValue: string,
  value?: any
}


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddProductComponent,
    DeleteComponent,
    EditarProductoComponent,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductTableComponent {

  columns_array: Array<Column> = [
    {
      icon: this.getIcon('assets/images/product/bread.svg'),
      name: 'Producto',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, isAscending)})) 
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/tag.svg'),
      name: 'Tipo',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.tag, b.tag, isAscending)})) 
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/cost.svg'),
      name: 'Costo',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.ascendingComparation(a.cost, b.cost, isAscending)}))
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/price.svg'),
      name: 'Precio',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.ascendingComparation(a.price, b.price, isAscending)}))
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/utility.svg'),
      name: 'Utilidad',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.ascendingComparation(a.utility, b.utility, isAscending)}))
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/quantity.svg'),
      name: 'x Stock',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.ascendingComparation(a.stock, b.stock, isAscending)}))
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/neto-value.svg'),
      name: 'Valor Neto',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean= true) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.ascendingComparation(a.revenue, b.revenue, isAscending)}))
          })
        );
      }
    },
    {
      icon: this.getIcon('assets/images/product/actions.svg'),
      name: 'Acciones',
      dataPopover: '',
      isAscending: true,
      sort: (isAscending: boolean= true) =>  {
        if (!this.productService.products()) {
          return ;
        }
        this.productService.state.update(
          value => ({
            ...value,
            products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, isAscending)})) 
          })
        );
      }
    },
  ];

  public filters: Array<Inference> = [];

  public columnasFilters: Array<Filter> = [ {
      name: 'Producto',
      options: 1,
    }, {
      name: 'Tipo',
      options: 2,
    }, {
      name: 'Costo',
      options: 3,
    }, {
      name: 'Precio',
      options: 4,
    }, {
      name: 'Utilidad',
      options: 5,
    }, {
      name: 'X Stock',
      options: 6,
    }, {
      name: 'Valor Neto',
      options: 7,
    } 
  ];
  
  private productService = inject(ProductService);
  public showFiltersSignal = signal({
    value: false
  }); 


  addIconUrl!: SafeUrl;
  sigmaIconUrl!: SafeUrl;
  pinIconUrl!: SafeUrl;
  sortIconUrl!: SafeUrl;
  excelIconUrl!:SafeUrl;
  editIconUrl!:SafeUrl;
  removeIconUrl!:SafeUrl;

  tagNumber!: number;

  //signals
  public aggregationDataSignal = signal({
    data: this.productService.state().products.filter(x => x.pin).slice().concat(this.productService.state().products.filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, true)})) ,
    numberTags: 0,
    numberCost: 0,
    numberPrice: 0,
    numberStock: 0,
    numberRevenue: 0,
  });

  //computed
  public tagNumberData = computed(
    () => this.updateTagNumber()
  );
  public costNumberData = computed(
    () => this.updateCostNumber()
  );
  public priceNumberData = computed(
    () => this.updatePriceNumber()
  );
  public stockNumberData = computed(
    () => this.updateStockNumber()
  );
  public revenueNumberData = computed(
    () => this.updateRevenueNumber()
  );
  public productData = computed(
    () => this.productService.state().products
  );

  public showFilters = computed(
    () => this.showFiltersSignal().value
  )



  constructor(private sanitizer: DomSanitizer) {
    this.sigmaIconUrl = this.getIcon('assets/images/product/sigma.svg');
    this.pinIconUrl = this.getIcon('assets/images/product/pin.svg');
    this.sortIconUrl = this.getIcon('assets/images/icons/sort.svg');
    this.excelIconUrl = this.getIcon('assets/images/product/excel.svg');
    this.editIconUrl = this.getIcon('assets/images/icons/edit.svg');
    this.removeIconUrl = this.getIcon('assets/images/icons/remove.svg');
    this.updateTagNumber();
    this.updateCostNumber();
    this.updatePriceNumber();
    this.updateStockNumber();
    this.updateRevenueNumber();
    this.productService.state.update(
      value => ({
        ...value,
        products: this.productService.products().filter(x => x.pin).slice().concat(this.productService.products().filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, true)})) 
      })
    );
  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      (modalElement as any).showModal(); 
    }
  }

  onPinChange(productItem: ProductItem, index: number, newValue: boolean): void {
    productItem.pin = newValue;
    this.productService.changePin(productItem, index);
  }

  updateRevenueNumber(): number {
    return  this.productService.products().reduce((sumRevenue: number, currProduct: ProductItem) => {
      return sumRevenue + currProduct.revenue;
    }, 0);
  }

  updateStockNumber(): number {
    return this.productService.products().reduce((sumStock: number, currProduct: ProductItem) => {
      return sumStock + currProduct.stock;
    }, 0);
  }

  updatePriceNumber(): number {
    return this.productService.products().reduce((sumPrice: number, currProduct: ProductItem) => {
      return sumPrice + currProduct.price;
    }, 0);
  }

  updateCostNumber(): number {
    return this.productService.products().reduce((sumCost: number, currProduct: ProductItem) => {
      return sumCost + currProduct.cost;
    }, 0);
  }

  updateTagNumber(): number {
    const tags = new Set(this.productService.products().map(p => p.tag));
    return  tags.size;
  }

  // sort methods


  ascendingComparation(a: number, b: number, isAscending: boolean= true) : number {
    const valA = a ?? 0;
    const valB = b ?? 0;
    return (valA - valB) * (isAscending ? 1 : -1);
  }

  azComparation(a: string, b: string, isAscending: boolean= true): number {
    const valA = a?.toLocaleLowerCase() || '';
    const valB = b?.toLocaleLowerCase() || '';
    return valA.localeCompare(valB) * (isAscending ? 1 : -1);
  }

  getIcon(iconRoute: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(iconRoute);
  }

  handleSort(item: Column): void {

    if (item.sort) {
      item.sort(item.isAscending); 
      if (item.isAscending) {
        item.isAscending = false;
      } else {
        item.isAscending = true;
      }
    }

  }

  showfiltersAction(): void {
      if(!this.showFilters()) {
        this.showFiltersSignal.update((value) => ({ value: true }));

      } else {
        this.showFiltersSignal.update((value) => ({ value: false}));
      } 
  }

  addFilter(): void {
    this.filters.push({
      name: '',
      option: [{
        name: '',
        options: 0,
        input: '',
      }],
      numValue: 0,
      strValue: ''
    });
  }

  removeFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  selectColFilter(event: any, index: number): void {



    const option = parseInt(event.target.value, 10); 
     
    if (typeof option === 'number') {

      let strInputs = [{
        name: 'igual',
        options: 1,
        input: 'select',
      },{
        name: 'no igual',
        options: 2,
        input: 'select',
      },{
        name: 'contiene',
        options: 3,
        input: 'textbox',
      }];

      let numericInputs = [{
        name: 'igual',
        options: 4,
        input: 'numbox',
      },{
        name: 'no igual',
        options: 5,
        input: 'numbox',
      },{
        name: 'mayor',
        options: 6,
        input: 'numbox',
      },{
        name: 'mayor igual',
        options: 7,
        input: 'numbox',
      },{
        name: 'menor',
        options: 8,
        input: 'numbox',
      },{
        name: 'menor igual',
        options: 9,
        input: 'numbox',
      }];

      switch (option) {
        case 1:
          this.filters[index] = {
            name: 'Producto',
            option: strInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 2:
          this.filters[index] = {
            name: 'Tipo',
            option: strInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 3:
          this.filters[index] = {
            name: 'Costo',
            option: numericInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 4:
          this.filters[index] = {
            name: 'Precio',
            option: numericInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 5:
          this.filters[index] = {
            name: 'Utilidad',
            option: numericInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 6:
          this.filters[index] = {
            name: 'X Stock',
            option: numericInputs,
            numValue: 0,
            strValue: ''
          }
          break;
        case 7:
          this.filters[index] = {
            name: 'Valor Neto',
            option: numericInputs,
            numValue: 0,
            strValue: ''
          }
          break;

        default:
          console.log("Invalid option");
          break;
      }

      

    } else {
      console.log("Invalid option: not a number");
    }
  }

  selectOptionFilter(event: any, index: number): void {
    const option = parseInt(event.target.value, 10);
    this.filters[index].numValue = option;
  }


  hashKey(atr: string): string {
    switch(atr) {
      case 'Producto':
        return 'name';
      case 'Tipo':
        return 'tag';
      case 'Costo':
        return 'cost';
      case 'Precio':
        return 'price';
      case 'Utilidad':
        return 'utility';
      case 'X Stock':
        return 'stock';
      case 'Valor Neto':
        return 'revenue';
      default:
        return '';
    }
  }

  inferenceValue(value1: any, value2: any, numInference: number): boolean {
    switch(numInference) {
      case 1:
        return value1 == value2;
      case 2:
        return value1 != value2;
      case 3:
        return value1 == value2;
      case 4:
        return value1 as Number == value2 as Number;
      case 5:
        return value1 as Number != value2 as Number;
      case 6:
        value1 = value1 as Number;
        value2 = value2 as Number;
        return value1  > value2 ;
      case 7:
        value1 = value1 as Number;
        value2 = value2 as Number;
        return value1  >= value2 ;
      case 8:
        value1 = value1 as Number;
        value2 = value2 as Number;
        return value1  < value2 ;
      case 9:
        value1 = value1 as Number;
        value2 = value2 as Number;
        return value1 <= value2 ;
      default:
        return false;
    }
  }

  updateFilterValue(event: any, index: number, atr: string): void {
    let key: string = '';
    key = this.hashKey(atr);
    if(key !== ''){
      this.filters[index].value = event.target.value;
      console.log(key);
    }
  }

  getColumnsValues(index: number, atr: string): Array<any> {
    const  uniques = new Set();
    let key: string = '';

    key = this.hashKey(atr);
    
    if(key !== '') {
      this.productService.products().forEach( (obj) => {
        const value = obj[key as keyof ProductItem];
        uniques.add(value);
      })
      return Array.from(uniques);
    }
    return [];
  } 

  inferenceSentence(val1: any): boolean {
    let p: boolean = true;


    for (let i: number = 0; i < this.filters.length; i++) {
      const numVal = this.filters[i].numValue;
      const value = this.filters[i].value;
      let key = this.hashKey(this.filters[i].name) 

      key = key as keyof ProductItem;
      console.log(numVal, value, key, this.filters[i].name);


      p = this.inferenceValue(val1[key], value, numVal);
         
    }
    return p;
  }

  async search()  {
    const data = this.productService.products().slice().filter((item) => this.inferenceSentence(item));
    this.productService.seeChanges(data);
  }


  exportExcel(): void {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('productos_data');
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Nombre', key: 'name', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Tipo', key: 'tag', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Costo', key: 'cost', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Price', key: 'price', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Stock', key: 'stock', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Utilidad', key: 'utility', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'Porcentaje', key: 'percent', width: 32, style: { font: { name: 'Arial Black', size:10} } },
      { header: 'ValorNetoActual', key: 'revenue', width: 32, style: { font: { name: 'Arial Black', size:10} } },
    ];
    this.productData().forEach( e => {
        worksheet.addRow({
          id: e.id,
          name: e.name,
          tag: e.tag,
          cost: e.cost,
          price: e.price,
          stock: e.stock,
          utility: e.utility,
          percent: e.percent,
          revenue: e.revenue,
        },"n");
    });

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'productos_data.xlsx');
    });
   
  }

}
