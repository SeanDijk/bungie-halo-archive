var __defaultFired = false;

function WebForm_FireDefaultButton(event, target) {
    var element = event.target || event.srcElement;

    if (!__defaultFired && event.keyCode == 13 && !(element && (element.tagName.toLowerCase() == "textarea"))) {
        var defaultButton;

        if (__nonMSDOMBrowser)
            defaultButton = document.getElementById(target);
        else
            defaultButton = document.all[target];

        if (defaultButton) {
            if (typeof (defaultButton.click) != "undefined")
                defaultButton.click();
            else
                eval(unescape(defaultButton.href.replace("javascript:", "")));

            event.cancelBubble = true;

            if (event.stopPropagation) event.stopPropagation();
            return false;
        }
    }
    return true;
} 