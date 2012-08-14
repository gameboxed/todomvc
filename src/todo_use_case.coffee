class CompleteTasksUseCase
  constructor: ->
    @todoTasks = []

  setInitialTasks: (tasks) =>
    @todoTasks = tasks

  start: =>

  addNewTask: (task) =>
    @todoTasks.push(task)

  deleteTask: (task) =>
    @todoTasks.splice(@todoTasks.indexOf(task), 1)

  completeAllTasks: =>
    @todoTasks.map((task) -> task.complete())

  toggleTaskCompletion: (task) =>
    if task.completed
      task.uncomplete()
    else
      task.complete()
