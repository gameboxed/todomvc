var CompleteTasksUseCase,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CompleteTasksUseCase = (function() {

  function CompleteTasksUseCase() {
    this.toggleTaskCompletion = __bind(this.toggleTaskCompletion, this);

    this.completeAllTasks = __bind(this.completeAllTasks, this);

    this.deleteTask = __bind(this.deleteTask, this);

    this.addNewTask = __bind(this.addNewTask, this);

    this.start = __bind(this.start, this);

    this.setInitialTasks = __bind(this.setInitialTasks, this);
    this.todoTasks = [];
  }

  CompleteTasksUseCase.prototype.setInitialTasks = function(tasks) {
    return this.todoTasks = tasks;
  };

  CompleteTasksUseCase.prototype.start = function() {};

  CompleteTasksUseCase.prototype.addNewTask = function(task) {
    return this.todoTasks.push(task);
  };

  CompleteTasksUseCase.prototype.deleteTask = function(task) {
    return this.todoTasks.splice(this.todoTasks.indexOf(task), 1);
  };

  CompleteTasksUseCase.prototype.completeAllTasks = function() {
    return this.todoTasks.map(function(task) {
      return task.complete();
    });
  };

  CompleteTasksUseCase.prototype.toggleTaskCompletion = function(task) {
    if (task.completed) {
      return task.uncomplete();
    } else {
      return task.complete();
    }
  };

  return CompleteTasksUseCase;

})();
