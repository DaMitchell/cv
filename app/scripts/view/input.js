/*jshint camelcase: false */
'use strict';

import BaseView from './base-view';
import Events from '../events';
import CommandHistory from '../util/command-history';

import runLoop from '../run-loop';

import isMobile from '../util/is-mobile';
import zeroFill from '../util/zero-fill';
import template from '../template/component/input';

const keys = {
    enter: 13,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

class Input extends BaseView {
    constructor() {
        super();

        /**
         * @type {jQuery}
         */
        this.element = $('<div class="input-holder"></div>');

        /**
         * @type {EventDispatcher}
         * @private
         */
        this._eventDispatcher;

        /**
         * @type {CommandHistory}
         * @private
         */
        this._commandHistory = new CommandHistory();

        /**
         * @type {keypress.Listener}
         * @private
         */
        this._listener = new window.keypress.Listener();

        /**
         * @type {Object}
         * @private
         */
        this._data = {};
    }

    /**
     * @param {EventDispatcher} eventDispatcher
     */
    set eventDispatcher(eventDispatcher) {
        this._eventDispatcher = eventDispatcher;

        eventDispatcher.on(Events.ENABLE, this.enable.bind(this));
        eventDispatcher.on(Events.DISABLE, this.disable.bind(this));

        eventDispatcher.on(Events.READY, this.onReady.bind(this));
        eventDispatcher.on(Events.COMMAND_COMPLETE, this.onCommandComplete.bind(this));

        this._listener.simple_combo('enter', this.fireCommand.bind(this));

        this._listener.simple_combo('up', this.commandHistory.bind(this));
        this._listener.simple_combo('down', this.commandHistory.bind(this));
        this._listener.simple_combo('left', this.moveCursor.bind(this));
        this._listener.simple_combo('right', this.moveCursor.bind(this));

        this._listener.simple_combo('backspace', this.backspace.bind(this));
        this._listener.simple_combo('delete', this.del.bind(this));

        this._listener.simple_combo('cmd v', this.paste.bind(this));
        this._listener.simple_combo('ctrl v', this.paste.bind(this));

        this._listener.simple_combo('cmd left', this.start.bind(this));
        this._listener.simple_combo('ctrl left', this.start.bind(this));

        this._listener.simple_combo('cmd right', this.end.bind(this));
        this._listener.simple_combo('ctrl right', this.end.bind(this));
    }

    updateCommand(string) {
        if (this._cursorPosition === this._commandInput.length) {
            this._commandInput += string;
        } else if (this._cursorPosition === 0) {
            this._commandInput = string + this._commandInput;
        } else {
            this._commandInput = this._commandInput.slice(0, this._cursorPosition) +
                string +
                this._commandInput.slice(this._cursorPosition);
        }

        this._cursorPosition += string.length;
    }

    fireCommand() {
        this.element.hide();

        var inputArguments = this._commandInput.split(' ');
        var inputCommand = inputArguments.shift();

        this._eventDispatcher.trigger(Events.COMMAND_SUBMIT, {
            prompt: $.trim(this.element.find('.prompt').text()),
            command: inputCommand,
            args: inputArguments
        });

        if (this._commandInput.length) {
            this._commandHistory.addHistory(this._commandInput);
        }

        this._commandHistory.resetIndex();

        this._commandDate = new Date();
        this._commandInput = '';
        this._cursorPosition = 0;
    }

    commandHistory(e) {
        var keyCode = e.keyCode || e.which;
        var newCommand;

        if (keyCode === keys.up) {
            newCommand = this._commandHistory.getNextCommand();
        }
        else if (keyCode === keys.down) {
            newCommand = this._commandHistory.getPreviousCommand();
        }

        this._commandInput = newCommand === undefined ? '' : newCommand;
        this._cursorPosition = this._commandInput.length;
    }

    moveCursor(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode === keys.left) {
            this._cursorPosition = (this._cursorPosition - 1) < 0 ? 0 : this._cursorPosition - 1;
        } else if (keyCode === keys.right) {
            this._cursorPosition = (this._cursorPosition + 1) > this._commandInput.length ? this._commandInput.length : this._cursorPosition + 1;
        }
    }

    backspace() {
        if (this._commandInput !== '' && this._cursorPosition > 0) {
            this._commandInput = this._commandInput.slice(0, this._cursorPosition - 1) +
                this._commandInput.slice(this._cursorPosition, this._commandInput.length);
            this._cursorPosition--;
        }
    }

    del() {
        if (this._commandInput !== '' && this._cursorPosition < this._commandInput.length) {
            this._commandInput = this._commandInput.slice(0, this._cursorPosition) +
                this._commandInput.slice(this._cursorPosition + 1, this._commandInput.length);
        }
    }

    start() {
        this._cursorPosition = 0;
    }

    end() {
        this._cursorPosition = this._commandInput.length;
    }

    paste() {
        var clipboardElement = this.element.find('.clipboard-input');
        clipboardElement.focus();

        //wait until Browser insert text to textarea
        setTimeout(() => {
            this.updateCommand(clipboardElement.val());
            clipboardElement.blur().val('');
        }, 10);

        return true;
    }

    onKeyPress(e) {
        if (this._enabled) {
            if (!e.ctrlKey && !e.altKey && $.inArray(e.which, [91, 93]) < 0) {
                //runLoop.defer('sync', this, 'updateCommand', String.fromCharCode(e.which));
                this.updateCommand(String.fromCharCode(e.which));
            }
        }
    }

    onReady(event, data) {
        this._commandDate = new Date();

        this.element.show();

        if (data.hasParent) {
            console.log('onReady and hasParent');
            this.disable.apply(this, arguments);
        } else {
            this.enable.apply(this, arguments);
        }
    }

    onCommandComplete() {
        runLoop.deferOnce('complete', this.element, 'show');
    }

    enable(event, data) {
        if(!this._enabled) {
            this._enabled = true;

            this._listener.listen();

            if (isMobile()) {
                this.element.off('keydown', '.clipboard-input').on('keydown', '.clipboard-input', this.onKeyPress.bind(this));

                var clipboardElement = this.element.find('.clipboard-input');

                $(data.container).click(() => clipboardElement.focus());//.keypress();

                clipboardElement.focus();
            } else {
                if (!this._onKeyPressRef) {
                    this._onKeyPressRef = (event) => runLoop.run(this, 'onKeyPress', event);
                }

                $(document).off('keypress', this._onKeyPressRef).on('keypress', this._onKeyPressRef);
            }
        }
    }

    disable() {
        if(this._enabled) {
            this._enabled = false;

            if (isMobile()) {
                this.element.off('keydown', '.clipboard-input')
            } else {
                $(document).off('keypress', this._onKeyPressRef);
            }
        }
        
        this._listener.stop_listening();
    }

    render() {
        var data = {
            enabled: this._enabled,
            hh: zeroFill(this._commandDate.getHours(), 2),
            mm: zeroFill(this._commandDate.getMinutes(), 2),
            ss: zeroFill(this._commandDate.getSeconds(), 2),
            beforeCursor: '',
            cursor: '&nbsp;',
            afterCursor: ''
        };

        if (this._cursorPosition === this._commandInput.length) {
            data.beforeCursor = this._commandInput;
        } else if (this._cursorPosition === 0) {
            data.cursor = this._commandInput.slice(0, 1);
            data.afterCursor = this._commandInput.slice(1);
        } else {
            data.beforeCursor = this._commandInput.slice(0, this._cursorPosition);
            data.cursor = this._commandInput.slice(this._cursorPosition, this._cursorPosition + 1);

            if (this._cursorPosition !== this._commandInput.length - 1) {
                data.afterCursor = this._commandInput.slice(this._cursorPosition + 1);
            }
        }

        this.element.html(template(data));
    }
}

[
    {key: '_commandInput', initValue: ''},
    {key: '_cursorPosition', initValue: 0},
    {key: '_commandDate', initValue: new Date()},
    {key: '_enabled', initValue: false}
].forEach(function(prop){
    Object.defineProperty(Input.prototype, prop.key, {
        set: function(value) {
            this._data[prop.key] = value;
            //this.render();
            runLoop.deferOnce('render', this, 'render');
        },
        get: function() {
            return this._data[prop.key] || prop.initValue;
        }
    });
});

export default Input;
