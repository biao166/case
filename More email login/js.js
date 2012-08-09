function $(id) {
	return !id ? null : document.getElementById(id);
}

var charset = 'utf-8',
	mF = $('mailForm'),
	mN = $('mailUserName'),
	mS = $('mailSelect'),
	mPW = $('mailPassWord'),
	mP = $('mailParas');

var mail = {
	m_ul:'',
	mailData:[
	{
		mail: "163",
		name: "@163.com",
		action: "http://reg.163.com/CheckUser.jsp",
		params: {
			url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&from=web&df=webmail163",
			username: "_username_",
			password: "_password_"
		}
	},{
		mail: "126",
		name: "@126.com",
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "126.com",
			username: "_username_@126.com",
			password: "_password_",
			url: "http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"
		}
	},{
		mail: "sina",
		name: "@sina.com",
		action: "http://mail.sina.com.cn/cgi-bin/login.cgi",
		params: {
			u: "_username_@sina.com",
			psw: "_password_"
		}
	},{
		mail: "yahoocomcn",
		name: "@yahoo.com.cn",
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "_username_@yahoo.com.cn",
			passwd: "_password_",
			domainss: "yahoo",
			".intl": "cn",
			".src": "ym"
		}
	},{
		mail: "yahoocn",
		name: "@yahoo.cn",
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "_username_@yahoo.cn",
			passwd: "_password_",
			domainss: "yahoocn",
			".intl": "cn",
			".done": "http://mail.cn.yahoo.com/inset.html"
		}
	},{
		mail: "sohu",
		name: "@sohu.com",
		action: "http://passport.sohu.com/login.jsp",
		params: {
			loginid: "_username_@sohu.com",
			passwd: "_password_",
			fl: "1",
			vr: "1|1",
			appid: "1000",
			ru: "http://login.mail.sohu.com/servlet/LoginServlet",
			ct: "1173080990",
			sg: "5082635c77272088ae7241ccdf7cf062"
		}
	},{
		mail: "yeah",
		name: "@yeah.net",
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "yeah.net",
			username: "_username_@yeah.net",
			password: "_password_",
			url: "http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"
		}
	},{
		mail: "139",
		name: "@139.com",
		action: "https://mail.10086.cn/Login/Login.ashx",
		params: {
			UserName: "_username_",
			Password: "_password_",
			clientid: "5015"
		}
	},{
		mail: "tom",
		name: "@tom.com",
		action: "http://login.mail.tom.com/cgi/login",
		params: {
			user: "_username_",
			pass: "_password_"
		}
	},{
		mail: "21cn",
		name: "@21cn.com",
		action: "http://passport.21cn.com/maillogin.jsp",
		params: {
			UserName: "_username_@21cn.com",
			passwd: "_password_",
			domainname: "21cn.com"
		}
	},{
		mail: "renren",
		name: "\u4eba\u4eba\u7f51",
		action: "http://passport.renren.com/PLogin.do",
		params: {
			email: "_username_",
			password: "_password_",
			origURL: "http://www.renren.com/Home.do",
			domain: "renren.com"
		}
	},{
		mail: "baidu",
		name: "\u767b\u5f55\u767e\u5ea6",
		action: "https://passport.baidu.com/?login",
		params: {
			u: "http://passport.baidu.com/center",
			username: "_username_",
			password: "_password_"
		}
	},{
		mail: "51",
		name: "51.com",
		action: "http://passport.51.com/login.5p",
		params: {
			passport_51_user: "_username_",
			passport_51_password: "_password_",
			gourl: "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"
		}
	}],
	directlogin:[{
		src: "https://www.alipay.com/user/login.htm",
		name: "支付宝"
	},{
		src: "http://mail.qq.com",
		name: "@qq.com"
	},{
		src: "http://qzone.qq.com/index.html",
		name: "QQ空间"
	},{
		src: "http://web2.qq.com",
		name: "webqq"
	},{
		src: "http://weibo.com/login.php",
		name: "新浪微博"
	},{
		src: "http://mail.google.com/mail/",
		name: "@gmail.com"
	},{
		src: "http://www.hotmail.com",
		name: "@hotmail.com"
	},{
		src: "http://www.kaixin001.com",
		name: "开心网"
	},],
	
	bind:function(event){
		event = event || window.event;
		return target = event.target || event.srcElement;
	},
	
	contains:function(a, b){
		return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
	},
	
	trim:function(str){
		return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
	},
	
	mb_cutstr:function(str, maxlen, dot){
		var len = 0;
		var ret = '';
		var dot = !dot ? '...' : '';
		maxlen = maxlen - dot.length;
		for(var i = 0; i < str.length; i++) {
			len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
			if(len > maxlen) {
				ret += dot;
				break;
			}
			ret += str.substr(i, 1);
		}
		return ret;
	},
	
	fetchOffset:function(obj, mode){
		var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;
		if(obj.getBoundingClientRect && !mode) {
			var rect = obj.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			if(document.documentElement.dir == 'rtl') {
				scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
			}
			left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
			top_offset = rect.top + scrollTop - document.documentElement.clientTop;
		}
		if(left_offset <= 0 || top_offset <= 0) {
			left_offset = obj.offsetLeft;
			top_offset = obj.offsetTop;
			while((obj = obj.offsetParent) != null) {
				position = getCurrentStyle(obj, 'position', 'position');
				if(position == 'relative') {
					continue;
				}
				left_offset += obj.offsetLeft;
				top_offset += obj.offsetTop;
			}
		}
		return {'left' : left_offset, 'top' : top_offset};
	},

	init:function(){
		var md = mail.mailData;
		var _ul = document.createElement("ul");
			_ul.className = "box-mail_layer";
			_ul.style.display = 'none';
		var _html = [];
		for(var i=0; i < md.length; i++){
			_html.push('<li data-n='+ i +' class="">'+md[i]['name']+'</li>');
		}
		_html.push('<li class="no">以下弹出登录</li>');
		for(key in mail.directlogin){
			_html.push('<li><a target="_blank" href="'+mail.directlogin[key].src+'">'+mail.directlogin[key].name+'</a></li>');
		}
		_ul.innerHTML = _html.join("");
		document.body.appendChild(_ul);
		mail.m_ul = _ul;
		mS.innerHTML = mail.mailData[0].name;
		mS.setAttribute("data-n", 0);
		mF.action = mail.mailData[0].action;
	},
	
	event:function(){
		mS.onmousedown = function(){
			this.className += " box-mail_select_click";
			mail.m_ul.style.display = "";
			mail.m_ul.style.top = mail.fetchOffset(this).top + 20 + "px";
			mail.m_ul.style.left = mail.fetchOffset(this).left - 1 + "px";
		}
		mS.onmouseup = function(){
			this.className = this.className.replace(/ box-mail_select_click/, '');
		}
		mail.m_ul.onmouseup = function(event){
			target = mail.bind(event);
			var _this = target.parentNode.tagName === "LI" ? target.parentNode : target;
			if (k = _this.getAttribute("data-n")) {
				mS.innerHTML = mail.mb_cutstr(_this.innerHTML, 12);
				mS.setAttribute("data-n", k);
				mF.action = mail.mailData[k].action;
			}
			mail.m_ul.style.display = "none";
		}
		
		mail.m_ul.onmouseover = function(event){
			target = mail.bind(event);
			var _this = target.parentNode.tagName === "LI" ? target.parentNode : target;
			_this.className += " hover";
		}
		mail.m_ul.onmouseout = function(event){
			target = mail.bind(event);
			var _this = target.parentNode.tagName === "LI" ? target.parentNode : target;
			_this.className = _this.className.replace(/ hover/, '');
		}
		
		document.body.onmousedown = function(event){
			target = mail.bind(event);
			if (!mail.m_ul.style.display && target !== mS && !mail.contains(mS, target) && !mail.contains(mail.m_ul, target)){
				mail.m_ul.style.display = "none";
			}
		}
		
		mF.onsubmit = function(){
			var un = mail.trim(mN.value);
			var pw = mail.trim(mPW.value);
			if(!un){
				alert("\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1\u8d26\u53f7\uff0c\u767b\u5f55\u60a8\u7684\u90ae\u7bb1");
				return false;
			}
			if(!pw){
				alert("\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1\u5bc6\u7801\uff0c\u767b\u5f55\u60a8\u7684\u90ae\u7bb1");
				return false;
			}
			var _html = [];
			var k = mS.getAttribute("data-n");
			var P = mail.mailData[k].params;
			for(key in P){
				_html.push('<input type="hidden" name="'+key+'" value="'+P[key].replace(/_username_/,un).replace(/_password_/,pw)+'">');
			}
			mP.innerHTML = _html.join("");
		}
	}
};

window.onload = function(){
	mail.init();
	mail.event();
}