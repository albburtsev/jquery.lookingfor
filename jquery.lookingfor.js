/**
 * jQuery.lookingfor
 * Searches text in list items on the page, hides unmatched items
 * 
 * @version 0.0.0
 * @requires jQuery
 * @author Alexander Burtsev
 * @copyright 2014 Alexander Burtsev
 * @license MIT
 * 
 * @todo: nested items
 * @todo: hide animation
 */
(function(factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function($) {
	'use strict';

	$.fn.lookingfor = function(opts) {
		return this.each(function() {
			new Lookingfor(this, opts);
		});
	}

	function Lookingfor(container, opts) {
		$.extend(this, {
			_input: null,
			_items: null,
			_container: $(container),

			value: '',
			cache: [],
			queryCharLimit: 3,
			queryTimer: null,
			queryDelay: 50, // ms

			highlight: false,
			highlightClass: 'lfitem_match',
			highlightColor: '#ffde00',

			hiddenListClass: 'lflist_hidden',
			hiddenItemAttr: 'data-lfhidden',
			hiddenCount: 0
		}, opts || {});
		
		this._items = this.items ? $(this.items, container) : this._container.children();
		this._input = $(this.input);

		if ( !this._items.length )
			return;

		if ( this._input.length ) {
			this._input.on('keyup', this._debounce(function() {
				var value = (this._input.val() || '').toLowerCase();
				value = $.trim(value);

				if ( value === this.value ) {
					return;
				}

				this.value = value;
				if ( value.length >= this.queryCharLimit ) {
					this.query();
				} else {
					this.showAll();
				}
			}, this.queryDelay, this));
		}

		this.addStyles();
		this.indexing();
	}

	Lookingfor.prototype = {
		addStyles: function() {
			var _head = $('head'),
				style = $('<style>').get(0), sheet,
				styles = [
					['.' + this.hiddenListClass + ' [' + this.hiddenItemAttr + ']', 'display: none'],
					['.' + this.highlightClass, 'background: ' + this.highlightColor]
				];

			_head.append(style);
			sheet = style.sheet || document.styleSheets[0]; // IE fix

			for (var i = 0, selector, rules; i < styles.length; i++) {
				selector = styles[i][0];
				rules = styles[i][1];

				if ( sheet.insertRule ) {
					sheet.insertRule(selector + '{' + rules + '}', 0);
				} else if ( sheet.addRule ) { // old IE
					sheet.addRule(selector, rules, 0);
				}
			}
 		},

		indexing: function() {
			var self = this;

			this._items.each(function() {
				var _item = $(this);

				self.cache.push({
					node: this,
					html: this.innerHTML,
					text: (_item.text() || '').toLowerCase(),
					hidden: false
				});
			});
		},

		query: function(value) {
			value = value || this.value;
			this.hiddenCount = 0;

			var	re = new RegExp(value, 'ig'),
				paint = $.proxy(this._paint, this);

			for (var i = 0, length = this.cache.length, item; i < length; i++) {
				item = this.cache[i];
				if ( item.text.indexOf(value) === -1 ) {
					if ( !item.hidden ) {
						item.hidden = true;
						item.node.setAttribute(this.hiddenItemAttr, '');
					}
					this.hiddenCount += 1;
				} else if ( item.hidden ) {
					item.hidden = false;
					item.node.removeAttribute(this.hiddenItemAttr);
				}

				if ( this.highlight ) {
					if ( item.matched ) {
						item.matched = false;
						item.node.innerHTML = item.html;
					}

					if ( !item.hidden ) {
						item.matched = true;
						item.node.innerHTML = item.html.replace(re, paint);
					}
				}
			}

			this._container.addClass(this.hiddenListClass);
		},

		showAll: function() {
			if ( !this.hiddenCount )
				return;

			for (var i = 0, length = this.cache.length, item; i < length; i++) {
				item = this.cache[i];
				item.hidden = false;
				item.node.removeAttribute(this.hiddenItemAttr);

				if ( item.matched ) {
					item.matched = false;
					item.node.innerHTML = item.html;
				}
			}

			this._container.removeClass(this.hiddenListClass);
			this.hiddenCount = 0;
		},

		_paint: function($0) {
			return '<span class="' + this.highlightClass + '">' + $0 + '</span>';
		},

		_debounce: function(fn, delay, context) {
			var timer = null,
				self = this;

			return function() {
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.call(context || self);
				}, delay);
			};
		},

		_profiler: function(fn, label, context) {
			var self = this;

			return function() {
				var start = new Date();
				fn.call(context || self);
				console.log(label || '', (new Date).getTime() - start.getTime());
			};
		}
	};
}));