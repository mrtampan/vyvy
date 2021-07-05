/* 
 vyvy.js
 created by achmad rivaldi
 copyright 2021
*/


//create all variable
var attributInput = 'vy-input',
attributIf = 'vy-if',
attributClick = 'vy-click',
attributChange = 'vy-change',
attributOn = 'vy-on',
elInput = document.querySelectorAll('[' + attributInput + ']'),
elIf = document.querySelectorAll('[' + attributIf + ']'),
elClick = document.querySelectorAll('[' + attributClick + ']'),
elOn = document.querySelectorAll('[' + attributOn + ']'),
vyData = {};

//end all variable

// create data input binding
    
elInput.forEach((elemen) => {
    if(elemen.type == 'text' || elemen.type == 'textarea' || elemen.type == 'number' || elemen.type == 'password'){
        let propertiesToBind = elemen.getAttribute(attributInput);
        elemen.onkeyup = function(){
            vyData[propertiesToBind] = elemen.value;
        }
    }
    if(elemen.type == 'select-one'){
        let propertiesToBind = elemen.getAttribute(attributInput);
        elemen.onchange = function(){
            vyData[propertiesToBind] = elemen.value;
        }
    }
})
// end data input binding

// create conditional rendering


var saveChildTemplate = [];
function conditionalRender(){
    elIf.forEach((elemen) => {
        let tagname = elemen.tagName;
        if(tagname == 'VY-TEMPLATE'){
            let propertiesToBind = elemen.getAttribute(attributIf);
            let saveElemen = elemen;
            let childProp = elemen.children;
            if(vyData[propertiesToBind] == false){
                let counter = 0
                while(childProp.length){
                    saveChildTemplate.push(childProp[counter]);
                    childProp[counter].parentNode.removeChild(childProp[counter]);
    
                }
            }
            if(vyData[propertiesToBind] == true){
                console.log(saveChildTemplate);
                for(let i = 0; i < saveChildTemplate.length; i++){
                    elemen.appendChild(saveChildTemplate[i]);
                }
            }
        }else{
            console.error("vy-if must use tag <template>");
        }
    })
}

// end conditional rendering

// start event

elClick.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(attributClick);
    console.log(propertiesToBind);
    elemen.onclick = function (){
        window[propertiesToBind]();
        conditionalRender();
    }
    
})

elOn.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(attributOn);
    let attributValue = propertiesToBind.split(":");
    if(propertiesToBind.includes(":")){
        if(attributValue.length == 2){
            elemen[ 'on'+ attributValue[0]] = function(){
                window[attributValue[1]]();
                conditionalRender();             
            }
        }else{
            console.error("vy-on must contain 2 parameter");
        }
    }else {
        console.error("vy-on must contain event:functionName");
    }
})

// end event



