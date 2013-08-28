//
//  Grid Forms
//  Copyright (c) 2013 Kumail Hunaid
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

$(function() {
	var GridForms = {
		el: {
			fieldsContainers: $('[data-field-span]'),
			focusableFields: $('input, textarea, select', '[data-field-span]')
		},
		init: function() {
			this.focusField(this.el.focusableFields.filter(':focus'));
			this.events();
		},
		focusField: function(currentField) {
			currentField.closest('[data-field-span]').addClass('focus');
		},
		removeFieldFocus: function() {
			this.el.fieldsContainers.removeClass('focus');
		},
		events: function() {
			var that = this;
			that.el.fieldsContainers.click(function() {
				$(this).find('input, textarea, select').focus();
			});
			that.el.focusableFields.focus(function() {
				that.focusField($(this));
			});
			that.el.focusableFields.blur(function() {
				that.removeFieldFocus();
			});
		}
	};

	GridForms.init();
});
