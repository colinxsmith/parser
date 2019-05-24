#include<libdata.h>
namespace libdata
{
	double minw(size_t n,double* w)
	{
		if(n)
		{
			double back=*w++;
			n--;
			while(n--)
			{
				if(*w < back) {back=*w;}
				w++;
			}
			return back;
		}
		else
			return *w;
	}
	void get_weight_order(size_t n,double* w,double* MCTR,double* order)
	{
		size_t i;
		double size_m=-1,size_w=1,trans;
		for(i=0;i<n;++i)
		{
			if(fabs(MCTR[i])>size_m)
				size_m=MCTR[i];
			if(w[i]!=0&&fabs(w[i])<size_w)
				size_w=w[i];
		}
		trans=1e-1*size_w/size_m;
		for(i=0;i<n;++i)
		{
			if(w[i]==0)
				order[i]=fabs(MCTR[i])*trans;
			else
				order[i]=w[i];
		}
	}
	void printx(size_t n,double* a)
	{
		if(n)
		{
			size_t i=0;
			std::cout.precision(17);
			while(n--)
			{
				std::cout<<*a++<<" ";
				if(i++%5==4)std::cout<<std::endl;
			}
			std::cout<<std::endl;
		}
	}
	void linefeedcheck(std::string& t)
	{
		/*	This lets us use a dos format file on unix	*/
		auto i=t.find('\r');
		if(i!=t.npos)
			t.erase(i);
	}
	bool matchnumber(char a)
	{
		auto tt=(int)(a-'0');
		return (a=='-'||a=='+'||(tt<=9&&tt>=0));
	}
	bool matchnumber(const char*a)
	{
		return a&&matchnumber(*a);
	}
	bool matchstring(const char*a,const char*b)
	{
		return std::strcmp(a,b)==0;
	}
	bool matchstring(const char*a,const std::string b)
	{
		return matchstring(a,b.c_str());
	}
	bool matchstring(const std::string a,const char*b)
	{
		return matchstring(b,a);
	}
	bool matchstring(const std::string a,const std::string b)
	{
		return matchstring(a,b.c_str());
	}
	bool uniquekey(const std::string words,const char* key,const char* space)
	{
		auto ipos=words.find(key);
		auto ipos1=(size_t)0;
		if(ipos!=words.npos)
			ipos1=std::string(words,ipos,words.size()-ipos).find(" ");
		if(ipos1==words.npos)
			return matchstring(std::string(words,ipos,words.size()-ipos),key);
		else
			return (ipos!=words.npos&&ipos1==strlen(key));
	}
	bool uniquekey(const std::string words,const std::string key,const char* space)
	{
		return uniquekey(words,key.c_str(),space);
	}
	void split(const std::string param,std::vector<double>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(atof(std::string(pp,ic,is-ic).c_str()));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size())
			Param.push_back(atof(std::string(pp,ic).c_str()));
	}
	void split(const std::string param,std::vector<int>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(atoi(std::string(pp,ic,is-ic).c_str()));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size())
			Param.push_back(atoi(std::string(pp,ic).c_str()));
	}
	void split(const std::string param,std::vector<long>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(atol(std::string(pp,ic,is-ic).c_str()));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size())
			Param.push_back(atol(std::string(pp,ic).c_str()));
	}
	void split(const std::string param,std::vector<long long>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(atoll(std::string(pp,ic,is-ic).c_str()));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size())
			Param.push_back(atoll(std::string(pp,ic).c_str()));
	}
	void split(const std::string param,std::vector<std::string>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
//		std::cout << "NO SPACE AT END " << pp << std::endl;
 		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(std::string(pp,ic,is-ic));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size()){
			Param.push_back(std::string(pp,ic));
		//	std::cout << "LAST "<<Param[Param.size()-1]<<std::endl;
		}
	}
	void split(const std::string param,std::vector<char*>&Param,const char* space)
	{
		if(param.size()==0) return;
		auto sl=strlen(space);
		auto pp=param;
		auto isp=pp.find(space);
		while(isp==0)//Get rid of spaces at start of line
		{
			pp=std::string(pp,isp+1);
			isp=pp.find(space);
		}
		auto rsp=pp.rfind(space);
		while(rsp==pp.size())//Get rid of spaces at end of line
		{
			pp=std::string(pp,0,rsp-2);
			rsp=pp.rfind(space);
		}
		auto is=pp.find(space);
		auto ic=is;
		ic=0;
		while(is!=pp.npos)
		{
			Param.push_back(strdup(std::string(pp,ic,is-ic).c_str()));
			ic=is+sl;
			is=pp.find(space,ic);
		}
		if(ic<pp.size())
			Param.push_back(strdup(std::string(pp,ic).c_str()));
	}
	void breaklog(const int line,const char*data)
	{
		std::cout<<"\x1b[1;1;36mBreak at "<<line<<" "<< data<<"\x1b[0;m"<< std::endl;
	}
	void breaklog(const int line,const std::string data)
	{
		breaklog(line,data.c_str());
	}
}
