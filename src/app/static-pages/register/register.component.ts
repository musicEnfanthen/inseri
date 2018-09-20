import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../shared/altert.service';
import { UserService } from '../../shared/user.service';
import { AuthService } from '../../shared/mongodb/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    public authSerive: AuthService
  ) { }

  register() {
    this.loading = true;
    this.authSerive.createUser(this.model.username, this.model.password);
/*    this.userService.create(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });*/
  }


}
