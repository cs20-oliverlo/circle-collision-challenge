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
        eatFood(i);
    }
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
    if (circle === food) {
        ctx.fillStyle = `rgb(${circle[n].r}, ${circle[n].g}, ${circle[n].b})`;
    } else {
        ctx.fillStyle = `${circle[n].innerColor}`;
    }
    ctx.beginPath();
    ctx.arc(circle[n].x, circle[n].y, circle[n].rad, circle[n].startAngle, circle[n].endAngle * Math.PI);
    ctx.fill();

    if (circle === player) {
        ctx.lineWidth = circle[n].lineWidth;
        ctx.strokeStyle = `${circle[n].ringColor}`;
        ctx.beginPath();
        ctx.arc(circle[n].x, circle[n].y, circle[n].rad, 0, 2 * Math.PI);
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

function eatFood(n) {
    let run = food[n].x - player[0].x;
    let rise = food[n].y - player[0].y;
    let d = Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2));

    if (d < player[0].rad + food[n].rad) {
        food.splice(n, 1);
        player[0].rad += food[n].rad;
    }
}

function spontaneousGeneration() {
    foodTimer++;
    if (foodTimer === 300) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)));
        foodTimer = 0;
    }
}

function newFood(x1, y1, rad1, startAngle1, endAngle1, r1, g1, b1) {
    return {
            x: x1,
            y: y1,
            rad: rad1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            r: r1,
            g: g1,
            b: b1
        };
}

function newPlayer(x1, y1, rad1, lineWidth1, startAngle1, endAngle1, xVelocity1, yVelocity1, ringColor1, innerColor1) {
    return {
            x: x1,
            y: y1,
            rad: rad1,
            lineWidth: lineWidth1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            xVelocity: xVelocity1,
            yVelocity: yVelocity1,
            ringColor: ringColor1,
            innerColor: innerColor1
        }
}

function reset() {
    food = [];
    foodTimer = 0;
    for (let i = 0; i < 25; i++) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)));
    }

    player = [];
    player.push(newPlayer(cnv.width / 2, cnv.height / 2, 10, 3, 0, 2, randomInt(-5, 5), randomInt(-5, 5), "blue", "rgb(193, 193, 247)"));
}