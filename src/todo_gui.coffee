class WebGui
  constructor: ->
    $("#new-todo").keypress((event) => @keyPressed(event))
    $("#toggle-all").click( => @completeAllTasksClicked())

  showTasks: (tasks) =>
    source = $("#item-template").html();
    template = Handlebars.compile(source)
    data = {tasks : tasks.map( (task) -> {id: task.id, content: task.content, completed: task.completed})}
    html = template(data)
    $("#todo-list").html(html)

    for task in tasks
      do (task) =>
        $("#destroy-task-#{task.id}").click( => @deleteTaskClicked(task.id))
        $("#complete-task-button-#{task.id}").click( => @toggleTaskCompletionClicked(task.id))
        
  deleteTaskClicked: (taskId) =>

  completeAllTasksClicked: =>

  toggleTaskCompletionClicked: (taskId) =>

  keyPressed: (event) =>
    ENTER_KEY_CODE = 13
    if event.keyCode == ENTER_KEY_CODE
      @enterKeyPressed(@newTodoContent())
      @clearNewTodoTextBox()

  clearNewTodoTextBox: =>   $("#new-todo").val("")

  newTodoContent: =>
    $("#new-todo").val()


  enterKeyPressed: (content) =>



