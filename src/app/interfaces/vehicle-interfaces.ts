export interface VehiclesResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Vehicle[];
    support:     Support;
}


export interface VehicleResponse {
    data:    Vehicle;
    support: Support;
}

export interface Vehicle {
    id:         number;
    licensePlate: string;
    model: string;
    vel:  string;
    cap: string;
    flete: number;
    img:     string;
    createdOn: string;
}

export interface Support {
    url:  string;
    text: string;
}