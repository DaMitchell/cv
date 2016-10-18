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
        parentConsole.hierarchy.removeChild(this._console);
    }
}

export default Exit;
