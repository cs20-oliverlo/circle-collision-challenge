// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF

// Reset Variables
let food;
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

    // Player Helper Functions
    drawCircles(player, 0);
    playerMovement();

    // Request Animation Frame
    requestAnimationFrame(animate);
}

// function drawFood(n) {
//     ctx.fillStyle = `rgb(${food[n].r}, ${food[n].g}, ${food[n].b})`;
//     ctx.beginPath();
//     ctx.arc(food[n].x, food[n].y, food[n].rad, food[n].startAngle, food[n].endAngle * Math.PI);
//     ctx.fill();
// }

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
        ctx.arc(circle[n].x, circle[n].y, circle[n].rad + 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function playerMovement() {
    if (mouseX < player[0].x) {
        player[0].x--;
    }
    if (mouseX > player[0].x) {
        player[0].x++;
    }
    if (mouseY < player[0].y) {
        player[0].y--;
    }
    if (mouseY > player[0].y) {
        player[0].y++;
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
    for (let i = 0; i < 25; i++) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)));
    }

    player = [];
    player.push(newPlayer(cnv.width / 2, cnv.height / 2, 10, 3, 0, 2, randomInt(-5, 5), randomInt(-5, 5), "blue", "rgb(193, 193, 247)"));
}