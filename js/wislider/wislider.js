/*
 * wislider - v1.0.5
 * created by Alexandre Moraes
 * this script is free, use it as you wish :)
 * http://wikarus.com.br
 * http://facebook.com/wikarus
 * alexandre@wikarus.com.br
 * fork this project at github: https://github.com/wikarus/wislider/fork
 */

(function( $ ){

	$.fn.wislider = function(params) {
            
            params = $.extend({
                disabledArrowClass: '.disabled',
                infinite: true,
                type: 'horizontal',
                arrowParent: '.wisliderArrows',
                arrowPrev: '.wisliderPrev',
                arrowNext: '.wisliderNext',
                arrowSelector: '.wisliderArrow',
                navParent: '.wisliderNav',
                navSelector: '.wisliderSelector',
                navButtons: true,
                navArrows: true,
                startAt: 1,
                slideSpeed: 500,
                slideEase: 'easein',
                auto: true,
                waitTime: 8000,
                animate: true,
                pauseOnHover: true,
                speedAdjustToLength: false
            }, params);
            
            var wislider = {
                'temp' : {
                    'object': '',
                    'step': '',
                    'stepLength': '',
                    'actualObject': '',
                    'nextObject': '',
                    'previousObject': '',
                    'adjustedSpeed': ''
                },
                'wrapType' : function(string)
                {
                    var objectName = string.substr(1);
                    var wrap = new Array;
                    if(string.charAt(0) === ".")
                    {
                        wrap.push("class");
                    } else if(string.charAt(0) === "#")
                    {
                        wrap.push("id");
                    }
                    wrap.push(objectName);
                    return wrap;
                },
                'createNavi' : function()
                {
                    if(params.navButtons)
                    {
                        for(x = 0; x < wislider.temp.stepLength; x++)
                        {
                            var object = '<span '+wislider.wrapType(params.navSelector)[0]+'="'+wislider.wrapType(params.navSelector)[1]+'" name="'+(x+1)+'"></span>';
                            $(params.navParent).append(object);
                        }
                    }
                },
                'naviController' : function()
                {
                    $(params.navSelector).click(function(){
                        
                        var n = $(this).attr('name');
                        
                        if(params.animate)
                        {
                            wislider.animateToObject(n);
                        } else {
                            wislider.goToObject(n)
                        }
                    });
                },
                'createArrows' : function()
                {
                    if(params.navArrows)
                    {
                        var object = '<span '+wislider.wrapType(params.arrowPrev)[0]+'="'+ wislider.wrapType(params.arrowPrev)[1] + ' ' + wislider.wrapType(params.arrowSelector)[1] +'"></span>';
                        object += '<span '+wislider.wrapType(params.arrowNext)[0]+'="'+ wislider.wrapType(params.arrowNext)[1] + ' ' + wislider.wrapType(params.arrowSelector)[1] +'"></span>';
                        $(params.arrowParent).append(object);
                    }
                },
                'previousSlide' : function()
                {
                    if(params.animate)
                    {
                        wislider.animateToObject(wislider.temp.previousObject);
                    } else {
                        wislider.goToObject(wislider.temp.previousObject)
                    }
                },
                'nextSlide' : function()
                {
                    if(params.animate)
                    {
                        wislider.animateToObject(wislider.temp.nextObject);
                    } else {
                        wislider.goToObject(wislider.temp.nextObject)
                    }
                },
                'arrowsController' : function()
                {
                    $(params.arrowPrev).click(function(){                  
                        wislider.previousSlide();
                    });

                    $(params.arrowNext).click(function(){
                        wislider.nextSlide();
                    });
                },
                'setConfig' : function(object)
                {
                    wislider.temp.object = object;
                    
                    if(params.type == "horizontal")
                    {
                        wislider.temp.step = $(object).parent().width();
                    } else if(params.type == "vertical")
                    {
                        wislider.temp.step = $(object).parent().height();
                    }
                    
                    wislider.temp.stepLength = $('> div', wislider.temp.object).length;
                    if(params.speedAdjustToLength)
                    {
                        wislider.temp.adjustedSpeed = (wislider.temp.stepLength * 1000) / 5;
                    } else {
                        wislider.temp.adjustedSpeed = params.slideSpeed;
                    }
                },
                'setFakeBounds' : function()
                {
                    var firstObject = $('> div', wislider.temp.object).eq(0);
                    var lastObject = $('> div', wislider.temp.object).eq((wislider.temp.stepLength - 1));
                    
                    $(firstObject).clone().appendTo($(wislider.temp.object));
                    $(lastObject).clone().prependTo($(wislider.temp.object));
                },
                'nToObject' : function(n)
                {
                    if(n !== '0')
                    {
                        return n * wislider.temp.step;
                    } else {
                        return 0;
                    }
                },
                'shineNav' : function(n)
                {
                    if(params.navButtons)
                    {
                        $(params.navSelector).removeClass('active');
                        $(params.navSelector+'[name="'+n+'"]').addClass('active');
                    }
                },
                'reorderArrows' : function(n)
                {
                    wislider.temp.actualObject = n;
                    wislider.temp.previousObject = (parseInt(n)-1);
                    wislider.temp.nextObject = (parseInt(n)+1);
                },
                'goToObject' : function(n)
                {
                    if(wislider.checkInfinite(n))
                    {
                        if(params.type == "vertical")
                        {
                            $(wislider.temp.object).css({marginTop: '-' + wislider.nToObject(n) + 'px'});
                        } else if(params.type == "horizontal")
                        {
                            $(wislider.temp.object).css({marginLeft: '-' + wislider.nToObject(n) + 'px'});
                        }
                        wislider.shineNav(n);
                        wislider.reorderArrows(n);
                        wislider.fakeBounds();
                        wislider.updateArrows();
                    }
                },
                'fakeBounds' : function()
                {
                    if((wislider.temp.nextObject - 2) == wislider.temp.stepLength)
                    {
                        wislider.goToObject(1);
                    }
                    if(wislider.temp.previousObject == -1)
                    {
                        wislider.goToObject(wislider.temp.stepLength);
                    }
                },
                'checkInfinite' : function(n)
                {
                    if(!params.infinite)
                    {
                        if(wislider.nToObject(n) <= 0)
                        {
                            return false;
                        }
                        if(wislider.nToObject(n) > wislider.nToObject(wislider.temp.stepLength))
                        {
                            return false;
                        }                        
                        return true;
                    } else {
                        return true;
                    }
                },
                'updateArrows' : function()
                {
                    if(!params.infinite)
                    {
                        if(wislider.temp.nextObject > wislider.temp.stepLength)
                        {
                            $(params.arrowNext).addClass(wislider.wrapType(params.disabledArrowClass)[1]);
                        } else {
                            $(params.arrowNext).removeClass(wislider.wrapType(params.disabledArrowClass)[1]);
                        }
                        if(wislider.temp.previousObject == 0)
                        {
                            $(params.arrowPrev).addClass(wislider.wrapType(params.disabledArrowClass)[1]);
                        } else
                        {
                            $(params.arrowPrev).removeClass(wislider.wrapType(params.disabledArrowClass)[1]);
                        }
                    }
                },
                'animateToObject' : function(n)
                {
                    if(wislider.checkInfinite(n))
                    {
                        if(params.type == "vertical")
                        {
                            $(wislider.temp.object).stop().animate({
                                marginTop: '-' + wislider.nToObject(n) + 'px'
                            }, {duration: wislider.temp.adjustedSpeed, ease: params.slideEase, complete: function(){
                                wislider.shineNav(n);
                                wislider.reorderArrows(n);
                                wislider.fakeBounds();
                                wislider.updateArrows();
                            }});
                        } else if(params.type == "horizontal")
                        {
                            $(wislider.temp.object).stop().animate({
                                marginLeft: '-' + wislider.nToObject(n) + 'px'
                            }, {duration: wislider.temp.adjustedSpeed, ease: params.slideEase, complete: function(){
                                wislider.shineNav(n);
                                wislider.reorderArrows(n);
                                wislider.fakeBounds();
                                wislider.updateArrows();
                            }});
                        }
                    }
                },
                'autoSlideController' : function()
                {
                    if(params.infinite)
                    {
                        if(params.pauseOnHover)
                        {
                            $(wislider.temp.object).parent().on({
                                mouseenter: function() {
                                    clearInterval( $(this).data('timer') );
                                },
                                mouseleave: function() {
                                    $(this).data('timer', setInterval(function () {
                                        if(params.animate)
                                        {
                                            wislider.animateToObject(wislider.temp.nextObject);
                                        } else {
                                            wislider.goToObject(wislider.temp.nextObject);
                                        }
                                    }, params.waitTime));
                                }
                            }).trigger('mouseleave');
                        } else
                        {
                            $(this).data('timer', setInterval(function () {
                                if(params.animate)
                                {
                                    wislider.animateToObject(wislider.temp.nextObject);
                                } else {
                                    wislider.goToObject(wislider.temp.nextObject);
                                }
                            }, params.waitTime));                        
                        }
                    }
                }
            };

            this.each(function(){
                wislider.setConfig(this);
                wislider.setFakeBounds();
                wislider.createArrows();
                wislider.arrowsController();
                wislider.createNavi();
                wislider.naviController();
                if(params.auto) { wislider.autoSlideController(); }
                wislider.goToObject(params.startAt);
            });
        };
        
        
        
})( jQuery );
