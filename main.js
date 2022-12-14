// DOM Load

var replicationElement = document.getElementById('repli');
var matterElement = document.getElementById('scapr');
var extraElement = document.getElementById('extra');

// Variables
var ticks = 0;

var totalBots = 0;
var numClickers = 0;
var numProteins = 1000;
var computingPower = 0;

var timeSet = 1000;
var repCost = 10;

var intervalID;
var blinkCounter = 0;



// Flags
var milestoneFlag = 0;

var replicationFlag = 0;
var matterFlag = 0;
var extraFlag = 0;






function addBot(number) {
    if (numProteins >= 2) {
        totalBots += number;
        numProteins -= 2;
        // Fix This Later
        if (totalBots % 10 == 0) {
            computingPower ++;
        }
    }
}  

function update() {
    document.getElementById("replicators").innerHTML = numClickers;
    document.getElementById("repCost").innerHTML = repCost;
    document.getElementById("bots").innerHTML = totalBots;
    document.getElementById("proteins").innerHTML = numProteins;
    document.getElementById("computing").innerHTML = computingPower;

    
}

var blunk = false;

function elemUpdate() {
    replicationElement = document.getElementById('repli');
    matterElement = document.getElementById('scapr');
    extraElement = document.getElementById('extra');
    
    if (replicationFlag == 0){        
        blink(replicationElement);
        replicationElement.style.display="none";
    } else {
        replicationElement.style.display="";   
    }    

    if (matterFlag == 0){        
        blink(matterElement);
        matterElement.style.display="none";
    } else {
        matterElement.style.display="";   
    }    

    if (extraFlag == 0){        
        blink(extraElement);
        extraElement.style.display="none";
    } else {
        extraElement.style.display="";   
    }    
}


// BLINK

function blink(element){

    { 
        var handle = setInterval(function () { toggleVisibility(element)}, 30);    
    }

    function toggleVisibility(element){
        blinkCounter = blinkCounter+1;    

        if (blinkCounter >= 8){
            clearInterval(handle);
            blinkCounter = 0;
            element.style.visibility = "visible";
        } else {
            if (element.style.visibility != "hidden"){
                element.style.visibility = "hidden";
            } else {
                element.style.visibility = "visible";    
            }
        }   
}
    
}

// MAIN LOOP

window.onload = function() {
  update();
  elemUpdate();
};

window.setInterval(function(){

    ticks = ticks + 1;
    update();
    elemUpdate();

    if (totalBots >= 15){
        extraFlag = 1;
    }

    if (totalBots >= 10){
        replicationFlag = 1;
    }

    if (totalBots >= 5){
        matterFlag = 1;
    }

}, 10);

// Functions

function addClicker() {
    // add a new autoclicker
    if (repCost <= computingPower && numProteins > 20) {
        clearInterval(intervalID);
        timeSet = 1000 - numClickers * 10;
        numClickers ++;
        

        computingPower -= repCost;
        numProteins -= 20;
        repCost = Math.round(repCost * 1.2);
        
        
        intervalID = window.setInterval(function() {addBot(1);}, timeSet);
    }
}

function scrape() {
    if (computingPower >= 15) {
        computingPower -= 15;
        numProteins += 1000;
        
    }

}
