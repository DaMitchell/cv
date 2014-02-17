/* global define */
define([
    'jquery',
    'config',
    'events',
    'console/runner',
    'view/input',
    'view/output',
], function($, config, events, Runner, ConsoleInput, ConsoleOutput)
{
    'use strict';

    var api = {
        config: config,
        commands: [],
        views: {
            input: null,
            output: null,
            prompt: null
        },
        runner: null
    };

    function init()
    {
        $(api).trigger(events.READY);
    }

    function initDependencies()
    {
        api.views.input = new ConsoleInput(api);
        api.views.output = new ConsoleOutput(api);

        api.runner = new Runner(api);
    }

    function attachCommands()
    {
        if(config.commands && $.isArray(config.commands))
        {
            for(var i = 0, l = config.commands.length; l > i; i++)
            {
                if(typeof(config.commands[i]) === 'object')
                {
                    api.commands.push(config.commands[i]);
                }
            }
        }
    }

    function initCommands()
    {
        if(api.commands && $.isArray(api.commands))
        {
            for(var i = 0, l = api.commands.length; l > i; i++)
            {
                if(typeof(api.commands[i].init) === 'function')
                {
                    api.commands[i].init(api);
                }
            }
        }
    }

    function attachEvents()
    {
        $(api).off(events.COMMAND_SUBMIT, api.runner.execute).on(events.COMMAND_SUBMIT, api.runner.execute);
    }

    initDependencies();
    attachCommands();
    initCommands();
    attachEvents();
    init();

    return api;
});