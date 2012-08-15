class WebGui
  constructor: ->
    $("#new-todo").keypress((event) => @keyPressed(event))
    $("#toggle-all").click( => @completeAllTasksClicked())

  getElementFor: (task, templateId) =>
    source = $(templateId).html()
    template = Handlebars.compile(source)
    data = {content: task.content, completed: task.completed}
    html = template(data)
    element = $(html)

  addNewTask: (task) =>
    element = @getElementFor(task, "#todo-template")
    element.task = task
    $("#todo-list").append(element)

    element.find(".destroy-task-button").click( => @deleteTaskClicked(task))
    element.find(".complete-task-button").click( => @toggleTaskCompletionClicked(task))

  deleteTaskClicked: (task) =>

  showAllTasks: (tasks) =>
    for task in tasks
      @addNewTask(task)

  completeAllTasksClicked: =>

  toggleTaskCompletionClicked: (task) =>

  keyPressed: (event) =>
    ENTER_KEY_CODE = 13
    if event.keyCode == ENTER_KEY_CODE
      @enterKeyPressed(@newTodoContent())
      @clearNewTodoTextBox()

  clearNewTodoTextBox: =>
    $("#new-todo").val("")

  newTodoContent: =>
    $("#new-todo").val()


  enterKeyPressed: (content) =>



