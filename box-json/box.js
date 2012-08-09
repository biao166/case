//By ImMmMm.com
jQuery(document).ready(function($){
$("#itemname a").click(function(){
	$('#itemb').hide(100).empty();
	var rss= "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q="+this.href+"/rss.xml&num=100&callback=?";
	$.getJSON(rss,function(json){
		$(json.responseData.feed.entries).each(function(i,dt){
			var title=dt.title,link=dt.link,cont=dt.content;
			var src="images/document.gif"
			var newlink=link.replace("box","boxcn")
			$('#itemb').append("<div class='itemb'><div class='thumbb'><a href='"+newlink+"' title=''><img src='"+src+"'></a></div><div class='file'><div class='name'><a href='"+newlink+"' title=''>"+title+"</a></div><div class='info'>"+cont+"</div></div></div>");
		});
		$('#itemb').slideDown(300);
	});
	return false;
});
	$(".neme a")
});