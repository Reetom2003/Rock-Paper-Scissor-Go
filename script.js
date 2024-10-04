const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const computerResult = document.querySelector(".computer_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const userScoreDisplay = document.querySelector(".user_score");
const computerScoreDisplay = document.querySelector(".computer_score");
const finalResultDisplay = document.querySelector(".final_result");


let userScore = 0;
let computerScore = 0;
let maxPoints = 5;

// Function to reset the game when someone wins the match
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
    finalResultDisplay.textContent = "";  // Clear the final result
    result.textContent = "Let's Play!!";  // Reset the result text
}


optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        
        image.classList.add("active");
        userResult.src = computerResult.src = "images/rock.png";
        result.textContent = "Go...";

        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        // Set a timeout to delay the result calculation
        let time = setTimeout(() => {
            gameContainer.classList.remove("start");

            // Get the source of the clicked option image
            let imageSrc = e.target.querySelector("img").src;
            userResult.src = imageSrc;

            // Random computer choice
            let randomNumber = Math.floor(Math.random() * 3);
            let computerImages = [
                "images/rock.png",
                "images/paper.png",
                "images/scissors.png",
            ];
            computerResult.src = computerImages[randomNumber];

           
            let computerValue = ["R", "P", "S"][randomNumber];
            let userValue = ["R", "P", "S"][index];

            
            let outcomes = {
                RR: "Draw",
                RP: "Computer",
                RS: "You",
                PP: "Draw",
                PR: "You",
                PS: "Computer",
                SS: "Draw",
                SR: "Computer",
                SP: "You",
            };

            let outcomeValue = outcomes[userValue + computerValue];

            
            result.textContent =
                userValue === computerValue
                    ? "Match Drawn"
                    : `${outcomeValue} won!!`;

            
            if (outcomeValue === "You") {
                userScore++;
                userScoreDisplay.textContent = userScore;
            } else if (outcomeValue === "Computer") {
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
            }

            // Check if either the user or computer has reached 5 points
            if (userScore === maxPoints || computerScore === maxPoints) {
                // Display the final winner
                finalResultDisplay.textContent = userScore === maxPoints
                    ? "Congratulations! You won the match!"
                    : "Computer won the match! Better luck next time.";

                // Reset the game after a brief delay
                setTimeout(() => {
                    resetGame();
                }, 4000);  // Reset the game after 3 seconds
            }
        }, 3000);
    });
});
