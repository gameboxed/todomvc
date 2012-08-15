class CompleteTasksUseCase
  constructor: ->
    @todoTasks = []

  setInitialTasks: (tasks) =>
    @todoTasks = tasks

  start: =>

  addNewTask: (task) =>
    @todoTasks.push(task)


class Task
  constructor: (@content, @completed=false) ->

  complete: =>
    @completed = true

  uncomplete: =>
    @completed = false

