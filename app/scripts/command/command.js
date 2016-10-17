
class Command {
    constructor(command) {
        /**
         * @type {String}
         * @private
         */
        this._command = command;

        /**
         * @type {EventDispatcher}
         * @private
         */
        this._eventDispatcher;

        /**
         * @type {EventDispatcher}
         * @private
         */
        this._console;
    }

    set eventDispatcher(eventDispatcher) {
        this._eventDispatcher = eventDispatcher
    }

    set con(console) {
        this._console = console;
    }

    getCommand() {
        return this._command;
    }

    getDescription() {
        return '';
    }

    getHelp() {
        return '';
    }

    execute() {
        throw new Error('You need to override the execute method');
    }
}

export default Command;
