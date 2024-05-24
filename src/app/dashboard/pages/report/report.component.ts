import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { interval, Subscription } from 'rxjs';

interface State {
  products: Array<any>,
  ventas: Array<Sale>
  loading: boolean
}

interface Sale {
  name: string,
  series: Array<any>
}


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportComponent implements OnInit, OnDestroy {


  

  saleData = [
    {
      "name": "Queque Grande",
      "value": 102,
    },
    {
      "name": "Queque Mediano",
      "value": 100,
    },
    {
      "name": "Quequitos",
      "value": 112,
    },
    {
      "name": "Piono",
      "value": 140,
    },
    {
      "name": "Huevos",
      "value": 198.60,
    },
    {
      "name": "Carne de gallina",
      "value": 20,
    }
  ];

  multi: Sale[] = [
    {
      name: 'Queque Grande',
      series: [
        { name: new Date('2024-04-01'), value: 100 },
        { name: new Date('2024-04-02'), value: 120 },
        { name: new Date('2024-04-03'), value: 150 },
        { name: new Date('2024-04-04'), value: 120 },
        { name: new Date('2024-04-05'), value: 120 },
        { name: new Date('2024-04-06'), value: 103 },
        { name: new Date('2024-04-07'), value: 112 }
      ]
    },
    {
      name: 'Huevos',
      series: [
        { name: new Date('2024-04-01'), value: 143 },
        { name: new Date('2024-04-02'), value: 150 },
        { name: new Date('2024-04-03'), value: 145 },
        { name: new Date('2024-04-04'), value: 148 },
        { name: new Date('2024-04-05'), value: 155 },
        { name: new Date('2024-04-06'), value: 142 },
        { name: new Date('2024-04-07'), value: 148 }
      ]
    },
    {
      name: 'Queque Mediano',
      series: [
        { name: new Date('2024-04-01'), value: 143 },
        { name: new Date('2024-04-02'), value: 150 },
        { name: new Date('2024-04-03'), value: 145 },
        { name: new Date('2024-04-04'), value: 148 },
        { name: new Date('2024-04-05'), value: 155 },
        { name: new Date('2024-04-06'), value: 142 },
        { name: new Date('2024-04-07'), value: 148 }
      ]
    },
    {
      name: 'Quequitos',
      series: [
        { name: new Date('2024-04-01'), value: 33 },
        { name: new Date('2024-04-02'), value: 20 },
        { name: new Date('2024-04-03'), value: 45 },
        { name: new Date('2024-04-04'), value: 98 },
        { name: new Date('2024-04-05'), value: 25 },
        { name: new Date('2024-04-06'), value: 42 },
        { name: new Date('2024-04-07'), value: 48 }
      ]
    },
    {
      name: 'Carne de Gallina',
      series: [
        { name: new Date('2024-04-01'), value: 12 },
        { name: new Date('2024-04-02'), value: 12 },
        { name: new Date('2024-04-03'), value: 105 },
        { name: new Date('2024-04-04'), value: 108 },
        { name: new Date('2024-04-05'), value: 12 },
        { name: new Date('2024-04-06'), value: 26 },
        { name: new Date('2024-04-07'), value: 18 }
      ]
    },
    {
      name: 'Piononos',
      series: [
        { name: new Date('2024-04-01'), value: 43 },
        { name: new Date('2024-04-02'), value: 50 },
        { name: new Date('2024-04-03'), value: 45 },
        { name: new Date('2024-04-04'), value: 48 },
        { name: new Date('2024-04-05'), value: 55 },
        { name: new Date('2024-04-06'), value: 42 },
        { name: new Date('2024-04-07'), value: 48 }
      ]
    }
  ];


  state = signal<State>({
    loading: true,
    products: this.saleData,
    ventas: this.multi,
  });

  public products = computed( () => this.state().products );
  public sales = computed( () => this.state().ventas );
  public loading = computed( () => this.state().loading );

  private dataUpdateSubscription: Subscription;

  constructor() {
    this.dataUpdateSubscription = new Subscription();
  }

  ngOnInit(): void {
    // Iniciar la actualización de los datos cada 5 segundos
    this.dataUpdateSubscription = interval(3000).subscribe(() => {
      this.updateData();
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse del intervalo al destruir el componente para evitar memory leaks
    this.dataUpdateSubscription.unsubscribe();
  }

  private updateData(): void {
    // Generar un número aleatorio y agregarlo a uno de los valores existentes

    

    const lastDate = this.sales()[0].series[this.sales()[0].series.length - 1].name;
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1); 

    let saledata = this.sales().slice();

    saledata[0].series.push(
        { name: nextDate, value: Math.floor(Math.random() * 180) + 35 }
    );
    saledata[1].series.push(
        { name: nextDate, value: Math.floor(Math.random() * 200) + 35 }
    );
    saledata[2].series.push(
      { name: nextDate, value: Math.floor(Math.random() * 80) + 35 }
    );
    saledata[3].series.push(
        { name: nextDate, value: Math.floor(Math.random() * 80) + 35 }
    );
    saledata[4].series.push(
      { name: nextDate, value: Math.floor(Math.random() * 50) + 0 }
    );
    saledata[5].series.push(
      { name: nextDate, value: Math.floor(Math.random() * 60) + 15 }
    );



    this.state.update(
      value => ({
        ...value,
        products: [
          {
            "name": "Queque Grande",
            "value": Math.floor(Math.random() * 160) + 1,
          },
          {
            "name": "Queque Mediano",
            "value": Math.floor(Math.random() * 160) + 1,
          },
          {
            "name": "Quequitos",
            "value": Math.floor(Math.random() * 160) + 1,
          },
          {
            "name": "Piono",
            "value": Math.floor(Math.random() * 160) + 1,
          },
          {
            "name": "Huevos",
            "value": Math.floor(Math.random() * 160) + 1,
          },
          {
            "name": "Carne de gallina",
            "value": Math.floor(Math.random() * 160) + 1,
          }
        ],
        ventas: saledata
      }),
 
    );

    // Clonar el array para forzar a Angular a detectar el cambio en los datos
    
  }
}
