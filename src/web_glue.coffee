class WebGlue
  constructor: (@useCase, @gui, @storage)->
    AutoBind(@gui, @useCase)
    After(@gui, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))
    After(@useCase, 'addNewTask', => @gui.showTasks(@useCase.filteredTasks()))
    Before(@useCase, 'showFiltered',  => @useCase.setInitialTasks(@storage.getTasks()))
    After(@useCase, 'showFiltered',  => @gui.showTasks(@useCase.filteredTasks()))
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
        'toggleTaskCompletion',
        'showFiltered',
      ],
        => @gui.showStats(@useCase.remainingTasks().length, @useCase.completedTasks().length))

    After(@gui, 'allTasksClicked', => @useCase.selectFilter("all"))
    After(@gui, 'completedTasksClicked', => @useCase.selectFilter("completed"))
    After(@gui, 'remainingTasksClicked', => @useCase.selectFilter("active"))
    AfterAll(@gui,
      [
        'allTasksClicked',
        'completedTasksClicked',
        'remainingTasksClicked'
      ],
        => @useCase.showFiltered())

    After(@useCase, 'showFiltered', => @gui.showTasks(@useCase.filteredTasks()))
    After(@useCase, 'showFiltered', => @gui.selectFilter(@useCase.filter))

    After(@gui, 'clearCompletedClicked', => @useCase.clearCompleted())
    After(@useCase, 'clearCompleted', (deletedTasks) => @gui.clearCompleted(deletedTasks))

    LogAll(@useCase)
    LogAll(@gui)

