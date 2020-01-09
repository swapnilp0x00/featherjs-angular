import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [JobListComponent, JobFormComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    FormsModule
  ]
})
export class JobModule { }
