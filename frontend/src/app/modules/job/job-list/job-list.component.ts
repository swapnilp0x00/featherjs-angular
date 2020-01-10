import { Component, OnInit } from '@angular/core';
import { FeathersService } from 'src/app/shared/feathers.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '@feathersjs/feathers';
export interface JobModel {
  id?: number;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobList$: Observable<any>;
  jobService: Service<JobModel>;

  constructor(private featherService: FeathersService) {
  }

  ngOnInit() {
    this.jobService = this.featherService.createService<JobModel>('job');
    this.fetchAll();
  }

  /**
   * fetchAll - Used to set observable for all records before component is rendered.
   * TODO: Can also be set in resolver for better UX.
   */
  fetchAll() {
    this.jobList$ = from(this.jobService.find()).pipe(
      map((response: any) => response.data)
    );
  }

  /**
   * deleteJob - Asks for delete confirmation and then deletes job after confirmation.
   * @param job - job to be deleted.
   */
  deleteJob(job: JobModel) {
    const response = confirm('Are you sure you want to delete this');
    if (response) {
      this.jobService.remove(job.id).then(() => {
        this.fetchAll();
        console.log('%c Job Deleted', 'font-size:20px;font-weight:bold');
      }).catch(error => {
        console.log('%c Error', 'color:red;font-size:20px;font-weight:bold');
      });
    }
  }
}
