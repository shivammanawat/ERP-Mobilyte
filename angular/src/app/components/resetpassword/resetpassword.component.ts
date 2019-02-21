import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password : String;
  constructor(
    private authService: AuthService,
     private router: Router,
     private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  

  onresetSubmit() {
     const user = {
       password: this.password
    }

    this.authService.resetPasswordUser(user).subscribe(data => {
        if(data.success) {
          this.flashMessage.show('Password Reset Successfull', {cssClass: 'alert-success myclass', timeout: 3000})
           this.router.navigate(['login']);
         } else {
          this.flashMessage.show('Problem in Resseting Password', {cssClass: 'alert-success myclass', timeout: 3000})
           this.router.navigate(['reset-password']);
         }
     });
  }



 }

