var WebGui,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

WebGui = (function() {

  function WebGui() {
    this.enterKeyPressed = __bind(this.enterKeyPressed, this);

    this.newTodoContent = __bind(this.newTodoContent, this);

    this.clearNewTodoTextBox = __bind(this.clearNewTodoTextBox, this);

    this.keyPressed = __bind(this.keyPressed, this);

    this.showAllTasks = __bind(this.showAllTasks, this);

    this.findTaskElement = __bind(this.findTaskElement, this);

    this.addNewTask = __bind(this.addNewTask, this);

    this.createElementFor = __bind(this.createElementFor, this);

    var _this = this;
    $("#new-todo").keypress(function(event) {
      return _this.keyPressed(event);
    });
    this.taskElements = [];
  }

  WebGui.prototype.createElementFor = function(task, templateId) {
    var data, element, html, source, template;
    source = $(templateId).html();
    template = Handlebars.compile(source);
    data = {
      content: task.content,
      completed: task.completed
    };
    html = template(data);
    return element = $(html);
  };

  WebGui.prototype.addNewTask = function(task) {
    var element;
    element = this.createElementFor(task, "#todo-template");
    element.task = task;
    this.taskElements.push(element);
    return $("#todo-list").append(element);
  };

  WebGui.prototype.findTaskElement = function(task) {
    return this.taskElements.find(function(taskElement) {
      return taskElement.task === task;
    });
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
