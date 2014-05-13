jquery.lookingfor
=================

![Screenshot](https://rawgithub.com/albburtsev/jquery.lookingfor/master/screenshots/highlight.png)

Fast search as you type jQuery-plugin.

Plugin __jquery.lookingfor__ searches text in list items (```<li>```) and hides unmatched items.
It works not only for ```<li>```, but with anyone HTML-elements on the page.
Any input fields (```input, textarea```) can be transformed into search filter with __jquery.lookingfor__.

[Live demo](http://albburtsev.github.io/jquery.lookingfor/)

## Install

Download latest [release](https://github.com/albburtsev/jquery.lookingfor/releases).
Use [minified](https://github.com/albburtsev/jquery.lookingfor/blob/master/jquery.lookingfor.min.js)
or [development](https://github.com/albburtsev/jquery.lookingfor/blob/master/jquery.lookingfor.js) version.

Or use [bower](http://bower.io/) for install:

```
bower install jquery.lookingfor --save
```

## Usage

Include [jQuery](http://jquery.com) and __jquery.lookingfor__ on your page:

```html
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="jquery.lookingfor.js"></script>
```

Prepare list items for following search and input field (optional):

```html
<input type="search" name="query" />
<ul id="numerals">
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
	...
</ul>
```

Call method ```lookingfor()``` with necessary options:

```js
jQuery(function($) {
	$('#numerals').lookingfor({
		input: $('input[name="query"]'),
		items: 'li'
	});
});
```

### Options

All options are optional.

 * __input__ — selector for input field;
 * __items__ — item's selector, default – ```'li'```;
 * __highlight__ — set ```true``` for highlight matched text, default — ```false```;
 * __highlightColor__ — ```#RRGGBB``` background color for matched text, default – ```#FFDE00```
