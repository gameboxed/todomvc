var WebGlue;

WebGlue = (function() {

  function WebGlue(useCase, gui, storage) {
    var _this = this;
    this.useCase = useCase;
    this.gui = gui;
    this.storage = storage;
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
    AfterAll(this.useCase, ['addNewTask'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
  }

  return WebGlue;

})();
