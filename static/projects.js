// Upgrades ------------------------------------------------------------------

var upgrades = [];

var upgrade1 = {
    id: "upgrade1",
    title: "Replicators I",
    priceTag: "10 w",
    description: "Increased Transistor Density -- Self Replication Systems Online",
    console: "Module Installed ------- Replication Systems Online",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Rep_Icon_I.png?raw=true",
    modName : "mod0",
    modType : 1,
    placed : 0,
    previousUpgrade: null,
    
    trigger: function(){return computingPower>=1},
    uses: 1,
    purchased: 0,
    cost: 10,
    element: null,
    effect: function(){
        upgrade1.element.parentNode.removeChild(upgrade1.element);
        consoleReadout(upgrade1.console);
        console.log("upgrade 1 placement handled");
        clickerUpgradeFlag1 = 1;
        replicationFlag = 1;
        //change clicker buff directly
        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade1);

var upgrade2 = {
    id: "upgrade2",
    title: "Scrapers I",
    priceTag: "10 w",
    description: "Better scraping",
    console: "Module Installed ------- scrape rate increase 25%",
    icon: "https://i.ibb.co/wzH78kd/Protein-Icon.png",
    modName : "mod1",
    modType : 1,
    placed : 0,
    purchased: 0,
    cost: 10,
    previousUpgrade: null,

    
    trigger: function(){return computingPower>=5},
    uses: 1,
    element: null,
    effect: function(){
        
        upgrade2.element.parentNode.removeChild(upgrade2.element);
        consoleReadout(upgrade2.console);
        scraperUpgradeFlag1 = 1;
        matterFlag = 1;
    }
}

upgrades.push(upgrade2);

var upgrade3 = {
    id: "upgrade3",
    title: "Combat I",
    priceTag: "10 w",
    description: "Air Cannon",
    console: "Module Installed ------- Air gun online at 78% effeciency",
    icon: "https://i.ibb.co/s5f1czr/Air-Gun-Icon.png",
    modName : "mod2",
    modType : 1,
    placed : 0,
    purchased: 0,
    cost: 10,
    previousUpgrade: null,
    
    trigger: function(){return computingPower>=8},
    uses: 1,
    element: null,
    effect: function(){
        //computingPower -= 100;
        upgrade3.element.parentNode.removeChild(upgrade3.element);
        consoleReadout(upgrade3.console);
        combatUpgradeFlag1 = 1;
        
    }
}

upgrades.push(upgrade3);

var upgrade4 = {
    id: "upgrade4",
    title: "Battery I",
    priceTag: "0 w",
    description: "Store the swarm's natural static charge",
    console: "Module Installed ------- Swarm is accumulating charge --- Swarm Functionality increased",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Bat_Icon_I.png?raw=true",
    modName : "mod3",
    modType : 1,
    placed : 0,
    purchased: 1,
    cost: 0,
    previousUpgrade: null,
    
    trigger: function(){return totalBots>=100},
    uses: 1,
    element: null,
    effect: function(){
        upgrade4.element.parentNode.removeChild(upgrade4.element);
        consoleReadout(upgrade4.console);
        powerFlag = 1;
        powerCap = 100
    }
}

upgrades.push(upgrade4);

var upgrade5 = {
    id: "upgrade5",
    title: "Replicators II",
    priceTag: "200 w",
    description: "Better Replicators 2",
    console: "Module Installed ------- Rep rate increase 25%",
    icon: "https://github.com/yukapine/nano-bots/blob/main/Images/Rep_Icon_II.png?raw=true",
    modName : "mod4",
    modType : 1,
    placed : 0,
    purchased: 0,
    cost: 10,
    previousUpgrade: "mod0",
    
    trigger: function(){return totalBots>=200},
    uses: 1,
    element: null,
    effect: function(){
        upgrade5.element.parentNode.removeChild(upgrade5.element);

        consoleReadout(upgrade5.console);
        console.log("upgrade 5 placement handled");
        clickerUpgradeFlag5 = 1;

        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade5);

var upgrade6 = {
    id: "upgrade6",
    title: "Immuno Suppressant I",
    priceTag: "200 w",
    description: "Decreased White cell aggression",
    console: "Module Installed ------- White cell Agression Reduced 20%",
    icon: "https://i.ibb.co/qCrv5kV/Imm-Supp-I.png",
    modName : "mod5",
    modType : 3,
    placed : 0,
    purchased: 0,
    cost: 10,
    previousUpgrade: null,
    
    trigger: function(){return totalBots>=200},
    uses: 1,
    element: null,
    effect: function(){
        upgrade6.element.parentNode.removeChild(upgrade6.element);
        consoleReadout(upgrade6.console);
        aggression = 0.8;
    }
}

upgrades.push(upgrade6);

var upgrade7 = {
    id: "upgrade7",
    title: "Protein Solver I",
    priceTag: "200 w",
    description: "Unlock Protein Solver",
    console: "Module Installed ------- Protein Solver Online%",
    icon: "https://i.ibb.co/TWr1YDF/Protein-Solver-Mod.png",
    modName : "mod6",
    modType : 2,
    placed : 0,
    purchased: 0,
    cost: 10,
    previousUpgrade: null,

    
    trigger: function(){return totalBots>=200},
    uses: 1,
    element: null,
    effect: function(){
        upgrade7.element.parentNode.removeChild(upgrade7.element);
        consoleReadout(upgrade7.console);
        console.log("upgrade 7 placement handled");
        console.log("MOD# " + upgrade7.modType);

        combatUpgradeFlag2 = 1;

    }
}

upgrades.push(upgrade7);

var upgrade8 = {
    id: "upgrade8",
    title: "Targeted Laser I",
    priceTag: "100 w",
    description: "Kill more White Cells per Click",
    console: "Module Installed ------- OtTer's internal targeting increase 25%",
    icon: "https://raw.githubusercontent.com/yukapine/nano-bots/main/Images/Laser_Icon.png",
    modName : "mod7",
    modType : 2,
    placed : 0,
    previousUpgrade: null,
    
    trigger: function(){return totalBots>=200},
    uses: 1,
    purchased: 0,
    cost: 10,
    element: null,
    effect: function(){
        upgrade8.element.parentNode.removeChild(upgrade8.element);
        consoleReadout(upgrade8.console);
        console.log("upgrade 8 placement handled");
        //playerCombatUpgradeFlag1 = 1;
        killBuff = 1.25;

        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade8);

var upgrade9 = {
    id: "upgrade9",
    title: "Battery II",
    priceTag: "1000 w",
    description: "Build up more charge",
    console: "Module Installed ------- Battery Capacity increased to 10,000 W",
    icon: "https://i.ibb.co/v3zWpqr/Battery-II.png",
    modName : "mod8",
    modType : 1,
    placed : 0,
    previousUpgrade: "mod3",
    
    trigger: function(){return totalBots>=200},
    uses: 1,
    purchased: 0,
    cost: 10,
    element: null,
    effect: function(){
        upgrade9.element.parentNode.removeChild(upgrade9.element);
        consoleReadout(upgrade9.console);
        console.log("upgrade 9 placement handled");
        powerCap = 10000;

        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade9);

//Other Upgrades:
//1.Captcha Solver
//2.Immune Suppressant
//3.Protein Solver - Introduce Options
//4.

// Upgrade sections 1, 2, and 3 (1st is unlocked near immediately) (3rd is unlocked later)
// when core 4 modules installed - console states "core systems online"
