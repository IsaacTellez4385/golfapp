

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
  console.log(getFunction);

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
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`;

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




