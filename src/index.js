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
  points: 0, // Added points property for player2
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

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

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // draw block
    let block = await getRandomBlock(); // Removed redundant block declaration
    console.log(` Bloco ${block}`);

    // roll dices
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // hability test
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "Reta") {
      totalTestSkill1 = diceResult1 + character1.velocity;
      totalTestSkill2 = diceResult2 + character2.velocity;

      await logRollResult(character1.name, "velocidade", diceResult1, character1.velocity);
      await logRollResult(character2.name, "velocidade", diceResult2, character2.velocity);
    } else if (block === "Curva") {
      totalTestSkill1 = diceResult1 + character1.maneuverability;
      totalTestSkill2 = diceResult2 + character2.maneuverability;

      await logRollResult(character1.name, "manobrabilidade", diceResult1, character1.maneuverability);
      await logRollResult(character2.name, "manobrabilidade", diceResult2, character2.maneuverability);
    } else if (block === "Confronto") {
      let powerResult1 = diceResult1 + character1.power;
      let powerResult2 = diceResult2 + character2.power;

      console.log(`${character1.name} confrontou com ${character2.name} !🥊`);

      await logRollResult(character1.name, "Poder", diceResult1, character1.power);
      await logRollResult(character2.name, "Poder", diceResult2, character2.power);

      if (powerResult1 > powerResult2 && character2.points > 0) {
        console.log(`${character1.name} venceu o confronto! ${character2.name} perdeu um ponto.👎`);
        character2.points--;
      } else if (powerResult2 > powerResult1 && character1.points > 0) {
        console.log(`${character2.name} venceu o confronto! ${character1.name} perdeu um ponto.👎`);
        character1.points--;
      } else if (powerResult1 === powerResult2) {
        console.log("Empate! Nenhum ponto foi marcado e nem perdido.");
      }
    }

    // checking the winner for Reta and Curva blocks
    if (block === "Reta" || block === "Curva") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.name} marcou um ponto!`);
        character1.points++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.name} marcou um ponto!`);
        character2.points++; // Luigi should also get a point
      } else {
        console.log("Empate na habilidade! Nenhum ponto foi marcado.");
      }
    }

    console.log("____________________________");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.name}: ${character1.points} ponto(s)`);
  console.log(`${character2.name}: ${character2.points} ponto(s)`);

  if (character1.points > character2.points) {
    console.log(`🏆 ${character1.name} é o grande vencedor!`);
  } else if (character2.points > character1.points) {
    // Fixed typo here
    console.log(`🏆 ${character2.name} é o grande vencedor!`);
  } else {
    console.log("🤝 Empate! Ninguém venceu a corrida.");
  }
}

(async function main() {
  console.log(`🏁 Corrida entre ${player1.name} e ${player2.name} começando `);

  await playRaceEngine(player1, player2);
  await declareWinner (player1, player2); // Call declareWinner after the race engine finishes
})();