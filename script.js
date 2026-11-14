
// EmojiSlots - 3 Reel Arcade Machine

// 1. Game settings
const emojis = ["🍒", "🍋", "🍇", "💎", "⭐", "🔔"];

let score = 100;
let isSpinning = false;

// 2. Select HTML elements
const scoreDisplay = document.getElementById("score");
const spinButton = document.getElementById("spinButton");
const message = document.getElementById("message");

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

// 3. Generate a random emoji
function randomEmoji() {
    const index = Math.floor(Math.random() * emojis.length);

    return emojis[index];
}

// 4. Update the score display
function updateScore() {
    scoreDisplay.textContent = score;

    // Disable button if fewer than 10 points remain
    spinButton.disabled = score < 10;
}

// 5. Spin the machine
function spin() {

    // Prevent overlapping spins
    if (isSpinning || score < 10) {
        return;
    }

    isSpinning = true;

    // Immediately lock the button
    spinButton.disabled = true;

    // Deduct spin cost
    score -= 10;

    updateScore();

    message.textContent = "Spinning...";

    // Apply rolling animation
    reels.forEach(reel => {
        reel.classList.add("spinning");
    });

    // 6. Repeatedly change emojis
    const interval = setInterval(() => {

        reels.forEach(reel => {
            reel.textContent = randomEmoji();
        });

    }, 100);

    // 7. Stop the reels after 2 seconds
    setTimeout(() => {

        // Stop the interval
        clearInterval(interval);

        // Generate final results
        const results = [
            randomEmoji(),
            randomEmoji(),
            randomEmoji()
        ];

        // Display final emojis
        reels.forEach((reel, index) => {

            reel.textContent = results[index];

            reel.classList.remove("spinning");

        });

        // 8. Check for jackpot
        if (
            results[0] === results[1] &&
            results[1] === results[2]
        ) {

            score += 100;

            message.textContent = "🎉 JACKPOT! +100 POINTS!";

        } else {

            message.textContent = "Not a match! Try again.";

        }

        // 9. Unlock the machine
        isSpinning = false;

        updateScore();

        // Check whether the game has ended
        if (score < 10) {

            message.textContent = "Game over! Not enough points.";

        }

    }, 2000);
}

// 10. Spin button event
spinButton.addEventListener("click", spin);

// 11. Initialize game
updateScore();
