export interface MyWorker{
    name: string;
    surname: string;
    type: number;
    id?: number;
    phone: string;
}

export enum MyWorkerType{
    programmer,
    designer,
    copywriter,
    manager,
}

