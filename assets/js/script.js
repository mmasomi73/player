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
    wavesurfer.load('mp3/1.mp3');
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