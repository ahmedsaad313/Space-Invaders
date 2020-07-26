var x;
var y;
var alienx;
var alieny;
var bulletx;
var bullety;
var bulletfire;
var bulletIncrement = 10;
var bullets=[];
var xIncrement = 3;
var aliens=[];
var eBullets=[];
var bulletSpeed = -12;
var eBulletSize = 12;
var eBulletSpeed = 100;
var lives = 3;
var lost = false;
var won = false;
var level = 1;



function bullet(bulx,buly,bulletw,bulletl){
    this.bulx = bulx;
    this.buly = buly;
    this.bulletw = bulletw;
    this.bulletl = bulletl
}


function alien(alienx, alieny, alienw, alienl){
    this.alienx = alienx;
    this.alieny = alieny;
    this.alienw = alienw;
    this.alienl = alienl;
}

function ebullet(ex,ey,ed){
    this.ex = ex;
    this.ey = ey;
    this.ed = ed;
}


function setup(){
    // bullet();
    // alien();
    createCanvas(windowWidth-30,windowHeight-40);
    background(51);
    //player coordinates
    x = width/2;
    y = (9/10) * height;
    bulletx = (x+15);
    bullety = y;
    for (let i = 0; i < 10; i++){
        var a = new alien(((width/4)+(width/20)*i),height/10,30,30);
        aliens.push(a);
    }
    for (let i = 0; i < 10; i++){
        var a = new alien(((width/4)+(width/20)*i),height/5,30,30);
        aliens.push(a);
    }
}


    


let i = 0;
function draw(){
    //when arrow key down, square moves
    i++;
    createCanvas(windowWidth-17,windowHeight-20);
    background(51);
    fill('green');
    for (let i = 0; i < lives; i++){
        rect((width-40)-(i*20),10,20,20);
    }
    if (lives == 0 && !lost){
        lost = true;
        alert("You lost!")
        document.location.reload();
    }
    if (aliens.length == 0 && level == 2 && !won){
        won = true;
        alert ("You won!");
        document.location.reload();
    }
    if(aliens.length == 0){
        level++
        level2();
    }
    if (keyIsDown(LEFT_ARROW)){
        //if (bulletfire == false){
        if (x<=25 ){
            x=25;
            bulletx=40;
        }
        x-=12.5;
        bulletx -=12.5;
        //}
    }
    if (keyIsDown(RIGHT_ARROW)){
         //if (bulletfire == false){
         if (((x+75)>=width)){
             x = (width-75)
             bulletx = (width-60);
         }
        x+=12.5;
        bulletx += 12.5;
        //}
    }
    //rectangle following x and y coordinates based on left and right arrow
    fill(0,255,0);
    //ship
    ellipse(x+25, y+25, 50)
    rect(x, y, (50), 50);
    //shooting "bullet"(i.e. rectangle)
    fill(0,0,255);
    //blue ting on ship
    rect(bulletx,bullety, 20,20)
    //draw the aliens
    createAliens();

    if(i % (10) == 0 && level == 1){
       createEbullets(); 
    }
    if(i % (8) == 0 && level == 2){
        createEbullets(); 
     }
    drawEbullets();
    drawBullets();
    collision()
}

function level2(){
    for (let i = 0; i < 13; i++){
        var a = new alien(((width/4)+(width/20)*i),height/10,30,30);
        aliens.push(a);
    }
    for (let i = 0; i < 13; i++){
        var a = new alien(((width/4)+(width/20)*i),height/5,30,30);
        aliens.push(a);
    }
    for (let i = 0; i < 13; i++){
        var a = new alien(((width/4)+(width/20)*i),height*(3/10),30,30);
        aliens.push(a);
    }
    for (let i = 0; i < 13; i++){
        var a = new alien(((width/4)+(width/20)*i),height*(2/5),30,30);
        aliens.push(a);
    }
}

function createAliens(){
    fill(255,0,0);
    for (let i = 0; i < aliens.length; i++){
        if(aliens[i].alienx + 35 >= width || aliens[i].alienx <= 35){
            xIncrement *= -1;
            break;
        }
    }
    for(let i = 0; i < aliens.length; i++){
        aliens[i].alienx += xIncrement;
        ellipse(aliens[i].alienx,aliens[i].alieny,aliens[i].alienw, aliens[i].alienl);
    }
}

function drawBullets(){
    fill(0,0,255);
    for (let i = 0; i < bullets.length;i++){
        bullets[i].buly += bulletSpeed;
        ellipse(bullets[i].bulx, bullets[i].buly, bullets[i].bulletw, bullets[i].bulletl);
    }
}

function collision(){
    for(let i = 0; i < bullets.length; i++){
       for (let j = 0; j < aliens.length; j++){
            if (Math.sqrt(Math.pow((aliens[j].alieny) - (bullets[i].buly),2) + 
                Math.pow((aliens[j].alienx)-(bullets[i].bulx),2)) <= 25){
                bullets.splice(i,1);
                i--;
                aliens.splice(j,1);
                j--;
                break;
            }
        }
    }
    for(let i = 0; i < eBullets.length; i++){
        if (Math.sqrt(Math.pow((eBullets[i].ex) - (x+25),2) + 
            Math.pow((eBullets[i].ey)-(y+25),2)) <= 31.25){
                eBullets.splice(i,1);
                i--;
                lives--;
                break;
        }
    }
}
        
    


function createEbullets(){
    for (let i = 0; i < aliens.length; i++){
        if (i === Math.floor(Math.random()*(aliens.length))){
            eBullets.push(new ebullet(aliens[i].alienx, aliens[i].alieny,eBulletSize));
            break;
        }
    }
}

function drawEbullets(){
    fill("white");
    for (let i = 0; i < eBullets.length; i++){
        eBullets[i].ey += eBulletSpeed;
        ellipse(eBullets[i].ex, eBullets[i].ey, eBullets[i].ed);
    }
}

function keyPressed(){
    if (keyCode == UP_ARROW){
        var b = new bullet(bulletx+10,bullety,20,20);
        bullets.push(b); 
    }
}



