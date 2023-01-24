// Upgrades ------------------------------------------------------------------

var upgrade1 = {
    id: "upgrade1",
    title: "Replicators I",
    priceTag: "(1,000 Power)",
    description: "Increased Transistor Density",
    console: "Module Installed ------- replication rate increase 25%",
    icon: "https://i.ibb.co/RgJn8kP/Module1-Icon.png",

    
    trigger: function(){return playerLevel>=1},
    uses: 1,
    cost: function(){return computingPower>=100},
    //element: null,
    effect: function(){
        computingPower -= 100;
        project1.element.parentNode.removeChild(project1.element);
        //var index = activeProjects.indexOf(project1);
        //activeProjects.splice(index, 1);
    }
}

upgrades.push(upgrade1);
