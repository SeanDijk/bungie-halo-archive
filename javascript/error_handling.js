/// <reference name="MicrosoftAjax.js" />
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.Core.js" />    
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQuery.js" />
/// <reference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQueryInclude.js" />

function setup_on_load(sender, args) {
    if (Sys.WebForms != null) {
    	var prm = Sys.WebForms.PageRequestManager.getInstance();
    	if (prm != null) {
    	    prm.add_endRequest(checkForAjaxServerErrorsOnEndRequest);
    	    prm._form._initialAction = prm._form.action = window.location.href;
    	}
    }
}

// catches unhandled server-side exceptions during ajax postback, and ensures that the user isn't just left hanging.
// ideally, this should never be called, because you're handling all possible server-exceptions at point of entry, not letting them buble up... right?
function checkForAjaxServerErrorsOnEndRequest(sender, args) {
    var error = args.get_error();
    if (error != null) {
        args.set_errorHandled(true);
        var msg = error.message.replace("Sys.WebForms.PageRequestManagerServerErrorException: ", "");
        alert(msg);
    }
}

Sys.Application.add_load(setup_on_load);

if (typeof (Sys) !== 'undefined') Sys.Application.notifyScriptLoaded();