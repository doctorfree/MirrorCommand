This minor release update of MirrorCommand enhances support for RPM based Linux installation and fixes an error introduced into the MMM-BackgroundSlideshow module in recent commits. It is recommended that all RPM based systems utilize this release or later and any systems utilizing the MMM-BackgroundSlideshow module delete that module and reinstall with the `module_update` command included in this release.

The version 3.0.x releases of MirrorCommand introduce support for multiple monitors, switching MagicMirror screen display between monitors, full support for both portrait and landscape mode displays, and renames the project from MirrorCommandLine to MirrorCommand.  Voice commands for screen switching have been added via the MMM-GoogleAssistant module recipe file MirrorCommand.js.

Changes to packaging include the creation and distribution of an RPM format installation package as well as the implementation of release creation during the Gitlab continuous integration process.

To install:

[Download the latest Debian or RPM format packages](https://gitlab.com/doctorfree/MirrorCommand/-/releases)

**NOTE:** The automated configuration requires access to some X11 graphical utilities. Depending upon your system's X11 configuration, it may be necessary to grant the *root* user access to the display. To do so, prior to installation issue the command:

`xhost +si:localuser:root`

or grant everyone access with

`xhost +`

Install the package on Debian based systems by executing the command
```bash
sudo apt install ./MirrorCommand_3.0.1-2.deb
```

Install the package on RPM based systems by executing the command
```bash
sudo yum localinstall ./MirrorCommand-3.0.1-2.rpm
```

Removal of the package on Debian based systems can be accomplished by issuing the command:

```bash
sudo apt remove mirrorcommand
```

Removal of the package on RPM based systems can be accomplished by issuing the command:

```bash
sudo yum remove MirrorCommand
```

Post installation, configure `/usr/local/MagicMirror/etc/mirrorkeys` with any keys used by your modules. Once keys are configured, execute the command:

```bash
/usr/local/bin/showkeys
```


