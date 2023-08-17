import * as alt from 'alt-client';

alt.on('consoleCommand', (...args: string[]) => {
    switch (args[0]) {
        case 'veh':
            alt.emitServer("veh:spawn", args[1]);
            break;
    }
});
