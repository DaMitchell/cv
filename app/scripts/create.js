'use strict';

import Console from './console';
import Defaults from './defaults';

export default function(container, options, parent) {
    options = options || {};

    (options.views = options.views || []).push.apply(options.views, Defaults.defaultViews());
    (options.commands = options.commands || []).push.apply(options.commands, Defaults.defaultCommands());

    return new Console(container, options, parent);
}
