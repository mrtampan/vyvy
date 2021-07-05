# vyvy

simple library javascript


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


// render conditional IF
conditionalRender();
// end render conditional IF
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
<vyvy-template vy-if="activeComponent">
    <h1 >heheha</h1>
    <h2 >hahaha</h2>
    <h3 >huhuhu</h3>
    <h4 >xxxxx</h4>
</vyvy-template>

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
vyData.activeComponent = false;

conditionalRender();
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
