'use strict';

import Events from '../events';

class Runner {
    /**
     * @param {Array} commands
     * @param {EventDispatcher} eventDispatcher
     */
    constructor(commands, eventDispatcher) {
        this._commands = commands;
        this._eventDispatcher = eventDispatcher;

        this._eventDispatcher.on(Events.COMMAND_SUBMIT, this.execute.bind(this));
    }

    /**
     * @param {jQuery.Event} event
     * @param {Object} data
     */
    execute(event, data) {
        var result;
        data = data || {};

        if (data.command && data.command.length) {
            var command = this._commands.find((command) => {
                if (typeof(command.getCommand) !== 'function') {
                    return false;
                }

                return command.getCommand() === data.command.trim();
            });

            if (!command || typeof(command.execute) !== 'function') {
                this._eventDispatcher.trigger(Events.COMMAND_NOT_FOUND, data);
            } else {
                result = command.execute(data.args);
            }
        }

        var done = () => this._eventDispatcher.trigger(Events.COMMAND_COMPLETE);

        if (result && result.done) {
            result.done(done);
        } else {
            done();
        }
    }
}

export default Runner;
