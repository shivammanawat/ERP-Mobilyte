import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { Task } from '../../task';
@Component({
  selector: 'app-showtask',
  templateUrl: './showtask.component.html',
  styleUrls: ['./showtask.component.css']
})
export class ShowtaskComponent implements OnInit {
  
//  task: Array<Object>;
//  tasks : Task;
tasks : Object;
  constructor(private authService:AuthService, private router:Router,private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.getTask();
  }

 
  getTask()
  {
    this.authService.getTask().subscribe(tasks =>
      {
        tasks.sort((leftSide, rightSide) : number => {
          if(leftSide.taskId < rightSide.taskId) return -1;
          if(leftSide.taskId > rightSide.taskId) return 1;
          return 0;
        });
        this.tasks = tasks;
      },
          err=>
          {
            console.log("data not received");
          });
  }

  ondeleteClick(task_id) {
    this.authService.deletetask(task_id).subscribe(data =>
      {
        if(data.success)
        {
        this.getTask(); 
        }
        else
        {
        this.router.navigate(['/addtask']);
        }
       
      })
  }

}
