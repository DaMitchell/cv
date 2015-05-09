'use strict';

import CommandAbout from 'command/about';
import CommandClear from 'command/clear';
import CommandHelp from 'command/help';
import CommandTest from 'command/test';
import CommandWindow from 'command/window';

export default {
    title: 'Console CV',
    version: '2.0.0',

    commands: [
        new CommandWindow(),
        new CommandHelp(),
        new CommandAbout(),
        new CommandClear(),
        new CommandTest()
    ],

    loading: $('#loading'),
    container: $('#console'),
    input: $('#input'),
    output: $('#output'),

    initOutput: [
        'Type help to get a list of commands',
        ' '
    ]
};
