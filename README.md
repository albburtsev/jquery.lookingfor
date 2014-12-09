jquery.lookingfor
=================

![Screenshot](https://rawgithub.com/albburtsev/jquery.lookingfor/master/screenshots/highlight.png)

Fast search as you type jQuery plugin.

It's very small (minified — 2.5kb, gzipped — 1.2kb), very fast and supports old browsers (IE6+).

__jquery.lookingfor__ plugin searches text in list items (```<li>```) and hides unmatched items.
It works not only for `<li>`s, but for any HTML element on a page.
Any input field (```input, textarea```) can be transformed to search filter with __jquery.lookingfor__.

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

Prepare list of items for following search and an input field (optional):

```html
<input type="search" name="query" />
<ul id="numerals">
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
	...
</ul>
```

Call ```lookingfor()``` method with necessary options:

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

 * __input__ — input field's selector;
 * __items__ — item's selector, default – ```'li'```;
 * __highlight__ — set ```true``` to highlight matched text, default — ```false```;
 * __highlightColor__ — ```#RRGGBB``` background color for matched text, default – ```#FFDE00```;
 * __onFound {Function(HTMLElement item, String query)}__ — callback, will be called when text is found.
