

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
  let holeRow = '<th scope="row" >Hole'
  let splitHoleRow = getYardsLoop.data.holes.length / 2
  let yards = '<th scope="row">Yards</th>';
  let par = '<th scope="row">Par</th>';
  let handicap = '<th scope="row">Handicap</th>'
  let yardsTotalCount = 0;
  let parTotalCount = 0;
  let handicapTotalCount = 0;
  let totalTotalCount = 0;

  for(let i = 1; i <= splitHoleRow; i++) {
    holeRow += `<th <td >${i}</th>`

  }

  holeRow += `<th style="color:green;" >Out</th>`

  for(let i = splitHoleRow + 1 ; i <= getYardsLoop.data.holes.length; i++) {
     holeRow += `<th <td >${i}</th>`
 }
 holeRow += `<th style="color:red;">In</th>`
 holeRow += `<th style="color:orange" >Total</th`
 
  document.querySelector('table').innerHTML = holeRow

  //yards ------------------------------------------------------------------------------------------------

  for(let i = 0; i < splitHoleRow; i++) {
    let getYards = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].yards;
    yardsTotalCount += getYards
    totalTotalCount = yardsTotalCount;
    yards += ` <td>${getYards}</td>`
  }
  yards += `<th style="color:#056600;" >${yardsTotalCount}</th>`
  yardsTotalCount = 0;
  for(let i = splitHoleRow; i < getYardsLoop.data.holes.length; i++) {
    let getYards = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].yards;
    yardsTotalCount += getYards
    yards += ` <td>${getYards}</td>`

  }
  totalTotalCount += yardsTotalCount;
  yards += `<th style="color:red;">${yardsTotalCount}</th>`
  yards += `<th style="color:orange;">${totalTotalCount}</th>`
  // par ------------------------------------------------------------------------------------------------

  for(let i = 0; i < splitHoleRow; i++) {
    let getPar = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].par;
    parTotalCount += getPar
    totalTotalCount = parTotalCount;
    par += ` <td>${getPar}</td>`
  }
  par += `<th style="color:#056600;">${parTotalCount}</th>`
  parTotalCount = 0;
  for(let i = splitHoleRow; i < getYardsLoop.data.holes.length; i++) {
    let getPar = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].par;
    parTotalCount += getPar
    par += ` <td>${getPar}</td>`

  }
  totalTotalCount += parTotalCount;
  par += `<th style="color:red;">${parTotalCount}</th>`
  par += `<th style="color:orange;">${totalTotalCount}</th>`

  //handicap ------------------------------------------------------------------------------------------------

//--
for(let i = 0; i < splitHoleRow; i++) {
  let getHandicap = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].hcp;
  handicapTotalCount += getHandicap
  totalTotalCount = handicapTotalCount;
  handicap += ` <td>${getHandicap}</td>`
}

handicap += `<th style="color:#056600;">${handicapTotalCount}</th>`
handicapTotalCount = 0;

for(let i = splitHoleRow; i < getYardsLoop.data.holes.length; i++) {
  let getHandicap = getYardsLoop.data.holes[i].teeBoxes[dropDownValue].hcp;
  handicapTotalCount += getHandicap
  handicap += ` <td>${getHandicap}</td>`

}
totalTotalCount += handicapTotalCount;
handicap += `<th style="color:red;">${handicapTotalCount}</th>`
handicap += `<th style="color:orange;">${totalTotalCount}</th>`
// -------------------------------------------------------
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
  let splitHoleRow = getYardsLoop.data.holes.length / 2;

  for(let i = 0; i < splitHoleRow; i++) {
    namePlayer += `<td data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="changeScoreData(${i}, ${addGuy.id}, ${addPlayerCounter})" id="${addGuy.id}playerBox${i}"></td>`

  }
    namePlayer += `<th style="color:green;" id="${addGuy.id}playerBoxOut">0</th>`
  for(let i = splitHoleRow; i < getYardsLoop.data.holes.length; i++) {
    namePlayer += `<td data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="changeScoreData(${i}, ${addGuy.id}, ${addPlayerCounter})" id="${addGuy.id}playerBox${i}"></td>`
   
  }
  namePlayer += `<th style="color:red;" id="${addGuy.id}playerBoxIn">0</th>`
  namePlayer += `<th style="color:orange;" id="player-total-${addGuy.id}">0</th>`
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

  updateTotalPlayScore(otherVariable)

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

  updateTotalPlayScore(guyId)
 }


 function updateTotalPlayScore(guyId) {
  const scoreTotalElement = document.querySelector(`#player-total-${guyId}`);
  const outTotalElement = document.querySelector(`[id^="${guyId}playerBoxOut"]`);
  const inTotalElement = document.querySelector(`[id^="${guyId}playerBoxIn"]`);
  const totalScore = getTotalPlayerScore(guyId);
  const isGameFinished = getPlayerScoreElements(guyId).every(x => x.innerHTML.length > 0)
  const isPerfectGame = isGameFinished && totalScore === 18;

  scoreTotalElement.textContent =  totalScore;
  outTotalElement.textContent = getOutScore(guyId);
  inTotalElement.textContent = getInScore(guyId);
  

  if (isPerfectGame) {
    $(function() {
      toastr.success("You completed the course with a pefect score", "Congratulations", {timeout: 2000})
    })
  }
 }

 function getTotalPlayerScore(guyId) {
  return getInScore(guyId) + getOutScore(guyId)



 }
 function getOutScore(guyId) {
  const playerScoreElements = getPlayerScoreElements(guyId).slice(0, 9);
  let outPlayerScore = 0;

  for(let i =0; i < playerScoreElements.length; i++) {
    const scoreElementItem = playerScoreElements[i]
    const score = Number(scoreElementItem.textContent || 0)
    outPlayerScore += score;
  }

  return outPlayerScore

 }

 function getPlayerScoreElements(guyId) {
  const ignoreIds = [`${guyId}playerBoxOut`, `${guyId}playerBoxIn`];
  return Array.from(
    document.querySelectorAll(`[id^="${guyId}playerBox"]`)
  ).filter(x => !ignoreIds.includes(x.id) )
 }

 function getInScore(guyId) {
  const playerScoreElements = getPlayerScoreElements(guyId).slice(9)
  let inPlayerScore = 0;

  for(let i =0; i < playerScoreElements.length; i++) {
    const scoreElementItem = playerScoreElements[i]
    const score = Number(scoreElementItem.textContent || 0)
    inPlayerScore += score;
  }

  return inPlayerScore

 }










