let aVal, b0Val, b1Val, ans;

function newVariant() {
    aVal = randomInt(1, 10);
    b0Val = randomInt(1, 10);
    b1Val = randomInt(1, 10);
    ans = aVal * b1Val;

    document.getElementById("a-value").textContent = aVal;
    document.getElementById("b0-value").textContent = b0Val;
    document.getElementById("b1-value").textContent = b1Val;
    document.getElementById("ab0-value").textContent = aVal * b0Val;
    document.getElementById("ab1-value").textContent = "?";

    document.getElementById("result-text").textContent = "";
    document.getElementById("answer-input").value = "";
}

function gradeAnswer() {
    const userVal = parseInt(document.getElementById("answer-input").value);
    const result = document.getElementById("result-text");

    if (userVal === ans) {
        result.textContent = "Correct answer!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect answer!";
        result.style.color = "red";
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onload = newVariant;
