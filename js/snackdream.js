const nugu = require('./config.json')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use('/snack', (req, res) => {
    const requestBody = req.body; //request의 body부분
    if(requestBody.action.hasOwnProperty('parameters')){
        if(Object.keys(requestBody.action.parameters).length === 0){
            parameters = ''
        }else{
            parameters = requestBody.action.parameters// 파라메터 부분
        } //파라메터 부분, {} 이 오는 경우를 방지해야 합니다.
    }
    const actionName = requestBody.action.actionName; // action의 이름

    const ACTION_CALORIEINFO = 'CalorieInfo';
    const ACTION_NUM1 = 'num1';
    const ACTION_NUM2 = 'num2';
    const ACTION_RANDOM = 'random';

    function CalorieInfo_function() {
        const cal = nugu.action.parameters['calorie'].value
        console.log(cal)
        let output = nugu.output

        switch(cal){
            case "초콜릿": 
            console.log(cal+"은 100g당 약 550칼로리 입니다."); 
            output = {
                "prompt" : cal+"은 100g당 약 550칼로리 입니다."
            }
            break;

            case "사탕" : 
            console.log(cal+"은 3개당(14g) 52칼로리 입니다."); 
            output = {
                "prompt" : cal+"은 3개당(14g) 52칼로리 입니다."
            }
        }
        nugu.output = output
    }

    function num1_function() {
        checktime();
        //1번 간식 줘
        output = {
            "prompt" : "1번 간식 실행"
        }
        nugu.output = output
    }

    function num2_function() {
        checktime();
        //2번 간식 줘
        output = {
            "prompt" : "2번 간식 실행"
        }
        nugu.output = output
    }

    function random_function() {
        checktime();
        //랜덤 간식 줘
        output = {
            "prompt" : "랜덤 간식 실행"
        }
        nugu.output = output
    }

    function checktime() {
        
    }

    // Intent가 오는 부분, actionName으로 구분합니다.
    // case안에서 작동할 function을 적습니다.
    switch (actionName) {
        case ACTION_CALORIEINFO:
            return CalorieInfo_function()
            break;
        case ACTION_DDINGEON:
            return Ddingeon_function()
            break;
        case ACTION_NUM1:
            return num1_function()
            break;
        case ACTION_NUM2:
            return num2_function()
            break;
        case ACTION_RANDOM:
            return random_function()
            break;
    }

    console.log(output)
    return res.json(nugu)
})

app.listen(3000, (err, result) => {
    console.log("누구 서버 시작 : ", 3000)
})