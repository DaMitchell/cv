'use strict';

import Events from 'events';
import Config from 'config';

import Runner from 'core/runner';
import Tracking from 'core/tracking';
import Input from 'view/custom-input';
import Output from 'view/output';

var api = {
    config: Config,
    commands: [],
    views: {
        input: null,
        output: null,
        prompt: null
    },
    runner: null,
    tracking: null
};

function initDependencies(api) {
    api.views.input = new Input(api);
    api.views.output = new Output(api);

    api.runner = new Runner(api);
    api.tracking = new Tracking(api);
}

function attachAndInitCommands(api) {
    var config = api.config;

    if (config.commands && _.isArray(config.commands)) {
        config.commands.map(function(command, i){
            if (typeof(command) === 'object') {
                api.commands.push(command);

                if (typeof(api.commands[i].init) === 'function') {
                    api.commands[i].init(api);
                }
            }
        });
    }
}

export default function(container, config) {
    config = config || {};
    config.container = container;

    api.config = $.extend({}, api.config, config || {});

    attachAndInitCommands(api);
    initDependencies(api);

    $(document.documentElement || window).on('click.console', function(e) {
        if (!$(e.target).closest($(api.config.container)).hasClass('console')) {
            $(api).trigger(Events.DISABLE);
        }
    });

    $(api.config.container).on('click', function() {
        $(api).trigger(Events.ENABLE);

    });

    $(api).trigger(Events.READY);

    return api;
}
