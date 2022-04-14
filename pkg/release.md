Version 4.0.0 Release 3 of MirrorCommand adds the capability of updating the MagicMirror installation with the `mirror` command. The `mirror` command can also be used to update all installed MagicMirror modules. Bug fixes and improved user interface are included in this release.

Version 4.0.0 of MirrorCommand includes modifications to support the MMM-GoogleAssistant v4 module. In addition, the MMM-Detector module has been replaced by the EXT-Detector module. The EXT-GooglePhotos and Gateway modules have been added and no longer used modules removed. Configuration changes necessary to support MMM-GoogleAssistan v4 and these new extension modules have been applied to all relevant config files. All config files are retained in their original non-customized format in `/usr/local/MirrorCommand/...` while those copied into `/usr/local/MagicMirror/...` are customized. In this way, subsequent re-customization can be supported.

Note that the above described updates to the *MagicMirror* modules will only be applied during an installation of *MirrorCommand* in which there is no previous *MagicMirror* installed. To apply these changes during installation, remove or move aside your existing *MagicMirror* folder. Install *MirrorCommand*, initialize your keys, then re-apply any customization you have previously made to *MagicMirror* modules. Alternately, you can retain an existing *MagicMirror* installation and upgrade the modules to MMM-GoogleAssistant v4, Gateway, EXT-Detector, and EXT-GooglePhotos manually.

The previous release updates of MirrorCommand incorporated changes to improve integration with the MirrorImages package downloads. In addition, support was added for models by country in the MirrorImages downloads and in the MirrorCommand default config files. New Google Drive file ids have been used in the download scripts to reflect the MirrorImages distribution changes. Installs of the current MirrorImages packages require this version of MirrorCommand or later. The scripts that download image archives for the [MirrorImages](https://gitlab.com/doctorfree/MirrorImages) packages have been updated to execute in non-interactive mode when being run during an RPM installation.

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
sudo apt install ./MirrorCommand_4.0.0-3.deb
```

Install the package on RPM based systems by executing the command
```bash
sudo yum localinstall ./MirrorCommand-4.0.0-3.rpm
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

