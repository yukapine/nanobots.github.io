// DOM Load

var replicationElement = $('repli');
var matterElement = $('scapr');
var combatElement = $('combat');


// Variables

var ticks = 0;
var totalBots = 0;
var clickBoost = 1;
var scrapeBoost = 1;
var numClickers = 0;
var numProteins = 1000;
var computingPower = 0;
var numWhiteCells = 0;
var totalMatterScraped = 0;
var botRate = 0;
var timeSet = 1000;
var repCost = 5
var scrapeCost = 7
var intervalID;
var blinkCounter = 0;
var sliderValue = 50;
var alarmState = 1;

var proteinBuff = 1;
var proteinRunning = false;

var powerCap = 100;
var cellLevel = 0;

whiteCellCombat = 0;

var module1Icon = "https://i.ibb.co/CPCfb58/Module1-Icon.png";
var module2Icon = "https://i.ibb.co/wzH78kd/Protein-Icon.png";
var module3Icon = "https://i.ibb.co/s5f1czr/Air-Gun-Icon.png";
var module4Icon = "https://i.ibb.co/VT8rd66/Battery-Icon.png";

// old mod 1 icon - https://i.ibb.co/RgJn8kP/Module1-Icon.png
// old mod 2 icon - https://i.ibb.co/090TqRG/Module2-Icon.png
// old mod 3 icon - https://i.ibb.co/1LYZZkN/Module3-Icon.png



// level starts at zero and increases each time the progress bar for the nanobots reaches 100, because the bar fills up slowly each time
// this will account for progression and make more bars fill up at a time, increasing the visual impact of the game
// levels will correspond to which upgrades are avalible to you, and each level will give you an extra (need to figure this one out)
// resource which will be necessary to get additional upgrades, this will work similarly to the computation reasources used in 
// universal paperclips

//roughly - level 1: 100 bots - level 2: 500 bots - level 3: 2,500 bots

// 100% of human body explored at 3,720,000,000 nanoBots - ~ level 11 - 4,882,812,500 bots

// combat tab has a progress bar which goes between white and grey, showing the battle between nanobots and white blood cells,
// if the bar fills white, all progress stops untill you beat them back, slowing momentum. 
// if the bar fills grey the white blood cells are placated for some amount of time (maybe according to alertness levels)

// eventaully mask over the human body with red to show the ammount of infection, 

// when new module is ready to replace old one, throw it away, stopping the production of that resource temporarily and then drag in 
// the new resource. When new one is dragged in add some kind of animation to show that it is newly upgraded like a shine or something.

// Start of game control panel in tiny - slowly gets bigger over time when new stuff added

var playerLevel = 0;
var nextLevel = 100;

// Flags ------------------------------------------------------------------------------------------------------------------------

var milestoneFlag = 0;
var replicationFlag = 0;
var matterFlag = 0;
var cellFlag = 0;
var upgradeFlag = 0;
var powerFlag = 0;

var clickerUpgradeFlag1 = 0;
//var clickerUpgradeFlag2 = 0;

// replace with upgrade1.flag

var scraperUpgradeFlag1 = 0;
//var scraperUpgradeFlag2 = 0;

var combatUpgradeFlag1 = 0;
//var combatUpgradeFlag2 = 0;

var batteryUpgradeFlag1 = 0;

var loseFlag = 0;

// Upgrades ---------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------

function $(x) {
    return document.getElementById(x);
}

// MAIN LOOP ------------------------------------------------------------------------------------------------------------------------

window.onload = function() {
    // runs updates when the site loads
    update();
    elemUpdate();
    consoleReadout("System Startup Successful : Boot Mode: [VEFI]");
    addListeners("modcontainer");

    //Eye that Follows the mouse
    const pupil = $('pupil');
    const eyeBox = $('eyeelement');
    const originx = eyeBox.clientWidth / 2;
    const originy = eyeBox.clientHeight / 2;
    //const distance;
    const xfac = eyeBox.clientWidth / screen.width;
    const yfac = eyeBox.clientHeight / screen.height;
    const onMouseMove = (e) => {
        //distance = e.offsetX;
        pupil.style.left = e.offsetX + 'px';
        pupil.style.top = e.offsetY + 'px';
    }
    document.addEventListener('mousemove', onMouseMove);
    
};

window.setInterval(function(){
    // checks flags, calls the update function and element update function
    ticks = ticks + 1;
    update();
    elemUpdate();
    //include something in the update.effect that checks upgrade flags
    powerBar(computingPower);
    nanobotBar(totalBots);
    whiteCellCombatCalc();
    combatBar(whiteCellCombat);

    handleUpgrades();

    if (numClickers >= 1){
        addBot(clickBoost*(numClickers/100), false);
    }

    if (clickerUpgradeFlag1 == 1){
        clickBoost = 1.75;
    }

    if (scraperUpgradeFlag1 == 1) {
        scrapeBoost = 2;
    }

    if (batteryUpgradeFlag1 == 1) {
        powerCap = 1000;
    }

    if (loseFlag == 0 && powerFlag == 1 && computingPower <= powerCap){
        computingPower += ((totalBots / 10000) * (sliderValue / 100));
    }

    if (totalBots >= 100){
        // Set to 75
        replicationFlag = 1;
    }

    if (totalBots >= 100){
        matterFlag = 1;
    }

    if (totalMatterScraped >= 2000){
        cellFlag = 1;
    }

    if (playerLevel == 2){
        upgradeFlag = 1;
    }

    if (playerLevel == 1){
        powerFlag = 1;
    } 

    if (totalBots < 0) {
        totalBots = 0;
        numWhiteCells = 0;
    }

    if (ticks % 1000 == 0) {
        alarmState = Math.round(Math.random()*2) + 1;
        // alarm state should impact white cell reproduction as a factor of 1, 1.5, and 2
    }

    if (ticks % 100 == 0) {
        if (proteinBuff < 1) {
            proteinBuff += 0.01;
        } else {
            proteinBuff = 1;
        }
    }

}, 10);

// FUNCTIONS ------------------------------------------------------------------------------------------------------------------------

function update() {
    // updates the inner HTML 
    $("replicators").innerHTML = numClickers;
    $("repCost").innerHTML = repCost;
    $("bots").innerHTML = Math.round(totalBots).toLocaleString(undefined);
    $("proteins").innerHTML = Math.round(numProteins);
    $("computing").innerHTML = Math.round(computingPower);
    $('numWhiteCells').innerHTML = numWhiteCells.toFixed(2);
    $('level').innerHTML = playerLevel;
    //$("debugPwrInterval").innerHTML = sliderValue;
    //document.getElementById('botsPerSec').innerHTML = botRate;  
    //$("installedMod1").innerHTML = clickerUpgradeFlag1;
    //$("installedMod2").innerHTML = scraperUpgradeFlag1;
    //$("installedMod3").innerHTML = combatUpgradeFlag1;
    $('alarm').innerHTML = alarmState;
    

}

function elemUpdate() {
    // updates various elements to blink or not and sets elements to their html values
    replicationElement = $('repli');
    matterElement = $('scapr');
    combatElement = $('combat');
    upgradeElement = $('upgradeElem');
    combatElement2 = $('alertnessElement');
    combatElement3 = $('combatSlider');
    upgradeListTopElement = $('upgradeContainer');
    

    $('combatSliderElement').oninput = function() {
        sliderValue = $('combatSliderElement').value;
    };

    function blinkToggle() {
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

        if (combatUpgradeFlag1 == 0){        
            blink(combatElement);
            blink(combatElement2);
            blink(combatElement3);
            combatElement.style.display="none";
            combatElement2.style.display="none";
            combatElement3.style.display="none";
        } else {
            combatElement.style.display="";   
            combatElement2.style.display="";
            combatElement3.style.display="";
        }  

        if (upgradeFlag == 0){        
            blink(upgradeElement);
            upgradeElement.style.display="none";
        } else {
            upgradeElement.style.display=""; 
        }
    }

    //blinkToggle();

    // tie protein unscrambler to the better scraper module
    // blink in the scraper and repli modules seperately
    
    
    
    if (cellFlag == 1) {
        cellLevel = Math.round(totalMatterScraped / 1000);
        if (ticks % 100 == 0) {
            numWhiteCells += (alarmState * (cellLevel / 100)) * (sliderValue / 100);
            
            if (totalBots > 0){
                totalBots -= Math.round(numWhiteCells / 10);
            } else {
                totalBots = 0;
            }
            
        }
    }

    if (totalBots >= nextLevel){
        playerLevel += 1;
        consoleReadout("Capacity increased at " + nextLevel + " Bots");
        nextLevel *= 5;
    }

    upgrades.forEach(function(item) {
        const items = document.getElementsByClassName('mod');
        if (item.purchased != 1){
           //$(item.id).draggable = false;
           //$(item.id).classList.remove('unpurchased');
        }
    });

    scrapeBar(numProteins);
    
}


function handleBuffElement() { 
    if (computingPower >= 0) {

        proteinBuff = 0;
        //computingPower -= 100;

        for (let j=0; j<8; j++) {
            for (let i=0; i<10; i++) {
                setTimeout(function() {$(i).style.visibility = "visible";}, (i * 100 + (1000 * j)));
                setTimeout(function() {$(i).style.visibility = "hidden";}, 950 + (1000 * j));
            }
        }

        var k = 0;
        var text = '0.'
        $('scrambleElementText').innerHTML = '';
        for (i=0; i<500; i++){
            text += Math.floor(Math.random() * 9);
        }

        function typeEffect(){
            var speed = 10;
            if (k<text.length) {
                $('scrambleElementText').innerHTML += text.charAt(k);
                k++;
                setTimeout(typeEffect, speed);
            }
        }
        typeEffect();
    }  
}

// Creating Upgrade Nodes and Displaying them ------------------------------------------------------------------------------------------

function handleUpgrades() {
    for (i=0; i<upgrades.length; i++) {
        if (upgrades[i].trigger() && upgrades[i].uses > 0) {
            displayUpgrades(upgrades[i]);
            upgrades[i].uses -= 1;
        }
    }
}

function displayUpgrades(upgrade) {
    // creates a new element in the project column and sets its properties based on variables from projects.js
    upgrade.element = document.createElement("div");
    upgrade.element.setAttribute("id", upgrade.id);
    upgrade.element.setAttribute("class", "project");

    upgradeListTopElement.appendChild(upgrade.element, upgradeListTopElement.firstChild);
    
    var span = document.createElement("span");
    upgrade.element.appendChild(span);
    var title = document.createTextNode(upgrade.title);
    span.appendChild(title);    
    var div = document.createElement("div");
    upgrade.element.appendChild(div);
    var description = document.createTextNode(upgrade.description);
    upgrade.element.appendChild(description);

    upgrade.element.onclick = function() {selected(upgrade.element, upgrade.modName, upgrade.icon)}
    blink(upgrade.element);

}

function purchaseModule() {
    for (i=0; i<upgrades.length; i++){
        if ($('modFabricator').querySelector('img').src == upgrades[i].icon && upgrades[i].cost()){
            upgrades[i].purchased = 1;
            //upgrades[i].effect();
            //console.log('working ' + upgrades[i].purchased);
        }
    }   
}
    


// Allows projects to be selectable ------------------------------------------------------------------------------------------------------------

var divItems = document.getElementsByClassName("project");

function selected(item, modName, imgSrc) {
    const fabricator = $('modFabricator');
    if (fabricator.firstChild) {
        this.clear();
        fabricator.removeChild(fabricator.firstChild);
    }
    
    item.classList.add("selected");

    const elem = document.createElement("div");
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.width = "50px";
    img.style.height = "50px";
    img.draggable = false;
    
    elem.setAttribute("class", modName);
    elem.setAttribute("id", modName);
    
    elem.classList.add("mod");
    elem.draggable = true;
    
    fabricator.appendChild(elem);
    elem.appendChild(img);

    console.log("working");
    addListeners(modName);
    
}

function clear() {
    for(var i=0; i < divItems.length; i++) {
        var item = divItems[i];
        item.classList.remove("selected");
    }
}

// -------------------------------------------------------------------------------------------------------------------------------------


function calcBotRate(){
    var whiteCellRate = (Math.round(numWhiteCells / 10) / 100);
    var nanoBotRate = totalBots / 100;
    return (nanoBotRate - whiteCellRate).toFixed(2);
}

function blink(element){
    // handles the blinking-in animation of various elements

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

function whiteCellCombatCalc(){
    whiteCellCombat = (numWhiteCells / 10) * proteinBuff;
    

    if (whiteCellCombat >= 100){
        whiteCellCombat = 0;
        loseFlag = 1;
        setTimeout(function() {
            loseFlag = 0;
        }, 10000);
    }
}


function addBot(number, playerClick) {
    // Adds a nano-bot
    if (numProteins >= 2 && loseFlag == 0) {
        totalBots += number;
        if (playerClick == true){
            numProteins -= 2;
        } else {
            numProteins -= (clickBoost*(numClickers/100));
        }
        // Fix This Later
    }
}  

function addClicker() {
    // adds a new autoclicker
    if (repCost <= computingPower && numProteins > 20) {
        
        numClickers ++;
        computingPower -= repCost;

        repliBar(1);

        numProteins -= 20;
        repCost = Math.round(repCost * 1.25);
    }
}

function scrape() {
    // scrapes proteins 
    if (computingPower >= scrapeCost) {
        computingPower -= scrapeCost;
        numProteins += (1000 * scrapeBoost);
        totalMatterScraped += 1000;
    }
}

// Console Readout -------------------------------------------------------------------------------------------------------------------------------

function consoleReadout(text) {
    $('consoleElement').classList.add("disp");
    $('consoleTxt').innerHTML = '> ';
    $('consoleTxt').style.visibility = "visible";

    var letterCount = 0;
    var j = 0;

    function typeEffect(){
        var speed = 30;
        if (j<text.length) {
            $('consoleTxt').innerHTML += text.charAt(j);
            j++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();
    
    setTimeout(function() {
        $('consoleTxt').style.visibility = "hidden";
        $('consoleElement').classList.remove("disp");
    }, 3000);
}

// Progress Bars ---------------------------------------------------------------------------------------------------------------------------------

var scrapeBarWidth = numProteins;
var repliBarWidth = 0;
var nanoBarWidth = 0;

function powerBar(num) {
    // handles the various progress bars and updates them
    const elem = $('powerBar');

   // make this scale with the number of bots, so the progress bar increases less when you get more
    elem.style.width = num % 100 + '%';
    elem.style.backgroundColor = "rgb(0, 0, 0, " + (Math.round(num / 100) * 0.1) + ")";
}

function scrapeBar(num) {

    const elem = $('scrapeBar');
    scrapeBarWidth = (num / 100) % 100;
    elem.style.width = scrapeBarWidth + '%';

}

function repliBar(num) {
    const elem = $('repliBar');
    repliBarWidth = (repliBarWidth + num * 10) % 100;
    elem.style.width = repliBarWidth + '%';
    
}

var upgradeBarWidth = 0;

function upgradeBar(num) {
    const elem = $('upgradeBar');
    upgradeBarWidth += num;
    elem.style.width = upgradeBarWidth + '%';
}

function nanobotBar(num) {
    const elem = $('nanoBar');
    nanoBarWidth = ((num / (Math.pow(5, playerLevel))) % 100);
    //make this scale with level
    elem.style.width = nanoBarWidth + '%';
}

function combatBar(num) {
    const elem = $('combatBar');
    elem.style.width = 100 - num + '%';
}
// Drag and Drop Functionality for Modules ---------------------------------------------------------------------------

function getUpgrade(modId){
    return upgrades[modId.substring(3)];
}
let DragSrc;
function handleDragStart(e) {
    DragSrc = e.target.id;
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function handleDragEnd(e) {
    console.log("DragEnd Handled for:" + e);
    e.preventDefault();
    modules = document.querySelectorAll(".mod");
    modules.forEach(item => item.classList.remove("hide"));
    items = document.querySelectorAll(".modcontainer");
    items.forEach(item => item.classList.remove('over'));
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    e.target.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = $(id);

    console.log("A" + DragSrc);

    if (isDroppable(DragSrc, e.target.id)){
        handleUpgradePlaced(DragSrc);
        e.target.appendChild(draggable);
        draggable.classList.remove('hide');
        return false;
    } else {
        console.log("bad return");
    }   
    draggable.classList.remove('hide');
    return false;
}

function addListeners(targetClass){
    let items = document.querySelectorAll("." + targetClass);
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
    
}

function isDroppable(source, target) {
    let targetDict = {
        1 : ['target7', 'target8', 'target9', 'target10'],
        2 : ['target1', 'target2'],
        3 : ['target3'],
        4 : ['target4', 'target5'],
        5 : ['target6']
    };
    if (targetDict[getUpgrade(source).modType].includes(target)) {
        getUpgrade(source).placed += 1;
        return true;
    }
    return false;
}

function handleUpgradePlaced(id) {
    if (getUpgrade(id).placed > 0 && getUpgrade(id).placed < 2){
        getUpgrade(id).effect();
    }
}
