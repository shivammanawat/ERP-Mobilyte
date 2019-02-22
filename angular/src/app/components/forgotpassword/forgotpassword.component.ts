import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: String;

  constructor(    
    private validateService: ValidateService,
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
  }

  onforgotpasswordSubmit()
  {
      const user = {
        email: this.email  
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
      this.authService.forgotpasswordUser(user).subscribe(data => {
          if(data.success) {
            this.flashMessage.show('Password Changed', {cssClass: 'alert-success myclass', timeout: 2000});
            this.router.navigate(['login']);
          } else {
            this.flashMessage.show('Enter Correct Email First', {cssClass: 'alert-success myclass', timeout: 2000});
            this.router.navigate(['forgotpassword']);
          }
      });
    }

  }



