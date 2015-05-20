'use strict';

import CommandAbout from 'command/about';
import CommandClear from 'command/clear';
import CommandHelp from 'command/help';
import CommandTest from 'command/table';
import CommandTable from 'command/test';
import CommandWindow from 'command/window';

export default {
    title: 'Console CV',
    version: '2.0.0',

    commands: [
        new CommandWindow(),
        new CommandHelp(),
        new CommandAbout(),
        new CommandClear(),
        new CommandTable(),
        new CommandTest()
    ],

    container: null,

    inputSelector: '.input-holder',
    outputSelector: '.output-holder',
    promptSelector: '.prompt',

    initOutput: [
        'Type "help" to get a list of commands',
        ' '
    ]
};
