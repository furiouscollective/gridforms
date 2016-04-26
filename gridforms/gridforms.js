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

jQuery(function($) {
    var GridForms = {
        el: {
            fieldsRows: $('[data-row-span]'),
            fieldsContainers: $('[data-field-span]'),
            focusableFields: $('input, textarea, select', '[data-field-span]'),
            window: $(window)
        },
        init: function() {
            this.focusField(this.el.focusableFields.filter(':focus'));
            this.equalizeFieldHeights();
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
            that.el.fieldsContainers.click(function(event) {
                var focusableFields = that.el.focusableFields.selector;
                
                if (!$(event.target).is(focusableFields)) {
                    $(this).find('input[type="text"],input[type="number"],input[type="tel"],input[type="email"], textarea, select').first().focus();
                }
            });
            that.el.focusableFields.focus(function() {
                that.focusField($(this));
            });
            that.el.focusableFields.blur(function() {
                that.removeFieldFocus();
            });
            that.el.window.resize(function() {
                that.equalizeFieldHeights();
            });

        },
        equalizeFieldHeights: function() {
            this.el.fieldsContainers.css("height", "auto");

            var fieldsRows = this.el.fieldsRows;
            var fieldsContainers = this.el.fieldsContainers;

            // Make sure that the fields aren't stacked
            if (!this.areFieldsStacked()) {
                fieldsRows.filter(":visible").each(function() {
                    var fieldRow = $(this);
                    
                    // Singleton textarea rows should determine their row height
                    var rowInputs = fieldRow.children();
                    if (rowInputs.length === 1 && rowInputs.children("textarea").length === 1) return;

                    // Get the height of the row (thus the tallest element's height)
                    var rowHeight = fieldRow.css('height');

                    // Set the height for each field in the row...
                    fieldRow.find(fieldsContainers).css('height', rowHeight);
                });
            }
        },
        areFieldsStacked: function() {
            // Get the first row https://github.com/kumailht/gridforms/pull/49/files
            // which does not only contain one field 
            var firstRow = this.el.fieldsRows
                .not('[data-row-span="1"]')
                .first();

            // Get to the total width 
            // of each field witin the row
            var totalWidth = 0;
            firstRow.children().each(function() {
                totalWidth += $(this).width();
            });

            // Determine whether fields are stacked or not
            return firstRow.width() <= totalWidth;
        }
    };
    GridForms.init();
    window.GridForms = GridForms;
});
