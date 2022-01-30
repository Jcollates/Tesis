import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Pipe({
  name: 'selectedItemPipe'
})
export class CityPipePipe implements PipeTransform {

  transform(value: any, items: SelectItem[]): unknown {
    value = value ? value.toString() : null;
    let nameItem = value.toString();
    if (items) {
      items.forEach((item) => {
        if (value === item.value) {
          nameItem = `${item.label}`
          return nameItem
        }
      });
    }
    return nameItem;
  }

}
