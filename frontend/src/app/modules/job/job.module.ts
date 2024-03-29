import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
@NgModule({
  declarations: [JobListComponent, JobFormComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
