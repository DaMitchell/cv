'use strict';

import create from './create';

export default function(container, config) {
    return create(container, config).start();
}
