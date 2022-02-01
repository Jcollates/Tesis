import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursPipe'
})
export class HoursPipePipe implements PipeTransform {

  transform(value: number): unknown {
    value = value ? Number(value) : 0;
    let Days = value/ 24;
    return Days.toFixed(1);
  }

}
