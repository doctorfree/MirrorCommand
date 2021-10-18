    // These Electron Options place MagicMirror on the desktop background
    // It's an application running as your desktop wallpaper!
    electronOptions: {
	    width: 1080,
	    height: 1920,
	    fullscreen:  false,
	    backgroundColor: '#00000000',
	    titleBarStyle: 'none',
	    frame: false,
	    type: 'desktop',
	    hasShadow: false,
	    transparent: true,
	    resizable:   false,
    },
    electronSwitches: ["enable-transparent-visuals"],
    // Comment out the above two config settings to run MagicMirror normally
