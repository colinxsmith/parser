//#include<string>
#include <cstring>
#include <vector>
#include <map>
#include <iostream>
#include <fstream>
#include <algorithm>
#include <cmath>
#include <cstdio>
#ifdef WIN32
#define atoll atol
#endif
namespace libdata
{
double minw(size_t n, double *w);
void get_weight_order(size_t n, double *w, double *MCTR, double *order);
void printx(size_t n, double *a);
void linefeedcheck(std::string &t);
bool matchnumber(const char *a);
bool matchnumber(char a);
bool matchstring(const char *a, const char *b);
bool matchstring(const char *a, const std::string b);
bool matchstring(const std::string a, const char *b);
bool matchstring(const std::string a, const std::string b);
bool uniquekey(const std::string words, const char *key, const char *space = " ");
bool uniquekey(const std::string words, const std::string key, const char *space = " ");
void split(const std::string param, std::vector<double> &Param, const char *space = " ");
void split(const std::string param, std::vector<int> &Param, const char *space = " ");
void split(const std::string param, std::vector<long> &Param, const char *space = " ");
void split(const std::string param, std::vector<long long> &Param, const char *space = " ");
void split(const std::string param, std::vector<std::string> &Param, const char *space = " ");
void split(const std::string param, std::vector<char *> &Param, const char *space = " ");
void breaklog(const int line, const char *data);
void breaklog(const int line, const std::string data);
#ifdef TESTTYPE
template <typename T>
void whichTemplate(const char *name, T num)
{
	if (sizeof(T) == sizeof(double))
		fprintf(stderr, "%s double\n", name);
	else if (sizeof(T) == sizeof(int))
		fprintf(stderr, "%s int\n", name);
	else if (sizeof(T) == sizeof(std::string))
		fprintf(stderr, "%s std::string\n", name);
}
#endif
template <typename T>
void Parser(std::istream &input, const std::string words, char *read, const size_t line_len,
			std::vector<std::string> &fwords, std::map<std::string, std::vector<T>> &DATA, const char *space)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("Parser", num);
#endif
	/*	std::map< std::string,std::vector<double> >::iterator kk;
		for(kk=DATA.begin();kk!=DATA.end();++kk)
			DATA.erase(kk);*/
	DATA.clear();
	//By using istream and not ifstream we can pass cin as well file reference for input
	//Input format is;
	//			keyword
	//          data for keyword (possibly across several lines)
	//--------- indicates the end of the data.
	std::string line, keep;
	auto stop = false;
	std::vector<T> data;
	size_t count, len;
	auto addspace = false;
	while (!input.eof())
	{
		if (!stop)
			input.getline(read, line_len, '\n');
		stop = false;
		line = read;
		if (line.find("--------") != line.npos)
		{
			breaklog(__LINE__, line);
			break;
		}
		linefeedcheck(line);
		if (uniquekey(words, line))
		{
			addspace = false;
			fwords.push_back(line);
			keep = line;
			input.getline(read, line_len, '\n');
			count = input.gcount();
			len = strlen(read);
			if (len >= 4 && !strncmp(read, "----", 4))
			{
				breaklog(__LINE__, read);
				break;
			}
			addspace = count != len;
			line = read;
			linefeedcheck(line);
			while (!input.eof())
			{
				input.clear();
				input.getline(read, line_len, '\n');
				count = input.gcount();
				if (uniquekey(words, read))
				{
					stop = true;
					break;
				}
				else if ((len = strlen(read)))
				{
					if (len >= 4 && !strncmp(read, "----", 4))
					{
						breaklog(__LINE__, read);
						break;
					}
					if (addspace)
						line += space;
					line += read;
					linefeedcheck(line);
					addspace = count != len;
				}
			}
			//data.erase(data.begin(),data.end());
			data.clear();
			if(line.size()){
			split(line, data, space);
			//if(sizeof(T) == sizeof(double)){
			//	std::cout << "checking" << line << std::endl << data.size() << "  "<<data[data.size()-1] << std::endl;
			//}
			DATA[keep] = data;
			}else{
			//	std::cout<<"EMPTY"<<std::endl;
				DATA[keep] = data;
			}
		}
	}
}
template <typename T>
void Parser(const char *filename, const std::string words,char *read, const size_t line_len,
			std::vector<std::string> &fwords, std::map<std::string, std::vector<T>> &DATA, const char *space)
{
	std::ifstream infile;
	infile.open(filename);
	if (infile.is_open())
	{
		Parser(infile, words, read, line_len, fwords, DATA, space);
		infile.close();
	}
	else
		std::cout << "\x1b[1;1;31mCannot open file " << filename << "\x1b[0;m" << std::endl;
	infile.clear();
}

template <typename T>
T *getvector(std::map<std::string, std::vector<T>> &vecmap, const char *name, T *back = nullptr)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("getvector", num);
#endif
	auto pos = vecmap.find(name);
	if (pos != vecmap.end() && (matchstring(pos->first, name)))
		back = &pos->second.front();
	return back;
}
template <typename T>
void getvec(std::map< std::string,std::vector<T> > mapper,const std::string key,T*out)
{
	T*out1 = (T*)getvector<T>(mapper,key.c_str());
	for(size_t i=0;i<mapper[key].size();++i)
	{
		//printf("getvec i=%lu %f\n",i,out1[i]);
		out[i]=out1[i];
	}
}	
template <typename T>
T getvectorV(std::map<std::string, T> &vecmap, const std::string name)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("getvectorV", num);
#endif
	auto pos = vecmap.find(name);
	if (pos != vecmap.end() && (matchstring(pos->first, name)))
		return pos->second;
}
template <typename T,typename B>
B getscalar(std::map<std::string, std::vector<T>> &vecmap, const char *name)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("getscaler", num);
#endif
	auto pos = vecmap.find(name);
	if (pos != vecmap.end() && (matchstring(pos->first, name)))
		return (B)pos->second[0];
}
template <typename B>
B getscalar(std::map<std::string, std::vector<std::string>> &vecmap, const char *name)
{
#ifdef TESTTYPE
	std::string num;
	whichTemplate("getscaler", num);
#endif
	auto pos = vecmap.find(name);
	if (pos != vecmap.end() && (matchstring(pos->first, name)))
		return (B)atof(pos->second[0].c_str());
}
template <typename T>
T getfword(std::vector<T> &fword, const size_t icc)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("getfword", num);
#endif
	if (icc < fword.size())
	{
		return fword[icc];
	}
}
template <typename T>
void printfword(std::vector<T> &fword)
{
#ifdef TESTTYPE
	T num;
	whichTemplate("printfword", num);
#endif
	for(size_t i=0;i<fword.size();++i){
		std::cout << fword[i] << "\t";
		if(i%6==5)
			std::cout << std::endl;
	}
	std::cout << std::endl;
}
template <typename T>
class object_order
{
public:
	T val;
	size_t pos;
};
typedef bool (*FF)(const object_order<double> &x, const object_order<double> &y);
template <typename T>
size_t tran(object_order<T> &x)
{
	return x.pos;
}
template <typename T>
void getorder(size_t n, const std::vector<T> a, std::vector<size_t> &theorder, FF orderfunction)
{
	std::vector<object_order<T>> aa;
	object_order<T> pp;
	size_t i;
	for (i = 0; i < n; i++)
	{
		pp.val = a[i];
		pp.pos = i;
		aa.push_back(pp);
	}
	std::sort(aa.begin(), aa.end(), orderfunction);
	std::transform(aa.begin(), aa.end(), theorder.begin(), tran<T>);
}
template <typename T>
void Reorder(size_t n, std::vector<size_t> order, std::vector<T> &array, size_t m = 1)
{
	if (!array.size() || !order.size())
		return;
	size_t i;
	std::vector<bool> marked;
	marked.resize(n);
	for (i = 0; i < n; ++i)
		marked[i] = false;
	size_t j, k;
	for (i = 0; i < n; ++i)
	{
		if (!marked[i])
		{
			for (j = i, k = order[j]; k != i; k = order[j = k])
			{
				std::swap_ranges(&array[k * m], &array[(k + 1) * m], &array[j * m]);
				marked[k] = true;
			}
			marked[i] = true;
		}
	}
}
template <typename T>
void swap_sym(size_t n, T *S, size_t p, size_t q)
{
	T *Sp;
	T *Sq;
	size_t i;
	long j;
	if (!n || p == q)
		return; /*trivial cases*/

	/*ensure p<q*/
	if (++p > ++q)
		std::swap(p, q);

	/*swap rows p and q columns 1..p-1*/
	Sp = S + (p * (i = ((long)p - 1))) / 2; /*Sp points to S(p,1)*/
	Sq = S + (q * (j = ((long)q - 1))) / 2; /*Sq points to S(q,1)*/
	std::swap_ranges(&Sp[0], &Sp[i], &Sq[0]);

	/*swap columns p and q rows q+1 .. n*/
	Sp += i;			   /*Sp points to S(p,p)*/
	Sq += j;			   /*Sq points to S(q,q)*/
	j = (long)p - (long)q; /*negative*/
	for (i = q, S = Sq; i < n; i++)
	{
		S += i; /*S points to S(i+1,q)*/
		std::swap(S[0], S[j]);
	}

	std::swap(*Sp, *Sq); /*diagonal elements*/

	/*now swap elements (p+i,p) with elements (q,q-i) i=1,..,q-p-1*/
	Sp = Sq-- + j;
	while (--q > p)
	{
		Sp -= q;
		std::swap(*Sp, *Sq);
		Sq--;
	}
}
template <typename T>
void Reorder_sym(size_t n, std::vector<size_t> order, std::vector<T> &array)
{
	if (!array.size() || !order.size())
		return;
	size_t i;
	std::vector<bool> marked;
	size_t j, k;
	marked.resize(n);
	for (i = 0; i < n; ++i)
		marked[i] = false;
	for (i = 0; i < n; i++)
	{
		if (!marked[i])
		{
			for (j = i, k = order[j]; k != i; k = order[j = k])
			{
				swap_sym(n, &array[0], j, k);
				marked[k] = true;
			}
			marked[i] = true;
		}
	}
}
template <typename T>
void dumpvector(size_t n, const char *name, T *A, std::ofstream &file)
{
	file << name << std::endl;
	file.precision(17);
	if (A && (n > 0))
	{
		while (n--)
		{
			if (n)
				file << *A++ << " ";
			else
				file << *A++;
		}
	}
	file << std::endl;
}
template <typename T>
void dumpvector(size_t n, const char *name, std::vector<T> &A, std::ofstream &file)
{
	file << name << std::endl;
	file.precision(17);
	size_t i = 0;
	if (A.size() && (n > 0))
	{
		while (n--)
		{
			if (n)
				file << A[i++] << " ";
			else
				file << A[i++];
		}
	}
	file << std::endl;
}
template <typename T>
void dumpvector(size_t n, const char *name, T *A, std::ofstream &file, size_t lim)
{
	file << name << std::endl;
	file.precision(17);
	size_t i = 0;
	bool end = true;
	if (A && (n > 0))
	{
		while (n--)
		{
			end = false;
			if (i++ % lim == (lim - 1))
				end = true;
			if (n && !end)
				file << *(A++) << " ";
			else
				file << *(A++);
			if (end)
				file << std::endl;
		}
	}
	file << std::endl;
}
template <typename T>
void dumpvectorf(size_t n, const char *name, T *A, const char *filename, size_t ll)
{
	std::ofstream infile;
	infile.open(filename, std::ofstream::app);
	if (ll)
		libdata::dumpvector(n, name, A, infile, ll);
	else
		libdata::dumpvector(n, name, A, infile);
	infile.close();
	infile.clear();
}
} // namespace libdata
