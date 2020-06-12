import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from './shared/worker.model';
import { HttpWorkersService } from 'src/app/shared/service/http-workers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Список сотрудниов';
  workers: MyWorker[];
  myWorkerType = MyWorkerType;
  searchStr = '';

  constructor(private httpWorkersService: HttpWorkersService) {}

  renameWorker: MyWorker = { name: undefined, surname: undefined, type: 0 , phone: undefined};

  getByType(type: number){
    return this.workers.filter((worker) => worker.type === type);
  }
  onEditWorker(worker: MyWorker) {
    this.editWorker(worker);
  }

  onDeleteWorker(id: number) {
    this.deleteWorker(id);
  }
 
  isLoaded = false;
  ngOnInit() {
    this.getData().then(() => {
      this.isLoaded = true;
    });
  }

  onRenameWorker(id: number) {
    let index = this.workers.findIndex((item) => item.id === id);
    this.renameWorker.id = id;
    this.renameWorker.name = this.workers[index].name;
    this.renameWorker.surname = this.workers[index].surname;
    this.renameWorker.type = this.workers[index].type;
    this.renameWorker.phone = this.workers[index].phone;
  }

  onAddWorker(worker: MyWorker){
    if (this.isLoaded)
    if (worker.id == null) {
      let id = this.workers.length > 0 ? this.workers[this.workers.length - 1].id + 1: 1;
      worker.id = id;
      this.postWorker(worker);
    } else {
      let index = this.workers.findIndex((item) => item.id === worker.id);
      if (index !== -1) {
        this.deleteWorker(index);
      }
      this.postWorker(worker);
      this.workers.sort((left, right) => left.id - right.id);
    }
  }

  async getData() {
    try {
      this.workers = await this.httpWorkersService.getWorkers();
    } catch(err) {
      console.error(err);
    }
  }
  async postWorker(worker: MyWorker) {
    try {
      await this.httpWorkersService.postWorker(worker);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
  async editWorker(worker: MyWorker) {
    try {
      await this.httpWorkersService.editWorker(worker);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
  async deleteWorker(id: number) {
    try {
      await this.httpWorkersService.deleteWorker(id);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
}
