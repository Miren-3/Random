//this was made in p5.js

let backColor = "white";
let textColor = "black";
let themeButton, buttonCreate, buttonDelete, currentTask, maxTasks, currentTaskDelete;
let backGroundColor = 0;
let counter = 1;
let taskList = [];
//var buttonList = [];
//var standByButtonList = [];

//immediately makes the necessary buttons
function setup() {
  maxTasks = Math.trunc((windowHeight - 145) / 37);
  createCanvas(windowWidth, windowHeight);
  themeButton = createButton("Change theme");
  buttonCreate = createButton("Create new task");
  buttonDelete = createButton("Delete a task");
  themeButton.position(windowWidth - 100, 0);
  buttonCreate.position(windowWidth / 2 - 95, 60);
  buttonDelete.position(windowWidth / 2 + 15, 60);
}

//shows the necessary buttons and text
function draw() {
  background(backColor);
  themeButton.mousePressed(mainColor);
  buttonCreate.mousePressed(createTask);
  buttonDelete.mousePressed(taskPromptDelete);
  fill(textColor);
  textSize(50);
  text("To-Do list", windowWidth / 2 - 100, 50);

  if (currentTask !== undefined) {
    showText();
  }
}

//toggles background color
function mainColor() {
  if (backGroundColor === 1) {
    backColor = "black";
    textColor = "white";
    backGroundColor = 0;
  } else {
    backColor = "white";
    textColor = "black";
    backGroundColor = 1;
  }
}

//prompts for task and adds it to array (aka list)
function createTask() {
  taskPrompt();

  if (currentTask !== null && currentTask !== " " && currentTask !== undefined && currentTask !== "") {
    if (taskList.length < maxTasks) {
      taskList.push(currentTask);
      /*     standByButtonList[counter] = createButton("X");
             standByButtonList[counter].position(
              windowWidth / 2 - 285,
              126 + 37 * (counter - 1)
            );
            standByButtonList[counter].mousePressed(deleteTaskver2);
            buttonList.push(standByButtonList[counter]);*/
      counter++;
    }
  }
}

//shows each task
function showText() {
  fill(textColor);
  textSize(25);

  for (let i = 0; i < taskList.length; i++) {
    text("> " + taskList[i], windowWidth / 2 - 250, 145 + 37 * i);
  }

  //for (let j = 0; j < maxTasks; j++) { }
}

//prompts for task, pretty simple
function taskPrompt() {
  if (counter < maxTasks + 1) {
    currentTask = prompt("Task number " + counter + ":");
  } else {
    currentTask = prompt("Max number of tasks achieved!");
  }
}

//prompts for which task to delete
function taskPromptDelete() {
  if (taskList.length !== 0) {
    currentTaskDelete = prompt("Choose which task to delete:", "Type task number here")
    currentTaskDelete = currentTaskDelete - 1;
    deleteTask();
  }
}

//actually "deletes" the task (removes from array)
function deleteTask() {
  if (currentTaskDelete !== undefined && Number.isNaN(currentTaskDelete) === false && currentTaskDelete > -1) {
    taskList.splice(currentTaskDelete, 1);
    counter--;
  }
}

//something i tried to do with adding buttons next to the tasks
/*function deleteTaskver2() {
  taskList.splice(0, 1);
  buttonList.splice(0, 1);
 // standByButtonList[counter].position =(-100,-100);
  counter--;
}
*/