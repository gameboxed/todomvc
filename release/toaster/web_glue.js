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
    After(this.useCase, 'addNewTask', this.gui.addNewTask);
    Before(this.useCase, 'start', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    After(this.useCase, 'start', function() {
      return _this.gui.showAllTasks(_this.useCase.todoTasks);
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
    LogAll(this.useCase);
    LogAll(this.gui);
    LogAll(this.storage);
  }

  return WebGlue;

})();
