#<< utils
#<< local_storage
#<< todo_use_case
#<< todo_gui
#<< web_glue

class WebTodoApp
  constructor: ->
    useCase = new CompleteTasksUseCase()
    window.useCase = useCase
    gui = new WebGui()
    localStorage = new LocalStorage("todo_app")
    glue = new WebGlue(useCase, gui, localStorage)
    useCase.showFiltered()

new WebTodoApp()

