import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BuyHistoryComponent } from './components/buy-history/buy-history.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { OutComponent } from './components/out/out.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {MegaMenuModule} from 'primeng/megamenu';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidemenuComponent } from './components/shared/sidemenu/sidemenu.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {SplitterModule} from 'primeng/splitter';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SislimpModule } from '../sislimp/sislimp.module';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [
    NavigationComponent,
    BuyHistoryComponent,
    OrdersComponent,
    AccountDetailComponent,
    OutComponent,
    TopbarComponent,
    FooterComponent,
    SidemenuComponent,
    
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //primeng
    //primng
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
    DropdownModule,
    CalendarModule,
    ChipsModule,
    AutoCompleteModule,
    MultiSelectModule,
    ToolbarModule,
    MenuModule,
    TagModule,
    PasswordModule, 
    ToastModule,
    MessageModule,
    MessagesModule,
    SislimpModule,
    DynamicDialogModule,
    DialogModule
  ], 
  providers:[
  ]
})
export class UserModule { }
