import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: String;

  constructor(
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



