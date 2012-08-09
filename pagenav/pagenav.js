/**
 * [PageNav description]
 * @container
 * @perNumber
 * @totalNumber
 * @callBack
 */
function PageNav(args){
	this.container = args.container;
	this.perNumber = args.perNumber,
	this.totalNumber = args.totalNumber;
	this.totalPage = Math.ceil(this.totalNumber/this.perNumber);
	this.callBack = args.callBack;
	this.cCount = 2;
	this.curPage = 1;
	this.init();
}
PageNav.prototype = {
	constructor: PageNav,
	setPage : function(){
		var outstr = '';
		if(this.curPage == 1){
			outstr = outstr + "<a class='pre disabled' href='javascript:void(0)'>&laquo;</a>";
		}
		if(this.curPage > 1){
			var pre = this.curPage - 1;
			outstr = outstr + this.setHtml(pre, '&laquo;');
		}
		if(this.curPage > this.cCount + 1){
			outstr = outstr + this.setHtml(1, 1);
		}
		if(this.curPage > this.cCount + 2){
			outstr = outstr +  "<span>...</span>";
		}
		for( var i = this.curPage - this.cCount; i <= this.curPage + this.cCount; i++ ) {
			if ( i > 0 && i <= this.totalPage ){
				 outstr = outstr +　(i == this.curPage ? "<strong class='current'>" + i + "</strong>" : this.setHtml(i, i));
			}
		}
		if(this.curPage < this.totalPage - this.cCount - 1){
			outstr = outstr + "<span>...</span>";
		}
		if(this.curPage < this.totalPage - this.cCount){
			outstr = outstr + this.setHtml(this.totalPage, this.totalPage);
		}
		if(this.curPage < this.totalPage){
			var nxt = this.curPage + 1;
			outstr = outstr + this.setHtml(nxt, '&raquo;');
		}
		if(this.curPage == this.totalPage){
			outstr = outstr + "<a class='nxt disabled' href='javascript:void(0)'>&raquo;</a>";
		}
		this.container.html(outstr);
		this.bind();
		return this;
	},
	bind: function(){
		var self = this;
		this.container.find('a[data-page]').click(function(){
			var page = parseInt($(this).attr("data-page"));
			self.gotoPage(page);
			self.callBack(page);
		});
	},
	setHtml : function(page, text){
		return '<a data-page="'+ page +'" href="javascript:void(0)" title="第'+ page +'页">'+ text +'</a>';
	},
	gotoPage : function(page){
		this.curPage = parseInt(page);
		this.setPage();
	},
	init: function(){
		if(this.container&&this.perNumber&&this.totalNumber){
			this.setPage();
		}
	}
}