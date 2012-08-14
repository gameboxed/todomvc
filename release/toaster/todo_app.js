var Task, WebTodoApp,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

WebTodoApp = (function() {

  function WebTodoApp() {
    var glue, gui, localStorage, useCase;
    useCase = new CompleteTasksUseCase();
    window.useCase = useCase;
    gui = new WebGui();
    localStorage = new LocalStorage("todo_app");
    glue = new WebGlue(useCase, gui, localStorage);
    useCase.start();
  }

  return WebTodoApp;

})();

new WebTodoApp();
