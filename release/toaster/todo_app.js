var WebTodoApp;

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
