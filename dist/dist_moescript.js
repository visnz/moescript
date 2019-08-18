// ==UserScript==
// @name         猫国建设者网页插件(随便测试版)
// @namespace    https://github.com/visnz/moescript
// @version      0.1
// @author       visnz
// @match        https://likexia.gitee.io/cat-zh/*
// 
//  因为使用了中文作为函数名，在脚本这边只使用经过优化处理的js代码。
//  源码可以直接访问上方 @namespace 地址
// 
// ==/UserScript==

(function(){function c(b){$("#moescriptlog").prepend('<span class="msg"> [ '+Date().split(" ")[4]+" ] "+b+"</span>")}var d=[{panel:"\u57fa\u672c",list:[{DisplayName:"\u62ac\u5934\u770b\u5929\u7a7a",timer:15E3},{DisplayName:"\u81ea\u52a8\u6253\u730e"},{DisplayName:"\u8d5e\u7f8e\u592a\u9633"},{DisplayName:"\u7ba1\u7406Jobs",timer:36E5},{DisplayName:"\u5c0f\u732b\u5347\u804c\u5668",timer:36E5}]},{panel:"\u5408\u6210",list:[{DisplayName:"\u5408\u6210\u6728\u6750"},{DisplayName:"\u5408\u6210\u94a2"},{DisplayName:"\u5408\u6210\u6728\u6881"},
{DisplayName:"\u5408\u6210\u77f3\u677f"},{DisplayName:"\u5408\u6210\u91d1\u5c5e\u677f"},{DisplayName:"\u5408\u6210\u9f7f\u8f6e"},{DisplayName:"\u5408\u6210\u811a\u624b\u67b6"},{DisplayName:"\u5408\u6210\u8239"},{DisplayName:"\u5408\u6210\u7f8a\u76ae\u7eb8"},{DisplayName:"\u5408\u6210\u624b\u7a3f"},{DisplayName:"\u5408\u6210\u6982\u8981"},{DisplayName:"\u5408\u6210\u84dd\u56fe"},{DisplayName:"\u5408\u6210\u5de8\u77f3"}]},{panel:"\u98de\u5929",list:[{DisplayName:"\u4f4e\u901f\u5361\u673a\u5228\u6728\u6cd5",
timer:1E3},{DisplayName:"\u4e2d\u901f\u5361\u673a\u5228\u6728\u6cd5",timer:1E3},{DisplayName:"\u9ad8\u901f\u5361\u673a\u5228\u6728\u6cd5",timer:1E3},{DisplayName:"\u4e94\u5206\u949f\u4e2d\u901f\u5228",timer:1E3}]}];$("#rightColumn").prepend('<div><div style="display:flex;flex-wrap:wrap">'+d.map(function(b){return'<input id="'+b.panel+'\u6309\u94ae" type="button" style="display:inline" value="'+b.panel+'">'}).reduce(function(b,a){return b+a})+'<input id="\u5168\u81ea\u52a8\u5173" type="button"  style="display:inline" value="\u5168\u90e8\u5173\u95ed"><span><input id="\u7acb\u9a6c\u6267\u884c" type="checkbox"  style="display:inline" checked><span>\u7acb\u9a6c\u6267\u884c</span></span></div>'+
d.map(function(b){return'<div id="'+b.panel+'" style="display:none";><div style="display:flex;flex-wrap:wrap">'+b.list.map(function(a){return'<span style="white-space:nowrap;"><input class="moescript" id="'+a.DisplayName+'" type="checkbox" style="display:inline"><span>'+a.DisplayName+"</span></span>"}).reduce(function(a,b){return a+b})+"</div></div>"}).reduce(function(b,a){return b+a})+'<div><div id="moescriptlog"style="min-height:300px;max-height:300px;overflow:auto;"></div></div></div>');d.map(function(b){b.list.map(function(a){null==
a.timer&&(a.timer=6E4);null==a.scriptFunc&&(a.scriptFunc=function(){return eval(a.DisplayName+"()")});$("#"+a.DisplayName).click(function(b){b.currentTarget.checked?(c("[\u811a\u672c\u5efa\u7acb] "+a.DisplayName+" \u95f4\u9694:"+(a.timer/1E3).toFixed(2)+"\u79d2"),a.AutoID=setInterval(function(){a.scriptFunc();c("[__\u81ea\u52a8__] "+a.DisplayName)},a.timer),$("#\u7acb\u9a6c\u6267\u884c")[0].checked&&(a.scriptFunc(),c("[____\u7acb\u9a6c] "+a.DisplayName+"(\u0e07 \u2022\u0300_\u2022\u0301)\u0e07"))):
(clearInterval(a.AutoID),c("[\u811a\u672c\u6e05\u9664] "+a.DisplayName))})})});d.map(function(b){$("#"+b.panel+"\u6309\u94ae").click(function(a){$("#"+b.panel).attr("style","display:"+("display:block"==$("#"+b.panel).attr("style")?"none":"block"))})});$("#\u5168\u81ea\u52a8\u5173").click(function(b){d.map(function(a){return a.list.map(function(a){return clearInterval(a.AutoID)})});$(".moescript").each(function(a,b){$("#"+b.id)[0].checked=!1});c("\u6e05\u9664\u4e86\u6240\u6709\u811a\u672c")})})();
