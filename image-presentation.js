/**
 * Created by Ksenia Koldaeva on 5/29/17.
 */

//Creating config object to separate data from program execution
var _images = [
    {
        author: "Wai Lin Tse",
        source: "./Assets/wailintse.jpg",
        externalLink: "http://www.wailintse.com/"
    },
    {
        author: "Alasdair McLellan",
        source: "./Assets/allasdair-mclellan.jpeg",
        externalLink: "http://alasdairmclellan.com/"
    },
    {
        author: "TJ Tambellini",
        source: "./Assets/tj-tambellini-1.jpg",
        externalLink: "http://www.tj-tambellini.com/court-yard"
    },
    {
        author: "Matteo Motanari",
        source: "./Assets/161118-Zara-PrettyInPunk-MatteoMontari-05.jpg",
        externalLink: "http://www.matteomontanari.co/"
    },
    {
        author: "Ksenia Koldaeva",
        source: "./Assets/koldaeva-ksenia-2.jpg",
        externalLink: "http://somerolls.tumblr.com/"
    },
    {
        author: "Alasdair McLellan",
        source: "./Assets/alasdair-mcLellan.jpeg",
        externalLink: "http://alasdairmclellan.com/"
    },
    {
        author: "Wai Lin Tse",
        source: "./Assets/wailintse-2.jpg",
        externalLink: "http://www.wailintse.com/"
    },
    {
        author: "Jack Davison",
        source: "./Assets/jack-davison.jpg",
        externalLink: "http://www.jackdavison.co.uk/"
    },
    {
        author: "TJ Tambellini",
        source: "./Assets/tj-tambellini-3.jpg",
        externalLink: "http://www.tj-tambellini.com/court-yard"
    },

];

(function() {

    $(document).ready(function () {
        var imagePresentation = new ImagePresentation(_images);
        imagePresentation.init();
    });
    
    //create ImagePresentation Class
    function ImagePresentation(images) {
        this.images = images;
        this.jPresentationContainer = $('.row__presentation');
        this.jDetailsContainer = $('.row__details');
        this.jThumbsContainer = $('.row__thumbnails');
        this.jMeter = $('.meter');
    }

    //create API
    ImagePresentation.prototype = {

        /**
         * init() serves to execute methods inside the ImagePresentation class and builds layout with FOUR
         * key elements:
         *  presentation element - contains a master image twice as big as thumbnail image
         *  details element - contains an image title and link to photographer's portfolio
         *  thumbnails elements - small thumbnails at the bottom of the page
         *  meter line located behind all the elements
         */
        init: function () {
            this.jThumbsContainer.append(this.generateThumbnailsHtml());
            this.jPresentationContainer.append(this.generatePresentationHtml());
            this.jDetailsContainer.append(this.generateDetailsHtml());
            this.setMasterCss();
            this.setMeterCss();
            this.setDetailsCss();
            this.handleThumbnailHover();

        },

        /**
         * generateThumbnailsHtml() method
         * @returns an HTML {string}  containing all thumbnail elements built from the data in _images array.
         */
        generateThumbnailsHtml: function () {
            var thumbNailsHtml = '';

            this.images.forEach(function(image, index) {
                if(index === 0) {
                    thumbNailsHtml += '<div class="thumbnail selected">';
                } else {
                    thumbNailsHtml += '<div class="thumbnail">';
                }
                thumbNailsHtml += '<a class="thumbnail__content image__link" href="' + image.externalLink + '" target="_blank">' +
                                  '<img class="image__thumb" src="' + image.source + '" alt="photograph by ' + image.author + '">' +
                                  '</a></div>';
            });

            return thumbNailsHtml;
        },

        /**
         * generatePresentationHtml() method
         * Accepts @param image - for an image selected
         * @returns an HTML {string} containing HTML elements for the master image - twice as big as thumbnail image
         */
        generatePresentationHtml: function(image) {
            var presentationHtml = '<div class="master">',
                image = image ? image : this.images[0];

            presentationHtml += '<a class="presentation__content image__link" href="' + image.externalLink + '" target="_blank">' +
                                '<img class="image__master" src="' + image.source + '" alt="photograph by ' + image.author + '">' +
                                '</a></div>';


            return presentationHtml + '</div>';
        },

        /**
         * generateDetailsHtml() method
         * @returns an HTML {string} containing <div class="details__content"></div> element with details for every picture
         */
        generateDetailsHtml: function() {
            var imageIndex = this.getSelectedImageIndexBySrc(),
                image = this.images[imageIndex],
                detailsHtml = '<div class="details__content">';

            detailsHtml += '<h2 class="details__title"><span class="details__number">' + (imageIndex + 1) + '.</span>' +
                            'Photographed by ' + image.author + '</h2>' +
                            '<p class="attribution">Found <a class="attribution__link" href="' + image.externalLink + '">here.</a></p>';

            return detailsHtml + '</div>';
        },

        /**
         * handleThumbnailHover() contains an event listener that triggers HTML changes and CSS changes
         * when hovered on the thumbnails images.
         */
        handleThumbnailHover: function() {
            var self = this,
                jThumbnails = $('.thumbnail'),
                jMasterLink = $('.master .image__link'),
                jMasterImage = $('.master .image__master');


            jThumbnails.hover(function() {
                jThumbnails.each(function() {
                    if($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                });

                var jThumbnail = $(this),
                    newHref = jThumbnail.find('.image__link').attr('href'),
                    newSrc = jThumbnail.find('.image__thumb').attr('src'),
                    newAlt =  jThumbnail.find('.image__thumb').attr('alt');

                jThumbnail.addClass('selected');
                jMasterLink.attr('href', newHref);
                jMasterImage.attr('src', newSrc);
                jMasterImage.attr('alt', newAlt);

                self.jDetailsContainer.html(self.generateDetailsHtml());
                self.setMeterCss();
                self.setMasterCss();
                self.setDetailsCss();

            });
        },

        /**
         * getSelectedImageIndexBySr() is a helper method that serves as a glue between
         * selected thumbnail and an original _images data structure
         * @returns {number} selected image index in original _images data structure
         */
        getSelectedImageIndexBySrc: function() {
            var jSelectedThumb = $('.selected'),
                selectedImageIndex = 0;

            this.images.forEach(function(image, index) {
                if(image.source === jSelectedThumb.find('.image__thumb').attr('src')) {
                    selectedImageIndex = index;
                }
            });

            return selectedImageIndex;
        },

        /**
         * setMasterCss() method sets CSS including dimensions and position of the master image.
         */
        setMasterCss: function() {
            var jSelectedThumb = $('.selected'),
                thumbWidth = jSelectedThumb.outerWidth(),
                thumbHeight = jSelectedThumb.outerHeight(),
                jMaster = $('.master'),
                sideLine = this.geElementsOffset();

            jMaster.css({
                width:  2 * thumbWidth,
                height: 2 * thumbHeight,
                left: sideLine
            });
        },

        /**
         * setDetailsCss() method sets CSS for details block specifically its position.
         */
        setDetailsCss: function() {
            var jDetails = $('.details__content'),
                sideLine = this.geElementsOffset();

            jDetails.css({
                left: sideLine
            });
        },

        /**
         * setMeterCssCss() method sets CSS for the meter line
         * including its height and position
         */
        setMeterCss: function() {
            var jSelectedThumb = $('.selected'),
                windowHeight = $(window).height(),
                midLine = this.geElementsOffset() + jSelectedThumb.outerWidth() / 2,
                paddingTop = $('body').css('padding-top');

            this.jMeter.css({
                height: windowHeight + parseInt(paddingTop),
                left: midLine,
                top: "-" + paddingTop
            });

        },

        /**
         * geElementsOffset() is a helper method
         * @returns a numeric value for the selected thumbnail offset from the left
         */
        geElementsOffset: function() {
            return $('.selected').offset().left;
        }

    };
}());
