import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';
@Pipe({
  name: 'solistatus'
})
export class SolistatusPipe implements PipeTransform {

  transform(value: unknown, solis: SelectItem[]): unknown {
    value = value ? value : '';
    let nameItem = value.toString();
    if (solis) {
      solis.forEach((sol) => {
        if (value === sol.value) {
          nameItem = `${sol.label}`
          return nameItem
        }
      });
    }
    return nameItem;
  }

}
