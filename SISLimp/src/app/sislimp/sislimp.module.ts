import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { SislimpRoutingModule } from './sislimp-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { MegaMenuModule } from 'primeng/megamenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SplitterModule } from 'primeng/splitter';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { PrincipalComponent } from './components/principal/principal.component';
import { AgendamientoCitasComponent } from './components/agendamiento-citas/agendamiento-citas.component';
import { AtencionClienteComponent } from './components/atencion-cliente/atencion-cliente.component';
import { FooterSysComponent } from './shared/footer-sys/footer-sys.component';
import {TabViewModule} from 'primeng/tabview';




@NgModule({
  declarations: [
    PrincipalComponent,
    AgendamientoCitasComponent,
    AtencionClienteComponent,
    FooterSysComponent
  ],
  imports: [
    CommonModule,
    SislimpRoutingModule,
    // primng

    SidebarModule,
    ButtonModule,
    MenubarModule,
    PanelMenuModule,
    TableModule,
    MegaMenuModule,
    TieredMenuModule,
    SplitterModule,
    InputTextModule,
    CardModule,
    InputNumberModule,
    InputMaskModule,
    InputTextareaModule,
    CalendarModule,
    ChipsModule,
    AutoCompleteModule,
    MultiSelectModule,
    ToolbarModule,
    MenuModule,
    TagModule,
    DropdownModule,
    FormsModule,
    TabViewModule
  ]
})
export class SislimpModule { }
