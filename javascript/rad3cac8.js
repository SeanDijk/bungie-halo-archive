/// <reference name="MicrosoftAjax.js" />
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.Core.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQuery.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQueryInclude.js" />
/// <reference path="/javascript/cookie.js" />
/// <reference path="/javascript/utility.js" />

// Standard get self reference for a rad window
function GetRadWindow() {
	var oWindow = null;
	if (window.radWindow) oWindow = window.radWindow;
	else if (window.frameElement && window.frameElement.radWindow) oWindow = window.frameElement.radWindow;
	return oWindow;
}

// Standard reload call on modal window close - reload parent to update state with modal dialog changes. It forces a reload with .reload(true).
function ModalWindow_OnClientClose(radWindow) {
	radWindow.BrowserWindow.location.href = radWindow.BrowserWindow.location.href;
}

function SelfWindow_Redirect(url) {
    GetRadWindow().BrowserWindow.location.replace(url);
}

// Self close rad window
function SelfCloseRadWindow() {
	var oWindow = GetRadWindow();
	oWindow.close();
}

// shows a web banhammer utility window.
function showWebBanHammerWindow(url,windowName,offsetElementId) {
	var oManager = GetRadWindowManager();
	var oWindow = oManager.getWindowByName(windowName);
	if (!oWindow.isClosed())
		oWindow.close();
	oWindow.setUrl(url);
	oWindow.set_status(url);
	oWindow.set_offsetElementID(offsetElementId);
	oWindow.show();
	return false;
}

//disable stupid keyboard shortcuts in an editor 
function DisableBadKeyboardShortcuts(editor, args) {
	if (args.get_commandName) {
		var cn = args.get_commandName();
		if (cn == "Help") {
			args.set_cancel(true);
		}
	}
}

function ShowTopStoryPreview() {
	var oWindow = GetRadWindow();
	document.getElementById('topStoryPreviewDiv').innerHTML = unescape(oWindow.TopStory);
}

function ShowNewsPreviewFirehose() {
    var oWindow = GetRadWindow();
    document.getElementById('topStoryPreviewHeading').innerHTML = unescape(oWindow.HeadingText);
    document.getElementById('topStoryPreviewDiv').innerHTML = "<i>" + unescape(oWindow.SummaryText) + "</i><br /><br /><hr />" + unescape(oWindow.FullText);
    if (oWindow.TopIcon != '')
        $telerik.$(".colLast.newsStoryHolder.topNewsIconMarker").css("background-image", "url(" + unescape(oWindow.TopIcon) + ")");
    if (oWindow.SecondaryImage != '') 
        $telerik.$(".secondaryimage").css("background-image","url(" + (oWindow.SecondaryImage) + ")");
}

function openBanWindow(userToBan,loginToBan,groupPath,urlOfBan) {
	GetRadWindowManager().open(groupPath + "/Forums/BanDialog.aspx?uid=" + userToBan + "&login=" + loginToBan + "&url=" + urlOfBan, "BanWindow");
	return false;
}

function openFileSetAddWindow(fileID, isGallery, windowClientId) {
	var fileWindow = $find(windowClientId);
	fileWindow.setUrl("/Stats/Halo3/FileSetWindowUI.aspx?h3fileid=" + fileID + "&isGallery=" + isGallery);
	fileWindow.show();
	return false;
}

function openFileSetAddWindowReach(fileID, windowClientId) {
    var fileWindow = $find(windowClientId);
    fileWindow.setUrl("/Stats/Reach/FileSetWindowUI.aspx?fid=" + fileID);
    fileWindow.show();
    return false;
}

function openRenderToVideoWindow(fileID, windowClientId) {
    var fileWindow = $find(windowClientId);
    fileWindow.setUrl("/Stats/Halo3/RenderToVideoWindowUI.aspx?h3fileid=" + fileID);
    fileWindow.show();
    return false;
}

// make sure the user wants to go to the bungie store when clicked on in the nav.
function OnBungieStoreNavItemClickingHandler(sender, eventArgs) {
	if (eventArgs.get_item().get_value() == "BungieStore") {
		return confirm("This will take you to the Bungie Store, an external site.  Are you sure you wish to navigate away from bungie.net?");
	}
	else {
		return true;
	}
}

// forcibly scroll the page to 0,0
function scrollToTop() {
	window.scrollTo(0,0);
}

function tagSearchBox_OnClientDropDownOpeningHandler(senderClientID) {
	var comboBox = $find(senderClientID);
	var comboBoxValue = comboBox.get_text();
	if (comboBoxValue.length > 2 && comboBoxValue.charAt(comboBoxValue.length - 1) != ';')
		comboBox.set_text(comboBoxValue + ';');
}

function radEditorLimiterDisplay(editorClientId, counterFieldId, maxLimit) {
	
    if ( editorClientId && counterFieldId != null && counterFieldId != '' && (maxLimit > 0)) {
		    
		var editor = $find(editorClientId);
		var counterField = $get(counterFieldId);
		        
		if (editor && counterField) {
		    
			var content = editor.get_html(true);
		    
		    if (content != null && content.length > maxLimit)
				counterField.innerHTML = '<span class="validatormsg">' + (content.length - maxLimit) + ' characters over limit</span>';
			else
			    counterField.innerHTML = (maxLimit - content.length) + ' characters remaining';
		}
	}
	
}