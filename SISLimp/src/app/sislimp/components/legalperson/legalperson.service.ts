import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalPerson } from '../../shared/models/legalperson.model';

@Injectable({
  providedIn: 'root'
})
export class LegalpersonService {

  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  saveLegalPerson(container:LegalPerson): Observable<LegalPerson>{
    let url = this.url + '/addLegalperson';
    return this.http.post(url, container).pipe(map( res => res as LegalPerson));
  }
  getLegalperson(): Observable<LegalPerson[]>{
    let url = this.url + '/legalperson';
    return this.http.get(url).pipe(map( res => res as LegalPerson[]));
  }
  createSelectItem(legalPersons: LegalPerson[]): SelectItem[] {
    const comboItems: SelectItem[] = [];
    comboItems.push({ label: 'Seleccione', value: 'null' });
    return comboItems.concat(legalPersons.map(value => ({
      label: value.name + ' - ' + value.lastname,
      value: value
    })));
  }
}
