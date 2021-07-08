# vyvy

Vyvy.js is a javascript library for creating user interfaces, without using a virtual dom, directly using the original dom, the purpose of making vyvy.js to help develop simple applications without having to install a javascript framework


## Installation

`vyvy` can be used without a build step. Simply load it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
```


### Quick Start

```html
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>

// create variable state
vyData.firstname = "jihyo";
vyData.lastname = "sana";
// end variable state


// start Initializing
vyInit();
// end Initializing
</script>
```


### `vyData`

Use `vydata` to store values locally

```html
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>

<script>
    vyData.name = "mina";
    vyData.age = 21;
</script>
```

### `vy-input`

Use `vy-input` allows you to bind the value of an input element to vyData

```html
<input type="text" vy-input="firstname" />
<select vy-input="chose">
    <option>Choose</option>
    <option value="male">Man</option>
    <option value="female">Female</option>
</select>
<textarea vy-input="desc"></textarea>

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
    alert(vyData.chose);
    alert(vyData.firstname);
    alert(vyData.desc);
</script>
```


### `vy-if`

Use `vy-if` to remove and display components, but must use tags `<template>`

```html
<vy-template vy-if="activeComponent">
    <h1 >heheha</h1>
    <h2 >hahaha</h2>
    <h3 >huhuhu</h3>
    <h4 >xxxxx</h4>
</vy-template>

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
vyData.activeComponent = false;

</script>
```

### `vy-on`

Use `vy-on` to use vanillaJS events, how to use it requires 2 parameters (event:functionname)

```html
<input vy-on="keyup:upperfunc" id="naming"/>
<button vy-on="click:testFunc">testing</button>


<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
function upperfunc(){
    let x = document.getElementById("naming");
    x.value = x.value.toUpperCase();
}
    
function testFunc(){
    alert("testing");
}

</script>
```

### `vy-text`

Use `vy-text` use v-text to display data from `vyData`

```html
<div vy-text="name"></div>
<div vy-text="age"></div>
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>

<script>
    vyData.name = "mina";
    vyData.age = 21;
</script>
```

### `vy-html`

Use `vy-html` to convert data from `vyData` to html

```html
<div vy-html="sweetword"></div>
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>

<script>
    vyData.sweetword = '<b>Kamu benar benar wangy wangy wangy</b>';
</script>
```

### `vy-for`

Use `vy-for` for looping data from `vyData`, how to use it requires 2 parameters (alias:dataarray).

Example with data string

```html
<vy-template vy-for="color:colors">
    <div vy-for-val="color"></div>
</vy-template>
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>

<script>
vyData.colors = [
    'biru', 'kuning', 'merah'
]
</script>
```

Example with data object

```html
<vy-template vy-for="profil:profilData" >
    <div vy-for-val="profil.firstname"></div>
    <div vy-for-val="profil.lastname"></div>
</vy-template>

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>

<script>
vyData.profilData = [
    {'firstname': 'Mina', 'lastname': 'Sharon'}, 
    {'firstname': 'Park', 'lastname': 'Jihyo'}, 
    {'firstname': 'Jim', 'lastname': 'Dahyun'}
]
</script>
```


### `vy-click`

Use `vy-click` event handling onclick

```html
<button vy-click="testFunc">Testing</button>

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
function testFunc(){
    alert("testing");
}
</script>
```
