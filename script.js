const subContainer = document.getElementById('sub-container');
const instructions = document.getElementById('instructions')
const inputBox = document.getElementById('inputBox');
const submit = document.getElementById('submit');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');
const restart = document.getElementById('restart');
setTimeout(() => {
    subContainer.style.opacity = '1';
    instructions.style.opacity = '1';
}, 750);

let a;

function timeUpdation(){
    a = setInterval(function(){
        let existingSeconds = parseInt(seconds.value);
        let existingMinutes = parseInt(minutes.value);
        let existingHours = parseInt(hours.value);
        if(existingSeconds==0){
            if(!(existingMinutes==0 && existingHours==0)){
                existingSeconds = 59;
                if(existingMinutes==0){
                    if(existingHours!=0){
                        existingMinutes=59;
                        existingHours--;
                    }
                }
                else{
                    existingMinutes--;
                }
            }
            else{
                setInterval(() => {
                    inputBox.style.color = 'rgb(110,110,110)';
                    for(let i = 0; i<inputFields.length; i++){
                        inputFields[i].style.color = 'rgb(110,110,110)';
                    }
                    setTimeout(() => {
                        inputBox.style.color = 'rgb(0,255,0)';
                        for(let i = 0; i<inputFields.length; i++){
                            inputFields[i].style.color = 'rgb(0,255,0)';
                        }
                    }, 250);
                }, 600);
                pause.style.display = 'none';
                restart.style.display = 'inline'
                clearInterval(a);
            }
        }
        else{
            existingSeconds--;
        }
        if(existingSeconds<10){
            existingSeconds = `0${existingSeconds}`;
        }
        if(existingMinutes<10){
            existingMinutes = `0${existingMinutes}`;
        }
        if(existingHours<10){
            existingHours = `0${existingHours}`;
        }
        seconds.value = existingSeconds;
        minutes.value = existingMinutes;
        hours.value = existingHours;
    },1000)
}

let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let inputFields = document.getElementsByClassName('inputs');

let digitStr = '0123456789';
let digitArr = Array.from(digitStr);

for(let i = 0; i<inputFields.length; i++){
    inputFields[i].addEventListener('keydown',restrictionsFunc);
    function restrictionsFunc(elem){
        if(elem.key!='Backspace' && elem.key!='ArrowRight' && elem.key!='ArrowLeft'){
            if(inputFields[i].value.length>1 || !(digitArr.includes(elem.key))){
                elem.preventDefault();
            }
        }
    }
}

submit.addEventListener('click',valueCheck)
function valueCheck(){
    let validInput = true;
    for(let i = 0; i<inputFields.length; i++){
        if(inputFields[i].value==''){
            validInput = false;
            break;
        }
    };
    if(validInput){
        for(let i = 1; i<inputFields.length; i++){
            if(inputFields[i].value>=60){
                validInput = false;
                break;
            }
        }
    }
    if(validInput){
        instructions.style.opacity = '0';
        timeUpdation();
        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].disabled = 'true';
        }
        submit.style.display = 'none';
        pause.style.display = 'inline';
    }
    else{
        instructions.style.opacity = '0';
        setTimeout(() => {
            instructions.innerHTML = 'Please enter a valid time'
            instructions.style.opacity = '1';
        }, 500);
    }
}

pause.addEventListener('click', pauseFunc);
function pauseFunc(){
    clearInterval(a);
    pause.style.display = 'none';
    resume.style.display = 'inline';
    restart.style.display = 'inline';
}

resume.addEventListener('click',resumeFunc);
function resumeFunc(){
    timeUpdation();
    resume.style.display = 'none';
    restart.style.display = 'none';
    pause.style.display = 'inline';
}

restart.addEventListener('click',restartFunc);
function restartFunc(){
    location.reload();
}
