#!/bin/bash
swig=~/SWIGcvs/SWIG/swig
$swig -javascript -c++ -node -o parse_wrap.cxx libdata.i
bash make_12.1.sed parse_wrap.cxx