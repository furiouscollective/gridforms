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

(function () {
    "use strict";

    // Helper function for iterating over Arrays and NodeLists.
    var forEach = function (list, callback, scope) {
        var i;
        for (i = 0; i < list.length; i += 1) {
            callback.call(scope, list[i], i);
        }
        return list;
    };

    var GridForms = {
        el: {
            fieldsRows: [],
            fieldsContainers: [],
            focusableFields: []
        },

        // init queries and caches the document for existing [data-row-span]
        // and [data-field-span], focuses the first autofocus element, equalizes
        // field heights, and registers event handlers for focus, click, and
        // blur events.
        init: function () {

            // Cache form elements.
            this.el.fieldsRows = document.querySelectorAll("[data-row-span]");
            this.el.fieldsContainers = document.querySelectorAll("[data-field-span]");
            this.el.focusableFields = document.querySelectorAll([
                "[data-field-span] input",
                "[data-field-span] textarea",
                "[data-field-span] select"
            ].join(", "));

            // Focus any autofocus inputs.
            this.focusField(document.querySelector("[autofocus]"));

            // Adjust field heights.
            this.equalizeFieldHeights();

            // Initialize event listeners and handlers.
            this.events();
        },

        // focusField finds the parent of the given HTMLElement (typically an
        // input) and appends the 'focus' class name to the element.
        focusField: function (currentField) {
            if (!currentField) {
                return;
            }

            var elem;
            var className = "focus";
            for (elem = currentField.parentNode; elem && elem !== document; elem = elem.parentNode) {
                if (elem.hasAttribute("data-field-span")) {
                    if (elem.className.length) {
                        className = " " + className;
                    }
                    elem.className += className;
                    break;
                }
            }
        },

        // removeFieldFocus finds all elements with '[data-field-span]' and
        // removes the 'focus' class.
        removeFieldFocus: function () {
            forEach(this.el.fieldsContainers, function (el) {
                el.className = el.className.replace("focus", "").trim();
            }, this);
        },

        // events initializes event listeners and handlers.
        events: function () {
            var that = this;

            forEach(this.el.fieldsContainers, function (el) {

                // Listen to form field clicks to trigger focus on child focusable
                // input elements.
                el.addEventListener("click", function () {
                    el.querySelector("input, textarea, select").focus();
                });
            }, this);

            forEach(this.el.focusableFields, function (el) {

                // Listen to input focus to add a focus class to the parent
                // [data-field-span] since :focus CSS isn't feasible for styling
                // parent elements.
                el.addEventListener("focus", function () {
                    that.focusField(el);
                });

                // Listen to input blur and remove the focus class from all
                // [data-field-span] containers.
                el.addEventListener("blur", function () {
                    that.removeFieldFocus();
                });
            }, this);

            // Listen to window resizes and trigger automatic field height
            // adjustments.
            window.addEventListener("resize", function () {
                that.equalizeFieldHeights();
            });
        },

        // equalizeFieldHeights will attempts to adjust the heights of '[data-field-span]'
        // to match its contents.
        equalizeFieldHeights: function () {
            forEach(this.el.fieldsContainers, function (el) {
                el.style.height = "auto";
            }, this);

            // Don't adjust heights if fields seem to be stacked.
            if (!this.areFieldsStacked()) {
                var rowHeight = 0;
                forEach(this.el.fieldsRows, function (el) {
                    rowHeight = parseInt(window.getComputedStyle(el).height.slice(0, -2), 10);
                    forEach(el.querySelectorAll("[data-field-span]"), function (field) {
                        field.style.height = rowHeight + "px";
                    }, this);
                }, this);
            }
        },

        // areFieldsStacked returns true if the sum width of all '[data-field-span]'
        // is greater than the width of its parent '[data-row-span]'.
        areFieldsStacked: function () {
            var firstRow = document.querySelector("[data-row-span]:not([data-row-span='1'])");
            if (!firstRow) {
                return;
            }

            var firstRowWidth = parseInt(window.getComputedStyle(firstRow).width.slice(0, -2), 10);
            var totalChildrenWidth = (function (els) {
                var width = 0;
                var computed;
                forEach(els, function (el) {
                    computed = window.getComputedStyle(el);
                    width += parseInt(computed.width.slice(0, -2), 10);
                }, this);
                return width;
            }(firstRow.children));

            return firstRowWidth <= totalChildrenWidth;
        }
    };

    document.addEventListener("DOMContentLoaded", GridForms.init.bind(GridForms));

    window.GridForms = GridForms;
}());
