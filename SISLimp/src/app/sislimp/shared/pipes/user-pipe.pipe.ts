import { Pipe, PipeTransform } from '@angular/core';
import { LoginUser } from '../../../sharedAll/models/usergeneral.model';

@Pipe({
  name: 'userRolePipe'
})
export class UserPipePipe implements PipeTransform {

  transform(value: string, loginusers: LoginUser[]): unknown {
    value = value ? value : null;
    let nameItem = value.toString();
    if (loginusers) {
      loginusers.forEach((user) => {
        if (value === user.codeuser.toString()) {
          nameItem = `${user.loginusercol}`
          return nameItem
        }
      });
    }
    return nameItem;
  }

}
