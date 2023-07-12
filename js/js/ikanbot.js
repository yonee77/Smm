var 二级=`js:
try {
    VOD={};
	let html1 = request(input);
	pdfh = jsp.pdfh;
	VOD.vod_id = pdfh(html1, "#current_id&&value");
	VOD.vod_name = pdfh(html1, "h2&&Text");
	VOD.vod_pic = pdfh(html1, ".item-root&&img&&src");
	VOD.vod_actor = pdfh(html1, ".celebrity&&Text");
	VOD.vod_area = pdfh(html1, ".country&&Text");
	VOD.vod_year = pdfh(html1, ".year&&Text");
	VOD.vod_remarks = "";
	VOD.vod_director = "";
	VOD.vod_content = "";
	log(VOD);
	input = "https://www.ikanbot.com/api/getResN?videoId=" + input.split("/").pop() + "&mtype=2";
	let html = request(input);
	print(html);
	html = JSON.parse(html);
	let episodes = html.data.list;
	let playMap = {};
	if (typeof play_url === "undefined") {
		var play_url = ""
	}
	episodes.forEach(function(ep) {
		let playurls = JSON.parse(ep["resData"]);
		playurls.forEach(function(playurl) {
			let source = playurl["flag"];
			if (!playMap.hasOwnProperty(source)) {
				playMap[source] = []
			}
			playMap[source].push(playurl["url"])
		})
	});
	let playFrom = [];
	let playList = [];
	Object.keys(playMap).forEach(function(key) {
		playFrom.append(key);
		playList.append(playMap[key])
	});
	let vod_play_from = playFrom.join("$$$");
	let vod_play_url = playList.join("$$$");
	VOD["vod_play_from"] = vod_play_from;
	VOD["vod_play_url"] = vod_play_url;
	log(VOD);
} catch (e) {
	log("获取二级详情页发生错误:" + e.message)
}
`;

var rule = {
    title:'爱看机器人',
    host:'https://www.ikanbot.com',
    url:'/hot/index-fyclass-热门-p-fypage.html[/hot/index-fyclass-热门.html]',
    //https://www.ikanbot.com/search?q=%E6%96%97%E7%BD%97%E5%A4%A7&p=2
    searchUrl:'/search?q=**&p=fypage',
    searchable:2,
    quickSearch:0,
    filterable:0,
    headers:{'User-Agent':'MOBILE_UA',},
    class_name:'电影&剧集',
    class_url:'movie&tv',
	play_parse:true,
	double:true,
    推荐:'.v-list;div.item;*;*;*;*', //这里可以为空，这样点播不会有内容
    一级:'.v-list&&div.item;p&&Text;img&&src;;a&&href', //一级的内容是推荐或者点播时候的一级匹配
    二级:二级,
    搜索:'#search-result&&.media;h5&&a&&Text;a&&img&&src;.label&&Text;a&&href',//第三个是描述，一般显示更新或者完结
}