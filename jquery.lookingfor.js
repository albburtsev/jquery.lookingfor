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
 * @todo: highlight matched text
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
			queryDelay: 300, // ms

			hiddenListClass: 'lflist_hidden',
			hiddenItemClass: 'lfitem_hidden',
			hiddenCount: 0
		}, opts || {});
		
		this._items = this.items ? $(this.items, container) : this._container.children();
		this._input = $(this.input);

		if ( !this._items.length )
			return;

		if ( this._input.length ) {
			this._input.on('keyup', this._debounce(function() {
				var value = (this._input.val() || '').toLowerCase();
				
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
				selector = '.' + this.hiddenListClass + ' .' + this.hiddenItemClass,
				rules = 'display: none';

			style.appendChild(document.createTextNode('')); // webkit fix
			_head.append(style);
			sheet = style.sheet || {};

			if ( sheet.insertRule ) {
				sheet.insertRule(selector + '{' + rules + '}', 0);
			} else if ( sheet.addRule ) { // old IE
				sheet.addRule(selector, rules, 0);
			}
 		},

		indexing: function() {
			var self = this;

			this._items.each(function() {
				var _item = $(this);

				self.cache.push({
					node: _item,
					text: (_item.text() || '').toLowerCase(),
					hidden: false
				});
			});
		},

		query: function(value) {
			value = value || this.value;
			this.hiddenCount = 0;

			for (var i = 0, length = this.cache.length, item; i < length; i++) {
				item = this.cache[i];
				if ( item.text.indexOf(value) === -1 ) {
					if ( !item.hidden ) {
						item.hidden = true;
						item.node.addClass(this.hiddenItemClass);
					}
					this.hiddenCount += 1;
				} else if ( item.hidden ) {
					item.hidden = false;
					item.node.removeClass(this.hiddenItemClass);
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
				item.node.removeClass(this.hiddenItemClass);
			}

			this._container.removeClass(this.hiddenListClass);
			this.hiddenCount = 0;
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
		}
	};
}));