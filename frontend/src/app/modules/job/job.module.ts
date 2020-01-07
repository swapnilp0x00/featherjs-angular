import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';


@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
