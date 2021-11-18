#!/bin/bash

mirror_inst=`type -p mirror`
[ "${mirror_inst}" ] && {
    mirror stop
}
sleep 2
sudo umount /mnt/transcend
sleep 2
sudo /sbin/shutdown -r now
