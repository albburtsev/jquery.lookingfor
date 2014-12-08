jquery.lookingfor
=================

![Screenshot](https://rawgithub.com/albburtsev/jquery.lookingfor/master/screenshots/highlight.png)

Быстрый поиск набираемого текста.

Плагин очень маленький (минифицированный — 2.5kb, сжатый — 1.2kb), очень быстрый и даже поддерживает старые браузеры (IE6+).

Плагин __jquery.lookingfor__ ищет текст в элементах списков (```<li>```) и скрывает те элементы, для которых не найдено совпадений.
Он работает не только со списками, но и с любыми другими элементами на странице, содержащими текст.
Любое текстовое поле (```input, textarea```) можно сделать поисковым фильтром с помощью __jquery.lookingfor__.

[Демо](http://albburtsev.github.io/jquery.lookingfor/)

## Установка

Скачайте последний [релиз](https://github.com/albburtsev/jquery.lookingfor/releases)
и подключите на страницу [минифицированную](https://github.com/albburtsev/jquery.lookingfor/blob/master/jquery.lookingfor.min.js) 
или [полную](https://github.com/albburtsev/jquery.lookingfor/blob/master/jquery.lookingfor.js) версию плагина.

Или установите с помощью [bower](http://bower.io/)

```
bower install jquery.lookingfor --save
```

## Быстрый старт

Подключите [jQuery](http://jquery.com) и __jquery.lookingfor__ на свою страницу:

```html
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="jquery.lookingfor.js"></script>
```

Приготовьте список элементов, содержащих текст, и поле ввода (при необходимости):

```html
<input type="search" name="query" />
<ul id="numerals">
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
	...
</ul>
```

Вызовите метод ```lookingfor()``` с необходимыми опциями для списка:

```js
jQuery(function($) {
	$('#numerals').lookingfor({
		input: $('input[name="query"]'),
		items: 'li'
	});
});
```

### Опции

Все опции являются необязательными.

 * __input__ — селектор для поля ввода;
 * __items__ — селектор для элементов списка, по умолчанию – ```'li'```;
 * __highlight__ — переключите в ```true``` для подсветки найденного текста, по умолчанию — ```false```;
 * __highlightColor__ — ```#RRGGBB``` цвет фона для подсветки найденного текста, по умолчанию – ```#FFDE00```;
 * __onFound {Function(HTMLElement item, String query)}__ — колбек, вызывается при найденном совпадении.
