'use strict';

import Events from 'events';

class Runner {
    /**
     * @param {Array} commands
     * @param {EventDispatcher} eventDispatcher
     */
    constructor(commands, eventDispatcher) {
        this._commands = commands;
        this._eventDispatcher = eventDispatcher;

        this._eventDispatcher
            .off(Events.COMMAND_SUBMIT, this.execute.bind(this))
            .on(Events.COMMAND_SUBMIT, this.execute.bind(this));
    }

    /**
     * @param {jQuery.Event} event
     * @param {Object} data
     */
    execute(event, data) {
        var result;

        if (data.command.length) {
            var command = _.find(this._commands, function(command) {
                if (typeof(command.getCommand) !== 'function') {
                    return false;
                }

                return command.getCommand() === $.trim(data.command);
            });

            if (!command || typeof(command.execute) !== 'function') {
                this._eventDispatcher.trigger(Events.COMMAND_NOT_FOUND, data);
            } else {
                result = command.execute(data.args);
            }
        }

        var done = function() {
            this._eventDispatcher.trigger(Events.COMMAND_COMPLETE);
        }.bind(this);

        if (result && result.done) {
            result.done(done);
        } else {
            done();
        }
    }
}

export default Runner;
