$(document).ready(function() {

    $("#bt_generate").on('click', function(event) {
        event.preventDefault();
        generateImage();
    });

    $("#button_main_menu").on('click', function(event) {
        event.preventDefault();
        $("#main-aside").toggle();
    });

    $("#bt_save").on('click', function(event) {
        saveImage(this, 'main-canvas', 'genwallnow.png');
    });

});


function generateImage(target) {

    target = typeof target !== 'undefined' ? target : "#main-canvas";

    $(target).genWallNow({
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
        numberIterations: 1000,
        monochromatic: true,
        randomPosition: true
    });

}


function saveImage(link, canvasId, filename) {

    link = typeof link !== 'undefined' ? link : "#bt_save";
    canvasId = typeof canvasId !== 'undefined' ? canvasId : "main-canvas";
    filename = typeof filename !== 'undefined' ? filename : "genwallnow.png";

    var canvas = document.getElementById(canvasId);
    link.href = canvas.toDataURL();
    link.download = filename;
}
