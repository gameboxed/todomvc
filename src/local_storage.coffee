class LocalStorage
  constructor: (@namespace) ->

  set: (key, value) =>
    console.log(value)
    $.jStorage.set("#{@namespace}/#{key}", value)

  get: (key) =>
    $.jStorage.get("#{@namespace}/#{key}")

  getTasks: =>
    @get("tasks").map( (taskData) =>
      task = @newTask(taskData.content, taskData.completed)
      return task
    )

  newTask: (content, completed) =>
    task = new Task(content)
    task.completed = completed
    return task


  remove: (key) =>
    $.jStorage.deleteKey("#{@namespace}/#{key}")

  flush: =>
    for key in $.jStorage.index()
      if key.match("^#{@namespace}")
        $.jStorage.deleteKey(key)
