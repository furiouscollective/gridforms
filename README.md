##Gridforms
An effort to make beautiful forms for web applications that make data entry less painful. Grid forms is a front-end library (Just CSS at the moment) which handles the boiler plate necessary to build grid based forms.

This is my first ever open source project so please [email](mailto:contact@kumailht.com) me if you spot any errors (which you're guaranteed to find). I am only now realizing how hard it is to write even simple documentation, your help in improving it will be greatly appreciated.

###Examples
- [Grid Forms Homepage](http://kumailht.com/gridforms)
- [Example Bank Account Application Form](http://kumailht.com/gridforms/example.html)

###Usage

####1.1 Import the CSS file if you're fine using the defaults
```<link rel="stylesheet" type="text/css" href="gridforms.css">```

####1.2 Use SCSS/SASS to import gridforms if you want to customize it further
```@import gridforms.sass```

####2. Markup:
The markup is quite natural and you get used to it pretty quickly.

Your form element gets the `grid-form` class. Optionally use a `fieldset` with a `legend` to divide your form into sections.

Each row of fields is a `div` element with a `data-row-span` attribute. It is set to "2", which means the row has 2 columns.

Each row has a set of fields. Fields are wrapped in `div` elements and have a `data-field-span` attached to it. Set to "1" in this example, which means the field spans 1 columns.

```
<form class="grid-form">
	<fieldset>
		<legend>Form Section</legend>
		<div data-row-span="2">
			<div data-field-span="1">
				<label>Field 1</label>
				<input type="text">
			</div>
			<div data-field-span="1">
				<label>Field 2</label>
				<input type="text">
			</div>
		</div>
	</fieldset>
</form>
```

####3. Use the Gridforms mixin to style your form as a grid form
```
.my-grid-form
    +grid-form
```

####4. Optionally, pass the mixin parameters to customize your grid form
```
Defaults
$max-columns: 12,
$font-size-large: 18px,
$legend-color: lighten(#333, 5%),
$field-padding: 8px,
$label-font-size: 10px,
$grid-border-color: #333,
$label-color: #333,
$field-focus-color: darken(#FFFDED, 5%)
```

###Compatibility
Include Scott Jehl's [Respond.js](https://github.com/scottjehl/Respond) if you want the form to be responsive in ie8.

###Todo

- Test forms with all possible field types
- Reset unknown styles so forms look the same wherever they're used
- Gracefully handle label overflow
- Introduce a sass file to style error/help messages
- Introduce another sass file that can style the various field types (debatable)

If you have ideas on how to improve Grid forms or if you want to contribute to this repo, shoot me an email at [contact@kumailht.com](mailto:contact@kumailht.com).
