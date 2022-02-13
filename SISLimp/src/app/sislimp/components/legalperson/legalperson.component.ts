import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { LegalPerson } from '../../shared/models/legalperson.model';
import { LegalpersonService } from './legalperson.service';

@Component({
  selector: 'app-legalperson',
  templateUrl: './legalperson.component.html',
  styleUrls: ['./legalperson.component.css'],
  providers: [MessageService]
})
export class LegalpersonComponent implements OnInit {

  @Output() legalData: EventEmitter<LegalData> = new EventEmitter();

  formLegalperson: FormGroup = new FormGroup({});
  legalContainer: LegalPerson = new LegalPerson();
  valueCombo: LegalPerson = new LegalPerson();
  options: SelectItem[] = [];
  enableForm: boolean = true;
  dataOut: LegalPerson = new LegalPerson()
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private legalPersonService: LegalpersonService
  ) { }

  ngOnInit(): void {
    this.creteForm();
    this.getLegalPersons();
  }
  prevalidate() {
    if (this.enableForm) {
      this.validateForm();
    } else {
      this.sendDataOut(this.dataOut);
      this.formLegalperson.reset();
    }
  }
  validateForm() {
    this.formLegalperson.markAllAsTouched();
    if (!this.formLegalperson.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      console.log('FORM', this.formLegalperson.value);
    } else {
      this.legalContainer.dni = this.formLegalperson.controls.dni.value;
      this.legalContainer.name = this.formLegalperson.controls.name.value;
      this.legalContainer.lastname = this.formLegalperson.controls.lastname.value;
      this.legalContainer.position = this.formLegalperson.controls.position.value;
      this.legalContainer.homeadrees = this.formLegalperson.controls.address.value;
      this.legalContainer.phonenumber = this.formLegalperson.controls.phone.value;
      this.saveForm(this.legalContainer);
    }
  }

  creteForm() {
    this.formLegalperson = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  saveForm(container: LegalPerson) {
    this.legalPersonService.saveLegalPerson(container).subscribe(res => {
      if (res != null) {
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formLegalperson.reset();
        this.sendDataOut(res);
      }
    })
  }

  sendDataOut(rest: LegalPerson) {
    const data = new LegalData();
    data.name = rest.name;
    data.lastname = rest.lastname;
    data.seqlegalperson = rest.seqlegalperson;
    this.legalData.emit(data);
  }
  getLegalPersons() {
    this.legalPersonService.getLegalperson().subscribe(rest => {
      if (rest.length > 0) {
        this.options = this.legalPersonService.createSelectItem(rest);
      }
    })
  }
  onChangeCombo(event: any) {
    if (event) {
      if (event.value != null + "") {
        this.enableForm = false;
        this.dataOut = event.value;
        this.formLegalperson.disable();
      } else {
        this.enableForm = true;
        this.formLegalperson.enable();

      }
    }
  }

  // this.formLegalperson.patchValue({
  //   dni: data.dni,
  //   name:  data.name,
  //   lastname: data.lastname,
  //   position: data.position,
  //   address: data.homeadrees,
  //   phone: data.phonenumber
  // })



}
export class LegalData {
  name: string
  lastname: string
  seqlegalperson: number
}
