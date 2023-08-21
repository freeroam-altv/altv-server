import * as alt from "alt-server";

export class Logger {
    serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    log(...message: any[]) {
        alt.log(`[${this.serviceName}]`, ...message);
    }

    logWarning(...message: any[]) {
        alt.logWarning(`[${this.serviceName}]`, ...message);
    }

    logError(...message: any[]) {
        alt.logError(`[${this.serviceName}]`, ...message);
    }

    logDebug(...message: any[]) {
        alt.logDebug(`[${this.serviceName}]`, ...message);
    }
}
