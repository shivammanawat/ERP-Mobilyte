const mongoose = require('mongoose');
const config = require('../config/database');

const TaskSchema = mongoose.Schema({

    taskId: {
        type: String,
        // unique : true,
        required : true
        // unique : true
    },

    taskName: {
        type: String,
        required : true

    },
    taskDesc:{
        type: String,
        require: true
        
    } ,
   taskHandler: {
       type: String,
       required: true
   },
   taskClientName :
   {
    type: String,
    required: true 
   }
     
});

const Task=module.exports=mongoose.model('Task',TaskSchema);
module.exports.addTask= function(newTask, callback)
{
    newTask.save(callback);   
    console.log("added" + newTask);
}


module.exports.getTask = function(callback){
    Task.find(callback);
}

module.exports.updateTask = function(id, newTask, callback){
    Task.findByIdAndUpdate(id, newTask, callback);
      //console.log("In model " +  JSON.stringify(newTask));
   
}
