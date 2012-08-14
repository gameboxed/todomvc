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

    this.deleteTaskClicked = __bind(this.deleteTaskClicked, this);

    this.showTasks = __bind(this.showTasks, this);

    var _this = this;
    $("#new-todo").keypress(function(event) {
      return _this.keyPressed(event);
    });
    $("#toggle-all").click(function() {
      return _this.completeAllTasksClicked();
    });
  }

  WebGui.prototype.showTasks = function(tasks) {
    var data, html, source, task, template, _i, _len, _results,
      _this = this;
    source = $("#item-template").html();
    template = Handlebars.compile(source);
    data = {
      tasks: tasks.map(function(task) {
        return {
          id: task.id,
          content: task.content,
          completed: task.completed
        };
      })
    };
    html = template(data);
    $("#todo-list").html(html);
    _results = [];
    for (_i = 0, _len = tasks.length; _i < _len; _i++) {
      task = tasks[_i];
      _results.push((function(task) {
        $("#destroy-task-" + task.id).click(function() {
          return _this.deleteTaskClicked(task.id);
        });
        return $("#complete-task-button-" + task.id).click(function() {
          return _this.toggleTaskCompletionClicked(task.id);
        });
      })(task));
    }
    return _results;
  };

  WebGui.prototype.deleteTaskClicked = function(taskId) {};

  WebGui.prototype.completeAllTasksClicked = function() {};

  WebGui.prototype.toggleTaskCompletionClicked = function(taskId) {};

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
