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
        emulatetouch: true
    });

    //------------------Player
    var wavesurfer = WaveSurfer.create({
        container: '.spectrum',
        waveColor:'#ffffff5e',
        progressColor:'#fff',
        cursorColor:'#fff',
        audioRate:1,
        height:100,
        skipLength:5,
        barGap:3,
        barWidth:3,
        cursorWidth:0,

        plugins: [
            WaveSurfer.cursor.create({
                showTime: true,
                opacity: 1,
                color:'#fff',
                customShowTimeStyle: {
                    'background-color': '#fff',
                    color: '#000',
                    padding: '2px',
                    'font-size': '10px'
                }
            })
        ]


    });

    //-----= Controllers
        //-----= Collector
    $('.track').click(function () {
        $('.track').removeClass('enable');
        $(this).addClass('enable');
        $('.player .title').text($(this).find('.title').text());
        wavesurfer.load('mp3/'+$(this).data('src'));
        $('.virtualizer .cover').attr('style',$(this).find('.cover').attr('style'));
        wavesurfer.on('ready', function () {

            wavesurfer.play();
            $('.controller .en').removeClass('en');
            $('.play').addClass('en');
        });

    });

        //-----= Control
    $('.play').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');
        wavesurfer.play();
    });
    $('.pause').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');
        wavesurfer.pause();
    });
    $('.stop').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');
        wavesurfer.stop();
    });
    $('.volume').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');

        if($(this).hasClass('mute')){
            $(this).removeClass('mute');
            wavesurfer.setMute(false);

        }else{
            $(this).addClass('mute');
            wavesurfer.setMute(true);
        }

    });
    $('.controller .repeat').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');

        if($(this).hasClass('on')){
            $(this).removeClass('on');
            wavesurfer.on('finish', function () {
                wavesurfer.stop();
            });

        }else{
            $(this).addClass('on');
            wavesurfer.on('finish', function () {
                wavesurfer.play();
            });
        }

    });
    $('.next').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');
        wavesurfer.skipForward();
    });
    $('.prev').click(function () {
        $('.controller .en').removeClass('en');
        $(this).addClass('en');
        wavesurfer.skipBackward();
    });

    //-----= PlayList
    $('.playlist-header .items').text('Items '+$('.track').length);
        //-----= First Init
    var first = $('.track').first();
    $('.track').removeClass('enable');
    $(first).addClass('enable');
    $('.player .title').text($(first).find('.title').text());
    wavesurfer.load('mp3/'+$(first).data('src'));
    $('.virtualizer .cover').attr('style',$(first).find('.cover').attr('style'));
    wavesurfer.on('ready', function () {
        $('.controller .en').removeClass('en');
        $('.play').addClass('en');
    });
    //-----= Events
        //-----= Timer & SeekBar
    setInterval(function(){
        //-----= Timer
        var time = wavesurfer.getCurrentTime();
        var total = wavesurfer.getDuration();
        var t,hor,min,sec;
        t = time;
        hor = parseInt(time) / 3600;
        min = parseInt((parseInt(time) % 3600)/60);
        sec = parseInt(time) % 60;
        if(min < 10) min = '0'+min;
        if(sec < 10) sec = '0'+sec;
        time = min+':'+sec

        if(total/ 3600 >= 1){
            time = hor+':'+time
        }
        $('.timer').text(time);

        //-----= SeekBar
        $('.prog').css('width',((t/total)*100)+'%');

    }, 1000);

        //SeekBar Click
    $(".seekbar").click(function(e){
        var parentOffset = $(this).offset();
        var clkX = e.pageX - parentOffset.left;
        var relX = $(this).width();
        $('.prog').css('width',((clkX/relX)*100)+'%');
        wavesurfer.seekTo((clkX/relX));
    });


});