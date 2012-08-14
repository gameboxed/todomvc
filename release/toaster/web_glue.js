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
    AfterAll(this.useCase, ['start', 'addNewTask', 'deleteTask', 'toggleTaskCompletion', 'completeAllTasks'], function() {
      return _this.gui.showTasks(_this.useCase.todoTasks);
    });
    After(this.gui, 'enterKeyPressed', function(content) {
      return _this.useCase.addNewTask(_this.storage.newTask(content));
    });
    AutoBind(this.gui, this.useCase);
    Before(this.useCase, 'start', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    AfterAll(this.useCase, ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
    LogAll(this.useCase);
    LogAll(this.gui);
    LogAll(this.storage);
    Around(this.useCase, 'deleteTask', function(proceed, taskId) {
      return proceed(_this.id2Task[taskId]);
    });
    Around(this.useCase, 'toggleTaskCompletion', function(proceed, taskId) {
      return proceed(_this.id2Task[taskId]);
    });
  }

  return WebGlue;

})();
