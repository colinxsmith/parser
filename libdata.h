//#include<string>
#include<cstring>
#include<vector>
#include<map>
#include<iostream>
#include<fstream>
#include<algorithm>
#include<cmath>
#include<cstdio>
#ifdef WIN32
#define atoll atol
#endif
namespace libdata
{
	double minw(size_t n,double* w);
	void get_weight_order(size_t n,double* w,double* MCTR,double* order);
	void printx(size_t n,double* a);
	void linefeedcheck(std::string& t);
	bool matchnumber(const char*a);
	bool matchnumber(char a);
	bool matchstring(const char*a,const char*b);
	bool matchstring(const char*a,const std::string b);
	bool matchstring(const std::string a,const char*b);
	bool matchstring(const std::string a,const std::string b);
	bool uniquekey(const std::string words,const char* key,const char* space=" ");
	bool uniquekey(const std::string words,const std::string key,const char* space=" ");
	void split(const std::string param,std::vector<double>&Param,const char* space=" ");
	void split(const std::string param,std::vector<int>&Param,const char* space=" ");
	void split(const std::string param,std::vector<long>&Param,const char* space=" ");
	void split(const std::string param,std::vector<long long>&Param,const char* space=" ");
	void split(const std::string param,std::vector<std::string>&Param,const char* space=" ");
	void split(const std::string param,std::vector<char*>&Param,const char* space=" ");
	void breaklog(const int line,const char*data);
	void breaklog(const int line,const std::string data);
	void Parser(std::istream&input,const std::string words,char*read,const size_t line_len,
	std::vector< std::string >&fwords,std::map< std::string,std::vector<double> >&DATA,const char*space=" ");
	void Parser(const char* filename,const std::string words,char*read,const size_t line_len,
	std::vector< std::string >&fwords,std::map< std::string,std::vector<double> >&DATA,const char*space=" ");

	template <typename T> T* getvector(std::map<std::string,std::vector<T> >&vecmap,const char*name,T* back=nullptr)
	{
		auto pos=vecmap.find(name);
		if(pos!=vecmap.end()&&(matchstring(pos->first,name)))
			back=&pos->second.front();
		return back;
	}
	template <typename T> T getscalar(std::map<std::string,std::vector<double> >&vecmap,const char*name,T back=0)
	{
		auto pos=vecmap.find(name);
		if(pos!=vecmap.end()&&(matchstring(pos->first,name)))
			back=(T)pos->second[0];
		return back;
	}

	template <typename T> class object_order
	{
		public:
		T val;
		size_t pos;
	};
	typedef bool (*FF)(const object_order<double>&x,const object_order<double>&y);
	template <typename T> size_t tran(object_order<T>&x)
	{
		return x.pos;
	}
	template <typename T> void getorder(size_t n,const std::vector<T> a,std::vector<size_t>& theorder,FF orderfunction)
	{
		std::vector<object_order<T> > aa;
		object_order<T> pp;
		size_t i;
		for(i=0;i<n;i++)
		{
			pp.val=a[i];
			pp.pos=i;
			aa.push_back(pp);
		}
		std::sort(aa.begin(),aa.end(),orderfunction);
		std::transform(aa.begin(),aa.end(),theorder.begin(),tran<T>);
	}
	template <typename T> void Reorder(size_t n,std::vector<size_t> order,std::vector<T>&array,size_t m=1)
	{
		if(!array.size()||!order.size())return;
		size_t i;
		std::vector<bool> marked;
		marked.resize(n);
		for(i=0;i<n;++i)marked[i]=false;
		size_t j,k;
		for(i=0;i<n;++i)
		{
			if(!marked[i])
			{
				for(j=i,k=order[j];k!=i;k=order[j=k])
				{
					std::swap_ranges(&array[k*m],&array[(k+1)*m],&array[j*m]);
					marked[k]=true;
				}
				marked[i]=true;
			}
		}
	}
	template <typename T> void swap_sym(size_t n, T* S, size_t p, size_t q) 
	{
		T* Sp;
		T* Sq;
		size_t	i;
		long	j;
		if(!n || p==q) return;	/*trivial cases*/

		/*ensure p<q*/
		if(++p>++q) std::swap(p,q);

		/*swap rows p and q columns 1..p-1*/
		Sp = S+(p*(i=((long) p-1)))/2;		/*Sp points to S(p,1)*/
		Sq = S+(q*(j=((long) q-1)))/2;		/*Sq points to S(q,1)*/
		std::swap_ranges(&Sp[0],&Sp[i],&Sq[0]);

		/*swap columns p and q rows q+1 .. n*/
		Sp += i;			/*Sp points to S(p,p)*/
		Sq += j;			/*Sq points to S(q,q)*/
		j = (long)p - (long)q;	/*negative*/
		for(i=q, S=Sq; i<n; i++)
		{
			S += i;			/*S points to S(i+1,q)*/
			std::swap(S[0],S[j]);
		}

		std::swap( *Sp, *Sq);		/*diagonal elements*/

		/*now swap elements (p+i,p) with elements (q,q-i) i=1,..,q-p-1*/
		Sp = Sq-- +j;
		while( --q > p )
		{
			Sp -= q;
			std::swap(*Sp,*Sq);
			Sq--;
		}
	}
	template <typename T> void Reorder_sym(size_t n, std::vector<size_t> order,std::vector<T>&array)
	{
		if(!array.size()||!order.size()) return;
		size_t	i;
		std::vector<bool> marked;
		size_t j, k;
		marked.resize(n);
		for(i=0;i<n;++i)marked[i]=false;
		for(i=0;i<n;i++)
		{
			if(!marked[i])
			{
				for(j=i,k=order[j];k!=i;k=order[j=k])
				{
					swap_sym(n,&array[0],j,k);
					marked[k] = true;
				}
				marked[i] = true;
			}
		}
	}
	template <typename T> void dumpvector(size_t n,const char* name,T* A,std::ofstream &file)
	{
		file<<name<<std::endl;
		file.precision(17);
		if(A&&(n>0))
		{
			while(n--)
			{
				if(n)
					file<<*A++<<" ";
				else
					file<<*A++;
			}
		}
		file<<std::endl;
	}
	template <typename T> void dumpvector(size_t n,const char* name,std::vector<T>&A,std::ofstream &file)
	{
		file<<name<<std::endl;
		file.precision(17);
		size_t i=0;
		if(A.size()&&(n>0))
		{
			while(n--)
			{
				if(n)
					file<<A[i++]<<" ";
				else
					file<<A[i++];
			}
		}
		file<<std::endl;
	}
	template <typename T> void dumpvector(size_t n,const char* name,T* A,std::ofstream &file,size_t lim)
	{
		file<<name<<std::endl;
		file.precision(17);
		size_t i=0;
		bool end=true;
		if(A&&(n>0))
		{
			while(n--)
			{
				end=false;
				if(i++%lim==(lim-1))end=true;
				if(n&&!end)
					file<<*(A++)<<" ";
				else
					file<<*(A++);
				if(end)file<<std::endl;
			}
		}
		file<<std::endl;
	}
	template <typename T> void dumpvectorf(size_t n,const char* name,T* A,const char* filename,size_t ll)
	{
		std::ofstream infile;
		infile.open(filename,std::ofstream::app);
		if(ll)libdata::dumpvector(n,name,A,infile,ll);
		else libdata::dumpvector(n,name,A,infile);
		infile.close();
		infile.clear();
	}
}
