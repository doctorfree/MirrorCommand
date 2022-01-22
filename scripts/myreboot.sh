#!/bin/bash
#
USER=`id -u -n`
# List of mount points to unmount before rebooting
# Set this to any filesystems you want unmounted prior to reboot
# MNT_PTS="/u /v /mnt/backup"
MNT_PTS="/media/${USER}/*"

mirror_inst=`type -p mirror`
[ "${mirror_inst}" ] && {
    mirror stop
}

for mntpt in ${MNT_PTS}
do
  # Perform this type of test for each entry in MNT_PTS
  [ "${mntpt}" == "/media/${USER}/*" ] && continue
  mount | grep ${mntpt} > /dev/null && {
    sudo umount ${mntpt}
  }
done

sleep 2
sudo /sbin/shutdown -r now
