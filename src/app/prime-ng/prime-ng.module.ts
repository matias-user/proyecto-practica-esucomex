import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {KnobModule} from 'primeng/knob';
import {MenuModule} from 'primeng/menu';
import {MessageModule} from 'primeng/message';
import {PasswordModule} from 'primeng/password';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {ToastModule} from 'primeng/toast';
// Api Prime
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
  declarations: [],
  exports:[
    ButtonModule,
    ConfirmPopupModule,
    CardModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    KnobModule,
    MenuModule,
    MessageModule,
    PasswordModule,
    PanelMenuModule,
    TableModule,
    TagModule,
    ToastModule
  ],
  providers:[ConfirmationService, MessageService]
})
export class PrimeNgModule { }
