/**
 * Generate Wallpaper Now jQuery Plugin
 * It allows the creation of an image through a set of parameters
 */
;
(function($, window, document, undefined) {

    "use strict";

    var pluginName = "genWallNow",
        defaults = {
            width: "720px",
            height: "1280px",
            backgroundColor: "#000000",
            patternStyle: "style1",
            arcRadius: 25,
            randomSize: true,
            colorAlphaRandom: true,
            fillStyle: "#ffffff",
            strokeStyle: '#ffffff',
            strokes: true,
            lineWidth: 15,
            randomLineWidth: true,
            numberIterations: 1500,
            monochromatic: false,
            randomPosition: true
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            this.initialize();
        },
        initialize: function() {

            // controll the size of the canvas relative to the windows

            var simpleWidth = this.settings.width.replace("px", "");
            var simpleHeight = this.settings.height.replace("px", "");

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            if (parseInt(windowHeight) - 100 < parseInt(simpleHeight)) {
                var showHeight = parseInt(windowHeight) - 100;
                var showWidth = (parseInt(windowHeight) - 100) * parseInt(simpleWidth) / parseInt(simpleHeight);
            } else {
                var showHeight = parseInt(simpleHeight);
                var showWidth = parseInt(simpleWidth);
            }

            var newMarginLeft = (parseInt(showWidth) / 2) * -1;
            var newMarginTop = (parseInt(showHeight) / 2) * -1;

            this.element.setAttribute('width', simpleWidth);
            this.element.setAttribute('height', simpleHeight);

            // setup default style

            $(this.element).css({
                marginLeft: newMarginLeft,
                marginTop: newMarginTop,
                width: showWidth,
                height: showHeight,
                display: "block"
            });

            var canvas = this.element.getContext("2d");
            canvas.imageSmoothingEnabled = true;
            canvas.fillStyle = this.settings.backgroundColor;
            canvas.fillRect(0, 0, simpleWidth, simpleHeight);

            // get pattern to draw

            var patternStyle = this.settings.patternStyle;

            switch (patternStyle) {
                case "style1":
                    this.drawStyle1();
                    break;
                case "style2":
                    this.drawStyle2();
                    break;
                default:
                    this.drawStyle1();
            }

        },
        getRandomColor: function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        convertHex: function(hex, opacity) {
            var hex = hex.replace('#', '');
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);

            var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
            return result;
        },
        drawStyle1: function() {
            // circles

            var simpleWidth = this.settings.width.replace("px", "");
            var simpleHeight = this.settings.height.replace("px", "");

            var canvas = this.element.getContext('2d');
            canvas.imageSmoothingEnabled = true;
            var radius = this.settings.arcRadius;
            var fillStyle = this.settings.fillStyle;
            var lineWidth = this.settings.lineWidth;
            var strokeStyle = this.settings.strokeStyle;
            var strokes = this.settings.strokes;
            var numberIterations = this.settings.numberIterations;
            var monochromatic = this.settings.monochromatic;
            var randomLineWidth = this.settings.randomLineWidth;
            var randomSize = this.settings.randomSize;
            var randomPosition = this.settings.randomPosition;
            var newXPosition = 0;
            var newYPosition = 0;


            var positionX;
            var positionY;

            for (var i = 0; i < numberIterations; i++) {

                fillStyle = this.settings.fillStyle;
                radius = this.settings.arcRadius;

                if (randomPosition == true) {
                    positionX = Math.floor((Math.random() * simpleWidth) + 1);
                    positionY = Math.floor((Math.random() * simpleHeight) + 1);
                } else {
                    /*positionX = newXPosition;
                    positionY = newYPosition;*/
                }



                if (randomSize == true) {
                    radius = Math.floor((Math.random() * radius) + 1);
                }

                canvas.beginPath();
                canvas.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);

                if (monochromatic == true) {
                    if (this.settings.colorAlphaRandom == true) {
                        var randomAlpha = Math.floor((Math.random() * 100) + 1);
                        fillStyle = this.convertHex(fillStyle, randomAlpha);
                        strokeStyle = this.convertHex(strokeStyle, randomAlpha);
                    }

                    if (strokes == true) {
                        if (randomLineWidth == true) {
                            lineWidth = Math.floor((Math.random() * lineWidth) + 0);
                        }
                        canvas.lineWidth = lineWidth;
                        canvas.strokeStyle = strokeStyle;
                        canvas.stroke();
                    }

                    canvas.fillStyle = fillStyle;

                } else {
                    fillStyle = this.getRandomColor();
                    strokeStyle = this.getRandomColor();

                    if (this.settings.colorAlphaRandom == true) {
                        var randomAlpha = Math.floor((Math.random() * 100) + 1);
                        fillStyle = this.convertHex(fillStyle, randomAlpha);
                        strokeStyle = this.convertHex(strokeStyle, randomAlpha);
                    }

                    if (strokes == true) {
                        if (randomLineWidth == true) {
                            lineWidth = Math.floor((Math.random() * lineWidth) + 0);
                        }
                        canvas.lineWidth = lineWidth;
                        canvas.strokeStyle = strokeStyle;
                        canvas.stroke();
                    }

                    canvas.fillStyle = fillStyle;
                }


                canvas.fill();

            };


        },
        drawStyle2: function() {
            /*var ctx = this.element.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.font = "20px Georgia";
            ctx.fillText(this.settings.text, 10, 50);*/

            /*var ctx = this.element.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(0,0,150,75);*/
        }
    });

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
