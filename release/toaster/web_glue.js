var WebGlue;

WebGlue = (function() {

  function WebGlue(useCase, gui, storage) {
    var _this = this;
    this.useCase = useCase;
    this.gui = gui;
    this.storage = storage;
    AutoBind(this.gui, this.useCase);
    After(this.gui, 'enterKeyPressed', function(content) {
      return _this.useCase.addNewTask(new Task(content));
    });
    After(this.useCase, 'addNewTask', function() {
      return _this.gui.showTasks(_this.useCase.filteredTasks());
    });
    Before(this.useCase, 'showFiltered', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    After(this.useCase, 'showFiltered', function() {
      return _this.gui.showTasks(_this.useCase.filteredTasks());
    });
    AfterAll(this.useCase, ['addNewTask', 'updateTaskContent', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
    After(this.useCase, 'deleteTask', this.gui.deleteTask);
    After(this.useCase, 'completeTask', this.gui.completeTask);
    After(this.useCase, 'uncompleteTask', this.gui.uncompleteTask);
    After(this.useCase, 'editTaskContent', this.gui.editTaskContent);
    After(this.gui, 'taskContentDoubleClicked', this.useCase.editTaskContent);
    After(this.useCase, 'updateTaskContent', this.gui.updateTaskContent);
    After(this.gui, 'enterKeyPressedWhenEditing', this.useCase.updateTaskContent);
    AfterAll(this.useCase, ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion', 'showFiltered'], function() {
      return _this.gui.showStats(_this.useCase.remainingTasks().length, _this.useCase.completedTasks().length);
    });
    After(this.gui, 'allTasksClicked', function() {
      return _this.useCase.selectFilter("all");
    });
    After(this.gui, 'completedTasksClicked', function() {
      return _this.useCase.selectFilter("completed");
    });
    After(this.gui, 'remainingTasksClicked', function() {
      return _this.useCase.selectFilter("active");
    });
    AfterAll(this.gui, ['allTasksClicked', 'completedTasksClicked', 'remainingTasksClicked'], function() {
      return _this.useCase.showFiltered();
    });
    After(this.useCase, 'showFiltered', function() {
      return _this.gui.showTasks(_this.useCase.filteredTasks());
    });
    After(this.useCase, 'showFiltered', function() {
      return _this.gui.selectFilter(_this.useCase.filter);
    });
    After(this.gui, 'clearCompletedClicked', function() {
      return _this.useCase.clearCompleted();
    });
    After(this.useCase, 'clearCompleted', function(deletedTasks) {
      return _this.gui.clearCompleted(deletedTasks);
    });
    LogAll(this.useCase);
    LogAll(this.gui);
  }

  return WebGlue;

})();
