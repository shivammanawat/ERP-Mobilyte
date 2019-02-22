import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.firstName == undefined || user.email == undefined || user.lastName == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateLogin(user) {
    if( user.email == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateid(taskId){ 
    const re = /^[1-9]\d*$/;       
    return re.test(taskId);
    }
   
    validatetask(task){
      if(task.taskId == undefined || task.taskName == undefined || task.taskDesc == undefined || task.taskHandler == undefined || task.taskClientName == undefined ){
        return false;
      } else {
        return true;
      }
    }

}


