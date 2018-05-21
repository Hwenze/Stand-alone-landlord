function makePoker(poker_data){
    let color_arr=[
        [-387,0],[-258,0],[-129,0],[0,0]
];
let x=0;
let y=0;
if(poker_data.number<14){
    x=color_arr[poker_data.color][0];
    y=color_arr[poker_data.color][1];
    // console.log(x,y)
}else {
    if (poker_data.color==0){
        x= -129;
        y= 0;
    }else {
        x= 0;
        y= 0;
    }
}
let html = '<li data-poker="'+poker_data.number+'_'+poker_data.color+'" style="width: 128px; height: 176px;border-radius: 5px; background: url(./images/'+poker_data.number+'.png) '+x+'px '+y+'px;"></li>';
return html;
}

// 扑克数组进行排序的方法
function pokerSort( poker_list ){
    poker_list.sort(function(x, y){
        if( x.number == y.number){
            return y.color-x.color;
        }else{
            return y.number-x.number;
        }
    });
    return poker_list;
}
function pokerSort1( poker_list ){
    poker_list.sort(function(x, y){
        if( x.number == y.number){
            return x.color-y.color;
        }else{
            return x.number-y.number;
        }
    });
    return poker_list;
}