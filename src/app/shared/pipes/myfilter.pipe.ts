import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {
  transform(workers: any[], searchStr: string): any[] {
    if (searchStr === '') {
      return workers;
    } else {
      let filterWorker = workers.filter((worker) =>
        (worker.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) || (worker.surname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1));
      return filterWorker;
    }
  }
}

