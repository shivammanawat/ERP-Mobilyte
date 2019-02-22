import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskId: String;
  taskName: String;
  taskDesc: String;
  taskHandler: String;
  taskClientName : String;

  constructor(
    private validateService: ValidateService,
   private authService: AuthService,
   private router: Router,
    private flashMessage: FlashMessagesService
    ) { }



  ngOnInit() {
  }
  onaddtaskSubmit() {
    const task = {
      taskId: this.taskId,
  taskName: this.taskName,
  taskDesc: this.taskDesc,
  taskHandler: this.taskHandler,
  taskClientName : this.taskClientName
    }
    


    if(!this.validateService.validatetask(task)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 800});
      return false;
    }


    // Validate id
    if(!this.validateService.validateid(task.taskId)){
      this.flashMessage.show('Enter valid id', {cssClass: 'alert-danger myclass', timeout: 800});
      return false;
    }

   this.authService.addtask(task).subscribe(data => {
      if(data.success) {
        console.log("success");
        this.flashMessage.show('Added Task', {cssClass: 'alert-success myclass', timeout: 3000});
        this.router.navigate(['/showtask']);
      } else {
        this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger myclass', timeout: 3000});
        this.router.navigate(['/addtask']);
      }
    });
    }
  }
