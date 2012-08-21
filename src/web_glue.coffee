class WebGlue
  constructor: (@useCase, @gui, @storage)->
    AutoBind(@gui, @useCase)
    After(@gui, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))
    After(@useCase, 'addNewTask', @gui.addNewTask)
    Before(@useCase, 'showAll',  => @useCase.setInitialTasks(@storage.getTasks()))
    After(@useCase, 'showAll',  => @gui.showTasks(@useCase.todoTasks))
    After(@useCase, 'showAll', => @gui.showStats(@useCase.remainingTasks().length, @useCase.completedTasks().length))
    AfterAll(@useCase,
            [
             'addNewTask',
             'updateTaskContent',
             'deleteTask',
             'completeAllTasks',
             'toggleTaskCompletion'
            ],
            => @storage.set("tasks", @useCase.todoTasks))

    After(@useCase, 'deleteTask', @gui.deleteTask)


    After(@useCase, 'completeTask', @gui.completeTask)
    After(@useCase, 'uncompleteTask', @gui.uncompleteTask)


    After(@useCase, 'editTaskContent', @gui.editTaskContent)
    After(@gui, 'taskContentDoubleClicked', @useCase.editTaskContent)

    After(@useCase, 'updateTaskContent', @gui.updateTaskContent)
    After(@gui, 'enterKeyPressedWhenEditing', @useCase.updateTaskContent)

    AfterAll(@useCase,
      [
        'addNewTask',
        'deleteTask',
        'completeAllTasks',
        'toggleTaskCompletion'
      ],
        => @gui.showStats(@useCase.remainingTasks().length, @useCase.completedTasks().length))

    After(@gui, 'allTasksClicked', => @useCase.showAll())
    After(@gui, 'completedTasksClicked', => @useCase.showCompleted())
    After(@gui, 'remainingTasksClicked', => @useCase.showActive())

    After(@useCase, 'showActive', => @gui.showTasks(@useCase.remainingTasks()))
    After(@useCase, 'showCompleted', => @gui.showTasks(@useCase.completedTasks()))

    LogAll(@useCase)
    LogAll(@gui)

