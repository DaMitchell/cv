/* global define */
define([
    'jquery',
    'command/help',
    'command/clear',
    'command/window'
],
function(
    $,
    CommandWindow,
    CommandClear,
    CommandHelp
)
{
    'use strict';

    return {
        title: 'Console CV',
        version: '0.0.1',

        commands: [
            new CommandWindow(),
            new CommandClear(),
            new CommandHelp()
        ],

        loading: $('#loading'),
        container: $('#console'),
        input: $('#input'),
        output: $('#output'),

        initOutput: [
            ' _______ _           _____                      _       _____     ',
            '|__   __| |         / ____|                    | |     / ____|    ',
            '   | |  | |__   ___| |     ___  _ __  ___  ___ | | ___| |  __   __',
            '   | |  | \'_ \\ / _ \\ |    / _ \\| \'_ \\/ __|/ _ \\| |/ _ \\ |  \\ \\ / /',
            '   | |  | | | |  __/ |___| (_) | | | \\__ \\ (_) | |  __/ |___\\ V / ',
            '   |_|  |_| |_|\\___|\\_____\\___/|_| |_|___/\\___/|_|\\___|\\_____\\_/  ',
            ' ',
            'Type help to get a list of commands',
            ' '
        ]
    };
});