#!/bin/bash
pic=$1
size=${2:-16}
convert -resize $size $pic fav.png
icotool -o favicon.ico  -c fav.png 
