//get elements ----------------------------

let input = document.querySelector(".tasks input");
let add = document.querySelector(".tasks button");
let list = document.querySelector(".list");
let points = document.querySelector(".points");

//onload focus input-------------------------

onload = input.focus();

//add tasks to list-------------------------

function addtasks() {
  //focus input-------------------------------

  input.focus();

  //create remove button--------------------

  let button;

  button = document.createElement("button");

  button.innerHTML = "Remove";

  button.style.cssText = `padding : 5px; background-color : red; color : white; border : none; border-radius : 5px; cursor : pointer;`;

  button.addEventListener("click", removeTask);

  //create done button-------------------------

  let done_button;

  done_button = document.createElement("button");

  done_button.innerHTML = "Done";

  done_button.style.cssText = `padding : 5px; background-color : green; color : white; border : none; border-radius : 5px; cursor : pointer;`;

  done_button.addEventListener("click", done_task);

  //craete buttons div-------------------------

  let buttons_div = document.createElement("div");

  buttons_div.style.cssText = `display : flex; gap: 10px;`;

  buttons_div.appendChild(done_button);

  buttons_div.appendChild(button);

  //create task div-------------------------

  let a = document.createElement("div");

  a.classList.add("task");

  a.style.cssText = `padding : 10px; margin : 10px 0px; border : 1px solid purple; border-radius : 5px; display : flex; justify-content : space-between;`;

  //add task to list-------------------------

  if (input.value != "") {
    a.innerHTML = input.value;

    a.appendChild(buttons_div);

    list.appendChild(a);

    input.value = "";
  } else {
    input.placeholder = "Please enter a task";
  }
}

//remove function --------------------------

function removeTask(e) {
  e.target.parentElement.parentElement.remove();
}

//done function --------------------------

let i = 1;

function done_task(e) {
  e.target.parentElement.parentElement.remove();

  points.innerHTML = `points : ${i}`;

  i++;
}
