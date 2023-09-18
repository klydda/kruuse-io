const kruuse = document.getElementById('logo-1');
const logo2 = document.getElementById('logo-2');
const dots = []; //Array of dot objects
const dotElements = []; //Array of dotElements as divs
const numOfDots = 10;

let windowWidth = window.innerWidth;
let windowHeight= window.innerHeight;
let rgbWidthRatio = windowWidth/256;
let rgbHeightRatio = windowHeight/256;
let intervalID;
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
// CODE FOR DOTS
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
        let top = Math.floor(Math.random() * (windowHeight - 100)); //Generates a random number between 0 - [height of window]
        let left = Math.floor(Math.random() * (windowWidth - 100)); //Generates a random number between 0 - [width of window]
        let size = Math.floor((Math.random() * 70) + 20);
        dots.push(dotFactory(id, top, left, size));
    }
};

function drawDots(arr){
    for (let i = 0; i < arr.length; i++){
        dotElements[i] = document.createElement('div');
        const main = document.getElementById('logo-container');
        document.body.insertBefore(dotElements[i], main);

        dotElements[i].setAttribute('id', i);
        dotElements[i].classList.add('color-anim');
        dotElements[i].style.position = 'absolute';
        dotElements[i].style.top = `${dots[i].top}px`;
        dotElements[i].style.left = `${dots[i].left}px`;
        //dotElements[i].style.backgroundColor = colorElement(dotElements[i]);
        dotElements[i].style.backgroundColor = 'black';
        dotElements[i].style.width = `${dots[i].size}px`;
        dotElements[i].style.height = `${dots[i].size}px`;
        dotElements[i].style.borderRadius = `${dots[i].size/2}px`;
    }
}

makeDots(numOfDots);
drawDots(dots);

//Event listener that calls updateDots on click
document.addEventListener('click', updateDots);

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


//NOT BEING USED ATM. Colors each dot based on it's position instead of based on mouse position.
function colorElement(elem){
    let rect = elem.getBoundingClientRect();
    let elementCoordWidth = (rect.x + (rect.width / 2)); //Sets elementCoordWidth to the center coordinate of the element's x axis
    let elementCoordHeight = (rect.y + (rect.height/2)); //Sets elementCoordHeight to the center coordinate of the element's y axis
    let elementColorWidth = Math.floor(elementCoordWidth / rgbWidthRatio); //Calculates rgbValue based on coord and assigns the result to elementColorWidth
    let elementColorHeight = Math.floor(elementCoordHeight / rgbHeightRatio); //Calculates rgbValue based on coord and assigns the result to elementColorHeight
    
    switch (colorConfig){
        case 0:
            return `rgb(${elementColorWidth}, ${elementColorHeight}, 56)`;
        case 1:
            return `rgb(56, ${elementColorWidth}, ${elementColorHeight})`;
        case 2:
            return `rgb(${elementColorHeight}, 56, ${elementColorWidth})`;
        default:
            return `rgb(${elementColorWidth}, ${elementColorHeight}, 56)`;            
    }
}

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

document.addEventListener('click', updateColorConfig);

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
