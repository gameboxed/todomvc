class WebGlue
  constructor: (@useCase, @gui, @storage)->
    @id2Task = {}
    Around(@storage, 'newTask', (proceed, content, completed) =>
      task = proceed(content, completed)
      task.id = UUIDjs.create().toString()
      @id2Task[task.id] = task
      return task
    )


    AfterAll(@useCase,
             ['start', 'addNewTask', 'deleteTask', 'toggleTaskCompletion', 'completeAllTasks'],
             => @gui.showTasks(@useCase.todoTasks))

    After(@gui, 'enterKeyPressed',    (content) => @useCase.addNewTask(@storage.newTask(content)))
    AutoBind(@gui, @useCase)

    Before(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))
    AfterAll(@useCase,
            ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'],
            => @storage.set("tasks", @useCase.todoTasks))


    LogAll(@useCase)
    LogAll(@gui)
    LogAll(@storage)


    Around(@useCase, 'deleteTask', (proceed, taskId) => proceed(@id2Task[taskId]))
    Around(@useCase, 'toggleTaskCompletion', (proceed, taskId) => proceed(@id2Task[taskId]))

