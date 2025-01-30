import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskEditPageRoutingModule } from './task-edit-routing.module';

import { TaskEditPage } from './task-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskEditPageRoutingModule
  ],
  declarations: [TaskEditPage]
})
export class TaskEditPageModule {}
