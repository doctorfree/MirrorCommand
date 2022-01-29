This release update of MirrorCommand incorporates changes to integrate with the MirrorImages RPM installations. Installs of the current MirrorImages packages require this version of MirrorCommand or later.

The previous release update of MirrorCommand fixed a bug in the install scripts introduced by recent changes to Bash wrt the return status of the 'type' builtin. MMM-stocks module is now pulled from my fork to provide dependency on 'request' and security fixes. The scripts that download image archives for the [MirrorImages](https://gitlab.com/doctorfree/MirrorImages) packages have been updated to execute in non-interactive mode when being run during an RPM installation.

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
sudo apt install ./MirrorCommand_3.0.2-1.deb
```

Install the package on RPM based systems by executing the command
```bash
sudo yum localinstall ./MirrorCommand-3.0.2-1.rpm
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


