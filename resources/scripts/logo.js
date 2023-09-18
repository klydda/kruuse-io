const kruuse = document.getElementById('logo-1');
const logo2 = document.getElementById('logo-2');

let windowWidth = window.innerWidth;
let windowHeight= window.innerHeight;
let intervalID;
let mouseX;
let mouseY;

let colorConfig = 0;

const colorAnimTargetsLive = document.getElementsByClassName('color-anim');
const colorAnimTargets = Array.from(colorAnimTargetsLive);

//Event listener that calls setWindowSize() whenever the window is resized
window.addEventListener('resize', setWindowSize);

//Function that updates global variables windoWidth and windowHeight based on current window size
function setWindowSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    document.getElementById('screen-width').innerHTML = windowWidth;
    document.getElementById('screen-height').innerHTML = windowHeight;
}

//Event listener for updating color of colorAnimTargets based on mouseX and mouseY position
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.getElementById('mousepos').innerHTML = `mouseX = ${mouseX} | mouseY = ${mouseY}`;

    //Applies mousePosToRgb on all elements in colorAnimTargets
    colorAnimTargets.forEach((element) => {
        mousePosToRgb(element);
    });
});

document.addEventListener('click', updateColorConfig);

function updateColorConfig(){
    colorConfig = Math.floor(Math.random() * 3);
    document.getElementById('color-config').innerHTML = colorConfig;
}



//Function for updating color of colorAnimTargets based on mouseX and mouseY position
function mousePosToRgb(elem){
    let rgbWidthRatio = windowWidth/256;
    let rgbHeightRatio = windowHeight/256;
    let rgbWidth = Math.floor(mouseX/rgbWidthRatio);
    let rgbHeight = Math.floor(mouseY/rgbHeightRatio);
    document.getElementById('rgb-text').innerHTML = `width: ${rgbWidth} | height: ${rgbHeight}`;

    switch (colorConfig){
        case 0:
            elem.style.color = `rgb(${rgbWidth}, ${rgbHeight}, 56)`;
            break;
        case 1:
            elem.style.color = `rgb(56, ${rgbWidth}, ${rgbHeight})`;
            break;
        case 2:
            elem.style.color = `rgb(${rgbHeight}, 56, ${rgbWidth}`;
            break;
        default:
            elem.style.color = `rgb(${rgbWidth}, ${rgbHeight}, 56)`;            
    }
}

