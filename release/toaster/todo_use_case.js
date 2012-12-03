var CompleteTasksUseCase, Task,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CompleteTasksUseCase = (function() {

  function CompleteTasksUseCase() {
    this.clearCompleted = __bind(this.clearCompleted, this);

    this.uncompleteTask = __bind(this.uncompleteTask, this);

    this.completeTask = __bind(this.completeTask, this);

    this.toggleTaskCompletion = __bind(this.toggleTaskCompletion, this);

    this.completeAllTasks = __bind(this.completeAllTasks, this);

    this.deleteTask = __bind(this.deleteTask, this);

    this.updateTaskContent = __bind(this.updateTaskContent, this);

    this.editTaskContent = __bind(this.editTaskContent, this);

    this.addNewTask = __bind(this.addNewTask, this);

    this.showFiltered = __bind(this.showFiltered, this);

    this.selectFilter = __bind(this.selectFilter, this);

    this.setInitialTasks = __bind(this.setInitialTasks, this);

    this.filteredTasks = __bind(this.filteredTasks, this);

    this.remainingTasks = __bind(this.remainingTasks, this);

    this.completedTasks = __bind(this.completedTasks, this);
    this.todoTasks = [];
    this.filter = "all";
  }

  CompleteTasksUseCase.prototype.completedTasks = function() {
    return this.todoTasks.filter(function(task) {
      return task.completed;
    });
  };

  CompleteTasksUseCase.prototype.remainingTasks = function() {
    return this.todoTasks.filter(function(task) {
      return !task.completed;
    });
  };

  CompleteTasksUseCase.prototype.filteredTasks = function() {
    switch (this.filter) {
      case "all":
        return this.todoTasks;
      case "active":
        return this.remainingTasks();
      case "completed":
        return this.completedTasks();
    }
  };

  CompleteTasksUseCase.prototype.setInitialTasks = function(tasks) {
    return this.todoTasks = tasks;
  };

  CompleteTasksUseCase.prototype.selectFilter = function(filter) {
    this.filter = filter;
  };

  CompleteTasksUseCase.prototype.showFiltered = function() {};

  CompleteTasksUseCase.prototype.addNewTask = function(task) {
    return this.todoTasks.push(task);
  };

  CompleteTasksUseCase.prototype.editTaskContent = function(task) {};

  CompleteTasksUseCase.prototype.updateTaskContent = function(task, content) {
    return task.content = content;
  };

  CompleteTasksUseCase.prototype.deleteTask = function(task) {
    return this.todoTasks.remove(task);
  };

  CompleteTasksUseCase.prototype.completeAllTasks = function() {
    var _this = this;
    return this.todoTasks.map(function(task) {
      return _this.completeTask(task);
    });
  };

  CompleteTasksUseCase.prototype.toggleTaskCompletion = function(task) {
    if (task.completed) {
      return this.uncompleteTask(task);
    } else {
      return this.completeTask(task);
    }
  };

  CompleteTasksUseCase.prototype.completeTask = function(task) {
    return task.complete();
  };

  CompleteTasksUseCase.prototype.uncompleteTask = function(task) {
    return task.uncomplete();
  };

  CompleteTasksUseCase.prototype.clearCompleted = function() {
    var _this = this;
    return this.completedTasks().each(function(task) {
      return _this.deleteTask(task);
    });
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
