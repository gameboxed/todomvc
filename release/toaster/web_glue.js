var WebGlue;

WebGlue = (function() {

  function WebGlue(useCase, gui, storage) {
    var _this = this;
    this.useCase = useCase;
    this.gui = gui;
    this.storage = storage;
    this.id2Task = {};
    Around(this.storage, 'newTask', function(proceed, content, completed) {
      var task;
      task = proceed(content, completed);
      task.id = UUIDjs.create().toString();
      _this.id2Task[task.id] = task;
      return task;
    });
    After(this.gui, 'enterKeyPressed', function(content) {
      return _this.useCase.addNewTask(_this.storage.newTask(content));
    });
    Around(this.useCase, 'addNewTask', function(proceed, task) {
      _this.gui.addNewTask(task);
      return proceed(task);
    });
    AutoBind(this.gui, this.useCase);
    Before(this.useCase, 'start', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    After(this.useCase, 'start', function() {
      return _this.gui.loadAllTasks(_this.storage.getTasks());
    });
    AfterAll(this.useCase, ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
    LogAll(this.useCase);
    LogAll(this.gui);
    LogAll(this.storage);
  }

  return WebGlue;

})();
