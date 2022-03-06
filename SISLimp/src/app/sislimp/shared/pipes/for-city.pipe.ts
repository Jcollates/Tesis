import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { CatalgogueItem } from '../../../sharedAll/models/catalogue';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
@Pipe({
  name: 'forCityPipe'
})
export class ForCityPipe implements PipeTransform {
  constructor(private catalogueService: CataloguesService,) {
  }
  transform(value: any, codeFather: any, cities: CatalgogueItem[]) {
    value = value ? value.toString() : null;
    let nameItem = value.toString();
    if (cities) {
      cities.forEach(item => {
        if (codeFather === item.codeCatFather && item.nameItem === value) {
          nameItem = `${item.decription}`;
          return nameItem;
        }
      })
    }
    return nameItem;

  }

}
