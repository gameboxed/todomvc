class CompleteTasksUseCase
  constructor: ->
    @todoTasks = []

  setInitialTasks: (tasks) =>
    @todoTasks = tasks

  start: =>

  addNewTask: (task) =>
    @todoTasks.push(task)

  editTaskContent: (task) =>

  updateTaskContent: (task, content) =>
    task.content = content

  deleteTask: (task) =>
    @todoTasks.remove(task)

  completeAllTasks: =>
    @todoTasks.map((task) => @completeTask(task))

  toggleTaskCompletion: (task) =>
    if task.completed
      @uncompleteTask(task)
    else
      @completeTask(task)

  completeTask: (task) =>
    task.complete()

  uncompleteTask: (task) =>
    task.uncomplete()

class Task
  constructor: (@content, @completed=false) ->

  complete: =>
    @completed = true

  uncomplete: =>
    @completed = false

