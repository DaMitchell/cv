'use strict';

import Command from './command'
import Events from '../events';

class Exit extends Command {
    constructor() {
        super('exit');
    }

    getDescription() {
        return 'Exit the console';
    }

    execute() {
        if(!this._console.hierarchy.hasParent()) {
            this._console.eventDispatcher.trigger(Events.OUTPUT, {
                content: 'There always has to be at least one console and this was the first one created.'
            });

            return true;
        }

        var parentConsole = this._console.hierarchy.getParent();

        var containerParent = this._console.container.parent();
        var containerParentParent = containerParent.parent();

        containerParent.siblings().each(function() {
            var sibling = $(this);
            sibling.children().appendTo(containerParentParent);
            sibling.remove();
        });

        if(this._console.hierarchy.hasChildren()) {
            var children = this._console.hierarchy.getChildren();

            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                this._console.hierarchy.removeChild(child);
                child.hierarchy.setParent(parentConsole);
                parentConsole.hierarchy.addChild(child);
            }
        }

        containerParent.remove();
        parentConsole.hierarchy.removeChild(api);
    }
}

export default Exit;
/*export default function() {
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
}*/
