import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';


const routes: Routes = [{
  path: '',
  component: JobListComponent,
  }, {
  path: ':id',
  component: JobFormComponent
  },{
    path: 'create',
    component: JobFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
