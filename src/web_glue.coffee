class WebGlue
  constructor: (@useCase, @gui, @storage)->
    AutoBind(@gui, @useCase)
    After(@gui, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))
    After(@useCase, 'addNewTask', @gui.addNewTask)
    Before(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))
    After(@useCase, 'start',  => @gui.showAllTasks(@useCase.todoTasks))
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
