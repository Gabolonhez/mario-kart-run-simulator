const player1 = {
  name: "Mario",
  velocity: 4,
  maneuverability: 3,
  power: 3,
  points: 0,
};

const player2 = {
  name: "Luigi",
  velocity: 3,
  maneuverability: 4,
  power: 4,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";   
            break;
        default: 
            result = "Confronto";
    }
    return result;
}

async function playRaceEngine (character1, character2) {

    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

    // draw block
        let block = await getRandomBlock();
        console.log(` block ${block}`);
    }
    
    // roll dices

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // hability test
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0; 

    if (block === "Reta") {
        totalTestSkill1 = diceResult1 + character1.velocity;
        totalTestSkill2 = diceResult2 + character2.velocity;
    }
    if (block === "Curva") {
        totalTestSkill1 = diceResult1 + character1.maneuverability;
        totalTestSkill2 = diceResult2 + character2.maneuverability;
    }
    if (block === "Confronto") {
        let powerResult1 = diceResult1 + character1.power;
        let powerResult2 = diceResult2 + character2.power;
    }
}

(async function main() {
  console.log(`🏁 Corrida entre ${player1.name} e ${player2.name} começando `);

 await playRaceEngine(player1,player2);
})();
