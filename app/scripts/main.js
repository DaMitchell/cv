'use strict';

import Events from 'events';
import Config from 'config';

import Runner from 'core/runner';
import Tracking from 'core/tracking';
import Input from 'view/input';
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

    if (config.commands && $.isArray(config.commands)) {
        for (var i = 0, l = config.commands.length; l > i; i++) {
            if (typeof(config.commands[i]) === 'object') {
                api.commands.push(config.commands[i]);

                if (typeof(api.commands[i].init) === 'function') {
                    api.commands[i].init(api);
                }
            }
        }
    }
}

export default function(config) {
    config = config || {};

    api.config = $.extend({}, api.config, config || {});

    initDependencies(api);
    attachAndInitCommands(api);

    $(api).trigger(Events.READY);

    return api;
}
