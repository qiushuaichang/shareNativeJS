/* version 1.0 */
var SoloRTB = new Object();
SoloRTB.mopubError=function() {
    window.location.href = "mopub://failLoad";
}
function htmlWillCallFinishLoad(){
    if(typeof(mopubFinishLoad) =='function' ) { mopubFinishLoad(); }
}
SoloRTB.IsiOS =function(){
    try{
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS
    }catch(e){
        return false;
    }
}
SoloRTB.AndroidVersion=function(){
    try{
        var ua = navigator.userAgent.toLowerCase();
        var version = "7.0.0";
        if (ua.indexOf("android") > 0) {
            var reg = /android [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
           
        }
        return version;
    }catch(e){
        return "7.0.0";
    }
}
SoloRTB.iOSVersion=function(){
    try{
        var ua = navigator.userAgent.toLowerCase();
        var version = "11.3";
        if (ua.indexOf("like mac os x") > 0) {
            var reg = /os [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); 
        }
        return version;
    }catch(e){
        return "11.3";
    }
}
SoloRTB.mopubFinished=function() {
    try{
        if (SoloRTB.sysConf["mopubImp"] != undefined) {
            eval(SoloRTB.sysConf['mopubImp']);
        }
       
        if (typeof(trackImpressionHelper) == "function") {
            trackImpressionHelper();
        }
         htmlWillCallFinishLoad();
    }catch(e){
        // console.log(e);
        SoloRTB.mopubError();
    }

}
SoloRTB.GET=function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//SoloRTB.conf = '{"pv": 4,"source":"3","from": 1,"tmax":{TMAX},"publisher_id":"{PUBLIHSER_ID}", "timestamp": "","imp":{"slot_id":"{SLOTID}","ad_type":{ADTYPE},"amount":{ADCOUNT},"w":{ADW},"h":{ADH},"bidfloor":{BIDFLOOR}},"app":{"id":"{APPID}","name":"{APPNAME}","ver":"{APPVER}","bundle":"{BUNDLE}","keywords":""},  "device":{"geo":{"lat":{LAT},"lon":{LON},"mcc":"","mnc":"","carrier":"","ispcode":""},"screen":{"dpi":{SCREENDPI},"w":{SCREENWIDTH},"h":{SCREENHEIGHT},"orientation":1,"density":0},"tzone":"","idfa":"{IDFA}","idfv":"","limit":false,"mac":"","imei":"","aid":"{AID}","gaid":"{GAID}","carrier":"","lang":"{LANG}","brand":"","sdkv":"","gp":0,"pf":1,"osv":"{OSV}","nt":{NT},"ijb":0}}';
SoloRTB.conf = '({"pv": 4,"source":"3","from": 1,"tmax":0,"publisher_id":"5518", "timestamp": "","imp":{"slot_id":"1007674","ad_type":4,"amount":1,"w":230,"h":50,"bidfloor":0.0},"app":{"id":"0","name":"","ver":"","bundle":"","keywords":""},  "device":{"geo":{"lat":0.0,"lon":0.0,"mcc":"","mnc":"","carrier":"","ispcode":""},"screen":{"dpi":0,"w":0,"h":0,"orientation":1,"density":0},"tzone":"","idfa":"","idfv":"","limit":false,"mac":"","imei":"","aid":"","gaid":"","carrier":"","lang":"","brand":"","sdkv":"","gp":0,"pf":1,"osv":"1","nt":0,"dnt":0,"ijb":0}})';
SoloRTB.CreateXMLHttpReques = function() {
    var xhReq = new XMLHttpRequest();
    return xhReq;
}
SoloRTB.HeaderStatus = function(a, b, c) {
    // console.log(a, b, c);
}
SoloRTB.V3API =  "http://r1.snnd.co/v3/sdk-api?adx=3";

SoloRTB.Request = function(paramConf) {
    try {
        if(typeof(trackImpressionHelper) == 'function' ){
            paramConf['mopubImp'] = trackImpressionHelper.toString();
            trackImpressionHelper = "xx";
        }
        SoloRTB.sysConf = paramConf;
        SoloRTB.box =paramConf['box'];
       

        var xmlobj = SoloRTB.CreateXMLHttpReques();
        xmlobj.open("POST",SoloRTB.V3API, true);
        xmlobj.responseType = "json";
        xmlobj.setRequestHeader("X-Real-Ip", paramConf["ip"] == undefined ? "" : paramConf["ip"]);
        xmlobj.onerror = function() {
            SoloRTB.mopubError();
        }
        xmlobj.onreadystatechange = function() {
            switch (xmlobj.readyState) {
                case XMLHttpRequest.DONE:
                    SoloRTB.statusChange(xmlobj, xmlobj.response);
                    //成功返回之后，给 body添加事件监听
                    document.getElementsByTagName('body')[0].addEventListener("click",function(event){
                        var mediaFormat = null;
                        if(xmlobj.response.ads.length>0 && xmlobj.response.ads[0].native != undefined) {
                            mediaFormat = xmlobj.response.ads[0].native.cturl
                        }else if(xmlobj.response.ads.length>0 && xmlobj.response.ads[0].richmedia != undefined) {
                            mediaFormat = xmlobj.response.ads[0].richmedia.cturl
                        }
                        if(mediaFormat.length>0 && mediaFormat != undefined){
                            for(var i=0;i<mediaFormat.length;i++){
                                var tagIframe = document.createElement("iframe")
                                tagIframe.src = mediaFormat[i]
                                tagIframe.style = "width:1px;height:1px;display:none;"
                                this.appendChild(tagIframe)
                            }
                        }
                    },false)
                    break;
            }
        };
    
        var conf = eval(SoloRTB.conf);
        if(paramConf['solopubid'] && parseInt(paramConf['solopubid'])){
            conf['publisher_id']=paramConf['solopubid'];
        }
        if(paramConf['soloslotid'] && parseInt(paramConf['soloslotid'])){
            conf['imp']['slot_id']=paramConf['soloslotid'];
        }
        conf['app']['bundle'] = paramConf['bundle'];
        if(window && window.screen){
            conf['device']['screen']['dpi'] = window.devicePixelRatio;
            conf['device']['screen']['w'] = window.screen.width;
            conf['device']['screen']['h'] = window.screen.height;
            if(typeof(window.screen) !='undefined' && typeof(window.screen.orientation) !='undefined'  && typeof(window.screen.orientation.type)!='undefined'){
                conf['device']['screen']['orientation'] = window.screen.orientation.type == "" ? 1 : 0;
            }else{
                conf['device']['screen']['orientation'] = 0;
            }
        }
        if(parseFloat(paramConf['lat']) && parseFloat(paramConf['lon'])){
            ///conf['device']['geo']
            conf['device']['geo']['lat'] = parseFloat(paramConf['lat']);
            conf['device']['geo']['lon'] = parseFloat(paramConf['lon']);
        }
        conf['device']['aid'] = conf['device']['gaid'] = conf['device']['idfa'] = paramConf['deviceid'];
        if(paramConf['dnt'] && parseInt(paramConf['dnt'])){
            conf['device']['dnt']  = parseInt(paramConf['dnt']);
        }else{
            conf['device']['dnt'] = 0;
        }
        if(paramConf['pf'] && parseInt(paramConf['pf'])){
            conf['device']['pf'] = parseInt(paramConf['pf']);
        }else{
            if(SoloRTB.IsiOS()) {
                conf['device']['pf']=0;
            }else{
                conf['device']['pf']=1;
            }
        }
        if( conf['device']['pf'] === 0){
            conf['device']['osv'] = SoloRTB.iOSVersion();
        }else{
            conf['device']['osv'] = SoloRTB.AndroidVersion();
        }
        if(paramConf['adtype']){
            conf['imp']['ad_type'] = parseInt(paramConf['adtype']);
        }
        if(paramConf['bidfloor'] && parseFloat(paramConf['bidfloor'])){
            conf['imp']['bidfloor'] = parseFloat(paramConf['bidfloor']);
        }
        if(paramConf['adw'] && paramConf['adh']){
            conf['imp']['w'] = parseInt(paramConf['adw']);
            conf['imp']['h'] = parseInt(paramConf['adh']);
        }
        if(paramConf['tmax'] &&  parseInt(paramConf['tmax'])){
            conf['tmax'] = parseInt(paramConf['tmax']);
        }

    var img = document.createElement("img");
        img.src="http://r1.snnd.co/api/v1/jstag/test.jpg?publisher_id="+paramConf['solopubid']+"&adtype="+conf['imp']['ad_type']+"&t="+paramConf["cache"];
        img.style="display:none;margin-top:-100px;";
        SoloRTB.box.appendChild(img);
    
        // console.log(JSON.stringify(conf));
        xmlobj.send(JSON.stringify(conf));
    } catch (e) {
       // console.log(e);
       var img = document.createElement("img");
       img.src="http://r1.snnd.co/api/v1/jstag/test.jpg?publisher_id="+paramConf['solopubid']+"&t="+paramConf["cache"]+"&error="+e;
       document.body.appendChild(img);
       SoloRTB.mopubError(); //异常时终止广告
    }

}
// format native
SoloRTB.adFormatNative = function(adObject) {
    var context = '<div id="solo_ads" style="width:320px;height:50px;"><img src="' + adObject.native.icon_url;
    context += '"/>';
   
       // impression
    if(adObject.richmedia && adObject.richmedia.iturl){
        for (var i = 0, len = adObject.richmedia.iturl.length; i < len; i++) {
            context += '<iframe src="' + adObject.richmedia.iturl[i] + '" width=0 height=0 scrolling="no" style="display:none"></iframe>';
        }
    }
    context += '</div>';
    if(adObject.richmedia && adObject.richmedia.cturl ){
        for (var j = 0, len = adObject.richmedia.cturl.length; j < len; j++) {
            //    click_urls[j] = adObject.native.cturl[j]
            context += "<a href='" + adObject.richmedia.cturl[j] + "'></a>";
        }
    }
    context += "<a href='" + SoloRTB.sysConf["clickurl"] + "'></a>";
    return context;
}
function runInnerHTMLScript(box) {
    var scripts = Array.prototype.slice.call(box.getElementsByTagName("script"));
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src != "") {
            var tag = document.createElement("script");
            tag.src = scripts[i].src;
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
        else {
            eval(scripts[i].innerHTML);
        }
    }
}
// format RichMedia
SoloRTB.adFormatRichMedia = function(adObject) {
    try{
        var bg = "";
        if(adObject.richmedia && adObject.richmedia.bg_url){
            bg = adObject.richmedia.bg_url;
        }
        // console.log(JSON.stringify(SoloRTB.sysConf));
        var w = SoloRTB.sysConf['adw'];
        var h = SoloRTB.sysConf['adh'];
        var body = document.getElementsByTagName('body')[0];
        body.style = "margin:0;padding:0;background-image: url('"+bg+"');background-size: 100%;";
        var context ="<div style='display:none;'>";
        // impression
        if(adObject.richmedia && adObject.richmedia.iturl){
            for (var i = 0, len = adObject.richmedia.iturl.length; i < len; i++) {
                context += '<img src="' + adObject.richmedia.iturl[i]  + '" width=1 height=1 style="display:none">';
            }
        }
        if(adObject.richmedia && adObject.richmedia.cturl ){
            for (var j = 0, len = adObject.richmedia.cturl.length; j < len; j++) {
                context += "<a href='" + adObject.richmedia.cturl[j] + "'></a>";
            }
        }
        var a = document.createElement("a");
        a.src=SoloRTB.sysConf["clickurl"];
        //SoloRTB.box.appendChild(a);
        context += "<a href='" + SoloRTB.sysConf["clickurl"] + "'></a></div>";
        context += "<div style=\"padding:0;margin:0;width:"+w+"px;height:"+h+"px;\" >"+adObject.richmedia.ad+"</div>";
        return context;
    }catch(e){
        // console.log(e);
        SoloRTB.mopubError();
    }

}

SoloRTB.callback = function(adObject) {
    if (adObject.native != undefined) {
        SoloRTB.box.innerHTML = SoloRTB.adFormatNative(adObject);
        SoloRTB.mopubFinished();
        return;
    }
    if (adObject.richmedia != undefined) {
        SoloRTB.box.innerHTML = SoloRTB.adFormatRichMedia(adObject);
        runInnerHTMLScript(SoloRTB.box);
        // console.log(SoloRTB.box.innerHTML);
        SoloRTB.mopubFinished();
        return;
    }
    this.mopubError();
    return;

}

SoloRTB.statusChange = function(xmlHttpReq, resConf) {
    if (resConf.msg != "") { // error
        // console.log("error:" + resConf.msg);
        SoloRTB.mopubError();
        return;
    }
    // console.log(JSON.stringify(resConf));
    if(resConf && resConf.ads && resConf.ads.length>0){
        SoloRTB.callback(resConf.ads[0]);
    }else{
        SoloRTB.mopubError();
    }
    
}

// GetAttributeValue = function(attr){
//     return document.getElementById("SOLORTB_widget").getAttribute(attr)
// }

// SoloRTB.configData = {
//     solopubid: GetAttributeValue("solopubid"),
//     soloslotid: GetAttributeValue("soloslotid"),
//     soloappid: GetAttributeValue("soloappid"),     
//     adw: GetAttributeValue("adw"),
//     adh: GetAttributeValue("adh"),
//     adtype: GetAttributeValue("adtype"),
//     bidfloor: GetAttributeValue("bidfloor"),
//     tmax: GetAttributeValue("tmax"),
//     cookie: GetAttributeValue("cookie"),
//     clickurl: GetAttributeValue("clickurl"),
//     deviceid: GetAttributeValue("deviceid"),
//     bundle: GetAttributeValue("bundle"),
//     cid: GetAttributeValue("cid"),
//     fail: GetAttributeValue("fail"),
//     dnt: GetAttributeValue("dnt"),
//     ip: GetAttributeValue("ip"),
//     keywords: GetAttributeValue("keywords"),
//     lat: GetAttributeValue("lat"),
//     lon: GetAttributeValue("lon"),
//     siteid: GetAttributeValue("siteid"),
//     rid: GetAttributeValue("rid"),
//     cache: GetAttributeValue("cache"),
//     adgroup: GetAttributeValue("adgroup"),
//     box: document.getElementById("SOLORTB_widget")
// }

SoloRTB.getDivAttrbutes = function () {
    var attrs = document.getElementById("SOLORTB_widget").attributes
    var attrsLen = Object.keys(attrs).length
    SoloRTB.configData = {}
    for(var i in attrs) {
        if(i<attrsLen){
            SoloRTB.configData[attrs[i].name] = attrs[i].value
        }
    }
    SoloRTB.configData["box"] = document.getElementById("SOLORTB_widget")
    return SoloRTB.configData
}

function PushConfigParameters() {
    try{
        var params = SoloRTB.getDivAttrbutes()
        SoloRTB.Request(params)
    }catch(e){
        // console.log(e);
        var img = document.createElement("img");
        img.src="http://r1.snnd.co/api/v1/jstag/test.jpg?t=%%CACHEBUSTER%%&error="+e;
        document.body.appendChild(img);
        window.location.href = "mopub://failLoad";
    }
}

PushConfigParameters()
