class CompleteTasksUseCase
  constructor: ->
    @todoTasks = []

  setInitialTasks: (tasks) =>
    @todoTasks = tasks

  start: =>

  addNewTask: (task) =>
    @todoTasks.push(task)

  editTaskContent: (task) =>
    console.log("here")

  updateTaskContent: (task, content) =>
    console.log("updateTaskContent with #{content}")
    task.content = content

  deleteTask: (task) =>
    @todoTasks.splice(@todoTasks.indexOf(task), 1)

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

