(function ($) {

    /* Extra Info Tip - popout/tooltip 

    var newExtraInfoTip = new ExtraInfoTip(
    '.triggerElement, .triggerElement2', 
    '.popOutElement', 
    { 
    'onScreen': true, 
    'addContent' : function(popOut,target) {
    //do ajaxy stuff here
    }
    } 
    );

    popOut - required - the pop out element
    
    options: 
    onScreen  - keeps the popout on the screen when the screen is at least 2 times as big as the width and height of the popout (default is false)
    positionX - adjust the default position by this many pixels on the x axis away from the cursor
    positionY - adjust the default position by this many pixels on the y axis away from the cursor
    delay - milliseconds of delay before popout appears

    addContent(popOut, target) - empty function that can be used to populate your popout - the event target and the popOut are passed in as arguments     
    */
    ExtraInfoTip = function (triggerElement, popOutElement, options) {
        this.trigger = $(triggerElement);
        this.popOut = $(popOutElement);
        this.isJsRequiredType = true;
        var tempPopOut = this.trigger.find(popOutElement);
        if (tempPopOut.length > 0) {
            this.popOut = tempPopOut;
            this.isJsRequiredType = false;

        }
        if (this.trigger.length < 1 || this.popOut.length < 1) {
            return;
        }
        this.config = {
            'corner': 'BL',
            'positionX': 10,
            'positionY': 10,
            'onScreen': false,
            'delayTime': 0,
            'addContent': function (popOut, target) {
            }
        };

        if (options) $.extend(this.config, options);

        this.delayTime = this.config.delayTime;
        this.corner = this.config.corner;

        this.positionX = this.config.positionX;
        this.positionY = this.config.positionY;
        this.onScreen = this.config.onScreen;
        this.showing = false;

        this.addContent = this.config.addContent;

        if (this.onScreen == true && this.corner == '') {
            this.corner = 'BL';
            this.positionX = 20;
            this.positionY = 20;
        }

        this.intialize = function () {
            this.addEvtListeners();
            if (this.isJsRequiredType) this.clonePopOut();
        };
        this.clonedPopOut;

        /* js free style */
        this.movePopOut = function (popOut) {
            if ($('div.clonedPopOut').length == 0) {
                this.clonedPopOut = popOut.clone().addClass('clonedPopOut');
                $('body').append(this.clonedPopOut);
            }
        }
        this.removeExtraPopOut = function () {
            this.clonedPopOut.remove();
        }

        /* js required style */
        this.clonePopOut = function () {
            this.clonedPopOut = this.popOut;
            this.popOut.remove();
            $('body').append(this.clonedPopOut);
        }

        this.addEvtListeners = function () {
            var self = this;
            this.trigger.mousemove
		    (
                function (e) {
                    e.stopImmediatePropagation();
                    var mouseX = e.pageX;
                    var mouseY = e.pageY;

                    if (self.showing == false && self.isJsRequiredType == false) self.movePopOut($(this).find('div.popOut'));
                    self.positionPopOut(mouseX, mouseY);
                    self.showPopOut(this);
                }
            );
            this.trigger.mouseout
		    (
                function (e) {
                    e.stopImmediatePropagation();
                    clearTimeout(self.showDelay);
                    if (self.isJsRequiredType) self.popOut.hide();
                    else
                        self.removeExtraPopOut();
                    self.showing = false;
                }
            );
        }
        this.showPopOut = function (target) {
            if (this.showing == false) {
                this.showing = true;

                if (this.delayTime > 0) {
                    clearTimeout(this.showDelay);

                    var self = this;
                    this.showDelay = setTimeout(function () {
                        self.addContent(self.clonedPopOut, target);
                        self.clonedPopOut.show();
                    }, this.delayTime);
                }
                else {
                    this.addContent(this.clonedPopOut, target);
                    this.clonedPopOut.show();
                }
            }
        };

        this.positionPopOut = function (mouseX, mouseY) {

            var popOutHeight = this.clonedPopOut.height();
            var popOutWidth = this.clonedPopOut.width();
            var topPosition = 0;
            var leftPosition = 0;

            switch (this.corner) {
                case 'BR':
                    topPosition += mouseY - popOutHeight - this.positionY;
                    leftPosition += mouseX - popOutWidth - this.positionX;
                    break;
                case 'TL':
                    topPosition += mouseY + this.positionY;
                    leftPosition += mouseX + this.positionX;
                    break;
                case 'TR':
                    topPosition += mouseY + this.positionY;
                    leftPosition += mouseX - popOutWidth - this.positionX;
                    break;
                default:
                    topPosition += mouseY - popOutHeight - this.positionY;
                    leftPosition += mouseX + this.positionX;
            }

            //keep on page
            if (this.onScreen == true) {
                var windowWidth = $(window).width();
                var windowHeight = $(window).height();

                if ((windowWidth > (popOutWidth * 1.2)) && (windowHeight > (popOutHeight * 1.2))) {

                    if ($.browser.safari) { bodyelem = $("body") } else { bodyelem = $("html") }
                    var scrollTop = bodyelem.scrollTop();
                    var scrollLeft = bodyelem.scrollLeft();

                    var flipX = false;

                    //left side of page
                    if (mouseX > (windowWidth / 2 + scrollLeft)) {
                        flipX = true;
                    }
                    //too high
                    if (topPosition < scrollTop) {
                        topPosition = scrollTop;
                    }
                    //too low
                    if ((topPosition + popOutHeight) > (scrollTop + windowHeight)) {
                        topPosition = scrollTop + windowHeight - popOutHeight;
                    }
                    //too far left
                    if (leftPosition < scrollLeft) {
                        leftPosition = scrollLeft + 20;
                    }
                    //too far right
                    if ((leftPosition + popOutWidth) > (windowWidth + scrollLeft)) {
                        if (flipX == true) {
                            leftPosition = mouseX - popOutWidth - 20;
                        }
                        else {
                            leftPosition = scrollLeft + windowWidth - popOutWidth - 20;
                        }
                    }
                }
            }
            this.clonedPopOut.css({ top: topPosition, left: leftPosition });
        };
        this.intialize();
    };



    /* Floating Label - disappearing/reappearing label for textfield 

    @example $(".labelElement").floatingLabel();

    */

    $.fn.floatingLabel = function () {

        $this = $(this);
        if ($this.length < 1 || $('#' + $this.attr('for')).length < 1) {
            return;
        }
        return this.each(function () {
            $self = $(this);
            var $textBox = $('#' + $self.attr('for'));
            var $label = $self;

            if ($textBox.val() == '') {
                $label.addClass('floated');
            }
            $textBox.focus(
                function (e) {
                    $label.removeClass('floated');
                }
            );
            $textBox.blur(
                function () {
                    if ($textBox.val() == '') {
                        $label.addClass('floated');
                    }
                }
            );
            $label.click(function (e) {
                $textBox.focus();
            });
        });
    }

    //countdown clock object
    Counter = function (timeLeft, element) {

        this.$element = $(element);
        if (this.$element.length < 1) return;

        this.timeLeft = timeLeft;

        this.updateCounter = function () {

            var self = this;
            var Time_Left = self.timeLeft -= 1;

            if (Time_Left < 0) Time_Left = 0;

            //deteremine the time left
            var days = Math.floor(Time_Left / (60 * 60 * 24));
            Time_Left %= (60 * 60 * 24);
            var hours = Math.floor(Time_Left / (60 * 60));
            Time_Left %= (60 * 60);
            var minutes = Math.floor(Time_Left / 60);
            Time_Left %= 60;
            var seconds = Time_Left;

            //update the element
            this.$element.html('<span>' + days + 'd</span><span>' + hours + 'h</span><span>' + minutes + 'm</span><span class="seconds">' + seconds + 's</span>');
            setTimeout(function () { self.updateCounter() }, 1000);
        }
        this.updateCounter();
    }

    //Simple Tab Switcher - doesn't remeber view state
    //example - 
    //    var tabSwitcher = new SimpleTabSwitcher("table.centerNav");
    //
    SimpleTabSwitcher = function (element) {
        this.element = $(element);
        if (this.element.length < 1) {
            return;
        }

        this.initialize = function () {
            this.addEvtListeners();
        }
        this.addEvtListeners = function () {
            var self = this;
            this.element.find('a').click(function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                var targetElement = $(this);
                self.switchViews(targetElement);
            });
        }
        this.switchViews = function (targetElement) {
            var targetTab = targetElement.attr('tab');
            if (targetTab != null) {
                targetElement.parent('td').addClass('on');
                targetElement.parent('td').siblings('.on').removeClass('on');
                var targetedElement = $('div[tab=' + targetTab + ']');
                targetedElement.siblings('div').hide();
                targetedElement.show();
            }
        }
        this.initialize();
    };
        
    /* sets up default */
    $('html').attr('id', ''); //gets rid of jsDisabled id

})($telerik.$);
