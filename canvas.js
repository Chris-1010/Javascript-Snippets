let canvas;
let context;

let now;
let fpsInterval = 10;  // 60fps
let then = Date.now();

document.addEventListener("DOMContentLoaded", init, false)






function init() {


    canvas = document.querySelector("canvas");  // Looks for the tag 'canvas'
    context = canvas.getContext("2d");

    let buttons = document.querySelectorAll("button");
    for (let button of buttons) {
    button.addEventListener("click", start, false);
    }
    window.addEventListener("keydown", start, false);

}


function start(event) {
    
    let key;
    console.log(event);
    if (event.type == "keydown") {
        console.log("It was a keypush that activated me")
        key = event.key;
    }
    else if (event.type == "click") {
        console.log("A button was clicked")
        key = event.target.id;
        if (key === "slower_fps" || key === "faster_fps") {
            shift_fps(key);
        }
    }


    if (key === "1") {
        first();
        removeEventListener("keydown", start, false)
    }
    else if (key === "2") {
        second();
        removeEventListener("keydown", start, false)
    }
    else if (key === "3") {
        third();
        removeEventListener("keydown", start, false)
    }
    else if (key === "4") {
        fourth();
        removeEventListener("keydown", start, false)
    }
    else if (key === "5") {
        fifth();
        removeEventListener("keydown", start, false)
    }
    else if (key === "6") {
        sixth();
        removeEventListener("keydown", start, false)
    }

}


function shift_fps(key) {
    if (key === "faster_fps") {
        fpsInterval -= 10;
    }
    else if (key === "slower_fps") {
        fpsInterval += 10;
    }
    console.log("Current FPS Interval: " + fpsInterval)
}





function first() {
    // Lab 6
    let background_audio = new Audio("/Audio/Raving_Rabbids_OST.mp3");
    background_audio.play();
    console.log("Playing background_audio");

    let x;
    let y;
    let size;
    let xChange;
    let yChange;

    x = canvas.width / 2;
    y = canvas.height / 2;
    size = 9;
    xChange = size + 1;
    yChange = size;
    fpsInterval = 50;

    let inputs = document.createElement("section");
    inputs.setAttribute("id", "inputs");
    inputs.style.cssText = "display:flex;justify-content:space-around;grid-row:4;grid-column:2;margin-top:5%;"
    let size_field = document.createElement("input");
    let xChange_field = document.createElement("input");
    let yChange_field = document.createElement("input");
    let color_field = document.createElement("input");
    let body = document.querySelector("body");
    body.appendChild(inputs);
    inputs.appendChild(size_field);
    inputs.appendChild(xChange_field);
    inputs.appendChild(yChange_field);
    inputs.appendChild(color_field);
    let fields = document.querySelectorAll("input");
    for (let field of fields) {
        field.style.cssText = "border-radius:400px;height:fit-content;padding:1% 2%;text-align:center;font-size:200%;"
        if (field === size_field) {
            field.setAttribute("placeholder", "Size");
          } else if (field === xChange_field) {
            field.setAttribute("placeholder", "X Change");
          } else if (field === yChange_field) {
            field.setAttribute("placeholder", "Y Change");
          } else if (field === color_field) {
            field.setAttribute("placeholder", "Colour");
          }
    }

     

    draw();

    function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Reading values from input fields
    size_field.addEventListener("input", debounce(function() {
        size = parseInt(size_field.value);
      }, 600));
      
    xChange_field.addEventListener("input", debounce(function() {
        xChange = parseInt(xChange_field.value);
      }, 600));
      
    yChange_field.addEventListener("input", debounce(function() {
        yChange = parseInt(yChange_field.value);
      }, 600));

    color_field.addEventListener("input", debounce(function() {
        let colorValue = color_field.value.toLowerCase();
        let validColors = [
            "red",
            "blue",
            "green",
            "yellow",
            "orange",
            "purple",
            "pink",
            "brown",
            "grey",
            "black",
            "white",
            "maroon",
            "navy",
            "gold",
            "violet",
            "indigo",
            "cyan"
        ];
        if (validColors.includes(colorValue)) {
            context.fillStyle = colorValue;
        }
        else {
            context.fillStyle = "white";
        }
    }, 600));
 
    
    context.fillRect(x, y, size, size);
    // context.clearRect(0, 0, canvas.width, canvas.height);
    x += xChange;
    y += yChange;

    if ((y + size + size) >= canvas.height || y <= 0) {
        yChange = yChange * -1
        }
    

    else if ((x + size) >= canvas.width || x <= 0) {
        xChange = -1 * xChange
        }

}
}

function second() {
    // Adapted from Lecture of 28 Feb / 3 March
    let background_audio = new Audio("/Audio/Follow Your Face.mp3");
    background_audio.play();
    console.log("Playing background_audio");

    let x;
    let y;
    let size;
    let xChange;
    let yChange;    
    let particles = [];
    fpsInterval = 50;

    let inputs = document.createElement("section");
    inputs.setAttribute("id", "inputs");
    inputs.style.cssText = "display:flex;justify-content:space-around;grid-row:4;grid-column:2;margin-top:5%;"
    let variation_field = document.createElement("input");
    let particle_count_field = document.createElement("input");
    let body = document.querySelector("body");
    body.appendChild(inputs);
    inputs.appendChild(variation_field);
    inputs.appendChild(particle_count_field);
    variation_field.style.cssText = "border-radius:400px;height:fit-content;padding:1% 2%;text-align:center;font-size:200%;"
    variation_field.setAttribute("title", "Variation")
    variation_field.setAttribute("type", "range")
    variation_field.setAttribute("min", "1")
    variation_field.setAttribute("max", "4")
    variation_field.setAttribute("value", "1")
    particle_count_field.setAttribute("title", "Particles")
    particle_count_field.setAttribute("type", "range")
    particle_count_field.setAttribute("min", "1")
    particle_count_field.setAttribute("max", "40")
    particle_count_field.setAttribute("value", "1")

    let variation = 1;  // Must initialize these two as they are changed inside the debounce function
    let particle_count = 1;
    let p;

    draw();

    function draw() {
        window.requestAnimationFrame(draw);
        x = canvas.width / 2;
        y = canvas.height / 2;
        size = 12;
        xChange = size;
        yChange = size;

        let now = Date.now();
        let elapsed = now - then;
        if (elapsed <= fpsInterval) {
            return;
        }
        then = now - (elapsed % fpsInterval);




        variation_field.addEventListener("input", debounce(function() {
            variation = parseInt(variation_field.value);
          }, 600));
        particle_count_field.addEventListener("input", debounce(function() {
            particle_count = parseInt(particle_count_field.value);
        }, 600));
        for (let i = 0; i < particle_count; i += 1) { /* controlling the amount of particles spewing out at once */
        
            if (variation === 1) {
                p = {
                
                // Jumping sparks from center
                x : x,
                y : y,
                color : "#ff" + randint(0,9),
                size : 2,
                xChange : randint(-5, 5),
                yChange : randint(-15, 0)
                }
            }
            else if (variation === 2) {
                p = {

                // Hose from side of screen
                x : 0,
                y : y,
                color : "#ff" + randint(0,9),
                size : 2,
                xChange : randint(5, canvas.width / 20),
                yChange : randint(-15, 0)
                }
            }

            else if (variation === 3) {
                p = {
            
                // Raining
                x : randint(0,canvas.width),
                y : 0,
                color : "#ff" + randint(0,9),
                size : 2,
                xChange : randint(-5, 5),
                yChange : randint(-15, 0)
                }
            }

            else if (variation === 4) {
                p = {

                // Sparks from bottom left corner 
                x : -5,
                y : canvas.height,
                color : "#ff" + randint(0,9),
                size : 2,
                xChange : randint(5, canvas.width / 30),
                yChange : randint(-20, 0)
            }
        }
            particles.push(p);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        

        for (let p of particles) {
            context.fillStyle = p.color;
            context.fillRect(p.x, p.y, p.size, p.size);
        }

        for (let p of particles) {
            p.x += p.xChange;
            p.y += p.yChange;
            // GRAVITY:
            p.yChange += 1.5;
        }
}
}

function third() {
    // Adapted from lecture of 7 March
    let background_audio = new Audio("/Audio/Arriba Amoeba!.mp3");
    background_audio.play();
    console.log("Playing background_audio");


    /* MOBILE INTEGRATION */
    
    let controls_button = document.querySelector("#controls")
    if (!controls_button) { /* if not controls_button,         ! == not               */
    let button;
    let directions = {
        1:"up",
        2:"left",
        3:"right",
        4:"down"
    };

    let controls = document.createElement("section");
    controls.setAttribute("id", "controls")
    controls.style.cssText = "position:absolute;display:grid;grid-template-columns:0.8fr 1fr 0.8fr;grid-template-rows:1fr 2fr 1fr;width:100vw;height:100vh;"

    document.querySelector("body").appendChild(controls);
    for (let i = 1; i < 5; i += 1) {
    button = document.createElement("button");
    controls.appendChild(button);
    button.setAttribute("id", directions[i]);  /* Not actually indexing it here. Must do it this way instead of dot notation (directions.i) */
    }
    let common_styles = "justify-self:center;width:50%;"
    document.getElementById("up").style.cssText = ("grid-column:2;grid-row:1;" + common_styles)
    document.getElementById("left").style.cssText = ("grid-column:1;grid-row:2;" + common_styles)
    document.getElementById("right").style.cssText = ("grid-column:3;grid-row:2;" + common_styles)
    document.getElementById("down").style.cssText = ("grid-column:2;grid-row:3;" + common_styles)

}

let moveRightButton = document.getElementById("right");
let moveLeftButton = document.getElementById("left");
let moveUpButton = document.getElementById("up");
let moveDownButton = document.getElementById("down");


moveRightButton.addEventListener("touchstart", function() {
    moveRight = true;
});
    
moveRightButton.addEventListener("touchend", function() {
    moveRight = false;
});
    
moveLeftButton.addEventListener("touchstart", function() {
    moveLeft = true;
});
    
moveLeftButton.addEventListener("touchend", function() {
    moveLeft = false;
});
    
moveUpButton.addEventListener("touchstart", function() {
    moveUp = true;
});
    
moveUpButton.addEventListener("touchend", function() {
    moveUp = false;
});
    
moveDownButton.addEventListener("touchstart", function() {
    moveDown = true;
});
    
moveDownButton.addEventListener("touchend", function() {
    moveDown = false;
});


    let animation;
    let asteroids = [];
    let player = {
        x : 0,
        y : canvas.height / 2,
        size : 10,
        xChange : 5,
        yChange : 5
    }
    let moveLeft = false;
    let moveRight = false;
    let moveUp = false;
    let moveDown = false;
    let win_audio = new Audio("/Audio/Chan Chan.mp3");
    let lose_audio = new Audio("/Audio/3DS Mii Maker.mp3")

    window.addEventListener("keydown", move, false);
    window.addEventListener("keyup", stay, false);
    
    draw();

    function draw() {
        animation = window.requestAnimationFrame(draw);
        let now = Date.now();
        let elapsed = now - then;
        if (elapsed <= fpsInterval) {
            return;
        }
        then = now - (elapsed % fpsInterval);

        if (asteroids.length < 10) {
            let a = {
                x : canvas.width,
                y : randint(0, canvas.height),
                size : randint(5, 7),
                xChange : randint(-3, -1),
                yChange : 0
            };
        asteroids.push(a);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Create player
        context.fillStyle = "cyan";
        context.fillRect(player.x, player.y, player.size, player.size)
    
        // Create asteroids
        context.fillStyle = "red";
        for (let a of asteroids) {
            context.fillRect(a.x, a.y, a.size, a.size);
        }

        // Wins the game
        if (player.x + player.size >= canvas.width) {
            let win_sign = document.createElement("h1");
            win_sign.style.cssText = "position:absolute;width:50vw;height:fit-content;justify-self:center;font-size:600%;color:red;background:white;border:5px solid gold;filter:drop-shadow(0 0 1em yellow);animation: win_a 7s;animation-fill-mode:forwards;text-align:center;border-radius:500px;padding: 1%;transition:5s";
            win_sign.setAttribute("id", "win_sign")
            win_sign.innerHTML = "WIN!"

            document.querySelector("body").appendChild(win_sign);
            win();
            stop();  // Run stop function to stop the animation
            return;
        }

        // Loses the game
        for (let a of asteroids) {
            if (player_collides(a)) {
                lose();
                stop();
                return;
            }
        }

        // Move initial set of asteroids back to the start instead of creating new ones
        for (let a of asteroids) {
            if (a.x + a.size < 0) {
                a.x = canvas.width;
                a.y = randint(0, canvas.height);
            }
            else {
                a.x += a.xChange;
                a.y += a.yChange;
            }
        }

        // MOVING PLAYER
        if (moveRight) {
            player.x += player.xChange;
        }
        if (moveLeft) {
            player.x -= player.xChange;
        }
        if (moveUp) {
            player.y -= player.yChange;
        }
        if (moveDown) {
            player.y += player.yChange;
        }
    
    }
    function move(event) {
        let key = event.key;
        if (key === "ArrowLeft") {
            moveLeft = true;
        }
        if (key === "ArrowRight") {
            moveRight = true;
        }
        if (key === "ArrowUp") {
            moveUp = true;
        }
        if (key === "ArrowDown") {
            moveDown = true;
        }
    }
    function stay(event) {
        let key = event.key;
        if (key === "ArrowLeft") {
            moveLeft = false;
        }
        if (key === "ArrowRight") {
            moveRight = false;
        }
        if (key === "ArrowUp") {
            moveUp = false;
        }
        if (key === "ArrowDown") {
            moveDown = false;
        }
    }

    function player_collides(a) {
        if (player.x + player.size < a.x || a.x + a.size < player.x || player.y > a.y + a.size || a.y > player.y + player.size) {
            return false;
        }
        else {
            return true;
        }
    }


    function stop() {
        window.removeEventListener("keydown", move, false);
        window.removeEventListener("keyup", stay, false);
        window.cancelAnimationFrame(animation);

        let retry_button = document.getElementById("retry");
        
        if (retry_button == null) {
            retry_button = document.createElement("h1");
            let body = document.querySelector("body"); 
            body.insertBefore(retry_button, canvas);
            retry_button.innerHTML = "Retry";
            retry_button.setAttribute("id", "retry");
        }
        console.log("Trying to show retry button")
        retry_button.style.cssText = "opacity:1;"
        retry_button.addEventListener("click", retry, false);  /* PLEASE NOTE THAT THERE ARE NO BRACKETS AFTER THE FUNCTION NAME. IF THERE WERE, IT WOULD INVOKE THE FUNCTION WITHOUT EVEN NEEDING A KEY */ 
    }

    function win() {
        if (!background_audio.paused) {
            console.log("Attempting to pause background_audio");
            background_audio.pause();
        }
        if (win_audio.paused) {
            console.log("Attempting to play win_audio");
            win_audio.play();
    }
    }
    function lose() {
        if (!background_audio.paused) {
            console.log("Attempting to pause background_audio");
            background_audio.pause();
        }
        if (lose_audio.paused) {
            console.log("Attempting to play lose_audio");
            lose_audio.play();
    }
    }
    function retry() {
        if (!background_audio.paused) {
            console.log("Attempting to pause background_audio from retry()");
            background_audio.pause();
        }
        if (!lose_audio.paused) {
            console.log("Attempting to pause lose_audio from retry()");
            lose_audio.pause();
        }
        if (!win_audio.paused) {
                console.log("Attempting to pause win_audio from retry()");
                win_audio.pause();
        }

        let retry_button = document.getElementById("retry");
        retry_button.removeEventListener("click", retry, false);
        retry_button.style.opacity = "0"
        third();
    }

}

function fourth() {
    // Lab 7

    // document.querySelector("html").setAttribute("id", "new_html")
    // document.querySelector("canvas").style.backgroundColor = "white"
    // document.querySelector("canvas").style.width = "80vh"
    // document.querySelector("canvas").style.height = "80vh"
    // or
    document.querySelector("html").style.cssText = "background: black; color: red; margin: 0;"
    document.querySelector("canvas").style.cssText = "background-color: white; width: 80vh; height: 80vh;"
    // Note that the .style.cssText property overwrites any previous styles set on the element, so you should include all styles you want to set in the same string.

    let threshold = 25;
    let points = [];

    draw()

    function draw() {
        window.requestAnimationFrame(draw);
        fpsInterval = 1;
        let now = Date.now();
        let elapsed = now - then;
        if (elapsed <= fpsInterval) {
            return;
    }
    then = now - (elapsed % fpsInterval); 

        let q = {
            x : randint(0, canvas.width),
            y : randint(0, canvas.width)
        }
        points.push(q);
        if (points.length > 0) {
        for (let p of points) {
            let distance = Math.sqrt((p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y));
            if (distance < threshold) {
                // context.strokeStyle = "#0000" + randint(0, 9) + randint(0, 9)
                context.strokeStyle = "black";
                context.beginPath();
                context.lineWidth = 5/distance;
                context.moveTo(p.x, p.y);
                context.lineTo(q.x, q.y);
                context.stroke();
            }
        }
        }
        
    }

}

function fifth() {
    // Lecture of 10 March
    let background_audio = new Audio("/Audio/Arroz Con Pollo.mp3");
    background_audio.play();
    console.log("Playing background_audio");

    let player = {
        x : 0,
        y : 0,
        width : 32,
        height : 32,
            frameX : 0,
            frameY : 0,
        xChange : 0,
        yChange : 0,
            in_air : false
    };

            let floor;

    let moveLeft = false;
    let moveRight = false;
    let moveUp = false;
    let moveDown = false;
    let getUp = false;

            let playerImage  = new Image();

        floor = canvas.height - 27;
        player.x = canvas.width / 2;
        player.y = floor - player.height

        // playerImage.src = "";  // would be used if there wasn't different positions for the player to be in
        // backgroundImage.src = "tiles.png;"

        window.addEventListener("keydown", activate, false)
        window.addEventListener("keyup", deactivate, false)

        // draw();
            load_assets([
                {"var": playerImage, "url": "Assets/AnimationSheet_Character.png"},
            ], draw);
        
    function draw() {
        window.requestAnimationFrame(draw);

        let now = Date.now();
        let elapsed = now - then;
        if (elapsed <= fpsInterval) {
            return;
        }
        then = now - (elapsed % fpsInterval);


        // Draw background on canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#87cefa";  // Sky blue
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#7cfc00";  // Grass color
        context.fillRect(0, floor - 10, canvas.width, canvas.height + 10 - floor);


        // Draw Player

        // context.fillStyle = "red";
        // context.fillRect(player.x, player.y, player.width, player.height);
        context.drawImage(playerImage,
                          player.width * player.frameX,
                          player.height * player.frameY,
                          player.width,
                          player.height,
                          
                          player.x, player.y, player.width, player.height
        );

        if ((moveLeft || moveRight) && !(moveRight && moveLeft) && !player.in_air) {
            player.frameY = 3;
            player.frameX = (player.frameX + 1) % 8;
        }
        if (player.in_air) {
            player.frameY = 5;
            player.frameX = (player.frameX + 1) % 8;
        }


        // Draw Other Objects
        // (Alter matrix above)


        // Handle Key Presses
        if (moveLeft) {
            // player.xChange = -2;  // Linear method of moving
            
            player.xChange -= 0.5;  // Acceleration! Increases the distance the player is moving every time the animation is played while leftArrow is held down
        }

        if (moveRight) {
            // player.xChange = 2;

            player.xChange += 0.5;
        }

        // Jumping!
        if (moveUp && !player.in_air) {  // Must ensure player is not already in the air to prevent unlimited jumping
            player.yChange -= 20;
            player.in_air = true;
        }


        // Update the Player
        player.x += player.xChange;
        player.y += player.yChange;


        // Update Other Objects
        // ... //


        // Physics
        player.yChange += 1.5; // Gravity!
            player.xChange = player.xChange * 0.9; // Friction!
            player.yChange = player.yChange * 0.9; // Friction!

        // Hits the ground
        if ( (player.in_air) && ((player.y + player.height)  > floor)) {
            
            player.frameX = 0;
            player.frameY = 0;
        }


        // Collisions with ground when landing from jump
        if ( (player.y + player.height)  > floor) {  // Note that greater than here means the player has gone underneath the floor
            player.in_air = false;
            player.y = floor - player.height;  // Ensures player stays just above ground. (player.y is the top right of the image)
            player.yChange = 0;  // No longer falling
        }

        // Hitting the edge of the canvas
        if (player.x + player.width < 0) {  // Hitting the left edge
            player.x = canvas.width;  // Come back at the right edge
        }
        else if (player.x > canvas.width) { // Hitting the right edge
            player.x = 0 - player.width;  // Come back at left edge
        }

        if (getUp) {
            console.log("Getting up")
            player.frameX -= 1;
                    if (player.frameX === -1) {
                        getUp = false;
                        player.frameX = 0;
                    }
        }
    }

    function activate(event) {  // 🟢
        let key = event.key;

        switch (key) {
            case "ArrowLeft":
                moveLeft = true;
                break; // would go through each case until it reaches a break if this wasn't here. Therefore, each case is its own if statement. By inserting a break at the end of each one, the cases become 'else if' statements.
            case "ArrowRight":
                moveRight = true;
                break;
            case "ArrowUp":
                moveUp = true;
                break;
            case "ArrowDown":
                moveDown = true;

                player.frameY = 7
                player.frameX += 1;
                if (player.frameX === 8) {
                    player.frameX = 7;
                }
                break;
        }
    }

    function deactivate(event) { // 🔴
        let key = event.key;


        // Using Switch Statement

        switch (key) {
            case "ArrowLeft":
                moveLeft = false;
                break;
            case "ArrowRight":
                moveRight = false;
                break;
            case "ArrowUp":
                moveUp = false;
                break;
            case "ArrowDown":
                console.log("Reached here")
                moveDown = false;
                
                getUp = true;
                break;
        }


    }
    


    function load_assets(assets, callback_function) {  // Ensures assets (images/audio/etc.) are loaded before script is run
        let number_of_assets = assets.length;
        let loaded = function() {
            console.log("Loaded 😊");
            number_of_assets -= 1;
            if (number_of_assets === 0) {
                callback_function();  // Note that this does not call the function titled 'callback_function' but instead, the string name of a function is inserted here and the result is called
            }
        };
        for (let asset of assets) {
            let element = asset.var;
            if (element instanceof HTMLImageElement) {
                console.log("Image Loaded:" + element);
                element.addEventListener("load", loaded, false);
            }
            else if (element instanceof HTMLAudioElement) {
                console.log("Audio Loaded:" + element);
                element.addEventListener("canplaythrough", loaded, false);
            };
            element.src = asset.url;
        };
    };
};













// DEBOUNCING ---  Waiting a certain while for the user to finish typing before reading in a value from their input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
        clearTimeout(timeout);
        func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
    }






function randint(min, max) {
        return Math.round(Math.random() * (max-min)) + min;
}