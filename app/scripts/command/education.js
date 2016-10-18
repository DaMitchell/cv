'use strict';

import Command from './command';
import getText from '../util/get-text';

class Education extends Command {
    constructor() {
        super('education');
    }

    getDescription() {
        return 'My education history.';
    }

    execute() {
        return getText(this._eventDispatcher, 'data/education.json');
    }
}

export default Education;
