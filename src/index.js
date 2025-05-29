const player1 = {
    name: "Mario",
    velocity: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
}

const player2 = {
    name: "Luigi",
    velocity: 3,
    maneuverability: 4,
    power: 4,
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function main () {
    console.log("Hi")
}

(async function main() {
    console.log(
    `🏁 Corrida entre ${player1.name} e ${player2.name} começando `
    );
})();