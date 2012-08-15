var CompleteTasksUseCase, Task,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CompleteTasksUseCase = (function() {

  function CompleteTasksUseCase() {
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

  return CompleteTasksUseCase;

})();

Task = (function() {

  function Task(content, completed) {
    this.content = content;
    this.completed = completed != null ? completed : false;
    this.uncomplete = __bind(this.uncomplete, this);

    this.complete = __bind(this.complete, this);

  }

  Task.prototype.complete = function() {
    return this.completed = true;
  };

  Task.prototype.uncomplete = function() {
    return this.completed = false;
  };

  return Task;

})();
