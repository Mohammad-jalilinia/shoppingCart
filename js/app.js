
// variables
const courses = document.querySelector("#courses-list");
const shoppingCardContent = document.querySelector("#cart-content tbody");
const clearCardBtn = document.querySelector("#clear-cart");


// eventListeners
eventListeners();
function eventListeners(){
    courses.addEventListener("click",buyCourse);

    shoppingCardContent.addEventListener("click",removeCourse);

    clearCardBtn.addEventListener("click",clearCard);

    document.addEventListener("DOMContentLoaded",showCoursesOnLoad)
}


// functions
function buyCourse(e){ // e means event
    //console.log(e.target.innerHTML);
    e.preventDefault();
    if(e.target.classList.contains("add-to-cart")){
        const course = e.target.parentElement.parentElement; // access to card div with parent element ! : so course means each card div .
        getCourseInfo(course);
    }
}

function getCourseInfo(input){
    //console.log(course)
    const courseInfo = {
        image : input.querySelector("img").src,
        title : input.querySelector("h4").textContent,
        price : input.querySelector("span").textContent,
        id : input.querySelectorAll("a")[1].getAttribute("data-id")
    }
    //console.log(courseInfo);
    addToCard(courseInfo);
}

function addToCard(vorodi){
    let row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td> <img src="${vorodi.image}" width="100px"></td>
            <td> ${vorodi.title}</td>
            <td> ${vorodi.price}</td>
            <td> <a class="remove" href="#" data-id="${vorodi.id}">X</a> </td>
        </tr>
    `
   // shoppingCardContent.innerHTML = row.innerHTML
    shoppingCardContent.appendChild(row);

    addToStorage(vorodi)
}

function addToStorage(course){
    let courses = getFromStorage();
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses))
}
function getFromStorage(){
    let courses ;
    if(localStorage.getItem('courses')){
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    else{
        courses = []
    }
    return courses;
}

function removeCourse(e){
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove(); //from tag a to td and tr
    }
}

function clearCard(){
    shoppingCardContent.innerHTML = '';

    clearCardls();
}
function clearCardls(){
    localStorage.clear();
}


function showCoursesOnLoad(){
    let coursesLS = getFromStorage();
    coursesLS.forEach(function (vorodi){
        let row = document.createElement('tr');

        row.innerHTML = `
        <tr>
            <td> <img src="${vorodi.image}" width="100px"></td>
            <td> ${vorodi.title}</td>
            <td> ${vorodi.price}</td>
            <td> <a class="remove" href="#" data-id="${vorodi.id}">X</a> </td>
        </tr>
    `
        shoppingCardContent.appendChild(row);
    });
}
