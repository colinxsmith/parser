PATH=$PATH:/usr/bin
swig=c:/SWIGcvs/SWIG/swig
$swig -javascript -c++ -node -o parse_wrap.cxx libdata.i
#No need to bother about make_12.1.sed anymore
#dos2unix make_12.1.sed && bash make_12.1.sed parse_wrap.cxx
