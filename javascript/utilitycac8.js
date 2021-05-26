/// <reference name="MicrosoftAjax.js" />
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.Core.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQuery.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQueryInclude.js" />
/// <reference path="/javascript/rad3.js" />
/// <reference path="/javascript/cookie.js" />

var counterField;
var fieldToLimit;

function delegate(instance, method) {
    return function() {
        return method.apply(instance, arguments);
    }
}

// Contains bungie.net 2007 utility functions 
function bodyVisiblity(bodyElementId) {
	if (document.getElementById && bodyElementId)
		document.getElementById(bodyElementId).className = 'loaded';
}


// targetDate is a datestring (not milliseconds), the others are the elements of each component to update.
function genericCountdownUpdate(targetDate, dayClientId, hourClientId, minuteClientId, secClientId, zeroClientId, counterClientId) {
	var currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset());
	var timeLeft = (new Date(targetDate).getTime()) - currentDate.getTime();
	
	if (timeLeft <= 0) {
		var zeroMessage = document.getElementById(zeroClientId);
		var counterEl = document.getElementById(counterClientId);
		if (zeroMessage)
		zeroMessage.style.display = 'inline';
		if (counterEl)
		counterEl.style.display = 'none';
	}
	else {
		var dayEl = document.getElementById(dayClientId);
		var hourEl = document.getElementById(hourClientId);
		var minEl = document.getElementById(minuteClientId);
		var secEl = document.getElementById(secClientId);

		var days = Math.floor(timeLeft / 86400000);
		timeLeft = timeLeft - (days * 86400000);
		var hours = Math.floor(timeLeft / 3600000);
		timeLeft = timeLeft - (hours * 3600000);
		var minutes = Math.floor(timeLeft / 1000 / 60);
		timeLeft = timeLeft - (minutes * 60000);
		var seconds = Math.floor(timeLeft / 1000);
	    
	    if (days > 9){
		dayEl.innerHTML = days; // days
		} else{
		dayEl.innerHTML = '0' + days; // days
		}
		if (hours > 9){
		hourEl.innerHTML = hours;  // hours
		} else {
		hourEl.innerHTML = '0' +  hours;  // hours
		}
		
		if (minutes > 9){
		minEl.innerHTML = minutes;  // minutes
		} else {
		minEl.innerHTML = '0' + minutes;  // minutes
		}
		
		if (seconds > 9){
		secEl.innerHTML = seconds;  // seconds.
		} else {
		 secEl.innerHTML = '0' + seconds;  // seconds
		}

	}
}

function randomizeErrorImage(imageToRandomizeId) {
	var imgSrcArray = new Array(
		/* slide = 0 */"/images/errors/gonefishing.jpg",
		/* slide = 1 */"/images/errors/blessthismess.jpg",
		/* slide = 2 */"/images/errors/hegemony.jpg"
	);
	if (document.getElementById && imageToRandomizeId) {
		randomNumber = Math.round(Math.random()*(imgSrcArray.length-1));
		document.getElementById(imageToRandomizeId).src = imgSrcArray[randomNumber];
	}
}

function toggleTreeState(titleElementId, repeaterElementId, titleStateOne, titleStateTwo) {
	if (document.getElementById && titleElementId && repeaterElementId && titleStateOne && titleStateTwo) {
		var repeater = document.getElementById(repeaterElementId);
		var title = document.getElementById(titleElementId);
		if (repeater && title) {
			repeater.style.display = (repeater.style.display == 'none') ? 'block' : 'none';
			title.className = (title.className == titleStateOne) ? titleStateTwo : titleStateOne;
		}
	}
	return;
}

function isiPhone(userAgent) { 
  var agent = userAgent || this.getAgent(); 
  return agent.match(/iPhone/i); 
}

function characterLimiterDisplay(evt) {
    if (forumCounterField == null)
        forumCounterField = $get('bodyCharacterCountDisplay');
    clearTimeout(forumCounterTimer);
    forumCounterTimer = setTimeout(function() {
        if (fieldToLimit.value.length > forumBodyMaxLimit)
            forumCounterField.innerHTML = '<span class="validatormsg">' + (fieldToLimit.value.length - forumBodyMaxLimit) + ' characters over limit</span>';
        else
            forumCounterField.innerHTML = (forumBodyMaxLimit - fieldToLimit.value.length) + ' characters remaining';
    }, 100);
}

function openAssetPopupWindow(pageUrl) {
	window.open(pageUrl,'_blank', 'height=595,left=75,location=1,resizable=1,toolbar=0,top=100,width=730,scrollbars=1',false);
}

function openScreenshotPopupWindow(pageUrl) {
	 var playerScreenshotPopup = window.open(pageUrl,'playerScreenshotsPopup', 'height=600,left=75,location=1,resizable=1,toolbar=0,top=100,width=595,scrollbars=0,status=1',false);
	 playerScreenshotPopup.focus();
}

function gameOpen(game)
{
	window.open('/Stats/Halo2WebMaps/richgame.aspx?g=' + game, 'GameDetails', 'scrollbars, width=870, height=868');
	return false;
}

function gameOpenH3(game)
{
	window.open('/Stats/WebMaps/richgameH3.aspx?g=' + game, 'GameDetails', 'scrollbars, width=870, height=868');
	return false;
}

function toggleAll(id)
{
	//alert("This document contains: " + document.forms.length + " form(s).")
    var selectAll = document.getElementById(id);
	if (document.forms[0])
	{
		//alert("This form contains: " + document.forms[0].elements.length + " element(s).")
    
		var element;
		var length = document.forms[0].elements.length;
		for (var i = 0; i < length; i++)
		{
		    element = document.forms[0].elements[i];
		    if (element.type == "checkbox" && element.name != id)
		    {
		         //alert('element changed: ' + element.name);
		         if (selectAll && selectAll.checked == true)
		         {
		         element.checked = true;
		         }
		         else
		         {
		         element.checked = false;
		         }  
		    }
		}
	}
}
	
function unsetAll(id)
{
    //alert(document.getElementById(id));
    document.getElementById(id).checked = false;
}

function ToggleOverLay(id){
	if(document.getElementById){
		var cId = id.toString();
		if (id < 10) {
			cId = '0' + cId;
		}
		var elem = document.getElementById('ctl00_MainContentArea_bnetpgd_RadPanelbar1_p2_p0_vs_ctl' + cId + '_pnlVsDisplay');
		if(elem){
			if(elem.style.display == 'none'){
				elem.style.display = 'block';
				document.getElementById('VsArrow' + id).style.backgroundPosition = '0px -20px';
			}else{
				elem.style.display = 'none';
				document.getElementById('VsArrow' + id).style.backgroundPosition = '0px 0px';
			}
		}
	}
}

function CPToggle(objId)
{
		var obj;
		
        
		obj = document.getElementById('divResults');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('divCarnage');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('divEnemyKills');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('divVehicleKills');
		if (obj){ obj.className = 'hide_section';}
		
		obj = document.getElementById('divCOOPOverview');
		if (obj){ obj.className = 'show_section';}
		
		
		obj = document.getElementById(objId);
		if (obj) obj.className = 'show_section';
		
}

function CPToggleTabs(objId, tabId)
{
		var obj;
		
        
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptGamePlayers_ctl01_pnlPlayerDetails');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptGamePlayers_ctl02_pnlPlayerDetails');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptGamePlayers_ctl03_pnlPlayerDetails');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptGamePlayers_ctl04_pnlPlayerDetails');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('divCOOPOverview');
		if (obj){ obj.className = 'hide_section';}
		obj = document.getElementById('divFiles');
		if (obj){ obj.className = 'hide_section';}
		
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptPlayerTabs_ctl01_hypPlayerTab');
		if (obj){ obj.className = 'tab160';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptPlayerTabs_ctl02_hypPlayerTab');
		if (obj){ obj.className = 'tab160';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptPlayerTabs_ctl03_hypPlayerTab');
		if (obj){ obj.className = 'tab160';}
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_rptPlayerTabs_ctl04_hypPlayerTab');
		if (obj){ obj.className = 'tab160';}
		
		obj = document.getElementById('ctl00_mainContent_bnetpcgd_lnkFileViewer');
		if (obj){ obj.className = 'tab80';}
		
		obj = document.getElementById('coopTab');
		if (obj){ obj.className = 'tab60';}
		
		
		if (tabId == "coopTab"){ obj.className = 'tab60_active';}else{
		
		   if (tabId == "ctl00_mainContent_bnetpcgd_lnkFileViewer"){
		     obj = document.getElementById('ctl00_mainContent_bnetpcgd_lnkFileViewer');
		     if (obj){ obj.className = 'tab80_active';}
		   }else{
		    obj = document.getElementById(tabId);
		    if (obj){ obj.className = 'tab160_active';}
		   }
		   }
		
		
		obj = document.getElementById(objId);
		if (obj){ obj.className = 'show_section';}
		
		
		
		
		
}

function StatsToggleSection(objId, tabId)
{
		var obj;
		var selected = "#231f20";
        var unselected = "#535151";

		obj = document.getElementById('tabOverview');
		if (obj){ obj.className = 'tab100';}
		obj = document.getElementById('tabKills');
		if (obj){ obj.className = 'tab100';}
		obj = document.getElementById('tabBreakdown');
		if (obj){ obj.className = 'tab100';}
		obj = document.getElementById('tabFieldStats');
		if (obj){ obj.className = 'tab100';}
		obj = document.getElementById('ctl00_mainContent_bnetpgd_lnkFileViewer');
		if (obj){ obj.className = 'tab80';}
		obj = document.getElementById('ctl00_mainContent_bnetpgd_lnkGameViewer');
		if (obj){ obj.className = 'tab80';}

		obj = document.getElementById(tabId);
		if (obj) obj.className = obj.className + '_active';
		
					
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlOverview');
		if (obj) obj.style.display = 'none';
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlKills');
		if (obj) obj.style.display = 'none';
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlBreakdown');
		if (obj) obj.style.display = 'none';
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlFieldStats');
		if (obj) obj.style.display = 'none';
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlGameViewer');
		if (obj) obj.style.display = 'none';
		obj = document.getElementById('ctl00_mainContent_bnetpgd_pnlFiles');
		if (obj) obj.style.display = 'none';
		
		
		obj = document.getElementById('ctl00_mainContent_bnetpgd_' + objId);
		if (obj) obj.style.display = 'block';
		
}

function MouseOver(objId, tabId) {
    var obj;
    var over = "#e08421";
    obj = document.getElementById(tabId);
    
    if(obj.className != "selected_tab")
        obj.style.background = over;
}

function MouseOut(objId, tabId)
{
    var obj;
    var over = "#e08421";
    var unselected = "#535151";
    obj = document.getElementById(tabId);
    
    if(obj.className != "selected_tab")
        obj.style.background = unselected; }



function showObject(id) 
{
	var obj = document.getElementById(id)
	if (obj != null)
		obj.style.visibility = "visible";
	return obj;
}

function showOneObjectHideAnother(showObjId, hideObjId) {
	var s_obj = document.getElementById(showObjId);
	var h_obj = document.getElementById(hideObjId);
	if (s_obj != null && h_obj != null) {
		s_obj.style.display = "inline";
		h_obj.style.display = "none";
	}
}

function hideObject(id) 
{
	var obj = document.getElementById(id)
	if (obj != null)
		obj.style.visibility = "hidden";
	return obj;
}

// should never return a value.
function hideBlockObject(id) 
{
	var obj = document.getElementById(id)
	if (obj != null)
		obj.style.display = "none";
}


function clearText(id) 
{
    document.getElementById(id).value = "";
} 

function ChangeClass(objId, objClass)
	{

    var obj = document.getElementById(objId);
	if (obj != null)
		obj.className = objClass;

	}
	
function open_parent(url)
{
	if (opener && !opener.closed)
	{
	    opener.location.href = url;
	}
	else
	{
	    window.open(url, '_blank', 'scrollbars, resizable, width=1024, height=768');
	}
}




function fileItemArrowExpander(arrowElementId, divToAlterElementId) {
	var arrowElement = document.getElementById(arrowElementId);
	var divToAlter = document.getElementById(divToAlterElementId);
	
	if (arrowElement.className == 'expanded_arrows_collapsed') {
		arrowElement.className = 'expanded_arrows_expanded';
		divToAlter.style.display = 'block';
	}
	else {
		arrowElement.className = 'expanded_arrows_collapsed';
		divToAlter.style.display = 'none';
	}
}

function forumPostArrowExpander(arrowElementId, divToAlterElementId) {
	var arrowElement = document.getElementById(arrowElementId);
	var divToAlter = document.getElementById(divToAlterElementId);
	
	if (arrowElement.className == 'expanded_arrows_collapsed') {
		arrowElement.className = 'expanded_arrows_expanded';
		divToAlter.style.display = 'block';
	}
	else {
		arrowElement.className = 'expanded_arrows_collapsed';
		divToAlter.style.display = 'none';
	}
}

function swapBlockState(blockOneElementId, blockTwoElementId) {
	var b1 = document.getElementById(blockOneElementId);
	var b2 = document.getElementById(blockTwoElementId);
	
	if (b1 != null && b2 != null) {
		var s1 = b1.style.display;
		b1.style.display = b2.style.display;
		b2.style.display = s1;					
	}
}


function screenshot_thumbnail_hover(imgObj, pipElementId, isWidescreen) {
	var pip = showObject(pipElementId);
	
	pip.src = imgObj.src;
	
	if (isWidescreen) 
		pip.style.width = "160";
	else 
		pip.style.width = "120";
			
}

function screenshot_thumbnail_hover_highlight(imgObj, pipElementId, isWidescreen, highlightElementId) {
	var pip = showObject(pipElementId);
	
	var hlight = document.getElementById(highlightElementId);
	if (hlight != null) {
		hlight.style.zIndex = 4;
	}
	
	
	pip.src = imgObj.src;
	
	if (isWidescreen) 
		pip.style.width = "160";
	else 
		pip.style.width = "120";
			
}

function screenshot_thumbnail_no_hover(highlightElementId) {

	var hlight = document.getElementById(highlightElementId);
	if (hlight != null) {
		hlight.style.zIndex = 1;
	}
}

function searchmini_execute(queryId) {
	var queryBox = document.getElementById(queryId);
	var searchQuery = "/Search/default.aspx?q=" + queryBox.value;
	window.location = searchQuery;
}

function defaultLinkButtonForFirefox(lbClientID) {
    var lb = $get(lbClientID);
    if (lb && typeof (lb.click) == 'undefined') {
        lb.click = function() {
            var result = true;
            if (lb.onclick)
                result = lb.onclick();
            if (typeof (result) == 'undefined' || result) 
                eval(lb.getAttribute('href'));
        };
    }
}

function scrubString(str) {
    if (str)
        return str.replace(/[,—]/g,"");
    else
        return 0;
}

function prepSortsInt(a, b, index) {
    var h1 = a.getElementsByTagName("li")[index].innerHTML.toLowerCase();
    var h2 = b.getElementsByTagName("li")[index].innerHTML.toLowerCase()
    if (h1 == '—')
        h1 = 0;
    if (h2 == '—')
        h2 = 0;
    return sortString(parseInt(scrubString(h1)), parseInt(scrubString(h2)), -1);
}
function prepSortsSpanInt(a, b, index) {
    var h1 = a.getElementsByTagName("span")[index].innerHTML.toLowerCase();
    var h2 = b.getElementsByTagName("span")[index].innerHTML.toLowerCase()
    if (h1 == '—')
        h1 = 0;
    if (h2 == '—')
        h2 = 0;
    return sortString(parseInt(scrubString(h1)), parseInt(scrubString(h2)), -1);
}
function prepSortsPInt(a, b, index) {
    var h1 = a.getElementsByTagName("p")[index].innerHTML.toLowerCase();
    var h2 = b.getElementsByTagName("p")[index].innerHTML.toLowerCase()
    return sortString(parseInt(h1), parseInt(h2), -1);
}
function prepSortsFloat(a, b, index) {
    var h1 = a.getElementsByTagName("li")[index].innerHTML.toLowerCase();
    var h2 = b.getElementsByTagName("li")[index].innerHTML.toLowerCase()
    if (h1 == '—')
        h1 = 0;
    if (h2 == '—')
        h2 = 0;
    return sortString(parseFloat(h1), parseFloat(h2), -1);
}


function sortPointsStringDescending(a, b) {
    return prepSortsInt(a, b, 1);
};
function sortKillsStringDescending(a, b) {
    return prepSortsInt(a, b, 2);
};
function sortPDStringDescending(a, b) {
    return prepSortsFloat(a, b, 3);
};
function sortKDStringDescending(a, b) {
    return prepSortsFloat(a, b, 4);
};
function sortDeathsStringDescending(a, b) {

    return prepSortsFloat(a, b, 5);
};
function sortAchTimeStringDescending(a, b) {
    return prepSortsSpanInt(a, b, 1);
};
function sortAchScoreStringDescending(a, b) {
	return prepSortsPInt(a, b, 0);
};
function sortReachAchScoreStringDescending(a, b) {
    return prepSortsPInt(a, b, 2);
};

function sortString(h1, h2, direction) {


    if (h1 > h2) {
        r = 1 * direction;
    } else if (h2 > h1) {
        r = -1 * direction;
    }
    else {
        r = 0;
    }
    return r;
};

function FixRadioRepeater(nRegex, hiddenField, vItem, current) {
    re = new RegExp(nRegex);
    for (i = 0; i < document.forms[0].elements.length; i++) {
        elm = document.forms[0].elements[i];
        if (elm.type == 'radio') {
            if (re.test(elm.name))
                elm.checked = false;
        }
    }
    current.checked = true;
    $get(hiddenField).value = vItem;
}
	