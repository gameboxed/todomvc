class WebGlue
  constructor: (@useCase, @gui, @storage)->
    AutoBind(@gui, @useCase)
    After(@gui, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))

    After(@useCase, 'addNewTask', @gui.addNewTask)


    Before(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))

    After(@useCase, 'start',  => @gui.showAllTasks(@useCase.todoTasks))

    AfterAll(@useCase,
            ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'],
            => @storage.set("tasks", @useCase.todoTasks))


    LogAll(@useCase)
    LogAll(@gui)
    LogAll(@storage)

