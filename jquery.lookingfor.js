/**
 * jQuery.lookingfor
 * Searches text in list items on the page, hides unmatched items
 * 
 * @version 0.0.0
 * @requires jQuery
 * @author Alexander Burtsev
 * @copyright 2014 Alexander Burtsev
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

				if ( value.length >= this.queryCharLimit ) {
					this.value = value;
					this.query();
				} else {
					this.showAll();
				}
			}, this.queryDelay, this));
		}

		this.indexing();
	}

	Lookingfor.prototype = {
		indexing: function() {
			var self = this;

			this._items.each(function() {
				var _item = $(this);

				self.cache.push({
					node: _item,
					text: (_item.text() || '').toLowerCase()
				});
			});
		},

		query: function(value) {
			value = value || this.value;
			for (var i = 0, length = this.cache.length, item; i < length; i++) {
				item = this.cache[i];
				if ( item.text.indexOf(value) === -1 ) {
					item.node.hide();
					this.hiddenCount += 1;
				} else {
					item.node.show();
				}	
			}
		},

		showAll: function() {
			this._items.show();
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