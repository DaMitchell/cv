'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'exit';
    }

    function getDescription() {
        return 'Exit the console';
    }

    function execute() {
        if(!api.hierarchy.hasParent()) {
            $(api).trigger(Events.OUTPUT, {
                content: 'There always has to be at least one console and this was the first one created.'
            });

            return true;
        }

        var parentConsole = api.hierarchy.getParent();

        var containerParent = $(api.config.container).parent();
        var containerParentParent = containerParent.parent();

        containerParent.siblings().each(function() {
            var sibling = $(this);
            sibling.children().appendTo(containerParentParent);
            sibling.remove();
        });

        if(api.hierarchy.hasChildren()) {
            var children = api.hierarchy.getChildren();

            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                api.hierarchy.removeChild(child);
                child.hierarchy.setParent(parentConsole);
                parentConsole.hierarchy.addChild(child);
            }
        }

        containerParent.remove();
        parentConsole.hierarchy.removeChild(api);
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
