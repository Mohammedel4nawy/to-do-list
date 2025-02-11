//get elements--------------------------------------------
let input = document.querySelector(".tasks-input");
let add = document.querySelector(".add");
let tasks_container = document.querySelector(".tasks-container");
let points = document.querySelector(".points span");
let score = document.querySelector(".your-score");

//empty array----------------------------------------------

let score_array = [];
let tasks_array = [];
let j = 0;
if (localStorage.getItem("j")) {
  j = JSON.parse(window.localStorage.getItem("j"));
} else {
  j = 0;
}
let i = 1;
if (localStorage.getItem("i")) {
  i = JSON.parse(window.localStorage.getItem("j"));
} else {
  i = 1;
}

//check if there is data in local storage-----------------

if (localStorage.getItem("task")) {
  tasks_array = JSON.parse(localStorage.getItem("task"));
}

getdatafromlocalstorage();

//score----------------------------------------------------

if (localStorage.getItem("score")) {
  score_array = JSON.parse(window.localStorage.getItem("score"));
}

get_score_array_to_local_storage();

//get points---------------------------------------------

if (localStorage.getItem("points")) {
  points.innerHTML = JSON.parse(localStorage.getItem("points"));
}

//score array----------------------------------------------

if (localStorage.getItem("score")) {
  score_array = JSON.parse(localStorage.getItem("score"));
}

//add tasks----------------------------------------------

add.onclick = function () {
  if (input.value !== "") {
    addtasktoarray(input.value);
    input.value = "";
    j++;
  }
};

//add task function --------------------------------------

function addtasktoarray(taskText) {
  //task data-------------------
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  //push task to array----------

  tasks_array.push(task);

  //add elements to page--------

  addelementstopage(tasks_array);

  //add array to local storage-

  addtolocalstorage(tasks_array);
}

//function add elements to page-

function addelementstopage(tasks_array) {
  // empty tasks div

  tasks_container.innerHTML = "";

  //loop on array --------------

  tasks_array.forEach((task) => {
    //craete a div*--------------

    let div = document.createElement("div");

    //set attribute-------------

    div.setAttribute("data-id", task.id);

    div.classList.add("task");

    //check if task completed---

    if (task.completed) {
      task.classList("task done");
    }

    //add text to div------------

    div.appendChild(document.createTextNode(task.title));

    //craete spans div-----------

    let spansdiv = document.createElement("div");

    spansdiv.classList.add("spans-container");

    //craete delete span---------

    let spandel = document.createElement("span");

    spandel.classList.add("delete");

    spandel.innerHTML = "delete";

    //add delete span to spans div----

    spansdiv.appendChild(spandel);

    //craete done span------------

    let spandon = document.createElement("span");

    spandon.classList.add("done");

    spandon.innerHTML = "done";

    //add done span to spans div----

    spansdiv.appendChild(spandon);

    //add spans div to main div

    div.appendChild(spansdiv);

    //add div to page-----------

    tasks_container.appendChild(div);
  });
}

//function add elements to local storage-

function addtolocalstorage(tasks_array) {
  window.localStorage.setItem("task", JSON.stringify(tasks_array));
}

//function get elements to local storage-

function getdatafromlocalstorage() {
  let data = window.localStorage.getItem("task");

  if (data) {
    let tasks = JSON.parse(data);
    addelementstopage(tasks);
  }
}

//remove span --------------------------

tasks_container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();

    //remove task from local storage--------------

    removefromlocalstorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
});

//done span-------------------------------

tasks_container.addEventListener("click", (e) => {
  if (e.target.classList.contains("done")) {
    e.target.parentElement.parentElement.remove();

    //remove task from local storage--------------

    removefromlocalstorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );

    //add 1 to points----------------------------

    points.innerHTML++;

    //add to local storage----------------------

    addpoints();
  }
});

//function remove from local storage---------------

function removefromlocalstorage(id) {
  tasks_array = tasks_array.filter((e) => {
    return e.id != id;
  });

  addtolocalstorage(tasks_array);
}

//points to local storage--------------------------

function addpoints() {
  let addpoints = JSON.stringify(points.innerHTML);

  window.localStorage.setItem("points", addpoints);
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

//setInterval---------------------------------------------------------------------------------------------------------------

//update points

setInterval(function () {
  window.localStorage.removeItem("points");
  points.innerHTML = 0;
  window.localStorage.setItem("j", 0);
}, 1000 * 60 * 60 * 60 * 24 * 7);

//score function update

setInterval(function () {
  add_score();
}, 9999 * 60 * 60 * 60 * 24 * 7);

//update j [tasks number]  and i [week num]

setInterval(() => {
  window.localStorage.setItem("j", j);
  window.localStorage.setItem("i", i);
}, 5000);

//reset the i after 1 month [week num]

setInterval(() => {
  window.localStorage.setItem("i", 1);
}, 60000 * 60 * 60 * 24 * 7 * 4);

//score---------------------------------------------------------------------------------------------------------------------

function add_score() {
  add_score_to_array(points.innerHTML);
}

//add--------------------------------------------------------------------------------------------------------------------

function add_score_to_array(score_points) {
  //craete score object

  let score_ob = {
    num: i++,
    points: score_points,
    tasks: j,
  };

  //push into the array

  score_array.push(score_ob);

  //add to local storage

  add_score_array_to_local_storage();

  //add to page
  add_score_array_to_page(score_array);
}

function add_score_array_to_local_storage() {
  window.localStorage.setItem("score", JSON.stringify(score_array));
}

//add to page

function add_score_array_to_page(arr) {
  score.innerHTML = "";
  arr.forEach((e) => {
    //main div

    let score_div = document.createElement("div");
    score_div.classList.add("score");

    //spans

    let week_num = document.createElement("span");

    week_num.innerHTML = ` ${e.num} week ==>`;

    let score_num = document.createElement("span");

    score_num.innerHTML = `${(+e.points / +e.tasks) * 100} %`;

    week_num.classList.add("week-num");

    score_num.classList.add("score-num");

    //text node

    let score_text = document.createTextNode(" your score is  ==>");

    //append to div

    score_div.appendChild(week_num);
    score_div.appendChild(score_text);
    score_div.appendChild(score_num);

    //append to the page

    score.prepend(score_div);
  });
}

//get data from local storage
function get_score_array_to_local_storage() {
  let score_data = JSON.parse(window.localStorage.getItem("score"));
  if (score_data) {
    let score_2_data = score_data;
    add_score_array_to_page(score_2_data);
  }
}
