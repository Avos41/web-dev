let piles = [3, 3, 3];

function updatePiles() {
    for (let i = 0; i < piles.length; i++) {
        document.getElementById(`pile${i + 1}`).textContent = piles[i];
    }
}

function playerMove() {
    const pileInput = document.getElementById('pile-input').value;
    const takeInput = document.getElementById('take-input').value;
    const pileIndex = parseInt(pileInput) - 1;
    const takeAmount = parseInt(takeInput);

    if (pileIndex >= 0 && pileIndex < piles.length && takeAmount > 0 && takeAmount <= 3 && piles[pileIndex] >= takeAmount) {
        piles[pileIndex] -= takeAmount;
        updatePiles();
        if (checkWin()) {
            document.getElementById('message').textContent = "Player wins!";
        } else {
            setTimeout(drNimMove, 1000);
        }
    } else {
        document.getElementById('message').textContent = "Invalid move.";
    }
}

function drNimMove() {
    let total = piles.reduce((a, b) => a ^ b, 0);
    if (total === 0) {
        for (let i = 0; i < piles.length; i++) {
            if (piles[i] > 0) {
                piles[i]--;
                break;
            }
        }
    } else {
        for (let i = 0; i < piles.length; i++) {
            let target = piles[i] ^ total;
            if (target < piles[i]) {
                piles[i] = target;
                break;
            }
        }
    }
    updatePiles();
    if (checkWin()) {
        document.getElementById('message').textContent = "Dr. Nim wins!";
    }
}

function checkWin() {
    return piles.every(pile => pile === 0);
}

updatePiles();
