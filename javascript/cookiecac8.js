/// <reference name="MicrosoftAjax.js" />
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.Core.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQuery.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQueryInclude.js" />
/// <reference path="/javascript/rad3.js" />
/// <reference path="/javascript/utility.js" />

// name - name of the desired cookie, creates a new cookie.
// value - the value the cookie is going to hold.
function setCookie(name, value)
{
    document.cookie= name + "=" + escape(value) + ";path=/";
}

function setCookieWithExpires(name, value, expires) {
	document.cookie = name + "=" + escape(value) + ";path=/;domain=" + domain + ";expires=" + expires.toUTCString();
}

// name - name of the desired cookie, returns null if name is not a valid cookie.
function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}

// name - name of the cookie to be deleted, deletes the cookie so it is no longer valid.
function deleteCookie(name)
{
    if (getCookie(name))
    {
		var eDate = new Date();
		eDate.setTime(eDate.getTime() - 1);
        document.cookie = name + "=" + ";path=/;expires=" + eDate.toUTCString();
    }
}

// Assigns the correct message to Login Welcome message.
function writeDisplayNameFromCookie() {
	var dName = getCookie("BungieDisplayName");
	if (dName == null) {
		document.write("Welcome!");
	}
	else {
		document.write(dName);
	}
	return true;
}

// updates the dash-live cookie with friends and message strings.  Valid values for each are any postive integer (as a string), and the value '-' for friends.
function updateDashLiveCookie(friends,messages,gt) {
	var dashLiveArray = new Array(3);
	dashLiveArray[0] = friends;
	dashLiveArray[1] = messages;
	dashLiveArray[2] = gt;
	var expires = new Date();
	expires.setTime(expires.getTime() + (5 * 60 * 1000)); // 5 minutes
	setCookieWithExpiresAndDomain('dash-live',dashLiveArray.join('&'),expires);
}

function showFriends()
{
    window.open('/Stats/LiveFriends.aspx', 'FriendsList', 'scrollbars, resizable, width=430, height=520');
    return false;
}
