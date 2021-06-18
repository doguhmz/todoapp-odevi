let todos = [];
let todosdate = [];

$("#frmTodo").submit(function (event) {
  var tarih = new Date();
  var date =
    tarih.getDate() +
    "." +
    (tarih.getMonth() + 1) +
    "." +
    tarih.getYear() +
    "-" +
    tarih.getHours() +
    ":" +
    tarih.getMinutes() +
    ":" +
    event.preventDefault();

  let todo = {
    id: maxId() + 1,
    task: $("#inputTask").val().trim(),
    isDone: false,
    datetime: date,
  };

  todos.push(todo);
  saveData();
  this.reset();
  listTodos();
});

$("body").on("change", "input[type='checkbox'][data-id]", function () {
  let id = $(this).data("id");

  let todo = getTodoById(id);
  saveData();
  listTodos();
});

$("body").on("dblclick", "li", function () {
  if (!confirm("Bu notu silmekte kararlı mısın?")) return;
  let id = $(this).data("id");
  deleteById(id);
  saveData();
  listTodos();
});

function saveData() {
  localStorage["data"] = JSON.stringify(todos);
}

function loadData() {
  try {
    todos = JSON.parse(localStorage["data"]);
  } catch {
    todos = [];
  }
}

function deleteById(id) {
  let index;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      index = i;
      break;
    }
  }
  todos.splice(index, 1);
}

function getTodoById(id) {
  for (const todo of todos) {
    if (todo.id == id) return todo;
  }
  return null;
}

function maxId() {
  let max = 0;

  for (const todo of todos) {
    if (todo.id > max) max = todo.id;
  }

  return max;
}

function listTodos() {
  $("ul#todos").html("");
  let sortedTodos = todos.sort((a, b) => a.isDone - b.isDone);
  $.each(sortedTodos, function (index, todo) {
    let li = $("<li/>").attr("id", todo.id);
    let cb = $("<i><i/>")
      .attr("data-id", todo.id)
      .addClass("fas fa-star")
      .attr("onclick", "yildiz(" + todo.id + ")");

    if (todo.isDone) {
      cb.css("color", "yellow");
    } else {
      cb.css("color", "black");
    }

    li.append(cb);
    li.append(" " + todo.task);
    li.append(
      "<br/>" +
        "<p style='font-size:12px;color:gray;'>" +
        todo.datetime +
        "</p>"
    );
    $("ul#todos").append(li);
  });
}

$("#datechanger").on("change", function datefilter() {
  todosdate.splice(0, todosdate.length);
  var dateval = $(this).val();
  var secili = dateval.split("-");
  var seciligun = secili[2];
  var seciliay = secili[1].slice(1);

  for (var i = 0; i < todos.length; i++) {
    var gun = todos[i].datetime.split(".", 1);
    var ay1 = todos[i].datetime.split(".", 2);
    var ay = ay1[1];
    if (gun == seciligun && ay == seciliay) {
      todosdate.push(todos[i]);
    }
  }
  $("ul#todos").html("");
  $.each(todosdate, function (index, todo) {
    let li = $("<li/>").attr("data-id", todo.id);
    let cb = $("<i><i/>")
      .attr("id", todo.id)
      .addClass("fas fa-star")
      .attr("onclick", "yildiz(" + todo.id + ")");

    if (todo.isDone) {
      cb.css("color", "yellow");
    } else {
      cb.css("color", "black");
    }

    li.append(cb);
    li.append(" " + todo.task);
    li.append(
      "<br/>" +
        "<p style='font-size:12px;color:gray;'>" +
        todo.datetime +
        "</p>"
    );
    $("ul#todos").append(li);
  });
});

$("#find").on("keypress", function () {
  var val = $(this).val();

  todosdate.splice(0, todosdate.length);

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].task.includes(val)) {
      todosdate.push(todos[i]);
    }
  }
  $("ul#todos").html("");
  $.each(todosdate, function (index, todo) {
    let li = $("<li/>").attr("data-id", todo.id);
    let cb = $("<i><i/>")
      .attr("id", todo.id)
      .addClass("fas fa-star")
      .attr("onclick", "yildiz(" + todo.id + ")");

    if (todo.isDone) {
      cb.css("color", "yellow");
    } else {
      cb.css("color", "black");
    }

    li.append(cb);
    li.append(" " + todo.task);
    li.append(
      "<br/>" +
        "<p style='font-size:12px;color:gray;'>" +
        todo.datetime +
        "</p>"
    );
    $("ul#todos").append(li);
  });
});

function yildiz(id) {
  var todo = todos.find(function (todo1) {
    if (todo1.id === id) {
      if (todo1.isDone == false) todo1.isDone = true;
      else todo1.isDone = false;
    }
  });
  $("#yildizb").prop("checked", false);
  saveData();
  listTodos();
}

$("#yildizb").change(function () {
  if ($(this).is(":checked")) {
    todosdate.splice(0, todosdate.length);

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isDone) {
        todosdate.push(todos[i]);
      }
    }
    $("ul#todos").html("");
    $.each(todosdate, function (index, todo) {
      let li = $("<li/>").attr("data-id", todo.id);
      let cb = $("<i><i/>")
        .attr("id", todo.id)
        .addClass("fas fa-star")
        .attr("onclick", "yildizb(" + todo.id + ")");

      if (todo.isDone) {
        cb.css("color", "yellow");
      } else {
        cb.css("color", "black");
      }

      li.append(cb);
      li.append(" " + todo.task);
      li.append(
        "<br/>" +
          "<p style='font-size:12px;color:gray;'>" +
          todo.datetime +
          "</p>"
      );
      $("ul#todos").append(li);
    });
  } else {
    listTodos();
  }
});

loadData();
listTodos();
