class CompleteTasksUseCase
  constructor: ->
    @todoTasks = []

  completedTasks: => @todoTasks.filter (task) -> task.completed
  remainingTasks: => @todoTasks.filter (task) -> not task.completed

  setInitialTasks: (tasks) =>
    @todoTasks = tasks

  showAll: =>
  showActive: =>
  showCompleted: =>

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

  clearCompleted: =>
    @completedTasks().each (task) => @deleteTask(task)

class Task
  constructor: (@content, @completed=false) ->

  complete: =>
    @completed = true

  uncomplete: =>
    @completed = false

