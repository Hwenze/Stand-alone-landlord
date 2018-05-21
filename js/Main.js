
//这是出牌的算法函数方法和打牌对比方法

//定义玩家的出牌与桌面牌对比的方法
function checkVS(obj,obj2){
    if(obj.type == 0){
        // console.log(1);
        return false;
    }else if(obj2.type == 0 ||obj.type == 110 || obj.type == 100 && obj2.type != 100&&obj2.type != 110){
        // console.log(2);
        return true;
    }else if(obj.type == obj2.type && obj.list.length == obj2.list.length ){
        // console.log(3);
        // 判断单张中的大小王
        if(obj.list[0].number == 14 && obj2.list[0].number == 14){
            if(obj.list[0].color > obj2.list[0].color){
                return true;
            }else{
                return false;
            }
        }
        // console.log(obj.max);
        // console.log(obj2.max);
        if(parseInt(obj.max) > parseInt(obj2.max)){
            return true;
        }else{
            return false;
        }
    }
    return false;
}



// 定义检查牌型的方法
function checkPoker(obj){
    // 1、先对玩家选择的牌进行重新排序
    obj.list = pokerSort1(obj.list);
    /*
        牌型代码表
        1       单张
        2       对子
        3       三张
        4       三带一
        5       三带二
        6       顺子
        8       四带二
        9       四带两对
        22      连对
        40      飞机不带
        44      飞机带单张
        55      飞机带对子
        66      四带二*2
        77      四带两对*2
        100     炸弹
        105     连炸
        110     王炸
    */
    // 根据选择牌的数量来再进行判断牌型
    switch(obj.list.length){
        // 一张牌
        case 1:
            obj.type = 1;                          // 设置牌型为单张
            obj.max = obj.list[0].number;     // 设置判断值为该牌的点数

            console.log('单张');
            return true;
            break;
        // 两张牌
        case 2:
            if (obj.list[0].number == obj.list[1].number){
                if(obj.list[0].number == 14){
                    obj.type = 110 ;                       // 设置牌型为王炸
                    obj.max = 14;                          // 设置判断值为该牌的点数
                    console.log('王炸')
                }else{
                    obj.type = 2 ;                         // 设置牌型为对子
                    obj.max = obj.list[0].number;     // 设置判断值为该牌的点数
                    console.log('对子')
                }
                return true;
            }
            break;
        // 三张牌
        case 3:
            if(obj.list[0].number == obj.list[2].number){
                obj.type = 3;                          // 设置牌型为三张
                obj.max = obj.list[0].number;     // 设置判断值为该牌的点数
                console.log('三不带');
                return true;
            }
            break;
        // 四张牌
        case 4:
            // 判断是否为炸弹
            if(obj.list[0].number == obj.list[3].number){
                obj.type = 100;                            // 设置牌型为炸弹
                obj.max = obj.list[0].number;     // 设置判断值为该牌的点数
                console.log('普通炸弹');
                return true;
            }else if(obj.list[0].number == obj.list[2].number ||
                obj.list[1].number == obj.list[3].number){
                obj.type = 4;                          // 设置牌型为三带一
                obj.max = obj.list[1].number;     // 设置判断值为该牌的点数
                console.log('三带一');
                return true;
            }
            break;
        // 五张牌
        case 5:
            // 判断是否为顺子
            if( obj.list[0].number == obj.list[2].number &&   // 判断三带二的方法
                obj.list[3].number == obj.list[4].number ||
                obj.list[0].number == obj.list[1].number &&
                obj.list[2].number == obj.list[4].number
            ){
                obj.type = 5;                          // 设置牌型为三带二
                obj.max = obj.list[2].number;     // 设置判断值为该牌的点数
                console.log('三带二');
                return true;
            }else if( checkStraight(obj) ){
                obj.type = 6;                          // 设置牌型为顺子
                obj.max = obj.list[obj.list.length-1].number;     // 设置判断值为该牌的点数
                console.log('顺子');
                return true;
            }else{
                // console.log(12314567);
            }
            break;
        // 六张牌
        case 6:
            // 判断是否为顺子
            if( checkStraight(obj) ){
                obj.type = 6;                          // 设置牌型为顺子
                obj.max = obj.list[obj.list.length-1].number;     // 设置判断值为该牌的点数
                console.log('6张顺子');
                return true;
            }else if(checkTwoPairs(obj)){
                obj.type = 22;                         // 设置牌型为连对
                obj.max = obj.list[obj.list.length-1].number;     // 设置判断值为该牌的点数
                console.log('连对');
                return true;
            }else if(fourTow(obj)){
                obj.type = 8;                         // 设置牌型为四带二
                obj.max = obj.list[5].number;     // 设置判断值为该牌的点数
                return true;
            }else if(setAirplane(obj)){
                obj.type=40;
                obj.max=obj.list[obj.list.length-1].number;
                return true;
            }
            else{
                console.log('出牌不符合规则');
            }
            break;
        // 判断七张牌  只有一种情况顺子
        case 7:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('七张顺子');
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 判断八张牌 顺子 飞机三带一*2 连对二*4 两个炸
        case 8:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('八张顺子');
                return true;
            }else if(checkTwoPairs(obj)){                          //判断8张牌是否为连对
                obj.type = 22;                         // 设置牌型为连对
                obj.max = obj.list[obj.list.length-1].number;     // 设置判断值为该牌的点数
                console.log('八张连对');
                return true;
            }else if(setAirplane(obj)){                    //检查8张牌是否为飞机
                obj.type = 44;                          // 设置牌型为飞机 三带一*2
                obj.max = obj.list[5].number;     // 设置判断值为该牌的点数
                console.log('三带一飞机');
                return true;
            }else if(bomBshell(obj)){
                obj.type =105;                 //检查八张牌是否为连炸 四*2
                obj.max = obj.list[7].number;  // 设置判断值为该牌的点数
                console.log('连炸');
                return true;
            }else if(fourTow(obj)){
                obj.type = 9;                         // 设置牌型为四带二
                if(obj.list[4].number==obj.list[7].number){
                    obj.max = obj.list[4];     // 设置判断值为该牌的点数
                }else{
                    obj.max = obj.list[3];
                }
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 判断九张牌 顺子 飞机三张不带
        case 9:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('9张顺子');
                return true;
            }else if(setAirplane(obj)){
                obj.type = 40;                          // 设置牌型为飞机 三张不带*3
                obj.max = obj.list[8].number;     // 设置判断值为该牌的点数
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 判断10张牌 顺子 连对 连炸不可能
        case  10:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('10张顺子');
                return true;
            }else if(checkTwoPairs(obj)){
                obj.type = 22;                         // 设置牌型为连对
                obj.max = obj.list[obj.list.length-1].number;     // 设置判断值为该牌的点数
                console.log('10张连对');
                return true;
            }else if(setAirplane(obj)){
                obj.type = 55;                         //三带二飞机
                obj.max = obj.list[5].number;
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 判断十一张牌 顺子
        case  11:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('11张顺子');
                return true;
            }
            break;
        // 判断12张牌 顺子 飞机 连炸 连对
        case 12:
            if(checkStraight(obj)){
                obj.type=6;                            //判断是否为顺子
                obj.max=obj.list[obj.list.length-1].number;
                console.log('12张顺子');
                return true;
            }else if(checkTwoPairs(obj)){
                obj.type=22;
                obj.max=obj.list[obj.list.length-1].number;
                console.log('10张连对');
                return true;
            }else if(setAirplane(obj)){
                obj.type = 55;                     //三带一飞机
                obj.max=obj.list[0].number;
                return true;
            }else if(bomBshell(obj)){
                obj.type = 105;                    //连炸
                obj.max=obj.list[11].number;
                return true;
            }else if(fourTow(obj)){
                obj.type = 66;                         // 设置牌型为四带两张单*2
                if(obj.list[3].number == obj.list[7].number-1 &&
                    obj.list[4].number == obj.list[8].number-1){
                    obj.max = obj.list[10];     // 设置判断值为该牌的点数
                }else{
                    obj.max = obj.list[7];
                }
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 13，17,19张牌不能组成牌型
        // 14张牌 连对
        case 14:
            if(checkTwoPairs(obj)){
                obj.type=22;
                obj.max=obj.list[obj.list.length-1].number;
                console.log('14张连对');
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 15张牌 三带2*3
        case 15:
            if(setAirplane(obj)){
                obj.type = 55;
                obj.max=obj.list[0].number;
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 16张牌 三带一*4 连炸不带*4 连对*8
        case 16:
            if(setAirplane(obj)){
                obj.type = 44;
                // obj.max=obj.list[0].number;
                if(obj.list[0].number == obj.list[11].number-3 &&
                    obj.list[1].number == obj.list[12].number-3){
                    obj.max=obj.list[11].number;
                }else{
                    obj.max=obj.list[13].number;
                }
                return true;
            }else if(bomBshell(obj)){
                obj.type = 105;
                obj.max=obj.list[15].number;
                return true;
            }else if(checkTwoPairs(obj)){
                obj.type=22;
                obj.max=obj.list[obj.list.length-1].number;
                console.log('16张连对');
                return true;
            }else if(fourTow(obj)){
                obj.type = 77;                         // 设置牌型为四带二
                if(obj.list[0].number == obj.list[4].number-1 &&
                    obj.list[1].number == obj.list[6].number-1){
                    obj.max = obj.list[7].number;  // 设置判断值为该牌的点数
                }else if(obj.list[4].number == obj.list[8].number-1 &&
                    obj.list[6].number == obj.list[10].number -1){
                    obj.max = obj.list[12].number;
                }else{
                    obj.max = obj.list[15].number;
                }
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        // 18张牌 连对*9 三不带*6
        case 18:
            if(checkTwoPairs(obj)){
                obj.type=22;
                selsect_poker.max=obj.list[obj.list.length-1].number;
                console.log('18张连对');
                return true;
            }else if(setAirplane(obj)){
                obj.type = 40;
                obj.max=obj.list[17].number;
                return true;
            }else if(fourTow(obj)){
                obj.type = 66;                         // 设置牌型为四带二
                if(obj.list[0].number == obj.list[11].number-2 &&
                    obj.list[1].number == obj.list[12].number -2 &&
                    obj.list[2].number == obj.list[13].number -2){
                    obj.max=obj.list[11].number;
                }else{
                    obj.max=obj.list[14].number;
                }
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        //20张 连对*10 三带二*4 连炸*5
        case 20:
            if(checkTwoPairs(obj)){
                obj.type=22;
                selsect_poker.max=obj.list[obj.list.length-1].number;
                console.log('20张连对');
                return true;
            }else if(setAirplane(obj)){
                obj.type = 55;
                // obj.max=obj.list[0].number;
                if(obj.list[0].number == obj.list[11].number-3 &&
                    obj.list[2].number == obj.list[12].number-3){
                    obj.max = obj.list[11].number;  // 设置判断值为该牌的点数
                }else if(obj.list[4].number == obj.list[15].number-3 &&
                    obj.list[6].number == obj.list[13].number -3){
                    obj.max = obj.list[13].number;
                }else{
                    obj.max = obj.list[17].number;
                }
                return true;
            }else{
                console.log('出牌不符合规则');
            }
            break;
        default:
            return false;
    }
    return false;
}
function checkStraight(obj){
    // 判断最大的值不能大于12
    // 987654
    // 765544
    // 34567
    if(obj.list[0].number > 13){
        return false;
    }
    for(let i=0;i<obj.list.length-1;i++){
        if( obj.list[i].number != obj.list[i+1].number-1*1 &&
            obj.list[i].number != obj.list[i+2].number-2*1 &&  //这里有问题
            obj.list[i].number != obj.list[i+3].number-3*1){
            return false;
        }
    }
    return  true;
}
// 定义检查牌型为连对的方法
function checkTwoPairs(obj){
    if(obj.list[obj.list.length-1].number > 13){
        return false;
    }
    switch(obj.list.length){
        case 6:
            if(obj.list[0].number  == obj.list[1].number   &&
                obj.list[2].number == obj.list[3].number   &&
                obj.list[4].number == obj.list[5].number   &&
                obj.list[0].number == obj.list[2].number-1 &&
                obj.list[2].number == obj.list[4].number-1){
                console.log('连对*3');
                return true;
            }
            break;
        case 8:
            if(obj.list[0].number  == obj.list[1].number   &&
                obj.list[2].number == obj.list[3].number   &&
                obj.list[4].number == obj.list[5].number   &&
                obj.list[6].number == obj.list[7].number   &&
                obj.list[0].number == obj.list[2].number-1 &&
                obj.list[2].number == obj.list[4].number-1 &&
                obj.list[4].number == obj.list[6].number-1){
                console.log('连对*4');
                return true;
            }
            break;
        case 10:
            if(obj.list[0].number  == obj.list[1].number   &&
                obj.list[2].number == obj.list[3].number   &&
                obj.list[4].number == obj.list[5].number   &&
                obj.list[6].number == obj.list[7].number   &&
                obj.list[8].number == obj.list[9].number   &&
                obj.list[0].number == obj.list[2].number-1 &&
                obj.list[2].number == obj.list[4].number-1 &&
                obj.list[4].number == obj.list[6].number-1 &&
                obj.list[6].number == obj.list[8].number-1){
                console.log('连对*5');
                return true;
            }
            break;
        case 12:
            if(obj.list[0].number   == obj.list[1].number   &&
                obj.list[2].number  == obj.list[3].number   &&
                obj.list[4].number  == obj.list[5].number   &&
                obj.list[6].number  == obj.list[7].number   &&
                obj.list[8].number  == obj.list[9].number   &&
                obj.list[10].number == obj.list[11].number  &&
                obj.list[0].number  == obj.list[2].number-1 &&
                obj.list[2].number  == obj.list[4].number-1 &&
                obj.list[4].number  == obj.list[6].number-1 &&
                obj.list[6].number  == obj.list[8].number-1 &&
                obj.list[8].number  == obj.list[10].number-1){
                console.log('连对*6');
                return true;
            }
            break;
        case 14:
            if(obj.list[0].number   == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[0].number  == obj.list[2].number-1  &&
                obj.list[2].number  == obj.list[4].number-1  &&
                obj.list[4].number  == obj.list[6].number-1  &&
                obj.list[6].number  == obj.list[8].number-1  &&
                obj.list[8].number  == obj.list[10].number-1 &&
                obj.list[10].number == obj.list[12].number-1){
                console.log('连对*7');
                return true;
            }
            break;
        case 16:
            if(obj.list[0].number   == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[0].number  == obj.list[2].number-1  &&
                obj.list[2].number  == obj.list[4].number-1  &&
                obj.list[4].number  == obj.list[6].number-1  &&
                obj.list[6].number  == obj.list[8].number-1  &&
                obj.list[8].number  == obj.list[10].number-1 &&
                obj.list[10].number == obj.list[12].number-1 &&
                obj.list[12].number == obj.list[14].number-1){
                console.log('连对*8');
                return true;
            }
            break;
        case 18:
            if(obj.list[0].number   == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[16].number == obj.list[17].number   &&
                obj.list[0].number  == obj.list[2].number-1  &&
                obj.list[2].number  == obj.list[4].number-1  &&
                obj.list[4].number  == obj.list[6].number-1  &&
                obj.list[6].number  == obj.list[8].number-1  &&
                obj.list[8].number  == obj.list[10].number-1 &&
                obj.list[10].number == obj.list[12].number-1 &&
                obj.list[12].number == obj.list[14].number-1 &&
                obj.list[14].number == obj.list[16].number-1){
                console.log('连对*9');
                return true;
            }
            break;
        case 20: //33445566778899
            if(obj.list[0].number   == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[16].number == obj.list[17].number   &&
                obj.list[18].number == obj.list[19].number   &&
                obj.list[0].number  == obj.list[2].number-1  &&
                obj.list[2].number  == obj.list[4].number-1  &&
                obj.list[4].number  == obj.list[6].number-1  &&
                obj.list[6].number  == obj.list[8].number-1  &&
                obj.list[8].number  == obj.list[10].number-1 &&
                obj.list[10].number == obj.list[12].number-1 &&
                obj.list[12].number == obj.list[14].number-1 &&
                obj.list[14].number == obj.list[16].number-1 &&
                obj.list[16].number == obj.list[18].number-1){
                console.log('连对*10');
                return true;
            }
            break;
        default:
            return false;
    }
}

// 检查牌型是否为飞机的方法
function setAirplane(obj){
    // 通过牌数来判断可能的牌型可能
    switch(obj.list.length){
        case 6:
            if(obj.list[0].number == obj.list[2].number   &&
                obj.list[0].number == obj.list[3].number-1 &&
                obj.list[3].number == obj.list[5].number
            ){
                                              // 设置牌型为二个三的飞机
                     // 设置判断值为该牌的点数
                return true;
            }
            break;
        case 8:
            /*
                33344456
                34445556
                34555666
                33334444
            */
            if(obj.list[0].number == obj.list[2].number   &&
                obj.list[0].number == obj.list[3].number-1 &&
                obj.list[3].number == obj.list[5].number   ||
                obj.list[1].number == obj.list[3].number   &&
                obj.list[1].number == obj.list[4].number-1 &&
                obj.list[4].number == obj.list[6].number   ||
                obj.list[2].number == obj.list[4].number   &&
                obj.list[2].number == obj.list[5].number-1 &&
                obj.list[5].number == obj.list[7].number
            ){
                obj.type = 8;                              // 设置牌型为二个三带一的飞机
                obj.max = obj.list[2].number;     // 设置判断值为该牌的点数
                return true;
            }
            break;
        case 9:
            // 333444555
            if(obj.list[obj.list.length-3].number != obj.list[obj.list.length-1].number){
                return false;
            }
            for(let i=0; i<obj.list.length - 4; i+=3){
                if( obj.list[i].number != obj.list[i+2].number ||
                    obj.list[i].number != obj.list[i+3].number-1
                ){
                    return false;
                }
            }
            obj.type = 7;                              // 设置牌型为二个三带一的飞机
            obj.max = obj.list[0].number;     // 设置判断值为该牌的点数
            return true;
            break;
        case 10:
            if(obj.list[0].number == obj.list[2].number &&
                obj.list[3].number == obj.list[5].number &&
                obj.list[6].number == obj.list[7].number &&
                obj.list[8].number == obj.list[9].number &&
                obj.list[0].number == obj.list[3].number-1 ||
                obj.list[0].number == obj.list[1].number &&
                obj.list[2].number == obj.list[4].number &&
                obj.list[5].number == obj.list[7].number &&
                obj.list[8].number == obj.list[9].number &&
                obj.list[2].number == obj.list[5].number-1 ||
                obj.list[0].number == obj.list[1].number &&
                obj.list[2].number == obj.list[3].number &&
                obj.list[4].number == obj.list[6].number &&
                obj.list[7].number == obj.list[9].number &&
                obj.list[4].number == obj.list[7].number-1){
                return true;
            }
            break;
        case 12:
            if(obj.list[obj.list.length-3].number != obj.list[obj.list.length-1].number){
                if( obj.list[0].number != obj.list[2]          &&    //当最后三张不一样时判断
                    obj.list[3].number != obj.list[5]          &&     //这里需要优化一下
                    obj.list[6].number != obj.list[8]          &&     //三带一
                    obj.list[0].number != obj.list[3].number-1 &&
                    obj.list[3].number != obj.list[6].number-1 ){
                    return false;
                }
            }else if(obj.list[obj.list.length-3].number != obj.list[obj.list.length-2].number){
                if( obj.list[1].number != obj.list[3]          &&     //当最后两张不一样时判断
                    obj.list[4].number != obj.list[6]          &&
                    obj.list[7].number != obj.list[9]          &&
                    obj.list[1].number != obj.list[4].number-1 &&
                    obj.list[4].number != obj.list[7].number-1 ){
                    return false;
                }
            }else if(obj.list[obj.list.length-11].number != obj.list[obj.list.length-10].number){
                if( obj.list[2].number != obj.list[4]          &&     //当前两张不一样时判断
                    obj.list[5].number != obj.list[7]          &&
                    obj.list[8].number != obj.list[10]         &&
                    obj.list[2].number != obj.list[5].number-1 &&
                    obj.list[5].number != obj.list[8].number-1 ){
                    return false;
                }
                // 9  11
            }else if(obj.list[obj.list.length-11].number != obj.list[obj.list.length-9].number){
                if( obj.list[3].number != obj.list[5]          &&     //当前三张不一样时判断
                    obj.list[6].number != obj.list[8]          &&
                    obj.list[9].number != obj.list[11]         &&
                    obj.list[3].number != obj.list[6].number-1 &&
                    obj.list[6].number != obj.list[9].number-1 ){
                    return false;
                }
            }
            break;
        // 十五张牌
        case 15:
            if(     obj.list[0].number  != obj.list[2]           &&       //后六张为对子
                obj.list[3].number  != obj.list[5]           &&
                obj.list[6].number  != obj.list[8]           &&
                obj.list[9].number  != obj.list[10]          &&
                obj.list[11].number != obj.list[12]          &&
                obj.list[13].number != obj.list[14]          &&
                obj.list[0].number  != obj.list[3].number-1  &&
                obj.list[3].number  != obj.list[6].number-1 ){
                return false;
            }else if(obj.list[0].number  != obj.list[1]   &&             // 前六张为对子
                obj.list[2].number  != obj.list[3]   &&
                obj.list[4].number  !=  obj.list[5]  &&
                obj.list[6].number  != obj.list[8]   &&
                obj.list[9].number  != obj.list[11]  &&
                obj.list[12].number !=  obj.list[14] &&
                obj.list[6].number  != obj.list[9]-1 &&
                obj.list[9].number  != obj.list[12]-1
            ){
                return  false;
            }
            for(let i=0; i<obj.list.length-5; i+=3){
                if(obj.list[i].number != obj.list[i+3] &&
                    obj.list[i+2].number != obj.list[i+5]){
                    return false;
                }
            }
            break;
        // 十八张牌
        case 18:
            for(let i=0;i<obj.list.length-5;i+=3){
                if(obj.list[i].number != obj.list[i+2] &&
                    obj.list[i].number != obj.list[i+3].number-1){
                    return false;
                }
            }
            break;
        // 二十张牌
        case 20:
            if(       obj.list[0].number   != obj.list[2].number    &&        //当四个对子在后面的时候
                obj.list[3].number   != obj.list[5].number    &&
                obj.list[6].number   != obj.list[8].number    &&
                obj.list[9].number   != obj.list[11].number   &&
                obj.list[12].number  != obj.list[13].number   &&
                obj.list[14].number  != obj.list[15].number   &&        //判断是不是对子
                obj.list[16].number  != obj.list[17].number   &&
                obj.list[18].number  != obj.list[19].number   &&
                obj.list[0].number   != obj.list[3].number-1  &&        //判断是不是连续的飞机
                obj.list[3].number   != obj.list[6].number-1  &&
                obj.list[6].number   != obj.list[9].number-1  ){
                return false;
            }else if( obj.list[0].number   != obj.list[1].number    &&        //当前一个是对子
                obj.list[2].number   != obj.list[4].number    &&        //后面是四个三带二
                obj.list[5].number   != obj.list[7].number    &&
                obj.list[8].number   != obj.list[10].number   &&
                obj.list[11].number  != obj.list[13].number   &&
                obj.list[14].number  != obj.list[15].number   &&
                obj.list[16].number  != obj.list[17].number   &&
                obj.list[18].number  != obj.list[19].number   &&
                obj.list[2].number   != obj.list[5].number-1  &&
                obj.list[5].number   != obj.list[8].numer-1   &&
                obj.list [8].number  != obj.list[11].number-1 ){
                return false;
            }else if( obj.list[0].number   != obj.list[1].number    &&        //当前四张为对子
                obj.list[2].number   != obj.list[3].number    &&        //后四张为对子
                obj.list[4].number   != obj.list[6].number    &&        //中间为四个三不带
                obj.list[7].number   != obj.list[9].number    &&
                obj.list[10].number  != obj.list[12].number   &&
                obj.list[13].number  != obj.list[15].number   &&
                obj.list[16].number  != obj.list[17].number   &&
                obj.list[18].number  != obj.list[19].number   &&
                obj.list[4].number   != obj.list[7].number-1  &&
                obj.list[7].number   != obj.list[10].numer-1  &&
                obj.list [10].number != obj.list[13].number-1 ){
                return false;
            }else if( obj.list[0].number   != obj.list[1].number    &&        //当前六张为对子
                obj.list[2].number   != obj.list[3].number    &&     //最后两张为对子
                obj.list[4].number   != obj.list[5].number    &&        //中间十二张为三不带
                obj.list[6].number   != obj.list[8].number    &&
                obj.list[9].number   != obj.list[11].number   &&
                obj.list[12].number  != obj.list[14].number   &&
                obj.list[15].number  != obj.list[17].number   &&
                obj.list[18].number  != obj.list[19].number   &&
                obj.list[6].number   != obj.list[9].number-1  &&
                obj.list[9].number   != obj.list[12].number-1 &&
                obj.list[13].number  != obj.list[16].number-1 ){
                return false;
            }else if( obj.list[0].number   != obj.list[1].number    &&        //当前八张为对子
                obj.list[2].number   != obj.list[3].number    &&        //后面全是三不带
                obj.list[4].number   != obj.list[5].number    &&
                obj.list[6].number   != obj.list[7].number    &&
                obj.list[8].number   != obj.list[10].number   &&
                obj.list[11].number  != obj.list[13].number   &&
                obj.list[14].number  != obj.list[16].number   &&
                obj.list[17].number  != obj.list[19].number   &&
                obj.list[8].number   != obj.list[11].number-1 &&
                obj.list[11].number  != obj.list[14].number-1 &&
                obj.list[14].number  != obj.list[17].number-1 ){
                return false;
            }else{
                return true;
            }
            break;
        default:
            return false;
    }
}
// 连炸判断
function bomBshell(obj){
    switch(obj.list.length){
        case 8:
            if( obj.list[0].number != obj.list[3].number   &&
                obj.list[0].number != obj.list[4].number-1 &&
                obj.list[4].number != obj.list[7].number){
                console.log('二连炸');
                return false;
            }
            break;
        case 12:
            if( obj.list[0].number  != obj.list[3].number   &&
                obj.list[4].number  != obj.list[7].number   &&
                obj.list[8].number  != obj.list[11].number  &&
                obj.list[0].number  != obj.list[4].number-1 &&
                obj.list[4].number  != obj.list[8].number-1
            ){
                console.log('三连炸');
                return false;
            }
            break;
        case 16:
            if( obj.list[0].number  != obj.list[3].number   &&
                obj.list[4].number  != obj.list[7].number   &&
                obj.list[8].number  != obj.list[11].number  &&
                obj.list[12].number != obj.list[15].number  &&
                obj.list[0].number  != obj.list[4].number-1 &&
                obj.list[4].number  != obj.list[8].number-1 &&
                obj.list[8].number  != obj.list[12].number-1
            ){
                console.log('四连炸');
                return false;
            }
            break;
        case 20:
            if( obj.list[0].number  != obj.list[3].number    &&
                obj.list[4].number  != obj.list[7].number    &&
                obj.list[8].number  != obj.list[11].number   &&
                obj.list[12].number != obj.list[15].number   &&
                obj.list[16].number != obj.list[19].number   &&
                obj.list[0].number  != obj.list[4].number-1  &&
                obj.list[4].number  != obj.list[8].number-1  &&
                obj.list[8].number  != obj.list[12].number-1 &&
                obj.list[12].number != obj.list[16].number-1
            ){
                console.log('五连炸');
                return false;
            }
            break;
    }
}

// 四带二盘段
function fourTow(obj){
    switch(obj.list.length){
        case 6:
            if( obj.list[0].number == obj.list[3].number ||
                obj.list[1].number == obj.list[4].number ||
                obj.list[2].number == obj.list[5].number){
                console.log('四带两张单');
                return true;
            }else{
                return false;
            }
            break;
        case 8:
            if( obj.list[0].number == obj.list[3].number &&
                obj.list[4].number == obj.list[5].number &&
                obj.list[6].number == obj.list[7].number ||
                obj.list[0].number == obj.list[1].number &&
                obj.list[2].number == obj.list[5].number &&
                obj.list[6].number == obj.list[7].number ||
                obj.list[0].number == obj.list[1].number &&
                obj.list[2].number == obj.list[3].number &&
                obj.list[4].number == obj.list[7].number){
                console.log('四带两对');
                return true;
            }else{
                return false;
            }
            break;
        case 12:
            if( obj.list[0].number  != obj.list[3].number   &&  //十二张牌有三种情况
                obj.list[4].number  != obj.list[7].number   &&
                obj.list[0].number  != obj.list[4].number-1 ||
                obj.list[4].number  != obj.list[7].number   &&
                obj.list[8].number  != obj.list[11].number  &&
                obj.list[4].number  != obj.list[8].number-1 ||
                obj.list[2].number  != obj.list[5].number   &&
                obj.list[6].number  != obj.list[9].number   &&
                obj.list[2].number  != obj.list[6].number-1){
                console.log('四带两张单*2');
                return false;
            }
            break;
        case 16:
            if( obj.list[0].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[0].number  == obj.list[4].number-1  &&
                obj.list[14].number == obj.list[15].number   ||
                obj.list[0].number  == obj.list[1].number    &&
                obj.list[2].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[2].number  == obj.list[6].number-1  ||
                obj.list[0].number  == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[11].number   &&
                obj.list[12].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[4].number  == obj.list[8].number-1  ||
                obj.list[0].number  == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[9].number    &&
                obj.list[10].number == obj.list[13].number   &&
                obj.list[14].number == obj.list[15].number   &&
                obj.list[6].number  == obj.list[10].number-1 ||
                obj.list[0].number  == obj.list[1].number    &&
                obj.list[2].number  == obj.list[3].number    &&
                obj.list[4].number  == obj.list[5].number    &&
                obj.list[6].number  == obj.list[7].number    &&
                obj.list[8].number  == obj.list[11].number   &&
                obj.list[12].number == obj.list[15].number   &&
                obj.list[8].number  == obj.list[12].number-1){
                console.log('四带两对*2');
                return true;
            }else{
                return false;
            }
            break;
        case 18:
            if( obj.list[0].number  != obj.list[3].number     &&  //后面六张为对子
                obj.list[4].number  != obj.list[7].number     &&
                obj.list[8].number  != obj.list[11].number    &&
                obj.list[0].number  != obj.list[4].number-1   &&
                obj.list[4].number  != obj.list[8].number -1  ||
                obj.list[6].number  != obj.list[9].number     &&
                obj.list[10].number != obj.list[13].number    &&
                obj.list[14].number != obj.list[17].number    &&
                obj.list[6].number  != obj.list[10].number-1  &&
                obj.list[10].number != obj.list[14].number-1  ||
                obj.list[2].number  != obj.list[5].number     &&
                obj.list[6].number  != obj.list[9].number     &&
                obj.list[10].number != obj.list[13].number    &&
                obj.list[2].number  != obj.list[6].number-1   &&
                obj.list[6].number  != obj.list[10].number-1  ||
                obj.list[4].number  != obj.list[7].number     &&
                obj.list[8].number  != obj.list[11].number    &&
                obj.list[12].number != obj.list[15].number    &&
                obj.list[4].number  != obj.list[8].number-1   &&
                obj.list[8].number  != obj.list[12].number-1
            ){
                console.log('四带两单*3');
                return false;
            }
            break;
    }
}
function removArr(obj1,obj2) {
    // obj
    for(let i=0; i<obj1.length; i++){
        for(let j=0; j<obj2.list.length;j++){
            if(obj1[i].number == obj2.list[j].number &&
                obj1[i].color == obj2.list[j].color
            ){
                obj1.splice(i,1);
                obj2.list.splice(j,1);
                removArr(obj1,obj2);
            }
        }
    }
    return;

}