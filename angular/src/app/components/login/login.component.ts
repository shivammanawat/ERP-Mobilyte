import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
      if (this.authService.loggedIn) {
      this.router.navigate(['/dashboard']);
   }
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }


    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger myclass', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
   this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger myclass', timeout: 3000});
   return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show('Logged In', {cssClass: 'alert-success myclass', timeout: 3000});
          // this.flashMessage.grayOut(true); // turn on gray out feature
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show('Wrong Password', {cssClass: ' alert-danger myclass', timeout: 3000});
          // this.flashMessage.grayOut(true); // turn on gray out feature
          this.router.navigate(['login']);
        }
    });
  }

}
