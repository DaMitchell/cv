'use strict';

import About from './command/about';
import Clear from './command/clear';
import Education from './command/education';
import Experience from './command/experience';
import Exit from './command/exit';
import Help from './command/help';
import Split from './command/split';
import Window from './command/window';

import Input from './view/input';
import Output from './view/output';

class Defaults {

    static defaultViews() {
        return [
            new Output(),
            new Input()
        ]
    }

    static defaultCommands() {
      return [
        new About(),
        new Help(),
        new Education(),
        new Experience(),
        new Clear(),
        new Window(),
        new Split(),
        new Exit()
      ]
    }
}

export default Defaults;
