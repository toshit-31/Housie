var numbersPlaced = [];

const randBin = function(){
    return Math.floor(Math.random()*100)%2 ;
}

const generateRandom = function(l, h){
    h = h == 89 ? 90 : h;
    l = l == 0 ? 1 : l;
    var diff = h - l;
    var rand = l + Math.floor(Math.random()*100000)%diff;
    if(numbersPlaced.indexOf(rand) > 0){
        rand = generateRandom(l, h);
        numbersPlaced.push(rand);
    }
    return rand;
}

const replaceNum = function(t, r1, r2, c){
    var temp = t[r1][c];
    t[r2][c] = t[r1][c];
    t[r1][c] = 0;
}

function genTicket(){
    numbersPlaced = [];
    var cols = [3, 6];
    var ticket = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // generating numbers
    for(var col = 0; col < 9; col++){
        var rb = randBin();
        if(cols[rb] == 0){
            rb = (rb+1)%2;
        }
        cols[rb]--;
        var zeroNum = generateRandom(col*10, (col*10)+9);
        zindex = Math.floor(zeroNum/10)
        ticket[1][zindex] = zeroNum;
        if(rb == 1) {
            var oneNum = generateRandom(col*10, col*10+9);
            var oindex = Math.floor(oneNum/10);
            if(ticket[1][zindex] > oneNum){
                ticket[0][oindex] = oneNum;
            } else {
                ticket[2][oindex] = oneNum;
            }
        }
    }
    // row count
    var rowPop = [0, 9, 0]
    for(var i = 0; i < 3; i+=2){
        var tempCount = 0;
        for(var j = 0; j < 9; j++){
            if(ticket[i][j] != 0){
                tempCount++;
            }
        }
        rowPop[i] = tempCount;
    }
    // re arranging numbers
    for(var mi = 0; mi < 9; mi++){
        var aboveEl = ticket[0][mi];
        var belowEl = ticket[2][mi];
        if(aboveEl == 0 && rowPop[0] < 5){
            replaceNum(ticket, 1, 0, mi);
            rowPop[0]++;
            rowPop[1]--;
        }; 
        if(belowEl == 0 && rowPop[2] < 5){
            replaceNum(ticket, 1, 2, mi)
            rowPop[2]++;
            rowPop[1]--;
        }
    }
    return ticket;
}
