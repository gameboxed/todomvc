var WebGui,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

WebGui = (function() {

  function WebGui() {
    this.enterKeyPressed = __bind(this.enterKeyPressed, this);

    this.newTodoContent = __bind(this.newTodoContent, this);

    this.clearNewTodoTextBox = __bind(this.clearNewTodoTextBox, this);

    this.keyPressed = __bind(this.keyPressed, this);

    this.toggleTaskCompletionClicked = __bind(this.toggleTaskCompletionClicked, this);

    this.completeAllTasksClicked = __bind(this.completeAllTasksClicked, this);

    this.showAllTasks = __bind(this.showAllTasks, this);

    this.deleteTaskClicked = __bind(this.deleteTaskClicked, this);

    this.addNewTask = __bind(this.addNewTask, this);

    var _this = this;
    $("#new-todo").keypress(function(event) {
      return _this.keyPressed(event);
    });
    $("#toggle-all").click(function() {
      return _this.completeAllTasksClicked();
    });
  }

  WebGui.prototype.addNewTask = function(task) {
    var data, element, html, source, template,
      _this = this;
    source = $("#todo-template").html();
    template = Handlebars.compile(source);
    data = {
      content: task.content,
      completed: task.completed
    };
    html = template(data);
    element = $(html);
    $("#todo-list").append(element);
    element.find(".destroy-task-button").click(function() {
      return _this.deleteTaskClicked(task, element);
    });
    return element.find(".complete-task-button").click(function() {
      return _this.toggleTaskCompletionClicked(task);
    });
  };

  WebGui.prototype.deleteTaskClicked = function(task, element) {
    return element.remove();
  };

  WebGui.prototype.showAllTasks = function(tasks) {
    var task, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tasks.length; _i < _len; _i++) {
      task = tasks[_i];
      _results.push(this.addNewTask(task));
    }
    return _results;
  };

  WebGui.prototype.completeAllTasksClicked = function() {};

  WebGui.prototype.toggleTaskCompletionClicked = function(task) {};

  WebGui.prototype.keyPressed = function(event) {
    var ENTER_KEY_CODE;
    ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      this.enterKeyPressed(this.newTodoContent());
      return this.clearNewTodoTextBox();
    }
  };

  WebGui.prototype.clearNewTodoTextBox = function() {
    return $("#new-todo").val("");
  };

  WebGui.prototype.newTodoContent = function() {
    return $("#new-todo").val();
  };

  WebGui.prototype.enterKeyPressed = function(content) {};

  return WebGui;

})();
