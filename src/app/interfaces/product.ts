import { SafeUrl } from "@angular/platform-browser";
import {v4 as uuid} from 'uuid';

export interface ProductItem {
    id: string;
    pin: boolean;
    img?: SafeUrl;
    name: string;
    tag: string;
    cost: number;
    price: number;
    stock: number;
    utility: number;
    percent: number;
    revenue: number;
    due: boolean  ;
    removed: boolean;
    creationDate: Date;
    modificationDate: Date;
}




export interface ProductsResponse {
    data:  Array<ProductItem>;
}