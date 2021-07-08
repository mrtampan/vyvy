/* 
 vyvy.js
 created by achmad rivaldi
 copyright 2021
*/


//create all variable
var attributInput = 'vy-input',
attributIf = 'vy-if',
attributClick = 'vy-click',
attributText = 'vy-text',
attributHtml = 'vy-html',
attributOn = 'vy-on',
attributFor = 'vy-for',
attributForValue = 'vy-for-val',
elInput = document.querySelectorAll('[' + attributInput + ']'),
elIf = document.querySelectorAll('[' + attributIf + ']'),
elFor = document.querySelectorAll('[' + attributFor + ']'),
elClick = document.querySelectorAll('[' + attributClick + ']'),
elOn = document.querySelectorAll('[' + attributOn + ']'),
elText = document.querySelectorAll('[' + attributText + ']'),
elHtml = document.querySelectorAll('[' + attributHtml + ']'),
vyData = {};
vyAlias = {};

//end all variable

// create data input binding
    
elInput.forEach((elemen) => {
    if(elemen.type == 'text' || elemen.type == 'textarea' || elemen.type == 'number' || elemen.type == 'password'){
        let propertiesToBind = elemen.getAttribute(attributInput);
        elemen.onkeyup = function(){
            vyData[propertiesToBind] = elemen.value;
            vyLoadData();
        }
    }
    if(elemen.type == 'select-one'){
        let propertiesToBind = elemen.getAttribute(attributInput);
        elemen.onchange = function(){
            vyData[propertiesToBind] = elemen.value;
            vyLoadData();
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
                for(let i = 0; i < saveChildTemplate.length; i++){
                    elemen.appendChild(saveChildTemplate[i]);
                }
            }
        }else{
            console.error("vy-if must use tag <vy-template>");
        }
    })
}

// end conditional rendering

// create List rendering


function listRender(){
    elFor.forEach((elemen) => {
        let saveChildTemplate = [];
        let tagname = elemen.tagName;
        if(tagname == 'VY-TEMPLATE'){
            let propertiesToBind = elemen.getAttribute(attributFor);
            let childProp = elemen.children;
            let attributValue = propertiesToBind.split(":");
            if(propertiesToBind.includes(":")){
                if(attributValue.length == 2){
                    let cloneEl = [];
                    for(let i = 0; i < childProp.length; i++){
                        saveChildTemplate.push(childProp[i]);
                        
                    }

                    while(elemen.firstChild){
                        elemen.removeChild(elemen.firstChild);
                    }
                    for(let k = 0; k < vyData[attributValue[1]].length; k++){
                            if(typeof(vyData[attributValue[1]][k]) == 'object'){
                                
                                for(let l = 0; l < saveChildTemplate.length; l++){
                                    let elementClone = document.createElement(saveChildTemplate[l].tagName);
                                    elementClone.setAttribute('class', saveChildTemplate[l].getAttribute('class') ? null : '');
                                    
                                    if(saveChildTemplate[l].getAttribute('vy-for-val') != null){

                                        let getObj = '';
                                        let getValue = '';
                                        if(saveChildTemplate[l].getAttribute('vy-for-val').includes('.')){
                                            getObj = saveChildTemplate[l].getAttribute('vy-for-val').split('.');
                                            getObj.shift();
                                        }
                                        getValue =  vyData[attributValue[1]][k];
                                        for(let m = 0; m < getObj.length; m++){
                                            getValue = getValue[getObj[m]];
                                        }
                                        
                                        elementClone.setAttribute('vy-for-val', saveChildTemplate[l].getAttribute('vy-for-val'));
                                        elementClone.setAttribute('value', getValue);
                                        elementClone.innerText = getValue;
                                    }  
                                    cloneEl.push(elementClone);                                    
                                }
                            }else if(typeof(vyData[attributValue[1]][k]) == 'string'){
                                
                                let elementClone = document.createElement(saveChildTemplate[0].tagName);
                                elementClone.setAttribute('class', saveChildTemplate[0].getAttribute('class') ? null : '');
                                
                                if(saveChildTemplate[0].getAttribute('vy-for-val') != null){
                                    elementClone.setAttribute('vy-for-val', saveChildTemplate[0].getAttribute('vy-for-val'));
                                    elementClone.setAttribute('value', vyData[attributValue[1]][k]);
                                    elementClone.innerText = vyData[attributValue[1]][k];
                                }  
                                cloneEl.push(elementClone);
                            }

                    }

                    cloneEl.forEach((clone) => {
                        elemen.appendChild(clone);
                    })
                }else{
                    console.error("vy-for must contain 2 parameter");
                }
            }else {
                console.error("vy-for must contain alias:list");
            }
        }else{
            console.error("vy-for must use tag <vy-template>");
        }
    })

}


// end list rendering

// start event

elClick.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(attributClick);
    console.log(propertiesToBind);
    elemen.onclick = function (){
        window[propertiesToBind]();
        vyLoadData();
    }
    
})

elOn.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(attributOn);
    let attributValue = propertiesToBind.split(":");
    if(propertiesToBind.includes(":")){
        if(attributValue.length == 2){
            elemen[ 'on'+ attributValue[0]] = function(){
                window[attributValue[1]]();
                vyLoadData();           
            }
        }else{
            console.error("vy-on must contain 2 parameter");
        }
    }else {
        console.error("vy-on must contain event:functionName");
    }
})

// end event

// start binding text
function bindingText(){
    elText.forEach((elemen) => {
        let propertiesToBind = elemen.getAttribute(attributText);
        elemen.innerText = vyData[propertiesToBind];

    })
}

// end binding text

// start Initializing
function vyLoadData(){
    bindingText();
    bindingHtml();
    conditionalRender();
}

function vyInit(){
    bindingText();
    bindingHtml();
    listRender();
    conditionalRender();
}

// end Initializing

// Start binding html
function bindingHtml(){
    elHtml.forEach((elemen) => {
        let propertiesToBind = elemen.getAttribute(attributHtml);
        elemen.innerHTML = vyData[propertiesToBind];

    })
}
// end binding html
