'use strict';

import Command from './command';
import getText from '../util/get-text';

class Experience extends Command {
    constructor() {
        super('experience');
    }

    getDescription() {
        return 'My past experiences.';
    }

    execute() {
        return getText(this._eventDispatcher, 'data/experience.json');
    }
}

export default Experience;
