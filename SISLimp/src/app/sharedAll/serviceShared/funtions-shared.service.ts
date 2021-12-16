import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuntionsSharedService {

  constructor() { }
  repair(imgs: any) {
    let TYPED_ARRAY: Uint8Array;
    if (imgs != null || imgs != undefined) TYPED_ARRAY = new Uint8Array(imgs?.data);
    let STRING_CHAR = new TextDecoder().decode(TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    let base64Stringtwo = atob(base64String);
    return base64Stringtwo;

  }
}
