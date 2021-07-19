/* 
 vyvy.js
 created by achmad rivaldi
 copyright 2021
*/


/* create all variable */
var vyAttrInput = 'vy-input',
vyAttrIf = 'vy-if',
vyAttrClick = 'vy-click',
vyAttrText = 'vy-text',
vyAttrHtml = 'vy-html',
vyAttrOn = 'vy-on',
vyAttrFor = 'vy-for',
vyAttrForValue = 'vy-for-val',
vy_el_input = document.querySelectorAll('[' + vyAttrInput + ']'),
vy_el_if = document.querySelectorAll('[' + vyAttrIf + ']'),
vy_el_for = document.querySelectorAll('[' + vyAttrFor + ']'),
vy_el_click = document.querySelectorAll('[' + vyAttrClick + ']'),
vy_el_on = document.querySelectorAll('[' + vyAttrOn + ']'),
vy_el_text = document.querySelectorAll('[' + vyAttrText + ']'),
vy_el_html = document.querySelectorAll('[' + vyAttrHtml + ']'),
vyData = {};
vyAlias = {};

/* end all variable */

/* create data input binding */
    
vy_el_input.forEach((elemen) => {
    if(elemen.type == 'text' || elemen.type == 'textarea' || elemen.type == 'number' || elemen.type == 'password'){
        let propertiesToBind = elemen.getAttribute(vyAttrInput);
        elemen.onkeyup = function(){
            vyData[propertiesToBind] = elemen.value;
            vyLoadData();
        }
    }
    if(elemen.type == 'select-one'){
        let propertiesToBind = elemen.getAttribute(vyAttrInput);
        elemen.onchange = function(){
            vyData[propertiesToBind] = elemen.value;
            vyLoadData();
        }
    }
})
/* end data input binding */
 
/* create conditional rendering */


function _conditionalRender(){
    let saveChildTemplate = [];
    vy_el_if.forEach((elemen) => {
        let tagname = elemen.tagName;
        if(tagname == 'VY-TEMPLATE'){
            let propertiesToBind = elemen.getAttribute(vyAttrIf);
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

/* end conditional rendering */

/* create List rendering */


function _listRender(){
    vy_el_for.forEach((elemen) => {
        let saveChildTemplate = [];
        let tagname = elemen.tagName;
        if(tagname == 'VY-TEMPLATE'){
            let propertiesToBind = elemen.getAttribute(vyAttrFor);
            let childProp = elemen.childNodes;
            let attributValue = propertiesToBind.split(":");
            if(propertiesToBind.includes(":")){
                if(attributValue.length == 2){
                    let addElObject = [];
                    let addEl = [];
                    childProp.forEach(function(item){
                        if(item.nodeType != Node.TEXT_NODE){
                            saveChildTemplate.push(item);
                        }
                    });

                    while(elemen.firstChild){
                        elemen.removeChild(elemen.firstChild);
                    }
                    for(let k = 0; k < vyData[attributValue[1]].length; k++){
                            if(typeof(vyData[attributValue[1]][k]) == 'object'){
                                
                                for(let l = 0; l < saveChildTemplate.length; l++){
                                    let cloningEl = saveChildTemplate[l].cloneNode(true);
                                   
                                    if(saveChildTemplate[l].getAttribute(vyAttrForValue) != null){
                                        let getObj = '';
                                        let getValue = '';
                                        if(saveChildTemplate[l].getAttribute(vyAttrForValue).includes('.')){
                                            getObj = saveChildTemplate[l].getAttribute(vyAttrForValue).split('.');
                                            getObj.shift();
                                        }
                                        getValue =  vyData[attributValue[1]][k];
                                        for(let m = 0; m < getObj.length; m++){
                                            getValue = getValue[getObj[m]];
                                        }
                                        
                                        cloningEl.innerText = getValue;
                                    }

                                    addElObject.push(cloningEl);         
                                }
                            }else if(typeof(vyData[attributValue[1]][k]) == 'string'){
                                
                                let cloningEl = saveChildTemplate[0].cloneNode(true);
                                
                                if(saveChildTemplate[0].getAttribute(vyAttrForValue) != null){
                                    cloningEl.innerText = vyData[attributValue[1]][k];
                                }  
                                addEl.push(cloningEl);
                            }

                    }
                    addElObject.forEach((clone) => {
                        clone.removeAttribute(vyAttrForValue);
                        elemen.appendChild(clone);
                    })
                    addEl.forEach((clone) => {
                        clone.removeAttribute(vyAttrForValue);
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


/* end list rendering */

/* start event */

vy_el_click.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(vyAttrClick);
    console.log(propertiesToBind);
    elemen.onclick = function (){
        window[propertiesToBind]();
        vyLoadData();
    }
    
})

vy_el_on.forEach((elemen) => {
    let propertiesToBind = elemen.getAttribute(vyAttrOn);
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

/* end event */

/* start binding text */
function _bindingText(){
    vy_el_text.forEach((elemen) => {
        let propertiesToBind = elemen.getAttribute(vyAttrText);
        elemen.innerText = vyData[propertiesToBind];

    })
}

/* end binding text */

/* start Initializing */
function vyLoadData(){
    _bindingText();
    _bindingHtml();
    _conditionalRender();
}

function vyInit(){
    _bindingText();
    _bindingHtml();
    _listRender();
    _conditionalRender();
}

/* end Initializing */

/* Start binding html */
function _bindingHtml(){
    vy_el_html.forEach((elemen) => {
        let propertiesToBind = elemen.getAttribute(vyAttrHtml);
        elemen.innerHTML = vyData[propertiesToBind];

    })
}
/* end binding html */
