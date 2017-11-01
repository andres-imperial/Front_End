var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var ONE_KEY = 49;
var TWO_KEY = 50;
var THREE_KEY = 51;
var FOUR_KEY = 52;
var FIVE_KEY = 53;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        var thumbnailArray = getThumbnailArray();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        } else if (event.keyCode === ONE_KEY) {
            setDetailsFromThumb(thumbnailArray[0]);
            showDetails();
        } else if (event.keyCode === TWO_KEY) {
            setDetailsFromThumb(thumbnailArray[1]);
            showDetails();
        } else if (event.keyCode === THREE_KEY) {
            setDetailsFromThumb(thumbnailArray[3]);
            showDetails();
        } else if (event.keyCode === FOUR_KEY) {
            setDetailsFromThumb(thumbnailArray[3]);
            showDetails();
        } else if (event.keyCode === FIVE_KEY) {
            setDetailsFromThumb(thumbnailArray[4]);
            showDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();
