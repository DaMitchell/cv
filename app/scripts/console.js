'use strict';

import Events from 'events';
import Config from 'config';

import Runner from 'core/runner';
import Tracking from 'core/tracking';
import Hierarchy from 'core/hierarchy';

import Input from 'view/custom-input';
import Output from 'view/output';

import Template from 'template/console';

export default function(container, config) {
    /**
     * @type {{
     *     config: (Config|*),
     *     commands: Array,
     *     views: {input: null, output: null, prompt: null},
     *     runner: null,
     *     tracking: null,
     *     hierarchy: (Hierarchy|*)
     * }}
     */
    var api = {
        config: Config,
        commands: [],
        views: {
            input: null,
            output: null,
            prompt: null
        },
        runner: null,
        tracking: null,
        hierarchy: new Hierarchy()
    };

    function initTemplate(api) {
        api.config.containerClone = $(api.config.container).clone();

        $(api.config.container).html(Template.join('\n'));
    }

    function initDependencies(api) {
        api.views.input = new Input(api);
        api.views.output = new Output(api);

        api.runner = new Runner(api);
        api.tracking = new Tracking(api);
    }

    function initCommands(api) {
        var config = api.config;

        if (config.commands && _.isArray(config.commands)) {
            config.commands.map(function(Command, i){
                if (typeof(Command) === 'function') {
                    api.commands.push(new Command());

                    if (typeof(api.commands[i].init) === 'function') {
                        api.commands[i].init(api);
                    }
                }
            });
        }
    }

    config = config || {};
    config.container = container;

    if(config.parent) {
        api.hierarchy.setParent(config.parent);
        delete config.parent;
    }

    api.config = $.extend({}, api.config, config || {});

    initTemplate(api);
    initCommands(api);
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
