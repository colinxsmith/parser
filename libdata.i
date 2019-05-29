%module libhere
%include stl.i
%include std_map.i
//%include std_sstream.i
%include carrays.i
%array_functions(double ,doubleArray)
%array_functions(char* ,sArray)
#ifdef SWIGCSHARP
%typemap(csimports) SWIGTYPE %{
using System;
using System.Runtime.InteropServices;
//The above are in the default version, additions follow:
using System.Collections.Generic;
%}
%typemap(imtype) int*   "int[]"
%typemap(cstype) int*   "int[]"
%typemap(ctype) int*   "int*"
%typemap(csin) int* "$csinput"
%typemap(imtype) double*   "double[]"
%typemap(cstype) double*   "double[]"
%typemap(ctype) double*   "double*"
%typemap(csin) double* "$csinput"
%typemap(imtype, out="global::System.IntPtr") double* "double[]"

%typemap(imtype) size_t*   "uint[]"
%typemap(cstype) size_t*   "uint[]"
%typemap(ctype) size_t*   "size_t*"
%typemap(csin) size_t* "$csinput"
%typemap(csout, excode=SWIGEXCODE) double*   {
    global::System.IntPtr cPtr=$imcall;
    double[]ret=null;$excode
    $csclassname ret1 = null;
    if(cPtr != global::System.IntPtr.Zero) 
		ret1 = new $csclassname(cPtr, $owner);
	if(vecmap.ContainsKey(name))
	{
		int N=vecmap[name].Count;
		ret=new double[N];
		int i;
		for(i=0;i<N;++i)
			ret[i]=libhere.doubleArray_getitem(ret1,i);//vecmap[name][i];
	}
    return ret;
  }

%typemap(out) double* "$result=$1;"
%typemap(out) std::string* "$result=$1;"
#endif

#ifdef SWIGJAVA
%typemap(jni) double *  "jdoubleArray"
%typemap(jtype) double * "double[]"
%typemap(jstype) double * "double[]"
%typemap(javain) double * "$javainput"
%typemap(javaout) double* {return $jnicall;}
%pragma(java) modulecode=
%{
	static
	{
		try {System.loadLibrary("libraryname");} 
		catch (UnsatisfiedLinkError e)
		{
			System.err.println("Native code library libraryname failed to load.\n" + e);
			System.err.println("Native code library libraryname failed to load.\n" + e);
			System.err.println("Native code library libraryname failed to load.\n" + e);
			System.err.println("Native code library libraryname failed to load.\n" + e);
			System.err.println("Native code library libraryname failed to load.\n" + e);
			System.err.println("Native code library libraryname failed to load.\n" + e);
		}
	}
%}
#endif
%pragma(csharp) imclassimports=
%{
using System;
using System.Runtime.InteropServices;
%}
%pragma(csharp) moduleimports=
%{
using System;
using System.Runtime.InteropServices;
%}
%typemap(freearg) double*
{
#if	defined( SWIGPYTHON) || defined( SWIGPERL) || defined( SWIGJAVASCRIPT)
	delete[] $1;
#endif
}
#if defined( SWIGPYTHON ) 
%typemap(freearg) char** A
{
	if($1)//This handles memory used when calling sArray_setitem
	{
		size_t n=arg1,i;
		for(i=0;i<n;++i)
		{
			SWIG_Python_str_DelForPy3($1[i]);//free memory from strdup (sArray_setitem)
			$1[i]=0;
		}
	}//But $1 is freed elsewhere in delete_sArray
}
#endif
#if	defined( SWIGJAVA) || defined(SWIGCSHARP) || defined(SWIGJAVASCRIPT)
%typemap(freearg) char** A
{
	if($1)//This handles memory used when calling sArray_setitem
	{
		size_t n=arg1,i;
		for(i=0;i<n;++i)
		{
			free($1[i]);//free memory from strdup (sArray_setitem)
			$1[i]=0;
		}
	}//But $1 is freed elsewhere in delete_sArray
}
#endif
#if	defined( SWIGPYTHON) || defined( SWIGPERL)|| defined( SWIGJAVA)|| defined( SWIGJAVASCRIPT)
%typemap(out) std::string*
{
#ifdef SWIGJAVASCRIPT
    if($1) {
		std::map< std::string , std::vector<std::string> > map=*arg1;
		v8::Local<v8::Array> kkk = v8::Local<v8::Array>::Cast($result)->New(v8::Isolate::GetCurrent(),map[arg2].size());
        for(size_t i = 0;i < kkk->Length();++i) {
            kkk->Set(SWIGV8_CURRENT_CONTEXT(),i,SWIG_FromCharPtr($1[i].c_str())).FromJust(); //here
        }
		$result=v8::Local<v8::Value>::Cast(kkk);
    }
#endif
}
%typemap(out) double*
{//$result $1
#ifdef SWIGPYTHON
	if($1)
	{
		std::map< std::string , std::vector<double> > map=*arg1;
		size_t need_size = map[arg2].size(),i;
		$result=PyList_New(need_size);
		for(i=0;i<need_size;++i)
			PyList_SetItem($result,i,PyFloat_FromDouble($1[i]));
	}
#elif defined(SWIGJAVASCRIPT)
    if($1) {
		std::map< std::string , std::vector<double> > map=*arg1;
		v8::Local<v8::Array> kkk = v8::Local<v8::Array>::Cast($result)->New(v8::Isolate::GetCurrent(),map[arg2].size());
        for(size_t i = 0;i < kkk->Length();++i) {
            kkk->Set(SWIGV8_CURRENT_CONTEXT(),i,SWIG_From_double($1[i])).FromJust();
        }
		$result=v8::Local<v8::Value>::Cast(kkk);
    }
#elif defined( SWIGPERL)
	if($1)
	{
		std::map< std::string , std::vector<double> > map=*arg1;
		size_t len = map[arg2].size(),i;
		AV *myav;
		SV **svs;
		svs = new SV*[len];
		for (i = 0; i < len ; i++)
		{
			svs[i] = sv_newmortal();
			sv_setnv((SV*)svs[i],$1[i]);
		}
		myav =	av_make(len,svs);
		delete[]svs;
		$result = newRV((SV*)myav);
		sv_2mortal($result);
		argvi++;                      /* This is critical! */
	}
#elif defined(SWIGJAVA)
	if($1)
	{
		std::map< std::string , std::vector<double> > map=*arg1;
		jdouble *jfp;
		int size = map[arg2].size();
		int i;
		$result = JCALL1(NewDoubleArray, jenv, size);
		jfp = JCALL2(GetDoubleArrayElements, jenv, $result, 0);
		for(i=0; i<size; i++ )
			jfp[i] = (jdouble) $1[i];
		JCALL3(ReleaseDoubleArrayElements, jenv, $result, jfp, 0);
	}
#endif
}
%typemap(argout)	std::string*
{
#ifdef SWIGPYTHON
	int len,i;
	if($1 && $input && $input != Py_None)
	{
		len = PyList_Size($input);
		for(i = 0;i < len;++i)
		{
			PyList_SetItem($arg,i,PyString_FromString($1[i].c_str()));
		}
	}
#elif defined(SWIGJAVASCRIPT)
	if($1 && $input->IsArray()) {
        v8::Local<v8::Array> arr= v8::Local<v8::Array>::Cast($input);
        for(size_t i = 0;i < arr->Length();++i) {
            arr->Set(SWIGV8_CURRENT_CONTEXT(),i,SWIG_FromCharPtr($1[i].c_str())).FromJust();
        }
    }
#endif
}
%typemap(argout)	double*
{
#ifdef SWIGPYTHON
	int len,i;
	if($1 && $input && $input != Py_None)
	{
		len = PyList_Size($input);
		for(i = 0;i < len;++i)
		{
			PyList_SetItem($arg,i,PyFloat_FromDouble($1[i]));
		}
	}
#elif defined(SWIGJAVASCRIPT)
    if($1 && $input->IsArray()) {
        v8::Local<v8::Array> arr= v8::Local<v8::Array>::Cast($input);
        for(size_t i = 0;i < arr->Length();++i) {
            arr->Set(SWIGV8_CURRENT_CONTEXT(),i,SWIG_From_double($1[i])).FromJust();
        }
    }
#elif defined( SWIGPERL)
	if($arg && $1)//$arg $input
	{
		AV *tempav = (AV*) SvRV($arg);//We must use $arg and not $result
		SV **tv;
		I32 i,len = 0;
		len = av_len(tempav) + 1;//av_len returns the highest index in tempav
		for(i = 0;i < len;++i)
		{
			tv = av_fetch(tempav, i, 0);
			if(!tv)
				croak("$1 has not been initialised. ");
			sv_setnv(*tv,$1[i]);
		}
	}
#elif defined(SWIGJAVA)
	if($1&&$input)
	{
		JCALL3(ReleaseDoubleArrayElements, jenv, $input,(jdouble*) $1, 0);
		$1=0;//Because we cannot delete[] it later on;
	}
#endif
}
%typemap(in) std::string*
{
#ifdef SWIGPYTHON
	if(PyList_Check($input))
	{
		int size = PyList_Size($input);
		int i = 0;
		if(size)
			$1 = new $*1_ltype[size];
		else
			$1 = 0;
		for(i = 0;i < size;++i)
		{
			PyObject *o = PyList_GetItem($input,i);
			if(PyFloat_Check(o))
				$1[i] = (PyString_AsString(PyList_GetItem($input,i)));
			else
			{
				PyErr_SetString(PyExc_TypeError,"list must contain strings");
				delete[] $1;$1=0;
				return NULL;
			}
		}
	}
	else if($input == Py_None)
		$1 = 0;
	else
	{
		PyErr_SetString(PyExc_TypeError,"not a list of strings");
		return NULL;
	}
#elif defined(SWIGJAVASCRIPT)
		$1 = 0;
		if($input->IsArray())
    {
        v8::Local<v8::Array> arr= v8::Local<v8::Array>::Cast($input);
        if(arr->Length()) {
            $1 = new std::string[arr->Length()];
            for(size_t i = 0;i < arr->Length();++i) {
                v8::Local<v8::String> kkk = v8::Local<v8::String>::Cast( SWIGV8_TO_STRING(arr->Get(SWIGV8_CURRENT_CONTEXT(),i).ToLocalChecked()));
				char*kkkk=new char[SWIGV8_UTF8_LENGTH(kkk)*sizeof(*kkk)+1];
				SWIGV8_WRITE_UTF8(kkk,kkkk,SWIGV8_UTF8_LENGTH(kkk));
				kkkk[SWIGV8_UTF8_LENGTH(kkk)]='\0';
				$1[i]=std::string(kkkk);
            }
        }
    }
#endif
}
%typemap(in) double*
{
#ifdef SWIGPYTHON
	if(PyList_Check($input))
	{
		int size = PyList_Size($input);
		int i = 0;
		if(size)
			$1 = new $*1_ltype[size];
		else
			$1 = 0;
		for(i = 0;i < size;++i)
		{
			PyObject *o = PyList_GetItem($input,i);
			if(PyFloat_Check(o))
				$1[i] = PyFloat_AsDouble(PyList_GetItem($input,i));
			else if(PyLong_Check(o))
				$1[i] = PyLong_AsDouble(PyList_GetItem($input,i));
			else if(PyInt_Check(o))
				$1[i] = (double) PyInt_AsLong(PyList_GetItem($input,i));
			else
			{
				PyErr_SetString(PyExc_TypeError,"list must contain numbers");
				delete[] $1;$1=0;
				return NULL;
			}
		}
	}
	else if($input == Py_None)
		$1 = 0;
	else
	{
		PyErr_SetString(PyExc_TypeError,"not a list of doubles");
		return NULL;
	}
#elif defined(SWIGJAVASCRIPT)    
		$1 = 0;
		if($input->IsArray())
    {
        v8::Local<v8::Array> arr= v8::Local<v8::Array>::Cast($input);
        if(arr->Length()) {
            $1 = new $*1_ltype[arr->Length()];
            for(size_t i = 0;i < arr->Length();++i) {
                $1[i] = ($*1_ltype) SWIGV8_NUMBER_VALUE(arr->Get(SWIGV8_CURRENT_CONTEXT(),i).ToLocalChecked());
            }
        }
    }
#elif defined( SWIGPERL)
	AV *tempav;
	I32 len;
	int i;
	SV  **tv;

	$1=0;
	if (SvROK($input))
	{
        if (SvTYPE(SvRV($input)) != SVt_PVAV)
	    croak("$input is not an array.");
        tempav = (AV*)SvRV($input);
		len = av_len(tempav) + 1;//av_len returns the highest index in tempav
		if(len)	
			$1 = new $*1_type[len];
		for (i = 0; i < len; i++) 
		{
			tv = av_fetch(tempav, i, 0);
			if(tv)	
				$1[i] = (double) SvNV(*tv);
			else
				croak("$input has undefined data at i = %d",i);
		}
	}
#elif defined(SWIGJAVA)
	$1=0;
	if($input)
	{
		jsize sz = JCALL1(GetArrayLength, jenv, $input);
		int len = sz;
		if(len)
		{
			$1= (double*)JCALL2(GetDoubleArrayElements, jenv, $input, 0);
		}
	}
#endif
}

%typemap(in) double*out,std::string*out
{
#ifdef SWIGPYTHON
	if(true)
	{
		size_t size = arg1[arg2].size();
		if(size)
			$1 = new $*1_ltype[size];
		else
			$1 = 0;
	}
#elif defined(SWIGJAVASCRIPT)
	if(true)
	{
		size_t size = arg1[arg2].size();
		if(size)
			$1 = new $*1_ltype[size];
		else
			$1 = 0;
	}
#elif defined(SWIGPERL)
	if(true)
	{
		size_t size = arg1[arg2].size();
		if(size)
			$1 = new $*1_ltype[size];
		else
			$1 = 0;
	}
#elif defined(SWIGJAVA)
	$1=0;
	if($input)
	{
		jsize sz = JCALL1(GetArrayLength, jenv, $input);
		int len = sz;
		if(len)
		{
			$1= (double*)JCALL2(GetDoubleArrayElements, jenv, $input, 0);
		}
	}
#endif
}
%typemap(argout)	double*out
{
#ifdef SWIGPYTHON
	if($1 && $input && $input != Py_None)
	{
		size_t need_size = arg1[arg2].size(),len=0,i;
		if(PyList_Check($input))
			len = PyList_Size($input);
		else
		{
			printf("@@@@@@@@@@@@@ Use [] to initialise not None @@@@@@@@@@@@@@@@@\n");
		}
		if(need_size <= len)
		{
			for(i = 0;i < need_size;++i)
			{
				//printf("1 i=%lu %f\n",i,$1[i]);
				PyList_SetItem($input,i,PyFloat_FromDouble($1[i]));
			}
		}
		else
		{
			for(i = 0;i < len;++i)
			{
				//printf("1 i=%lu %f\n",i,$1[i]);
				PyList_SetItem($input,i,PyFloat_FromDouble($1[i]));
			}
			for(i=len;i<need_size;++i)
			{
				//printf("2 i=%lu %f\n",i,$1[i]);
				PyObject*o=PyFloat_FromDouble($1[i]);
				PyList_Append($input,o);
				Py_XDECREF(o);
			}
		}
	}
#elif defined(SWIGJAVASCRIPT)
    if($1 && $input->IsArray()) {
        v8::Local<v8::Array> arr= v8::Local<v8::Array>::Cast($input);
        for(size_t i = 0;i < arg1[arg2].size();++i) { // May need more code if arg1[arg2].size() > arr->Length()
            arr->Set(SWIGV8_CURRENT_CONTEXT(),i,SWIG_From_double($1[i])).FromJust();
        }
    }
#elif defined(SWIGPERL)
	AV *tempav = (AV*) SvRV($arg);//We must use $arg and not $result
	SV **tv;
	I32 i,len = 0,correct_len = arg1[arg2].size();
	len = av_len(tempav) + 1;//av_len returns the highest index in tempav
	if(len != correct_len)
	{
		if(len > correct_len)
			av_undef(tempav);
		len = correct_len;
		av_extend(tempav,len);
		for(i = 0;i < len;++i)
		{
			av_store(tempav,i,newSVnv($1[i]));
		}
	}
	else
	{
		for(i = 0;i < len;++i)
		{
			tv = av_fetch(tempav, i, 0);
			if(!tv)
				croak("$1 has not been initialised. ");
			sv_setnv(*tv,$1[i]);
		}
	}
#elif defined(SWIGJAVA)
	if($1&&$input)
	{
		JCALL3(ReleaseDoubleArrayElements, jenv, $input,(jdouble*) $1, 0);
		$1=0;//Because we cannot delete[] it later on;
	}
#endif
}
#endif
/* instantiate the required template specializations */
namespace std {
    %template(IntVector)    vector<int>;
    %template(DoubleVector) vector<double>;
    %template(StringVector) vector<std::string>;
    %template(DoubleMap) map< std::string,std::vector<double> >;
    %template(StringMap) map< std::string,std::vector<std::string> >;
}

/*			Examples for python, perl and csharp

STARTPYTHON
from libhere import *
a='1,2,3,4,5'
b=DoubleVector()
split(a,b,',')
c=IntVector()
split(a,c,',')
d=StringVector()
split(a,d,',')
for i in range(len(b)):
	print (b[i],c[i],d[i])
map=DoubleMap()
map['a']=b
print (map['a'][2])
breaklog(23,'message')
v=getv(map,'a')
print ('__________________')
print ('v=',v)
print ("map['a']=",map['a'])
print ('b=',b)
print ('b[0]=',b[0])
num='2.5'
numd=DoubleVector()
split(num,numd)
map['num']=numd
numcheck=gets(map,'num')
print ('__________________')
print ('numcheck=',numcheck)
print ("map['num']=",map['num'])
print ('numd=',numd)
print ('numd[0]=',numd[0])

testvec=[]
getvec1(map,'a',testvec,[])
print (testvec)
getvec(map,'a',testvec)
print (testvec)
print ("map['a']=",map['a'])
testvec=getv(map,'a')
print ('From getv ',testvec)
line_len=5000
read='0'*line_len
fwords=StringVector()
DATA=DoubleMap()
space=' '
Parser('paritysplit.log','n nsect nfac alpha sectors SV FL FC BFGS DiffGrad',read,line_len,fwords,DATA,space)
if DATA.size():
	print (geti(DATA,'n'))
	print (geti(DATA,'nfac'))
	print (getv(DATA,'alpha'))
	print (minw(geti(DATA,'n'),getv(DATA,'alpha')))
	for i in range(fwords.end()-fwords.begin()):
		print (fwords[i])
dumpv(3,'vals_python',[1,2,3],'vals',0)
strings=new_sArray(2)
sArray_setitem(strings,0,'Colin')
sArray_setitem(strings,1,'Smith')
s0=sArray_getitem(strings,0)
s1=sArray_getitem(strings,1)
print (s0,s1)
dumps(2,'strings',strings,'vals',0)
delete_sArray(strings)
ENDPYTHON
STARTPERL
local $,=" ";
local $\="\n";
use libhere;
$a="1,2,3,4,5";
$b=new libhere::DoubleVector();
libhere::split($a,$b,",");
$c=new libhere::IntVector();
libhere::split($a,$c,",");
$d=new libhere::StringVector();
libhere::split($a,$d,",");
print $b,$c,$d;
print $b->size();
for($i=0;$i<$b->size();++$i)
{
  print $b->get($i),$c->get($i),$d->get($i);
}
libhere::breaklog(23,"message");
$map=new libhere::DoubleMap();
$map->set("a",$b);
print $map->get("a")->get(3);
$testvec=[];
libhere::getvec($map,"a",$testvec);
print @$testvec;
libhere::getvec1($map,"a",$testvec,[]);
print @$testvec;
print $map->get("a");
$testvec=libhere::getv($map,"a");
print "From getv ",@$testvec;
$read="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
$line_len= length $read;
$fwords=new libhere::StringVector();
$DATA=new libhere::DoubleMap();
$space=" ";
libhere::Parser("paritysplit.log","n nsect nfac alpha sectors SV FL FC BFGS DiffGrad",$read,$line_len,$fwords,$DATA,$space);
if($DATA->size())
{
	print libhere::geti($DATA,"n");
	$nn = libhere::geti($DATA,"n");
	print libhere::geti($DATA,"nfac");
	$alpha=libhere::getv($DATA,"alpha");
	print @$alpha;
        print libhere::minw($nn,$alpha);
	for($i=0;$i<$fwords->size();++$i)
	{
		print $fwords->get($i);
	}
}
libhere::dumpv(3,"vals_perl",[1,2,4],"vals",0);
$strings=libhere::new_sArray(2);
libhere::sArray_setitem($strings,0,"Colin");
libhere::sArray_setitem($strings,1,"Smith");
print libhere::sArray_getitem($strings,0);
print libhere::sArray_getitem($strings,1);
libhere::dumps(2,"strings",$strings,"vals",0);
libhere::delete_sArray($strings);

ENDPERL
STARTCSHARP
using System;
using System.Runtime.InteropServices;
public class csharptest
{
	static void Main()
	{
		String a="1,2,3,4,5";
		DoubleVector b=new DoubleVector();
		IntVector c=new IntVector();
		StringVector d=new StringVector();
		libhere.split(a,b,",");
		libhere.split(a,c,",");
		libhere.split(a,d,",");
		int i;
		for(i=0;i<b.Count;++i)
			Console.WriteLine (String.Format ("b[{0,1}]          {1,16:f8}",i, b[i]));
		for(i=0;i<c.Count;++i)
			Console.WriteLine (String.Format ("c[{0,1}]          {1,16}",i, c[i]));
		for(i=0;i<d.Count;++i)
			Console.WriteLine (String.Format ("d[{0,1}]          {1,16}",i, d[i]));
		libhere.breaklog(23,"message");
		
		DoubleMap map = new DoubleMap();
		map["a"]=b;
		Console.WriteLine (String.Format (" map[a] [3] is {0,5:f8}",map["a"][3]));
		double[] testvec=new double[b.Count];
		libhere.getvec(map,"a",testvec);
		for(i=0;i<b.Count;++i)
			Console.WriteLine (String.Format ("testvec[{0,1}]          {1,16}        ({2,16})",i, testvec[i],map["a"][i]));
		DoubleMap DATA = new DoubleMap();
		StringVector fwords=new StringVector();
		char[] readb=new char[10000];
		String read=new string(readb);
		uint line_len=(uint)read.Length;
		libhere.Parser("paritysplit.log","n nsect nfac alpha sectors SV FL FC BFGS DiffGrad",read,line_len,fwords,DATA," ");
		if(DATA.Count>0)
		{
			int n=DATA["alpha"].Count;
			double[] alpha=new double[n];
			double[] start=new double[n];
			for(i=0;i<n;++i)
				start[i]=i+1;
			libhere.getvec(DATA,"alpha",alpha);
                        Console.WriteLine(libhere.minw((uint)n,alpha));
			for(i=0;i<n;++i)
				Console.WriteLine (String.Format ("alpha[{0,3}]          {1,16}          ({2,16})",i, alpha[i],DATA["alpha"][i]));
			double[] ALPHA=libhere.getv(DATA,"alpha",start);
			if(ALPHA!=null)
			{
				for(i=0;i<ALPHA.Length;++i)
					Console.WriteLine (String.Format ("ALPHA[{0,3}]          {1,16}          ({2,16})",i, ALPHA[i],DATA["alpha"][i]));
			}
			for(i=0;i<fwords.Count;++i)
				Console.WriteLine (fwords[i]);
		}
		double[] vv={1,2,5};
		libhere.dumpv(3,"vals_csharp",vv,"vals",0);
		SWIGTYPE_p_p_char strings=libhere.new_sArray(2);
		string s1="Colin";
		string s2="Smith";
		libhere.sArray_setitem(strings,0,s1);//setitem only works if we use strdup or similar in the c++ code
		libhere.sArray_setitem(strings,1,s2);//I added this in the make file
		Console.WriteLine(libhere.sArray_getitem(strings,0)+" "+libhere.sArray_getitem(strings,1));
		libhere.dumps(2,"strings",strings,"vals",0);
		libhere.delete_sArray(strings);
	}
}
ENDCSHARP
STARTJAVA
public class javatest
{
	public static void main(String args[])
	{
		libhere.breaklog(23,"message");
		String a="1,2,3,4,5";
		DoubleVector b=new DoubleVector();
		IntVector c=new IntVector();
		StringVector d=new StringVector();
		libhere.split(a,b,",");
		libhere.split(a,c,",");
		libhere.split(a,d,",");
		int i;
		for(i=0;i<b.size();++i)
			System.out.println(i+" "+b.get(i));
		for(i=0;i<c.size();++i)
			System.out.println(i+" "+c.get(i));
		for(i=0;i<d.size();++i)
			System.out.println(i+" "+d.get(i));
		DoubleMap DATA = new DoubleMap();
		StringVector fwords=new StringVector();
		char[] readb=new char[10000];
		String read=new String(readb);
		int line_len=read.length();
		libhere.Parser("paritysplit.log","n nsect nfac alpha sectors SV FL FC BFGS DiffGrad",read,line_len,fwords,DATA," ");
		if(DATA.size()>0)
		{
			int n=(int)DATA.get("alpha").size();
			System.out.println("n="+n);
			double[] alpha=new double[n];
			double[] start=new double[n];
			for(i=0;i<n;++i)
				start[i]=i+1;
			libhere.getvec(DATA,"alpha",alpha);
                        System.out.println(libhere.minw(n,alpha));
			for(i=0;i<n;++i)
				System.out.println(i+" "+alpha[i]+" "+DATA.get("alpha").get(i));
			double[] ALPHA=libhere.getv(DATA,"alpha");
			for(i=0;i<n;++i)
				System.out.println(i+" "+alpha[i]+" "+ALPHA[i]);	
			for(i=0;i<fwords.size();++i)
				System.out.println(fwords.get(i));
		}
		double[] vv={1,2,6};
		libhere.dumpv(3,"vals_java",vv,"vals",0);
		SWIGTYPE_p_p_char strings=libhere.new_sArray(2);
		String s1="Colin";
		String s2="Smith";
		libhere.sArray_setitem(strings,0,s1);//setitem only works if we use strdup in the c++ code
		libhere.sArray_setitem(strings,1,s2);
		System.out.println(libhere.sArray_getitem(strings,0)+" "+libhere.sArray_getitem(strings,1));
		libhere.dumps(2,"strings",strings,"vals",0);
		libhere.delete_sArray(strings);
	}
}
ENDJAVA
*/
%{
#include<libdata.h>
%}
%include "libdata.h"
%{
using namespace libdata;
%}
%template(getv) libdata::getvector<double>;
%template(getv) libdata::getvector<std::string>;
%template(getvv) libdata::getvectorV<std::vector<double>>;
%template(getvv) libdata::getvectorV<std::vector<std::string>>;
%template(gets) libdata::getscalar<double,double>;
%template(gets) libdata::getscalar<std::string,std::string>;
%template(geti) libdata::getscalar<double,long>;
%template(geti) libdata::getscalar<long>;
%template(getvvec) libdata::getfword<double>;// get double from vector of doubles
%template(getvvec) libdata::getfword<std::string>;// get string from vector of strings
%template(dumpv) libdata::dumpvectorf<double>;
%template(dumps) libdata::dumpvectorf<char*>;
%template(Parser) libdata::Parser<std::string>;
%template(Parser) libdata::Parser<double>;
%template(getvec) libdata::getvec<double>;
%template(getvec) libdata::getvec<std::string>;
%inline
%{
	void getvec1(std::map< std::string,std::vector<double> > mapper,const char*key,double*out,double*back)
	{
		double*out1 = (double*)getvector<double>(mapper,key,back);
		for(size_t i=0;i<mapper[key].size();++i)
		{
			//printf("getvec i=%lu %f\n",i,out1[i]);
			out[i]=out1[i];
		}
	}
%}
