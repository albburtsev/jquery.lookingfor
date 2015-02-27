/**
 * jquery.lookingfor — fast search as you type
 * @author Alexander Burtsev, http://burtsev.me, 2014—2015
 * @license MIT
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
	};

	/**
	 * @class
	 * @param {HTMLElement} container
	 * @param {Object} opts
	 * @param {String} [opts.input] Selector for input field
	 * @param {String} [opts.items='li'] Selector for nested items
	 * @param {Number} [opts.queryCharLimit = 1]
	 * @param {Number} [opts.queryDelay = 100] ms
	 * @param {Boolean} [opts.highlight=false] Highlight matched text
	 * @param {Boolean} [opts.highlightColor='#ffde00'] Background color for matched text
	 * @param {Function(HTMLElement item, String query)} [opts.onFound] Callback, calls when text found in element
	 *
	 * @todo: nested items
	 * @todo: show/hide animation
	 */
	function Lookingfor(container, opts) {
		$.extend(this, {
			_input: null,
			_items: null,
			_container: $(container),

			items: 'li',
			value: '',
			cache: [],
			queryCharLimit: 1,
			queryTimer: null,
			queryDelay: 100, // ms

			highlight: false,
			highlightClass: 'lfitem_match',
			highlightColor: '#ffde00',

			hiddenListClass: 'lflist_hidden',
			hiddenItemAttr: 'data-lfhidden',
			hiddenCount: 0,

			onFound: null
		}, opts || {});

		this._items = $(this.items, container);
		this._input = $(this.input);

		if ( !this._items.length ) {
			return;
		}

		if ( this._input.length ) {
			this._input.on('keyup change', this._debounce(function() {
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

	Lookingfor.prototype = 
	/** @lends Lookingfor */
	{
		/**
		 * Generates and adds styles for hiding and highlighting items
		 */
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

 		/**
 		 * Caches html and text for all items
 		 */
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

		/**
		 * Looking for given value in item's text
		 * Sets attributes, which changes item visibility
		 * Highlights matched text
		 * @param  {String} value
		 */
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
						// Speed up DOM changes without jQuery methods
						item.node.setAttribute(this.hiddenItemAttr, '');
					}
					this.hiddenCount += 1;
				} else if ( item.hidden ) {
					item.hidden = false;
					// Speed up DOM changes without jQuery methods
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

				if ( this.onFound && !item.hidden ) {
					this.onFound(item.node, value);
				}
			}

			this._container.addClass(this.hiddenListClass);
		},

		/**
		 * Cancels all changes
		 * @return {[type]} [description]
		 */
		showAll: function() {
			if ( !this.hiddenCount ) {
				return;
			}

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

		/**
		 * Sets container for highlighting
		 * @param  {String} $0
		 * @ignore
		 */
		_paint: function($0) {
			return '<span class="' + this.highlightClass + '">' + $0 + '</span>';
		},

		/**
		 * Debounce decorator
		 * @param {Function} fn
		 * @param {Number} delay
		 * @param {Object} context
		 * @ignore
		 */
		_debounce: function(fn, delay, context) {
			var timer = null,
				self = this;

			return function() {
				var args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context || self, args);
				}, delay);
			};
		}
	};
}));