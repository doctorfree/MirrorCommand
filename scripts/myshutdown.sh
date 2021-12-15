#!/bin/bash
#
# List of mount points to unmount before rebooting
MNT_PTS="/mnt/transcend"

mirror_inst=`type -p mirror`
[ "${mirror_inst}" ] && {
    mirror stop
}

for mntpt in ${MNT_PTS}
do
  mount | grep ${mntpt} > /dev/null && {
    sudo umount ${mntpt}
  }
done

sleep 2
sudo /sbin/shutdown -h now
