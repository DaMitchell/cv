'use strict';

import Command from './command';
import Events from 'events';

class Clear extends Command {
    constructor() {
        super('clear');
    }

    getDescription() {
        return 'Clear the window of all past output.';
    }

    execute() {
        this._eventDispatcher.trigger(Events.OUTPUT_CLEAR);
    }
}

export default Clear;
