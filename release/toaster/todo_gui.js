var WebGui,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

WebGui = (function() {

  function WebGui() {
    this.selectFilter = __bind(this.selectFilter, this);

    this.clearCompleted = __bind(this.clearCompleted, this);

    this.clearCompletedClicked = __bind(this.clearCompletedClicked, this);

    this.remainingTasksClicked = __bind(this.remainingTasksClicked, this);

    this.completedTasksClicked = __bind(this.completedTasksClicked, this);

    this.allTasksClicked = __bind(this.allTasksClicked, this);

    this.showStats = __bind(this.showStats, this);

    this.enterKeyPressed = __bind(this.enterKeyPressed, this);

    this.newTodoContent = __bind(this.newTodoContent, this);

    this.clearNewTodoTextBox = __bind(this.clearNewTodoTextBox, this);

    this.keyPressed = __bind(this.keyPressed, this);

    this.toggleTaskCompletionClicked = __bind(this.toggleTaskCompletionClicked, this);

    this.completeAllTasksClicked = __bind(this.completeAllTasksClicked, this);

    this.showTasks = __bind(this.showTasks, this);

    this.uncompleteTask = __bind(this.uncompleteTask, this);

    this.completeTask = __bind(this.completeTask, this);

    this.updateTaskContent = __bind(this.updateTaskContent, this);

    this.enterKeyPressedWhenEditing = __bind(this.enterKeyPressedWhenEditing, this);

    this.editingKeyPressed = __bind(this.editingKeyPressed, this);

    this.editTaskContent = __bind(this.editTaskContent, this);

    this.deleteTask = __bind(this.deleteTask, this);

    this.deleteTaskClicked = __bind(this.deleteTaskClicked, this);

    this.taskContentDoubleClicked = __bind(this.taskContentDoubleClicked, this);

    this.findTaskElement = __bind(this.findTaskElement, this);

    this.addNewTask = __bind(this.addNewTask, this);

    this.createElementFor = __bind(this.createElementFor, this);

    var _this = this;
    $("#new-todo").keypress(function(event) {
      return _this.keyPressed(event);
    });
    $("#toggle-all").click(function() {
      return _this.completeAllTasksClicked();
    });
    $("#all-tasks").click(function() {
      return _this.allTasksClicked();
    });
    $("#active-tasks").click(function() {
      return _this.remainingTasksClicked();
    });
    $("#completed-tasks").click(function() {
      return _this.completedTasksClicked();
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
    var element,
      _this = this;
    element = this.createElementFor(task, "#todo-template");
    element.task = task;
    this.taskElements.push(element);
    $("#todo-list").append(element);
    element.find(".destroy").click(function() {
      return _this.deleteTaskClicked(task);
    });
    element.find(".toggle").click(function() {
      return _this.toggleTaskCompletionClicked(task);
    });
    return element.dblclick(function() {
      return _this.taskContentDoubleClicked(task);
    });
  };

  WebGui.prototype.findTaskElement = function(task) {
    return this.taskElements.find(function(taskElement) {
      return taskElement.task === task;
    });
  };

  WebGui.prototype.taskContentDoubleClicked = function(task) {};

  WebGui.prototype.deleteTaskClicked = function(task) {};

  WebGui.prototype.deleteTask = function(task) {
    return this.findTaskElement(task).remove();
  };

  WebGui.prototype.editTaskContent = function(task) {
    var element,
      _this = this;
    element = this.findTaskElement(task);
    element.addClass("editing").find("input.edit").show().select().focus();
    return element.find("input.edit").keypress(function(event) {
      return _this.editingKeyPressed(event, element);
    });
  };

  WebGui.prototype.editingKeyPressed = function(event, element) {
    var ENTER_KEY_CODE;
    ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      return this.enterKeyPressedWhenEditing(element.task, element.find("input.edit").val());
    }
  };

  WebGui.prototype.enterKeyPressedWhenEditing = function(task, newContent) {};

  WebGui.prototype.updateTaskContent = function(task, content) {
    var element;
    element = this.findTaskElement(task);
    element.removeClass("editing").find("input.edit").hide();
    return element.find("label").html(content);
  };

  WebGui.prototype.completeTask = function(task) {
    var element;
    element = this.findTaskElement(task);
    element.addClass("completed");
    return element.find("input.toggle").attr("checked", "checked");
  };

  WebGui.prototype.uncompleteTask = function(task) {
    var element;
    element = this.findTaskElement(task);
    element.removeClass("completed");
    return element.find("input .toggle").attr("checked", "");
  };

  WebGui.prototype.showTasks = function(tasks) {
    var task, _i, _len, _results;
    $("#todo-list").html("");
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

  WebGui.prototype.showStats = function(remaining, completed) {
    var data, html, moreThanOne, source, template,
      _this = this;
    source = $("#stats-template").html();
    template = Handlebars.compile(source);
    moreThanOne = remaining > 1;
    data = {
      remaining: remaining,
      moreThanOne: moreThanOne,
      completed: completed
    };
    html = template(data);
    $("#todo-count, #clear-completed").remove();
    $("#footer").append(html);
    return $("#clear-completed").click(function() {
      return _this.clearCompletedClicked();
    });
  };

  WebGui.prototype.allTasksClicked = function() {};

  WebGui.prototype.completedTasksClicked = function() {};

  WebGui.prototype.remainingTasksClicked = function() {};

  WebGui.prototype.clearCompletedClicked = function() {};

  WebGui.prototype.clearCompleted = function(tasks) {
    console.log("gui.clearCompleted");
    return tasks.each(function(task) {
      return this.deleteTask(task);
    });
  };

  WebGui.prototype.selectFilter = function(name) {
    $("#filters a").removeClass("selected");
    return $("#" + name + "-tasks").addClass("selected");
  };

  return WebGui;

})();
