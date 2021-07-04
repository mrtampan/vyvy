# vyvy

simple library javascript


## Installation

`vyvy` can be used without a build step. Simply load it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
```


### Quick Start

If you don't want the auto init, remove the `init` attribute and move the scripts to end of `<body>`:

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

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
    alert(vyData.chose);
    alerT(vyData.firstname);
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

<script src="https://cdn.jsdelivr.net/gh/mrtampan/vyvy/vyvy.js"></script>
<script>
    alert(vyData.chose);
    alerT(vyData.firstname);
</script>
```

### `vy-if`

Use `vy-if` to remove and display components, but must use tags `<vyvy-template>`

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
