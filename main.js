// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF

// Reset Variables
let food;
let foodTimer;
let player;
let mouseX;
let mouseY;

reset();

// Event Stuff
document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}


// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, cnv.width, cnv. height);

    // Food Helper Functions
    for (let i = 0; i < food.length; i++) {
        drawCircles(food, i);
    }
    eatFood();
    spontaneousGeneration();

    // Player Helper Functions
    drawCircles(player, 0);
    if (mouseX !== undefined && mouseY !== undefined) {
        playerMovement();
    }

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function drawCircles(circle, n) {
    ctx.fillStyle = circle[n].color;
    ctx.beginPath();
    ctx.arc(circle[n].x, circle[n].y, circle[n].r, circle[n].startAngle, circle[n].endAngle * Math.PI);
    ctx.fill();

    if (circle === player) {
        ctx.lineWidth = circle[n].lineWidth;
        ctx.strokeStyle = `${circle[n].ringColor}`;
        ctx.beginPath();
        ctx.arc(circle[n].x, circle[n].y, circle[n].r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function playerMovement() {
    let run = mouseX - player[0].x;
    let rise = mouseY - player[0].y;

    player[0].x += run / 10;
    player[0].y += rise / 10;

    if (player[0].x < 0) {
        player[0].x = 0;
    } else if (player[0].x > cnv.width) {
        player[0].x = cnv.width;
    }
    
    if (player[0].y < 0) {
        player[0].y = 0;
    } else if (player[0].y > cnv.height) {
        player[0].y = cnv.height;
    }
}

function eatFood() {
    for (let i = 0; i < food.length; i++) {
        let run = food[i].x - player[0].x;
        let rise = food[i].y - player[0].y;
        let d = Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2));

        if (d < player[0].r + food[i].r) {
            player[0].r += food[i].r / player[0].r;
            food.splice(i, 1);
        }
    }
}

function spontaneousGeneration() {
    foodTimer++;
    if (foodTimer === 300) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));

        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));

        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));

        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));

        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));
        foodTimer = 0;
    }
}

function newFood(x1, y1, r1, startAngle1, endAngle1, color1) {
    return {
            x: x1,
            y: y1,
            r: r1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            color: color1
        };
}

function newPlayer(x1, y1, r1, lineWidth1, startAngle1, endAngle1, xVelocity1, yVelocity1, ringColor1, color1) {
    return {
            x: x1,
            y: y1,
            r: r1,
            lineWidth: lineWidth1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            xVelocity: xVelocity1,
            yVelocity: yVelocity1,
            ringColor: ringColor1,
            color: color1
        }
}

function reset() {
    food = [];
    foodTimer = 0;
    for (let i = 0; i < 25; i++) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));
    }

    player = [];
    player.push(newPlayer(cnv.width / 2, cnv.height / 2, 10, 3, 0, 2, randomInt(-5, 5), randomInt(-5, 5), "blue", "rgb(193, 193, 247)"));
}