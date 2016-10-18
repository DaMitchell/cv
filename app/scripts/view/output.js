'use strict';

import BaseView from './base-view';
import Events from '../events';

import runLoop from '../run-loop';

import linkify from '../util/linkify';
import template from '../template/component/output';

class Output extends BaseView {
    constructor() {
        super();

        /**
         * @type {jQuery}
         */
        this.element = $('<div class="output-holder"></div>');

        /**
         * @type {Array}
         * @private
         */
        this._lines = [];
    }

    /**
     * @param {EventDispatcher} eventDispatcher
     */
    set eventDispatcher(eventDispatcher) {
        eventDispatcher.on(Events.COMMAND_SUBMIT, this.onCommandSubmit.bind(this));
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, this.onCommandNotFound.bind(this));
        eventDispatcher.on(Events.COMMAND_ERROR, this.onCommandError.bind(this));
        eventDispatcher.on(Events.OUTPUT_CLEAR, this.onOutputClear.bind(this));
        eventDispatcher.on(Events.OUTPUT, this.onOutput.bind(this));
    }

    onCommandSubmit(event, data) {
        this.addOutputLine(data.prompt + ' ' + data.command + ' ' + data.args.join(' '));
    }

    onCommandNotFound(event, data) {
        this.addOutputLine('The command "' + data.command + '" could not be found.');
    }

    onCommandError(event, message) {
        this.addOutputLine(message, ['red']);
    }

    onOutput(event, data) {
        this.addOutputLine(data.content, data.classes);
    }

    onOutputClear() {
        this.element.find('.line').remove();
    }

    /**
     * @param {string} text
     * @param {Array} classes
     */
    addOutputLine(text, classes = []) {
        var lineClasses = ['line'];

        if (classes !== undefined && $.isArray(classes)) {
            lineClasses = lineClasses.concat(classes);
        }

        this.element.append(template({
            content: linkify(text),
            classes: lineClasses.join(' ')
        }));
    }

    render(){}
}

export default Output;
