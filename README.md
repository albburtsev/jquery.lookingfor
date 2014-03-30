jquery.lookingfor
=================

![Screenshot](https://rawgithub.com/albburtsev/jquery.lookingfor/master/screenshots/highlight.png)

Searches text in list items on the page, hides unmatched items.

[Live demo](http://albburtsev.github.io/jquery.lookingfor/)

## Downloads

 * [Development version](https://rawgithub.com/albburtsev/jquery.lookingfor/master/jquery.lookingfor.js)

## Usage

Include [jQuery](http://jquery.com) and [jquery.lookingfor](https://rawgithub.com/albburtsev/jquery.lookingfor/master/jquery.lookingfor.js) on your page:

```html
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="jquery.lookingfor.js"></script>
```

Prepare input field and list of items for following search:

```html
<input type="search" name="query" />
<ul id="numerals">
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
	...
</ul>
```

Run script, when list will be ready for use:

```js
jQuery(function($) {
	$('#numerals').lookingfor({
		input: $('input[name="query"]'),
		items: 'li'
	});
});
```

### Options

 * __input__ — input text field;
 * __items__ — item's selector;
 * __highlight__ — sets ```true``` for highlight matched text, default — ```false```;
 * __highlightColor__ — ```#RRGGBB``` color for matched text.