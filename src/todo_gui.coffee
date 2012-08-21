class WebGui
  constructor: ->
    $("#new-todo").keypress((event) => @keyPressed(event))
    $("#toggle-all").click( => @completeAllTasksClicked())
    @taskElements = []

  createElementFor: (task, templateId) =>
    source = $(templateId).html()
    template = Handlebars.compile(source)
    data = {content: task.content, completed: task.completed}
    html = template(data)
    element = $(html)

  addNewTask: (task) =>
    element = @createElementFor(task, "#todo-template")
    element.task = task
    @taskElements.push(element)
    $("#todo-list").append(element)

    element.find(".destroy").click( => @deleteTaskClicked(task))
    element.find(".toggle").click( => @toggleTaskCompletionClicked(task))
    element.dblclick( => @taskContentDoubleClicked(task))

  findTaskElement: (task) => @taskElements.find((taskElement) -> taskElement.task == task)
  taskContentDoubleClicked: (task) =>

  deleteTaskClicked: (task) =>
  deleteTask: (task) => @findTaskElement(task).remove()


  editTaskContent: (task) =>
    element = @findTaskElement(task)
    element.addClass("editing").find("input.edit").show().select().focus()
    element.find("input.edit").keypress((event) => @editingKeyPressed(event, element))

  editingKeyPressed: (event, element) =>
    ENTER_KEY_CODE = 13
    if event.keyCode == ENTER_KEY_CODE
      @enterKeyPressedWhenEditing(element.task, element.find("input.edit").val())

  enterKeyPressedWhenEditing: (task, newContent) =>

  updateTaskContent: (task, content) =>
    element = @findTaskElement(task)
    element.removeClass("editing").find("input.edit").hide()
    element.find("label").html(content)

  completeTask: (task) =>
    element = @findTaskElement(task)
    element.addClass("completed")
    element.find("input.toggle").attr("checked", "checked")

  uncompleteTask: (task) =>
    element = @findTaskElement(task)
    element.removeClass("completed")
    element.find("input .toggle").attr("checked", "")

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

  showStats: (remaining, completed) =>
    source = $("#stats-template").html()
    template = Handlebars.compile(source)
    data = {remaining: remaining, completed: completed}
    html = template(data)
    element = $(html)
    console.log("here")
    $("#footer").html(element)

