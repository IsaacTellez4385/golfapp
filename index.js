

async function getAvailableCourses() {
  
  return await fetch('https://golf-courses-api.herokuapp.com/courses/')
  .then(
    function (response) {
      return response.json();
    }
  ).then(data => data.courses);
}

function renderCourses(courses){
  let courseOptionsHtml = ''
  courses.forEach((course) =>{

    courseOptionsHtml += `<option onclick="test()" value="${course.id}">${course.name}</option>`;
   
   });
   
   document.getElementById('course-select').innerHTML = courseOptionsHtml;   
}
async function getinfo() {
  let getCourse = document.getElementById('course-select').value;
  
  return await fetch('https://golf-courses-api.herokuapp.com/courses/' + getCourse)
  .then(
    function (response) {
      return response.json();
    }
  ).then(info => info);

}
async function displayInformation() {
  let getFunction = await getinfo();
  let getOtherFunction = getFunction.data.holes[0].teeBoxes

  renderTeeBoxes(getOtherFunction);


}

// --------------------------------
async function initializePage() {
  const courses = await getAvailableCourses();
  renderCourses(courses);

}


initializePage();

// Teebox Selection

async function getTeeBox() {
  return await fetch('https://golf-courses-api.herokuapp.com/courses')
  .then(
    function(response) {
      return response.json()
    }
  ).then(data => data.courses.id)
}

function renderTeeBoxes(teeBoxes) {
  let teeBoxSelectHtml = ''
  teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.yards} yards</option>`;

});

document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
}

async function returnBoxes() {
  const boxes = await getTeeBox();

  renderTeeBoxes(teeBoxes);
}


function addList() {
  // get the todo text from the todo input box

  // const text = document.getElementById('new-list-name-input').value;
  // if(text) {
  //  lists.push({
  //     name: text,
  //     todos: []
  //   })
  //   currentList = lists[lists.length - 1]
  //   render();
  // }
  // console.log(text)
  // position = lists.length - 1;

  const text = document.getElementById('new-list-name-input').value;
  let list = document.getElementById('current-list-name').value = text;
  let result = document.getElementById('current-list-name').innerHTML = list;
  let newArray = [result];



  console.log(newArray)

 }

 



 async function displayTeebox() {
  let getYardsLoop =  await getinfo()
  let dropDownValue = document.getElementById('tee-box-select').value;
  let holeRow = '<th scope="row" >Row'
  let yards = '<th scope="row">Yards</th>';
  let par = '<th scope="row">Par</th>';
  let handicap = '<th scope="row">Handicap</th>'
  
  
  for(let i = 1 ; i <= getYardsLoop.data.holes.length; i++) {
     holeRow += `<th>${i}</th>`
 }
  document.querySelector('table').innerHTML = holeRow

  for(let i = 0; i < getYardsLoop.data.holes.length; i++) {
    let getYards = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].yards;

    yards += ` <td>${getYards}</td>`

  }
  for(let i = 0; i < getYardsLoop.data.holes.length; i++) {
    let getPar = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].par;

    par += ` <td>${getPar}</td>`

  }
  for(let i = 0; i < getYardsLoop.data.holes.length; i++) {
    let getHandicap = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].hcp;

    handicap += ` <td>${getHandicap}</td>`

  }
  document.querySelector('table').innerHTML += yards;
  yards += '</tr>'

  document.querySelector('table').innerHTML += par;
  par += '</tr>'

  document.querySelector('table').innerHTML += handicap;
  handicap += '</tr>'


 }

 let counter = 3;

 function getNextId() {
  
  counter += 1;
  return counter;
 }

 class Player {
  constructor(name, id = getNextId(), scores = Array.apply(null, Array(18)).map(function () {})) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

let addPlayerCounter = 0;

 async function addPlayer() {
  
  let getValue = document.getElementById('offCanvasTextBox').value;
  let addGuy = new Player(getValue)
  let namePlayer = `<tr> <th onclick="removePlayer(${addGuy.id})" scope="row">${addGuy.name}</th>`
  let getYardsLoop =  await getinfo()
  playerArray.push(addGuy);
  

  for(let i = 0; i < getYardsLoop.data.holes.length; i++) {
    namePlayer += `<td data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="changeScoreData(${i}, ${addGuy.id}, ${addPlayerCounter})" id="${addGuy.id}playerBox${i}"></td>`

  }
  document.querySelector('table').innerHTML += namePlayer;
  namePlayer += '</tr>'
  addPlayerCounter += 1;
 }

 function removePlayer(hello) {
  alert('Are you sure you want to delete ?')
  document.querySelector('table').deleteRow(hello);
 }
 function changeScore() {
  let value = document.getElementById('scoreInput').value;
  playerArray[playerCounter].scores[whenChanged] = value;

  document.getElementById(`${otherVariable}playerBox${whenChanged}`).innerHTML = value;

 }
 let playerArray = [];

 let whenChanged = 0;
 let otherVariable = 0;
 let playerCounter = 0;

 function changeScoreData(indexNumber, guyId, otherPlayerCounter) {
  whenChanged = indexNumber;
  otherVariable = guyId;
  playerCounter = otherPlayerCounter;
  console.log(whenChanged, otherVariable, playerCounter)
 }










