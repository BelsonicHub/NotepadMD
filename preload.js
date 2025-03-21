const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (channel, ...args) => {
            const validChannels = [
                'file-dropped', 
                'auto-save', 
                'update-settings',
                'export-pdf',
                'export-html',
                'save-file',
                'open-file',
                'new-tab',
                'close-tab',
                'switch-tab'
            ];
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, ...args)
            }
        },
        on: (channel, func) => {
            const validChannels = [
                'menu-open', 
                'menu-save', 
                'menu-export-html', 
                'menu-export-pdf', 
                'menu-format',
                'menu-preview-mode',
                'settings-updated',
                'show-settings',
                'new-tab-triggered',
                'tab-closed',
                'tab-switched'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args))
            }
        }
    }
})