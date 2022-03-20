import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersGeneralService } from '../../page/components/login/users-general.service';
import { CataloguesService } from './catalogues.service';
import { CatServiceService } from '../../sislimp/components/catalogo-services/cat-service.service';
import { EmployeeService } from '../../sislimp/components/gestion-empleados/employee.service';
import { LegalpersonService } from '../../sislimp/components/legalperson/legalperson.service';
import { ProviderService } from '../../sislimp/components/gestion-provedores/provider.service';
import { ProductosService } from '../../sislimp/components/gestion-inventario-products/productos.service';

@Injectable({
  providedIn: 'root'
})
export class FuntionsSharedService {

  constructor(
    private loginUserService: UsersGeneralService,
    private catService: CatServiceService,
    private employeeService: EmployeeService,
    private legalpersonService: LegalpersonService,
    private providerService: ProviderService,
    private productosService: ProductosService
  ) { }
  repair(imgs: any) {
    let TYPED_ARRAY: Uint8Array;
    if (imgs != null || imgs != undefined) TYPED_ARRAY = new Uint8Array(imgs?.data);
    let STRING_CHAR = new TextDecoder().decode(TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    let base64Stringtwo = atob(base64String);
    return base64Stringtwo;
  }
  enterOnlyNumbers(evt: any) {
    if (window.onkeyup) {
      var keynum = evt.keyCode;
    } else {
      keynum = evt.which;
    }
    // Comprobamos si se encuentra en el rango numérico y que teclas no recibirá ascii.
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6) {
      return true;
    } else {
      //incorporar mensaje
      return false;
    }
  }
  emailValidator(emailControl: string) {
    // external validator
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[emailControl];
      if (control.errors && !control.errors.mustMatch) {
        return;
      }
      if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(control?.value)) {
        control.setErrors(null);
      } else {
        control.setErrors({ mustMatch: 'Correo incorrecto' });
      }
    }
  }
  validateUsername(userNameControl: string){
    return (form: FormGroup) => {
      const control = form.controls[userNameControl];
      if (control.errors && !control.errors.userNameFound) {
        return;
      }
      this.loginUserService.validateUsername(control?.value).then( rest => {
        if(rest.code !== '01'){
          control.setErrors(null);
        } else {
          control.setErrors({userNameFound: 'El usuario existe'})
        }
      })
    }
  }
  validateCatService(codeService: string){
    return (form: FormGroup) => {
      const control = form.controls[codeService];
      if (control.errors && !control.errors.codeService) {
        return;
      }
      this.catService.getCatServicesByCodeExist(control?.value).then( rest => {
        if(!rest){
          control.setErrors(null);
        } else {
          control.setErrors({codeService: 'El servico existe'})
        }
      })
    }
  }
  validateEmployeeDNI(dni: string){
    return (form: FormGroup) => {
      const control = form.controls[dni];
      if (control.errors && !control.errors.dni) {
        return;
      }
      this.employeeService.getEmployByDni(control?.value).then( rest => {
        if(!rest){
          control.setErrors(null);
        } else {
          control.setErrors({dni: 'El empleado existe'})
        }
      })
    }
  }
  validateLegalPersonDNI(dni: string){
    return (form: FormGroup) => {
      const control = form.controls[dni];
      if (control.errors && !control.errors.dni) {
        return;
      }
      this.legalpersonService.getLegalperonByDni(control?.value).then( rest => {
        if(!rest){
          control.setErrors(null);
        } else {
          control.setErrors({dni: `Representante existente ${rest.seqlegalperson}-${rest.name} ${rest.lastname}`})
        }
      })
    }
  }
  validateProviderByRuc(ruc: string){
    return (form: FormGroup) => {
      const control = form.controls[ruc];
      if (control.errors && !control.errors.ruc) {
        return;
      }
      this.providerService.getProviderByRuc(control?.value).then( rest => {
        if(!rest){
          control.setErrors(null);
        } else {
          control.setErrors({ruc: `Proveedor existente ${rest.seqprovider}-${rest.namenterprice}`})
        }
      })
    }
  }
  validateProductByCode(codeProduct: string){
    return (form: FormGroup) => {
      const control = form.controls[codeProduct];
      if (control.errors && !control.errors.codeProduct) {
        return;
      }
      this.productosService.getEspecifict(control?.value).then( rest => {
        if(!rest){
          control.setErrors(null);
        } else {
          control.setErrors({codeProduct: `Producto existente ${rest.name}`})
        }
      })
    }
  }
}
