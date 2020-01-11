import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeathersService } from 'src/app/shared/feathers.service';
import { Service } from '@feathersjs/feathers';
import { JobModel } from '../job-list/job-list.component';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  id: string;
  jobService: Service<JobModel>;
  job: JobModel;

  constructor(
    private router: Router,
    private feathersService: FeathersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.job = {
      title: '',
      description: '',
    };
    this.id = this.activatedRoute.snapshot.params.id;
    this.jobService = this.feathersService.createService<JobModel>('job');
    if (this.id) {
      this.jobService.get(this.id).then(job => {
        this.job = job;
      });
    }
  }


  /**
   * onSubmit - Called when form is submiited, used to send create/patch call
   */
  onSubmit() {
    if (this.id) {
      this.jobService.patch(this.id, this.job).then(response => {
        console.log('Job Updated');
        this.router.navigate(['/jobs']);
      });
    } else {
      this.jobService.create(this.job).then(response => {
        console.log('Job Created');
        this.router.navigate(['/jobs']);
      });
    }
  }

}
