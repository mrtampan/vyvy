/* 
 vyvy.js
 created by achmad rivaldi
 copyright 2021
*/


//create all variable
var attributInput = 'vy-input',
attributIf = 'vy-if',
attributClick = 'vy-click',
elInput = document.querySelectorAll('[' + attributInput + ']'),
elIf = document.querySelectorAll('[' + attributIf + ']'),
elClick = document.querySelectorAll('[' + attributClick + ']'),
vyData = {};

//end all variable

// create data input binding
    
elInput.forEach(function(elemen){
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
    elIf.forEach(function(elemen){
        let tagname = elemen.tagName;
        if(tagname == 'VYVY-TEMPLATE'){
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
            console.error("vy-if must use tag <vyvy-template>");
        }
    })
}

// end conditional rendering

// start event

elClick.forEach(function(elemen){
    let propertiesToBind = elemen.getAttribute(attributClick);
    console.log(propertiesToBind);
    elemen.setAttribute('onclick', propertiesToBind + '()');
    elemen.onclick = function (){
        window[propertiesToBind]();
        conditionalRender();
    }
    
})

// end event
