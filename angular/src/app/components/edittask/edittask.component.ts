// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';
// import { ActivatedRoute} from '@angular/router';
// import { Task} from '../../taskmodel';
// @Component({
//   selector: 'app-edittask',
//   templateUrl: './edittask.component.html',
//   styleUrls: ['./edittask.component.css']
// })
// export class EdittaskComponent implements OnInit {

// task=Task;
//   constructor(private authService:AuthService,  private route : ActivatedRoute,private router:Router,  private flashMessage: FlashMessagesService) {
    
//    }

//   ngOnInit() {}
//  model = new Task();
//     updateTask(id,info)
//     {
//       var id = this.route.snapshot.params['_id'];
//       this.authService.updateTask(id,this.model).subscribe( () => 
//       {
        
//         this.router.navigate(['/showtask']);
//       })
//     }
    
// }


//======================================================================
import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute} from '@angular/router';
import { Task} from '../../taskmodel';
@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  // @Input() task: Task;
  task : Object;
  constructor(private authService:AuthService,  private route : ActivatedRoute,private router:Router,  private flashMessage: FlashMessagesService) {
    
   }
  ngOnInit(){
    this.getTask();
    
  }
getTask(){
  var id = this.route.snapshot.params['_id'];
  this.authService.detailtask(id).subscribe(tasks=> {
  this.task = tasks;
  },
  err => {
    console.log(err);
    return false;
  });
}
    updateTask(id,info)
    {
      var id = this.route.snapshot.params['_id'];
      // console.log("Id of edit task" + id);
       console.log("In update task " + this.task);
      this.authService.updateTask(id,this.task).subscribe( (tasks) => 
      {
        // this.task=tasks;
        // console.log("In update task in edit task " +  JSON.stringify(this.task));
        this.router.navigate(['/showtask']);
      })
    }
}