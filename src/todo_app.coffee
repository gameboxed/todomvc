#<< utils
#<< local_storage
#<< todo_use_case
#<< todo_gui
#<< web_glue

class Task
  constructor: (@content, @completed=false) ->

  complete: =>
    @completed = true

  uncomplete: =>
    @completed = false

class WebTodoApp
  constructor: ->
    useCase = new CompleteTasksUseCase()
    window.useCase = useCase
    gui = new WebGui()
    localStorage = new LocalStorage("todo_app")
    glue = new WebGlue(useCase, gui, localStorage)
    useCase.start()

new WebTodoApp()

