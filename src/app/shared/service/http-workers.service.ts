import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyWorker } from '../worker.model';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkersService {
  routeApi = "http://localhost:3000/workers";
  constructor(private http: HttpClient) { }

  getWorkers() : Promise<any> {
    return this.http.get(this.routeApi).toPromise();
  }
  postWorker(data: MyWorker) {
    return this.http.post(this.routeApi, data).toPromise();
  }
  editWorker(worker: MyWorker) {
    this.http.put(`${this.routeApi}/${worker.id}`, worker).toPromise();
  }
  deleteWorker(id: number) {
    this.http.delete(`${this.routeApi}/${id}`).toPromise();
  }
}

