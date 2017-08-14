import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.forbiddenProjectNames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  // syncronous validator
/*  forbiddenProjectNames(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'projectNameIsForbidden': true};
    }
    return null;
  }*/

  // asyncronous validator
  forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Test') {
            resolve({'projectNameIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
