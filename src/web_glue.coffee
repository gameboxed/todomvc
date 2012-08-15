class WebGlue
  constructor: (@useCase, @gui, @storage)->
    After(@gui, 'enterKeyPressed',
      (content) => @useCase.addNewTask(@storage.newTask(content)))

    After(@useCase, 'addNewTask', @gui.addNewTask)

    AutoBind(@gui, @useCase)

    Before(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))

    After(@useCase, 'start',  => @gui.loadAllTasks(@useCase.todoTasks))

    AfterAll(@useCase,
            ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'],
            => @storage.set("tasks", @useCase.todoTasks))


    LogAll(@useCase)
    LogAll(@gui)
    LogAll(@storage)

