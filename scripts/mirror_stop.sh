#!/bin/bash
#
# Taken from https://github.com/MagicMirrorOrg/MagicMirror/issues/1931
# Modified to remove dependency on moreutils package 'ifne' command

ps -ef | grep pocket | grep -v "grep"  | awk '{print $2}' | while read pocketpid
do
  sudo kill -9 ${pocketpid} > /dev/null 2>&1
done

ps -ef | grep node | grep -v "grep"  | awk '{print $2}' | while read nodepid
do
  sudo kill -9 ${nodepid} > /dev/null 2>&1
done

ps -ef | grep chromium-browser | grep -v "grep"  | awk '{print $2}' | while read chromepid
do
  sudo kill -9 ${chromepid} > /dev/null 2>&1
done

# sudo killall chromium-browser
# sudo killall /usr/lib/chromium-browser/chromium-browser
# sudo killall electron

# Alternatively, but not as good
# ps aux | grep node | grep -v "color"  | awk '{print $2}' | xargs sudo kill -9
