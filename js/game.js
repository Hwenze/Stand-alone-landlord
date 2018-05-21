$(function () {

    $('.btn_play').click(function () {
        $(this).hide();
        $('.play_bg1').animate({left:'-1000px'},2000);
        $('.play_bg2').animate({right:'-1000px'},2000);
        setTimeout(function () {
            $('.play_beginbg').css({display:'none'});
        },2000)
    });


    Game_play();


    let AI=true;
    let timerOne;
    let tip=[];
    //玩家数据
    let play=[
        {poker:[],role:0,score:1000},
        {poker:[],role:0,score:1000},
        {poker:[],role:0,score:1000}
        ];
    //游戏对象数据
    let game={'present':'-1'};
    let select_poker={
        'type':0,
        'max':0,
        'list':[]
    };
    // 设置一个变量对象，用于保存游戏中桌面上牌的数据
    let desktop={
        'type':0,
        'max':0,
        'list':[]
    };
    function Game_play() {
        //创建li
        for(let i=0;i<54;i++){
            $li = $('<li />');
            $li.attr('class','back').css({top:-i+'px'});
            $('.all_poker').append($li);
        }
        // 初始化扑克数据
        let all_poker=[];
        for(let i=1;i<14;i++){
            for(let j=0;j<4;j++){
                all_poker.push({number:i,color:j})
            }
        }
        all_poker.push({number:14,color:0});
        all_poker.push({number:14,color:1});
        $('.play_game').click(function () {
            bg_music('src="mp3/bgmusic.mp3"');
            // console.log(123)
            $(this).toggle();
            cleanPoker();
        });
        //定义洗牌方法
        function cleanPoker() {
            // 对扑克数据进行排序的打乱
            for(let i=0;i<3;i++){
                all_poker.sort(function (x,y) {
                    return Math.random()-0.5;
                });
            }
            let $all_poker=$('.all_poker');
            $('.all_poker').remove();

            let ul='';
            ul +='<ul class="all_poker" style="right:0; left:0">';
            for( let i=0;i<=54; i++){
                ul +='<li class="back" style="right:0; left: 0;"></li>'
            }
            //洗牌动画
            ul +='</ul>';
            $('.mid_top').append(ul);
            let p=54;
            //动画效果
            let anim3 = setInterval(function(){
                $('.all_poker li').eq(p).css({
                    'left':-p*10+250+'px',
                    'transform-origin': '0px,0px',
                    'transition':'0.5s'
                });
                p--;
                if (p<0) {
                    clearInterval(anim3);
                }
            },50);
            setTimeout(function () {
                p=54;
                let anim3 = setInterval(function(){
                    $('.all_poker li').eq(p).css({
                        'transform':'scale3d(1,1,0) rotate(720deg) translateY(400px) ',
                        'transform-origin': '0,0px',
                        'transition':'2.5s'
                    });
                    p--;
                    if(p<0){
                        clearInterval(anim3);
                    }
                },50)
            },3000);

            setTimeout(function () {
                p = 54;
                let anim3 = setInterval(function(){
                    $('.all_poker li').eq(p).css({
                        'transform':'translateX(0) ',
                        'transform-origin': '0,0px',
                        'transition':'0.5s'
                    });
                    p--;
                    if (p<0) {
                        clearInterval(anim3);
                    }
                },50);
            },9000);
            setTimeout(function(){
                $('.all_poker').remove();
                $('.mid_top').append($all_poker);
                deal();
            },12500);
        }

        //给玩家发牌方法和排序
        function deal(num) {
            num=num||0;
            //发个左边玩家
            setTimeout(function () {
                play[0].poker.push(all_poker.pop());
                $('.all_poker li:last').animate({left:"-500px"},20);
                setTimeout(function () {
                    $('.all_poker li:last').remove();
                    // 把玩家得到的牌生成到对应的位置上，并且进行调整
                    poker_html = makePoker(play[0].poker[play[0].poker.length-1]);        // 调用生成牌面的方法
                    $('.play').eq(0).append(poker_html);
                    $('.play:eq(0) li:last').css({top:num*30+60+'px' });
                },25);
            },30);

            //给中间玩家发牌
            setTimeout(function () {
                play[1].poker.push(all_poker.pop());
                $('.all_poker li:last').animate({top:"600px"},100);
                setTimeout(function () {
                    $('.all_poker li:last').remove();
                    // 把玩家得到的牌生成到对应的位置上，并且进行调整
                    poker_html = makePoker(play[1].poker[play[1].poker.length-1]);        // 调用生成牌面的方法
                    $('.play').eq(1).append(poker_html);
                    $('.play:eq(1) li:last').css({'left':num*30+'px'});
                    $('.play:eq(1)').css({'left':-num*15+'px'})
                },25);
            },30);

            //给右边玩家发牌
            setTimeout(function () {
                play[2].poker.push(all_poker.pop());
                $('.all_poker li:last').animate({left:"500px"},100);
                // 把玩家得到的牌生成到对应的位置上，并且进行调整
                setTimeout(function () {
                    $('.all_poker li:last').remove();
                    poker_html = makePoker(play[2].poker[play[2].poker.length-1]);
                    $('.play').eq(2).append(poker_html);
                    $('.play:eq(2) li:last').css({top:num*30+60+'px'});

                    if(++num<17){
                        deal(num);
                    }else{
                        $('.play:eq(0) li').remove();
                        play[0].poker=pokerSort1(play[0].poker);
                        for(let i=0;i<play[0].poker.length;i++){
                            poker_html = makePoker(play[0].poker[i]);
                            $('.play:eq(0)').append(poker_html);
                            $('.play:eq(0) li:last').animate({top:i*30+60+'px'},30);
                        }

                        $('.play:eq(1) li').remove();
                        play[1].poker=pokerSort1(play[1].poker);
                        for(let i=0;i<play[1].poker.length;i++){
                            poker_html = makePoker(play[1].poker[i]);
                            $('.play:eq(1)').append(poker_html);
                            $('.play:eq(1) li:last').animate({left:i*30+'px'},30)
                        }

                        $('.play:eq(2) li').remove();
                        play[2].poker=pokerSort1(play[2].poker);
                        for(let i=0;i<play[2].poker.length;i++){
                            poker_html = makePoker(play[2].poker[i]);
                            $('.play:eq(2)').append(poker_html);
                            $('.play:eq(2) li:last').animate({top:i*30+60+'px'},30)
                        }

                        // 地主牌移动的动画
                        $('.all_poker li').eq(0).animate({'left':'-200px'}, 500).animate({'top':'-250px'}, 500);
                        $('.all_poker li').eq(1).animate({'left':'200px'}, 500).animate({'top':'-250px'}, 500);
                        $('.all_poker li').eq(2).animate({'left':'0px'}, 500).animate({'top':'-250px'}, 500);

                        getLandlord();
                    }
                },25)
            },30)
        }
        //分陪地主
        function getLandlord(start,number) {
            if(start==undefined){
                start=Math.round(Math.random()*(2+1)+(0-0.5));
            }
            number=number||1;

            $('.play_btn1').hide();
            $('.play_btn1').eq(start).show();
            $('.play_btn1:eq('+start+') .get').click(function () {
                music('src="mp3/jiaodizhu.mp3"',1500);
                switch (start){
                    case 0:
                        play[0].role=1;
                        play[0].poker=play[0].poker.concat(all_poker);
                        $('.name').eq(start).css({background:'url("./images/people2.png") no-repeat top center'});
                        $('.play_id').eq(start).text('地主');
                        getLandlordPoker(0);
                        break;
                    case 1:
                        play[1].role=1;
                        play[1].poker=play[1].poker.concat(all_poker);
                        $('.name').eq(start).css({background:'url("./images/people2.png") no-repeat top center'});
                        $('.play_id').eq(start).text('地主');
                        getLandlordPoker(1);
                        break;
                    case 2:
                        play[2].role=1;
                        play[2].poker=play[2].poker.concat(all_poker);
                        $('.name').eq(start).css({background:'url("./images/people2.png") no-repeat top center'});
                        $('.play_id').eq(start).text('地主');
                        getLandlordPoker(2);
                        break;
                }
            });

            $('.play_btn1:eq('+start+') .noget').click(function () {
                // alert('不抢地主');
                music('src="mp3/buqiang.mp3"',1000);
                start=(++start>2)?0:start;
                if (++number>3){
                    $('#landlord').css({display:'block'});
                    $('.text1 button').click(function () {
                        window.location.reload();
                    });
                    return;
                }else {
                    getLandlord(start,number)
                }
            });
        }


        //定义获取地主的方法
        function getLandlordPoker(play_index) {
            $('.all_poker li').remove();
            $('.play_btn1').css({display:'none'});

            for(let i=0;i<3;i++){
                poker_html = makePoker(all_poker[i]);
                $('.all_poker').append(poker_html);
                if(play_index==0){
                    setTimeout(function () {
                        $('.play:eq(0) li').remove();
                        play[0].poker=pokerSort1(play[0].poker);
                        for(let j=0;j<play[0].poker.length;j++){
                            poker_html=makePoker(play[0].poker[j]);
                            $('.play:eq(0)').append(poker_html);
                            $('.play:eq(0) li:last').css({top:j*30-10+'px'});
                            $('.play:eq(0)').css({top:j*2+'px'});
                        }
                    },700);
                }else if(play_index==1){
                    setTimeout(function () {
                        $('.play:eq(1) li').remove();
                        play[1].poker=pokerSort1(play[1].poker);
                        for(let j=0;j<play[1].poker.length;j++){
                            poker_html=makePoker(play[1].poker[j]);
                            $('.play:eq(1)').append(poker_html);
                            $('.play:eq(1) li:last').css({left:j*30+'px'});
                        }
                    },700);
                }else if(play_index==2){
                    setTimeout(function () {
                        $('.play:eq(2) li').remove();
                        play[2].poker=pokerSort1(play[2].poker);
                        for(let j=0;j<play[2].poker.length;j++){
                            poker_html=makePoker(play[2].poker[j]);
                            $('.play:eq(2)').append(poker_html);
                            $('.play:eq(2) li:last').css({top:j*30-10+'px'});
                            $('.play:eq(2)').css({top:j*2+'px'});
                        }
                    },700);
                }
            }
            $('.all_poker li').eq(0).css({'left':'-200px','top':'-250px'});
            $('.all_poker li').eq(1).css({'left':'200px','top':'-250px'} );
            $('.all_poker li').eq(2).css({'left':'0px','top':'-250px'});

            game.present = play_index;
            setTimeout(function () {
                startGame();
            },1000);
        }

        function startGame(cancel_num) {
            cancel_num=cancel_num;
            $('.play_btn2').hide();
            $('.play_btn2').eq(game.present).find('.pass').show();
            if(cancel_num==-1||cancel_num>1){
                $('.play_btn2').eq(game.present).show();
                $('.play_btn2').eq(game.present).find('.pass').hide();
                cancel_num = 0;
            }else {
                $('.play_btn2').eq(game.present).show();
            }
            presentClick();
        }
        let timer=0;
        //倒计时
        function timerPass() {
            let num=15;
            clearInterval(timer);
            timer=setInterval(function () {
                $('.play_btn2').hide();
                $('.play_btn2').eq(game.present).show();
                if(num<0){
                    $('.play_btn2').eq(game.present).find('.pass').click();
                    $('.play_btn2').eq(game.present).find('.countDown span').text(num--);
                }else {
                    $('.play_btn2').eq(game.present).find('.countDown span').text(num--);
                }
            },1000)
        }
        function presentClick() {
            clearInterval(timer);
            timerPass();
            $('.play').eq(game.present).on('click','li',function () {
               let str=$(this).attr('data-poker');
                let arr = str.split('_');
                let poker = {'number':arr[0], 'color':arr[1]};

                // 通过样式来判断需要选择牌还是取消选择
                if('.play:eq('+game.present+')'=='.play:eq(0)'){
                    if($(this).attr('class')=='leftse'){
                        $(this).removeClass('leftse');
                        //遍历数组得到当前数据一致元素的下标
                        for(let i=0;i<select_poker.list.length;i++){
                            if(select_poker.list[i].number==poker.number&&
                                select_poker.list[i].color==poker.color){
                                select_poker.list.splice(i,1);
                                break;//中断当前语句
                            }
                        }
                    }else {
                        $(this).addClass('leftse');
                        select_poker.list.push(poker);
                    }
                }else if('.play:eq('+game.present+')'=='.play:eq(1)'){
                    if($(this).attr('class')=='select'){
                        $(this).removeClass('select');
                        //遍历数组得到当前数据一致元素的下标
                        for(let i=0;i<select_poker.list.length;i++){
                            if(select_poker.list[i].number==poker.number&&
                                select_poker.list[i].color==poker.color){
                                select_poker.list.splice(i,1);
                                break;//中断当前语句
                            }
                        }
                    }else {
                        $(this).addClass('select');
                        select_poker.list.push(poker);
                    }
                }else if('.play:eq('+game.present+')'=='.play:eq(2)'){
                    if($(this).attr('class')=='rightse'){
                        $(this).removeClass('rightse');
                        //遍历数组得到当前数据一致元素的下标
                        for(let i=0;i<select_poker.list.length;i++){
                            if(select_poker.list[i].number==poker.number&&
                                select_poker.list[i].color==poker.color){
                                select_poker.list.splice(i,1);
                                break;//中断当前语句

                            }
                        }
                    }else {
                        $(this).addClass('rightse');
                        // console.log(select_poker.list);
                        select_poker.list.push(poker);
                    }
                }
            });


            //出牌按钮
            $('.play_btn2').eq(game.present).on('click','.push',function () {
                $('.push').show();
                if(select_poker.list.length==0){
                    $('.cartoon_pic').show();
                    $('.on').show().siblings().hide();
                    setTimeout(function () {
                        $('.cartoon_pic').hide();
                    },1000);
                }else {
                    // select_poker.list
                    if(checkPoker(select_poker)&&checkVS(select_poker,desktop)){
                        cancel_num=0;

                        desktop.type=select_poker.type;
                        desktop.max =select_poker.max;
                        desktop.list=[];

                        for(let i=0;i<select_poker.list.length;i++){
                            desktop.list[i]={};
                            desktop.list[i].number=select_poker.list[i].number;
                            desktop.list[i].color=select_poker.list[i].color;
                        }

                        $('.table_poker li').remove();
                        for(let i=0;i<desktop.list.length;i++){
                            let li=makePoker(desktop.list[i]);
                            $('.table_poker').append(li);
                            $('.table_poker li:last').css({'left':i*35+'px'});
                            $('.table_poker').css({left:'0',right:'0',margin:'0 auto 0'});
                        }

                        switch(game.present){
                            case 0:
                                removArr(play[0].poker,select_poker);
                                break;
                            case 1:
                                removArr(play[1].poker,select_poker);
                                break;
                            case 2:
                                removArr(play[2].poker,select_poker);
                                break;
                        }

                        // 2、清空玩家的手牌数据
                        select_poker.type = 0;
                        select_poker.max = 0;
                        select_poker.list = [];

                        if(game.present==0){
                            setTimeout(function () {
                                $('.play:eq(0) li').remove();
                                play[0].poker=pokerSort1(play[0].poker);
                                for(let j=0;j<play[0].poker.length;j++){
                                    poker_html=makePoker(play[0].poker[j]);
                                    $('.play:eq(0)').append(poker_html);
                                    $('.play:eq(0) li:last').css({top:j*30-10+'px'});
                                    $('.play:eq(0)').css({top:j*2+'px'});
                                }
                            },20);
                        }else if(game.present==1){
                            setTimeout(function () {
                                $('.play:eq(1) li').remove();
                                play[1].poker=pokerSort1(play[1].poker);
                                for(let j=0;j<play[1].poker.length;j++){
                                    poker_html=makePoker(play[1].poker[j]);
                                    $('.play:eq(1)').append(poker_html);
                                    $('.play:eq(1) li:last').css({left:j*30+'px'});
                                }
                            },20);
                        }else if(game.present==2){
                            setTimeout(function () {
                                $('.play:eq(2) li').remove();
                                play[2].poker=pokerSort1(play[2].poker);
                                for(let j=0;j<play[2].poker.length;j++){
                                    poker_html=makePoker(play[2].poker[j]);
                                    $('.play:eq(2)').append(poker_html);
                                    $('.play:eq(2) li:last').css({top:j*30-10+'px'});
                                    $('.play:eq(2)').css({top:j*2+'px'});
                                }
                            },20);
                        }
                        bunko(play);
                        // 把出牌权给下一个位玩家
                        game.present = (++game.present > 2)? 0: game.present;
                        $('.play').eq(game.present).off('click','li');
                        $('.play_btn2').eq(game.present).off();
                        timerOne=animate();
                        // setTimeout(function(){
                        startGame(cancel_num);
                        // },time);
                    }else{
                        // alert('你所选择的牌不符合规则');
                        $('.cartoon_pic').show();
                        $('.inconformity').show().siblings().hide();
                        setTimeout(function () {
                            $('.cartoon_pic').hide();
                        },1000);
                    }
                }
            });

            //不出按钮
            $('.play_btn2').eq(game.present).on('click','.pass',function () {
                $(this).unbind();
                music('src="mp3/pass.mp3"',1000);

                $('.cartoon_pic').show();
                $('.no').show().siblings().hide();
                setTimeout(function () {
                    $('.cartoon_pic').hide();
                },1000);
                $('.play:eq('+game.present+') li').removeClass();

                // 2、清空玩家的手牌数据
                select_poker.type = 0;
                select_poker.max = 0;
                select_poker.list = [];

                if(game.present==0){
                    setTimeout(function () {
                        $('.play:eq(0) li').remove();
                        play[0].poker=pokerSort1(play[0].poker);
                        for(let j=0;j<play[0].poker.length;j++){
                            poker_html=makePoker(play[0].poker[j]);
                            $('.play:eq(0)').append(poker_html);
                            $('.play:eq(0) li:last').css({top:j*30-10+'px'});
                            $('.play:eq(0)').css({top:j*2+'px'});
                        }
                    },20);
                }else if(game.present==1){
                    setTimeout(function () {
                        $('.play:eq(1) li').remove();
                        play[1].poker=pokerSort1(play[1].poker);
                        for(let j=0;j<play[1].poker.length;j++){
                            poker_html=makePoker(play[1].poker[j]);
                            $('.play:eq(1)').append(poker_html);
                            $('.play:eq(1) li:last').css({left:j*30+'px'});
                        }
                    },20);
                }else if(game.present==2){
                    setTimeout(function () {
                        $('.play:eq(2) li').remove();
                        play[2].poker=pokerSort1(play[2].poker);
                        for(let j=0;j<play[2].poker.length;j++){
                            poker_html=makePoker(play[2].poker[j]);
                            $('.play:eq(2)').append(poker_html);
                            $('.play:eq(2) li:last').css({top:j*30-10+'px'});
                            $('.play:eq(2)').css({top:j*2+'px'});
                        }
                    },20);
                }

                // 把出牌权给下一个位玩家
                game.present = (++game.present > 2)? 0: game.present;
                cancel_num +=1;

                if(cancel_num > 1) {
                    desktop.type = 0;
                    desktop.max = 0;
                    desktop.list = [];
                    $('.pass').hide();
                }




                $('.play_btn2').eq(game.present).off();
                $('.play').eq(game.present).off('click','li');
                $('.play:eq('+game.present+') li').off();

                startGame(cancel_num);
            });
            //提示按钮
            $('.play_btn2').eq(game.present).on('click','.prompt',function (){
                tip = tipPoker();
                for(let i=0;i<tip.length;i++){
                    $('.play').eq(game.present).find('li:eq('+tip[i]+')').click();
                }
            });
            //简单的AI
            if(game.present !=1&&AI ==true){
                    $('.play_btn2').eq(game.present).find('.prompt').click();
                if(tip.length==0){
                    setTimeout(function () {
                        $('.play_btn2').eq(game.present).find('.pass').click();
                    },2000)
                }else {
                    setTimeout(function () {
                        $('.play_btn2').eq(game.present).find('.push').click();
                    },2000)
                }
            }

        }
        //提示
        function tipPoker() {
            function getNumber(){
                if(tip.length == 0){
                    let number = 0;
                    return number;
                }else{
                    let number = Number(tip[0])+1;
                    tip = [];
                    return number;
                }
            }
            $('.play:eq('+game.present+') li').removeClass();
            select_poker.type = 0;
            select_poker.max = 0;
            select_poker.list = [];
            // play[game.present].poker=pokerSort1(play[game.present].poker);
            switch (desktop.type)
            {
                case 0:
                    if(tip.length==0){
                        tip.push(0);
                    }
                    break;
                //单张
                case 1:
                    if(desktop.max*1 == 14 && play[game.present].poker[play[game.present].poker.length-1].number*1 == 14 &&
                        play[game.present].poker[play[game.present].poker.length-1].color*1 == 1
                    ){
                        tip.push(play[game.present].poker.length-1);
                        break;
                    }

                    for(let i = getNumber() ; i < play[game.present].poker.length;i++) {
                        if(desktop.max < play[game.present].poker[i].number*1) {
                            tip.push(i);
                            break;
                        }
                    }
                    break;
                //对子
                case 2:
                    for(let i=getNumber();i< play[game.present].poker.length-1;i++){
                        if(desktop.max<play[game.present].poker[i].number*1 && play[game.present].poker[i].number==play[game.present].poker[i+1].number*1){
                            tip.push(i);
                            tip.push(i+1);
                            break;
                        }
                    }
                    break;
                //3张
                case 3:
                    for(let i=getNumber();i< play[game.present].poker.length-2;i++){
                        if(desktop.max<play[game.present].poker[i].number*1 && play[game.present].poker[i].number==play[game.present].poker[i+2].number*1){
                            tip.push(i,i+1,i+2);
                            // tip.push(i+2);
                            break;
                        }
                    }
                    break;
                //3带1
                case 4:
                    for(let i=getNumber();i< play[game.present].poker.length-2;i++){
                        if(desktop.max<play[game.present].poker[i].number*1 && play[game.present].poker[i].number==play[game.present].poker[i+2].number*1){
                            if(play[game.present].poker.length-1==i+2){
                                tip.push(i,i+1,i+2,3);
                            }else {
                            tip.push(i,i+1,i+2,0);
                                    break;
                            }
                        }
                    }
                    break;
                //3带2
                case 5:
                    for(let i=getNumber();i< play[game.present].poker.length-2;i++){
                        if(desktop.max<play[game.present].poker[i].number*1 && play[game.present].poker[i].number==play[game.present].poker[i+2].number*1){
                            for(let j=0;j<play[game.present].poker.length-1;j++){
                                if(play[game.present].poker[j].number==play[game.present].poker[j+1].number*1 &&i != j && i+1 != j && i+2 != j){
                                    tip.push(i,i+1,i+2);
                                    tip.push(j,j+1);
                                   return tip;
                                }
                            }
                        }
                    }
                    break;
                 // 顺子
                case 6:
                    for(let i=getNumber(); i<play[game.present].poker.length-desktop.list.length; i++){
                        if(play[game.present].poker[i].number > desktop.max){
                            let arr = [];
                            arr.push(i);		// 先把当前牌的下标保存起来  [3,5,6]
                            for(let j = i+1; j<play[game.present].poker.length; j++){
                                if(play[game.present].poker[j].number-1 == play[game.present].poker[arr[arr.length-1]].number&&
                                    play[game.present].poker[j].number!=14*1&&play[game.present].poker[j].number!=13*1){
                                    arr.push(j);	//2
                                    if(arr.length == desktop.list.length){
                                        return arr;
                                    }
                                }
                            }
                        }
                    }
                    break;
                    //连队

                case 22:
                    for(let i=getNumber(); i<play[game.present].poker.length-1; i++){
                        if(play[game.present].poker[i].number > desktop.max && play[game.present].poker[i].number == play[game.present].poker[i+1].number){
                            // 3444556677788
                            let arr = [];
                            arr.push(i,i+1);
                            for(let j=i+2; j<play[game.present].poker.length-1; j++){
                                if(play[game.present].poker[j].number-1 ==  play[game.present].poker[arr[arr.length-1]].number &&
                                    play[game.present].poker[j].number == play[game.present].poker[j+1].number){

                                    arr.push(j, j+1);
                                    if(arr.length == desktop.list.length){
                                        return arr;
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
            return tip;
        }

        function music(obj,time){
            $('.bgm').html('<audio id="BGM" '+obj+' controls preload="auto" autoplay="autoplay"></audio>');
            setTimeout(function(){
                $('#BGM').remove();
            },time);
        }
        function bg_music(obj) {
            $('.bg_music').html('<audio id="bg_music" '+obj+' controls preload="auto" autoplay="autoplay" loop></audio>')
        }
        //出牌音效与动画
        function animate(){
            switch(desktop.type){
                case 110:
                    // 王炸动画
                    $('.rocket').css({display:'block'});
                    setTimeout(function () {
                        $('.rocket').css({display:'none'});
                    },1000);
                    music('src="mp3/wangzha.mp3"',1500);
                    return 3000;
                    break;
                case 100:
                    // 炸弹动画
                    $('.bomb').css({display:'block'});
                    setTimeout(function () {
                        $('.bomb').css({display:'none'});
                    },1000);
                    music('src="mp3/zhadan.mp3"',1500);
                    return 2000;
                    break;
                case 55:
                    //飞机动画
                    $('.plane').css({display:'block'});
                    $('.plane').animate({left:'-1000px'},2000);
                    setTimeout(function () {
                        $('.plane').css({display:'none'});
                    },2000);
                    music('src="mp3/feiji.mp3"',1500);
                    return 2000;
                    break;
                case 44:
                    //飞机动画
                    $('.plane').css({display:'block'});
                    $('.plane').animate({left:'-1000px'},2000);
                    setTimeout(function () {
                        $('.plane').css({display:'none'});
                    },2000);
                    music('src="mp3/feiji.mp3"',1500);
                    return 2000;
                    break;
                case 40:
                    //飞机动画
                    $('.plane').css({display:'block'});
                    $('.plane').animate({left:'-1000px'},2000);
                    setTimeout(function () {
                        $('.plane').css({display:'none'});
                    },2000);
                    music('src="mp3/feiji.mp3"',1500);
                    return 2000;
                    break;
                case 22:
                    //连对
                    $('.even').css({display:'block'});
                    setTimeout(function () {
                        $('.even').css({display:'none'});
                    },1000);
                    music('src="mp3/liandui.mp3"',1500);
                    return 2000;
                    break;
                case 6:
                    //顺子
                    $('.straight').css({display:'block'});
                    setTimeout(function () {
                        $('.straight').css({display:'none'});
                    },1000);
                    music('src="mp3/shunzi.mp3"',1500);
                    return 2000;
                    break;

                case 5:
                    //三带二
                    music('src="mp3/sde.mp3"',2000);
                    return 2000;
                    break;
                case 4:
                    //三带一
                    music('src="mp3/sdy.mp3"',2000);
                    return 2000;
                    break;
                case 3:
                    //三张
                    music('src="mp3/guanshang.mp3"',2000);
                    return 2000;
                    break;
                case 2:
                    //对子
                    music('src="mp3/dapai.mp3"',2000);
                    return 2000;
                    break;
                case 1:
                    //单张
                    console.log('music1123');
                    if(desktop.list[0].number == 1){
                        music('src="mp3/1.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 2){
                        music('src="mp3/2.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 3){
                        music('src="mp3/3.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 4){
                        music('src="mp3/4.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 5){
                        music('src="mp3/5.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 6){
                        music('src="mp3/6.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 7){
                        music('src="mp3/7.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 8){
                        music('src="mp3/8.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 9){
                        music('src="mp3/9.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 10){
                        music('src="mp3/10.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 11){
                        music('src="mp3/11.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 12){
                        music('src="mp3/12.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 13){
                        music('src="mp3/13.mp3"',2000);
                        return 1000;
                    }else if(desktop.list[0].number == 14){
                        if(desktop.list[0].color == 0){
                            music('src="mp3/14.mp3"',2000);
                            return 1000;
                        }else{
                            music('src="mp3/15.mp3"',2000);
                            return 1000;
                        }
                    }
                    break;
            }
        }

        //记分牌
        function bunko(obj) {
            if(obj[game.present].poker.length==0){
                if(obj[game.present]==1){

                    $('#bunko').show();
                    $('#bunko .text2 p span').text('地主赢');
                    // alert('地主赢')
                    $('.reopen').click(function () {
                        startGame();
                    });
                    $('.quit').click(function () {
                        window.close();
                    });
                }else {
                    $('#bunko').show();
                    $('#bunko .text2 p span').text('农民赢');
                    // alert('农民赢')
                    $('.reopen').click(function () {
                        startGame();
                    });
                    $('.quit').click(function () {
                        window.close();
                    });
                }
            }
        }
    }

});