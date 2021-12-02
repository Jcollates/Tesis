import { Pipe, PipeTransform } from '@angular/core';
import { Provider } from '../models/provider.model';

@Pipe({
  name: 'providerpipe'
})
export class ProviderPipe implements PipeTransform {

  transform(value: unknown, providers: Provider[]): unknown {
    value = value ? value : null;
    let nameItem = value.toString();
    if (providers) {
      providers.forEach((channel) => {
        if (value === channel.seqprovider) {
          nameItem = `${channel.seqprovider + ' - ' + channel.namenterprice}`
          return nameItem
        }
      });
    }
    return nameItem;
  }

}
