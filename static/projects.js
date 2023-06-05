// Upgrades ------------------------------------------------------------------

var upgrades = [];

var upgrade1 = {
    id: "upgrade1",
    title: "Replicators I",
    priceTag: "100 w",
    description: "Increased Transistor Density",
    console: "Module Installed ------- replication rate increase 25%",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Rep_Icon_I.png?raw=true",
    modName : "mod0",
    modType : 1,
    placed : 0,
    
    trigger: function(){return totalBots>=10},
    uses: 1,
    purchased: 0,
    cost: function(){return totalBots>=50},
    element: null,
    effect: function(){
        //computingPower -= 100;
        upgrade1.element.parentNode.removeChild(upgrade1.element);
        consoleReadout(upgrade1.console);
        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade1);

var upgrade2 = {
    id: "upgrade2",
    title: "Scrapers I",
    priceTag: "100 w",
    description: "Better scraping",
    console: "Module Installed ------- scrape rate increase 25%",
    icon: "https://i.ibb.co/wzH78kd/Protein-Icon.png",
    modName : "mod1",
    modType : 1,
    placed : 0,

    
    trigger: function(){return totalBots>=15},
    uses: 1,
    cost: function(){return computingPower -= 0},
    element: null,
    effect: function(){
        //computingPower -= 100;
        upgrade2.element.parentNode.removeChild(upgrade2.element);
        consoleReadout(upgrade2.console);
    }
}

upgrades.push(upgrade2);

var upgrade3 = {
    id: "upgrade3",
    title: "Combat I",
    priceTag: "100 w",
    description: "Air Cannon",
    console: "Module Installed ------- Air gun online at 78% effeciency",
    icon: "https://i.ibb.co/s5f1czr/Air-Gun-Icon.png",
    modName : "mod2",
    modType : 1,
    placed : 0,
    
    trigger: function(){return totalBots>=20},
    uses: 1,
    cost: function(){return computingPower -= 0},
    element: null,
    effect: function(){
        //computingPower -= 100;
        upgrade3.element.parentNode.removeChild(upgrade3.element);
        consoleReadout(upgrade3.console);
    }
}

upgrades.push(upgrade3);

var upgrade4 = {
    id: "upgrade4",
    title: "Battery I",
    priceTag: "100 w",
    description: "Better Battery",
    console: "Module Installed ------- Battery storage increase 25%",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Bat_Icon_I.png?raw=true",
    modName : "mod3",
    modType : 1,
    placed : 0,
    
    trigger: function(){return totalBots>=25},
    uses: 1,
    cost: function(){return computingPower -= 0},
    element: null,
    effect: function(){
        //computingPower -= 100;
        upgrade4.element.parentNode.removeChild(upgrade4.element);
        consoleReadout(upgrade4.console);
    }
}

upgrades.push(upgrade4);

var upgrade5 = {
    id: "upgrade5",
    title: "Replicators II",
    priceTag: "100 w",
    description: "Better Replicators 2",
    console: "Module Installed ------- Rep rate increase 25%",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Rep_Icon_II.png?raw=true",

    
    trigger: function(){return totalBots>=30},
    uses: 1,
    cost: function(){return computingPower -= 0},
    element: null,
    effect: function(){
        //computingPower -= 100;
        //project1.element.parentNode.removeChild(project1.element);
    }
}

upgrades.push(upgrade5);

//Other Upgrades:
//1.Captcha Solver
//2.Immune Suppressant
//3.Protein Solver - Introduce Options
//4.
