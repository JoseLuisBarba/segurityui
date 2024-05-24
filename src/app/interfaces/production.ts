import { SafeUrl } from "@angular/platform-browser";

export interface ProductionItem {
    id: string;
    pin: boolean;
    guid?: SafeUrl;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    utility: number;
    revenue: number;
    due: boolean;
    removed: boolean;
    creationDate: Date;
    dueDate: Date;
}

export interface ProductionsResponse {
    data:  Array<ProductionItem>;
}