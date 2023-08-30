export interface PluginData {
    name: string;
}

export interface Plugin {
    name: string;
    callback: () => boolean;
}
