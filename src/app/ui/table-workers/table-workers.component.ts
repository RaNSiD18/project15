import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorker } from 'src/app/shared/worker.model';
import { HttpWorkersService } from 'src/app/shared/service/http-workers.service';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();
  @Output() renameWorker = new EventEmitter<number>();
  constructor(private httpWorkersService: HttpWorkersService) { }
  async getData() {
    try {
      this.workers = await this.httpWorkersService.getWorkers();
    } catch(err) {
      console.error(err);
    }
  }
  ngOnInit(): void {
  }

  @Output() editWorker = new EventEmitter<MyWorker>();
  @Output() editById: number;
  onEditWorker(worker: MyWorker) {
    if (worker != null)
      this.editWorker.emit(worker);
    this.closeForm();
    this.getData();
  }
  onRenameWorker(id: number) {
    this.renameWorker.emit(id);
    this.editById = id;
  }
  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
    this.getData();
  }
  closeForm() {
    this.editById = undefined;
  }
}
