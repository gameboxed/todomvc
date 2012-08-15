class WebGlue
  constructor: (@useCase, @gui, @storage)->
    @id2Task = {}
    Around(@storage, 'newTask', (proceed, content, completed) =>
      task = proceed(content, completed)
      task.id = UUIDjs.create().toString()
      @id2Task[task.id] = task
      return task
    )

    After(@gui, 'enterKeyPressed',
      (content) => @useCase.addNewTask(@storage.newTask(content)))

    Around(@useCase, 'addNewTask',
      (proceed, task) =>
        @gui.addNewTask(task)
        proceed(task)
    )

    AutoBind(@gui, @useCase)

    Before(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))

    After(@useCase, 'start',  => @gui.loadAllTasks(@storage.getTasks()))

    AfterAll(@useCase,
            ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'],
            => @storage.set("tasks", @useCase.todoTasks))


    LogAll(@useCase)
    LogAll(@gui)
    LogAll(@storage)

