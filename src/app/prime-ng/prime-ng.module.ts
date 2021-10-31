import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
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


@NgModule({
  declarations: [],
  exports:[
    ButtonModule,
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
    TagModule
  ]
})
export class PrimeNgModule { }
