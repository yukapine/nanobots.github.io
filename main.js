var numBots = 0;
var numClickers = 0;
var timeSet = 1000;
var repCost = 10;
var totalBots = 0;

function addBot(number) {
numBots += number;
totalBots += number;
update();
}  

function update() {
    document.getElementById("replicators").innerHTML = numClickers;
    document.getElementById("repCost").innerHTML = repCost;
    document.getElementById("bots").innerHTML = numBots;
    displayClicker();
}

function displayClicker() {
    var myClick = document.getElementById('repli');
    myClick.style.display = 'none';
    if (totalBots > 10) {
        myClick.style.display = 'block';
    }
}

function addClicker() {
    if (repCost <= numBots) {
        timeSet -= (numClickers * 5)
        numClickers ++;
        displayClicker()
        numBots = numBots - repCost;
        repCost = Math.round(repCost * 1.2)
        update();
        
        var intervalID = window.setInterval(function() {addBot(1);}, timeSet);
    }
}     
