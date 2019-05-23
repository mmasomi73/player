$('input[type="text"]').focus(function () {
    $( "<div class='input-border'></div>" )
});
$(document).ready(function() {
    // Waves.attach('.waves-float', ['waves-float']);
    // Waves.attach('.waves-circle', ['waves-circle']);
    Waves.init();
    $('.background').particleground({
        dotColor: '#cacaca',
        lineColor: '#cacaca',
        particleRadius: 3
    });
    $('.intro').css({
        'margin-top': -($('.intro').height() / 2)
    });

    $(".playlist-list").niceScroll({
        cursorcolor:"#ffffff",
        cursorwidth: "5px",
        autohidemode: false,
        touchbehavior: true,
        emulatetouch: true,
    });
});