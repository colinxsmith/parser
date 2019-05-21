#!/bin/bash
swig=~/SWIGcvs/SWIG/swig
$swig -javascript -c++ -node -o parse_wrap.cxx libdata.i
bash make_12.1.sed parse_wrap.cxx
#awk 'BEGIN{i=0;};{if(i++%2==0){print $1;}}' /SDrive/logFile.log | sed "/-----/d;/names/d"|tr '\n' ' ' >> checklog.js