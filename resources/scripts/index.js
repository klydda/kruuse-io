const kruuse = document.getElementById('logo-1');
const logo2 = document.getElementById('logo-2');
const dots = []; //Array of dot objects
const dotElements = []; //Array of dotElements as divs
const numOfDots = 20;
const nav = ['projects', 'about', 'contact'];
const navElements = [];
const mainContainer = document.getElementById('main-container');
const clickTarget = document.getElementById('click-target');

let windowWidth = window.innerWidth;
let windowHeight= window.innerHeight;
let rgbWidthRatio = windowWidth/256;
let rgbHeightRatio = windowHeight/256;
let intervalID;
let dotReturnID;
let mouseX;
let mouseY;

let colorConfig = 0;

const colorAnimTargetsLive = document.getElementsByClassName('color-anim');
const colorAnimTargets = Array.from(colorAnimTargetsLive);

//-------------------------
// CODE TO KEEP TRACK OF WINDOW SIZE
//-------------------------

//Event listener that calls setWindowSize() whenever the window is resized
window.addEventListener('resize', setWindowSize);

//Function that updates global variables windoWidth and windowHeight based on current window size
function setWindowSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    document.getElementById('screen-width').innerHTML = windowWidth;
    document.getElementById('screen-height').innerHTML = windowHeight;
}

//-------------------------
// CODE FOR ADDING DOTS
//-------------------------

//Factory function for dots
function dotFactory(id, top, left, size){
    return {
        id: id,
        top: top,
        left: left,
        size: size
    }
};

//Function that takes in a number, creates as many dots and pushes them to the dots array
function makeDots(num){
    for (let i = 0; i < num; i++){
        let id = i;
        let top = Math.floor(Math.random() * (windowHeight - 100)); //Generates a random number between 0 - ([height of window] - 100px)
        let left = Math.floor(Math.random() * (windowWidth - 100)); //Generates a random number between 0 - ([width of window] - 100px)
        let size = Math.floor((Math.random() * 70) + 20); //Sets the size to a number between 20px and 90px
        dots.push(dotFactory(id, top, left, size)); //Creates the dot objects and pushes them to the dots array

    }
};

//Function that loops through the dots array and draws the dots based on their properties and additional properties in the function
function drawDots(arr){
    for (let i = 0; i < arr.length; i++){
        dotElements[i] = document.createElement('div');
        const main = document.getElementById('main-container');
        document.body.insertBefore(dotElements[i], main);

        dotElements[i].setAttribute('id', i);
        dotElements[i].classList.add('color-anim');
        dotElements[i].style.position = 'absolute';
        dotElements[i].style.top = `${dots[i].top}px`;
        dotElements[i].style.left = `${dots[i].left}px`;
        dotElements[i].style.backgroundColor = 'black';
        dotElements[i].style.width = `${dots[i].size}px`;
        dotElements[i].style.height = `${dots[i].size}px`;
        dotElements[i].style.borderRadius = `${dots[i].size/2}px`;
        dotElements[i].style.zIndex = '1';
    }
}

makeDots(numOfDots); //Make numOfDots and push them to dots array
drawDots(dots); //Draw the dots of the dots array

//Event listener that calls updateDots on click
clickTarget.addEventListener('click', updateDots);

//Removes existing dots, clears dot arrays, draws new dots
function updateDots(){
    //Remove existing dots
    dotElements.forEach(element => {
        element.remove();
    });

    //Clear the arrays
    dots.length = 0;
    dotElements.length = 0;

    //Draw new dots
    makeDots(numOfDots);
    drawDots(dots);
};

//-------------------------
// CODE FOR COLOR ANIMATION
// -------------------------

//Event listener for updating color of colorAnimTargets based on mouseX and mouseY position
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.getElementById('mousepos').innerHTML = `mouseX = ${mouseX} | mouseY = ${mouseY}`;

    //Applies mousePosToRgb on all elements in colorAnimTargets
    colorAnimTargets.forEach((elem) => {
        elem.style.color = mousePosToRgb(elem);
    });

    //Applies mousPosToRgb on all dotElements (bc they are created through js not in HTML)
    dotElements.forEach((elem) => {
        elem.style.backgroundColor = mousePosToRgb(elem);
    });
});

clickTarget.addEventListener('click', updateColorConfig);

function updateColorConfig(){
    colorConfig = Math.floor(Math.random() * 3);
    document.getElementById('color-config').innerHTML = colorConfig; // Used for testing - set dev-tool to block in css to see

    //Applies mousePosToRgb on all elements in colorAnimTargets
    colorAnimTargets.forEach((elem) => {
        elem.style.color = mousePosToRgb(elem);
    });

    //Applies mousPosToRgb on all dotElements (bc they are created through js not in HTML)
    dotElements.forEach((elem) => {
        elem.style.backgroundColor = mousePosToRgb(elem);
    });
}

//Populates navElements array with all elements in nav array (which in turn is populated with id's corresponding to <li>'s in the <nav>)
nav.forEach((id) => {
    navElements.push(document.getElementById(id));
});

//Changes backgroundColor of kruuse and enables dot gravity on mousedown
kruuse.addEventListener('mousedown', mainContainerMouseDown);

//Resets page on mouseup (mainContainer placement and content container visibility)
kruuse.addEventListener('mouseup', resetPage);

//Assigns mousedown and mouseup event to navigation elems
function eventAssignmentNav(elem){
    elem.addEventListener('mousedown', mainContainerMouseDown);
    elem.addEventListener('mouseup', moveMainContainer); 
    elem.addEventListener('mouseup', clearActive);
    elem.addEventListener('mouseup', setActive);
}

navElements.forEach(eventAssignmentNav);

document.addEventListener('mouseup', mainContainerMouseUp);

function clearActive(){
    navElements.forEach((elem) => {
        elem.classList.remove('section-active');
    });
}

function setActive(event){
    const eventTarget = event.target;
    eventTarget.classList.add('section-active');
}

function mainContainerMouseDown(){
    clearIntervalID();
    stopDotReturn();
    intervalID = setInterval (() => {
        linkClickColor();
        dotGravity();
    }, 10);
}

function mainContainerMouseUp(){
    clearIntervalID();
    dotReturnID = setInterval(() => {
        dotReturn();
    });
}

function stopDotReturn(){
    clearInterval(dotReturnID);
}

function clearIntervalID(){
    clearInterval(intervalID);

    //Resets the color without having to move the mouse
    //Applies mousePosToRgb on all elements in colorAnimTargets
    colorAnimTargets.forEach((elem) => {
        elem.style.color = mousePosToRgb(elem);
    });

    //Applies mousPosToRgb on all dotElements (bc they are created through js not in HTML)
    dotElements.forEach((elem) => {
        elem.style.backgroundColor = mousePosToRgb(elem);
    });
}

//Sets color or backgroundColor of elems to pink
function linkClickColor(){
    dotElements.forEach((elem) => {
        elem.style.backgroundColor = 'rgb(255, 100, 160)';
    });

    colorAnimTargets.forEach((elem) => {
        elem.style.color = 'rgb(255, 100, 160)';
    })
}

//Function for updating color of colorAnimTargets based on mouseX and mouseY position
function mousePosToRgb(elem){
    let rgbWidth = Math.floor(mouseX/rgbWidthRatio);
    let rgbHeight = Math.floor(mouseY/rgbHeightRatio);
    document.getElementById('rgb-text').innerHTML = `width: ${rgbWidth} | height: ${rgbHeight}`;


    switch (colorConfig){
        case 0:
            return `rgb(${rgbWidth}, ${rgbHeight}, 56)`;
        case 1:
            return `rgb(56, ${rgbWidth}, ${rgbHeight})`;
        case 2:
            return `rgb(${rgbHeight}, 56, ${rgbWidth})`;
        default:
            return `rgb(${rgbWidth}, ${rgbHeight}, 56)`;            
    }
}


//-------------------------
// CODE FOR LOGO MOVEMENT
// ------------------------

//Moves main-container to top of page
function moveMainContainer(){
    mainContainer.classList.add('top');
    mainContainer.classList.remove('start');
}

//Resets page back to it's original configuration
function resetPage(){
    mainContainer.classList.add('start');
    mainContainer.classList.remove('top');
    contentContainer.classList.remove('visible');
    setTimeout(() => {
        contentContainer.style.display = 'none';
    },600);
}

//-------------------------
// CODE FOR CONTENT AREAS
// ------------------------

const projects = document.getElementById('projects');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const projectsSection = document.getElementById('projects-section');
const aboutSection = document.getElementById('about-section');
const contactSection = document.getElementById('contact-section');
const contentContainer = document.getElementById('content-container');

projects.addEventListener('mouseup', projectsAppear);
about.addEventListener('mouseup', aboutAppear);
contact.addEventListener('mouseup', contactAppear);

function projectsAppear(){
    //Changes display property from none to a visible one
    contentContainer.style.display = 'flex';
    projectsSection.style.display = 'flex';

    //Waits 5ms to ensure that the display properties have been set to visible ones before maniuplating the opacity
    setTimeout(() => {
        contentContainer.classList.add('visible');
        projectsSection.classList.add('visible');
    }, 5);

    //Sets the other content-areas display properties to none
    aboutSection.style.display = 'none';
    contactSection.style.display = 'none';
}

function aboutAppear(){
    //Changes display property from none to a visible one
    contentContainer.style.display = 'flex';
    aboutSection.style.display = 'flex';

    //Waits 5ms to ensure that the display properties have been set to visible ones before maniuplating the opacity
    setTimeout(() => {
        contentContainer.classList.add('visible');
        aboutSection.classList.add('visible');
    }, 5);

    //Sets the other content-areas display properties to none
    projectsSection.style.display = 'none';
    contactSection.style.display = 'none';
}

function contactAppear(){
    //Changes display property from none to a visible one
    contentContainer.style.display = 'flex';
    contactSection.style.display = 'flex';

    //Waits 5ms to ensure that the display properties have been set to visible ones before maniuplating the opacity
    setTimeout(() => {
        contentContainer.classList.add('visible');
        contactSection.classList.add('visible');
    }, 5);

    //Sets the other content-areas display properties to none
    projectsSection.style.display = 'none';
    aboutSection.style.display = 'none';
}

//-------------------------
// CODE FOR DOTS ANIMATION
// ------------------------

function dotGravity(){
    for (let i = 0; i < dots.length; i++){
        let currentX = parseInt(dotElements[i].style.left, 10);
        let currentY = parseInt(dotElements[i].style.top, 10);
        let movementX = 0;
        let movementY = 0;
        let moveSpeedX = 1;
        let moveSpeedY = 1;

        if (currentX < mouseX){
            movementX = moveSpeedX;
        } else if (currentX > mouseX){
            movementX = moveSpeedX * -1;
        } else {
            movementX = 0;
        }

        if (currentY < mouseY){
            movementY = moveSpeedY;
        } else if (currentY > mouseY){
            movementY = moveSpeedY * -1;
        } else {
            movementY = 0;
        }

        currentX += movementX;
        currentY += movementY;

        dotElements[i].style.left = `${currentX}px`;
        dotElements[i].style.top = `${currentY}px`;
    }
}

function dotReturn(){
    clearIntervalID();
    const hasReturned = [];
    for (let i = 0; i < dots.length; i++){
        let currentX = parseInt(dotElements[i].style.left, 10);
        let currentY = parseInt(dotElements[i].style.top, 10);
        let movementX = 0;
        let movementY = 0;
        let moveSpeedX = 2;
        let moveSpeedY = 2;
        let distanceX = Math.abs(currentX - dots[i].left);
        let distanceY = Math.abs(currentY - dots[i].top);

        if (distanceX <= 10 && distanceY <= 10){
            dotElements[i].style.left = `${dots[i].left}px`;
            dotElements[i].style.top = `${dots[i].top}px`;
            hasReturned[i] = true;
            continue;
        }

        if (currentX < dots[i].left){
            movementX = moveSpeedX;
        } else if (currentX > dots[i].left){
            movementX = moveSpeedX * -1;
        } else {
            movementX = 0;
        }

        if (currentY < dots[i].top){
            movementY = moveSpeedY;
        } else if (currentY > dots[i].top){
            movementY = moveSpeedY * -1;
        } else {
            movementY = 0;
        }

        if (currentY === dots[i].top && currentX === dots[i].left){
            hasReturned[i] = true;
        } else {
            hasReturned[i] = false;
        }

        currentX += movementX;
        currentY += movementY;

        dotElements[i].style.left = `${currentX}px`;
        dotElements[i].style.top = `${currentY}px`;
    }

    for (let i = 0; i < dots.length; i++){
        console.log(`hasReturned[${i}]: ${hasReturned[i]}`);
    }
    
    if (hasReturned.every(Boolean)){
        clearInterval(dotReturnID);
    }
}

