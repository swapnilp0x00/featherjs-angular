import { Component, OnInit } from '@angular/core';
import { FeathersService } from 'src/app/shared/feathers.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
interface JobModel {
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
  constructor(private featherService: FeathersService) {
  }

  ngOnInit() {
    const jobService = this.featherService.createService<JobModel>('job');
    this.jobList$ = from(jobService.find()).pipe(
      map((response: any) => response.data)
    );
  }

}
