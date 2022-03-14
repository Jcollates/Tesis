import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { LegalPerson } from '../../shared/models/legalperson.model';
import { LegalpersonService } from './legalperson.service';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';
import { CataloguesService } from '../../../sharedAll/serviceShared/catalogues.service';
const CODECAT = 'CHARGECAT';

@Component({
  selector: 'app-legalperson',
  templateUrl: './legalperson.component.html',
  styleUrls: ['./legalperson.component.css'],
  providers: [MessageService]
})
export class LegalpersonComponent implements OnInit {

  @Output() legalData: EventEmitter<LegalData> = new EventEmitter();
  @Output() outLegal: EventEmitter<boolean> = new EventEmitter();

  

  formLegalperson: FormGroup = new FormGroup({});
  legalContainer: LegalPerson = new LegalPerson();
  valueCombo: LegalPerson = new LegalPerson();
  options: SelectItem[] = [];
  enableForm: boolean = true;
  dataOut: LegalPerson = new LegalPerson();
  initialState: any;
  drop: SelectItem[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private legalPersonService: LegalpersonService,
    public sharedFuntions: FuntionsSharedService,
    private catalogueService: CataloguesService,


  ) { }

  ngOnInit(): void {
    this.creteForm();
    this.getLegalPersons();
    this.getCatalogues();
  }



  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(CODECAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    });
  }
  prevalidate() {
    if (this.enableForm) {
      this.validateForm();
    } else {
      this.sendDataOut(this.dataOut);
      this.formLegalperson.reset(this.initialState);
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
    }, {validator: this.sharedFuntions.validateLegalPersonDNI('dni')});
    this.initialState = this.formLegalperson.value;
  }
  saveForm(container: LegalPerson) {
    this.legalPersonService.saveLegalPerson(container).subscribe(res => {
      if (res != null) {
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formLegalperson.reset(this.initialState);
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
  outLegalMethod(){
    this.outLegal.emit(true);
    this.formLegalperson.reset(this.initialState);
    this.valueCombo = new LegalPerson();
  }

}
export class LegalData {
  name: string
  lastname: string
  seqlegalperson: number
}
