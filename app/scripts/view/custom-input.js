'use strict';

import Events from 'events';
import Prompt from 'view/prompt';
//import commandHistory from 'util/command-history';
//import transitionEvent from 'util/transition-event';

export default function(api) {

    /*var prompt = */new Prompt(api);

    /**
     *
     * @type {jQuery}
     */
    var inputElement = $(api.config.input);

    /**
     * @type {jQuery}
     */
    var cursorElement = inputElement.find('.cursor');

    /**
     * @type {string}
     */
    var commandInput = 'test command';

    /**
     * @type {number}
     */
    var cursorPosition = 3;//commandInput.length;

    /**
     * @type {{enter: number, up: number, down: number}}
     */
    var keys = {
        enter: 13,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    /**
     * Draw the input taking into account cursor position.
     */
    function drawInput() {
        var beforeElement = cursorElement.prev();
        var afterElement = cursorElement.next();

        if(cursorPosition === commandInput.length) {
            beforeElement.text(commandInput);
            cursorElement.html('&nbsp;');
            afterElement.text('');
        } else if(cursorPosition === 0) {
            beforeElement.text('');
            cursorElement.text(commandInput.slice(0, 1));
            afterElement.text(commandInput.slice(1));
        } else {
            beforeElement.text(commandInput.slice(0, cursorPosition));
            cursorElement.text(commandInput.slice(cursorPosition, cursorPosition + 1));

            if(cursorPosition === commandInput.length - 1) {
                afterElement.text('');
            } else {
                afterElement.text(commandInput.slice(cursorPosition + 1));
            }
        }
    }

    function onKeyPress() {

    }

    function onKeyDown(e) {
        if(e.which === keys.left) {
            cursorPosition = (cursorPosition - 1) < 0 ? 0 : cursorPosition - 1;
        } else if(e.which === keys.right) {
            cursorPosition = (cursorPosition + 1) > commandInput.length ? commandInput.length : cursorPosition + 1;
        }

        drawInput();
    }

    function onReady() {
        inputElement.show().addClass('fade-in');
        enable();
        drawInput();
    }

    function enable() {
        cursorElement.addClass('enable');
        $(document).on('keypress', onKeyPress);
        $(document).on('keydown', onKeyDown);
    }

    function disable() {
        $(document).off('keydown', onKeyDown);
        $(document).off('keypress', onKeyPress);
        cursorElement.removeClass('enable');
    }

    $(api).off(Events.READY, onReady).on(Events.READY, onReady);

    $(document).on('click.console', function(e) {
        if(!$(e.target).closest('#console').hasClass('console')) {
            disable();
        }
    });

    $(api.config.container).on('click', enable);
}
