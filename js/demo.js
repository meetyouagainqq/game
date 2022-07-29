let timeTask;
let mouseTask;
let currentArr = [];

for (let i = 0; i < 25; i++) {
    let content = '<div><img id="img' + i + '" src="../img/01.jpg" onclick="addScore(this)"/></div>';
    document.getElementById('mainpanel').innerHTML += content;
}


//开始游戏功能
function startGame() {
    document.getElementById('startBtn').disabled = true;
    timeTask = setInterval(function () {
        let currentTime = (parseFloat(document.getElementById('showTime').innerHTML) + 0.01).toFixed(2);
        document.getElementById('showTime').innerHTML = currentTime;
        if (currentTime >= 5) {
            stopGame();
        }
    }, 10)
    //隔断时间生成打地鼠图片
    mouseTask = setInterval(function () {
        let flag;
        let randNum;
        do {
            flag = false;
            randNum = parseInt(Math.random() * 25);
            currentArr.forEach(function (data) {
                if (data == randNum) {
                    console.log("arr有重复,重新生成")
                    flag = true;
                }
            })
        } while (flag)
        currentArr.push(randNum);
        console.log(currentArr);
        let imgId = "img" + randNum;
        document.getElementById(imgId).src = "../img/01.jpg";
        document.getElementById(imgId).style.display = "inline-block";
        setTimeout(function () {
            document.getElementById(imgId).style.display = "none";
            currentArr.shift();
        }, 1900)
    }, 400)

}
// 计算游戏得分
function addScore(btnObj) {
    console.log(btnObj.src);
    if (btnObj.src.indexOf("img/01.jpg") >= 0) {
        btnObj.src = "../img/02.jpg";
        let currentScore = parseInt(document.getElementById('showScore').innerHTML) + 1;
        document.getElementById('showScore').innerHTML = currentScore;
        if (currentScore >=2) {
            stopGame();
        }
    }
}
//停止游戏功能
function stopGame() {
    clearInterval(timeTask);
    clearInterval(mouseTask);
    document.getElementById('startBtn').disabled=false;
    for (let i = 0; i < 25; i++) {
        let imgId = "img" + i;
        document.getElementById(imgId).style.display = "none";
    }
    document.getElementById('gameDiv').style.display = "block";

    document.getElementById('gameDiv').style.opacity = 0;
    let changeOpacity = setInterval(function () {
        document.getElementById('gameDiv').style.opacity = parseFloat(document.getElementById('gameDiv').style.opacity) + 0.01;
        if (document.getElementById('gameDiv').style.opacity >= 1) {
            clearInterval(changeOpacity);
        }
    }, 30)
}