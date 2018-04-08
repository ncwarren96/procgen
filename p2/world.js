'use strict';
let tile_red_img;
let tile_blue_img;
let tile_green_img;
let worldSeed;
let tile_image;
let tiles = [];
let numTiles = 3;

function myPreload() {
    tile_red_img = loadImage("tile_red.png"); 
    tile_blue_img = loadImage("tile_blue.png");
    tile_green_img = loadImage("tile_green.png");
}

function mySetup() {
    for(var i = 0; i<3; i++){
        tiles[i] = createGraphics(sprite_width, sprite_height);
    }
    tiles[0].image(tile_red_img,0,0);
    tiles[1].image(tile_blue_img,0,0);
    tiles[2].image(tile_green_img,0,0);
}

function myDraw() {
    background(64,0,64);
}

function myTileHeight(i, j) {
    let h = 2 * noise(1 * i/20, 1 * j/20)
             +  1 * noise(2 * i/20, 2 * j/20);
            // + 0.25 * noise(4 * i, 4 * j);

    let height = Math.round(Math.pow(h,3)*10) /10
    // if(height<0.5){
    //  height = 0.1
    // }
    //return 5*sin(noise(i)/5.0)*sin(noise(j)/5.0);
    //hash.update(height);
    if(height<0.6){
        height = 0.3;
    }
    return height;
}

function myTileVariation(i, j, height) {
    let v = 0;

    if(height<0.6){
        v = 1;
    }else if(height<2){
        v = 2;
    }else{
        v = 0;
    }
    
    if(clicks[[i,j]]){
        v = clicks[[i,j]]%numTiles;
    }
    return v;

}

function myDrawTile(i, j, variation) {
    image(tiles[variation],0,50);
    
    noStroke();
    let t = noise(i,j) + millis()/5000;
    let alpha = abs(100*sin(t*2*Math.PI));
    //console.log(alpha);

    let x = 100*(t-floor(t));

    // var ii = 50*noise((i+millis()/10000), (j+millis()/8000))
    // var jj = 50*noise((j+millis()/9000), (i+millis()/11000))
    if (myTileHeight(i, j)>3){
        fill(255, 255, 255, alpha);
        ellipse(x,50,80,20);

    }


    //stroke(255);
    //line(i, j, i+5, j);
}

function myTileDescription(i,j, variation) {
    return "Variation: " + variation;
}

let clicks = {};

function myHandleClick(i, j) {
    clicks[[i,j]] = 1 + (clicks[[i,j]]|0);
    console.log("click!")
}

function getClickCOunt(i,j) {
    return clicks[[i,j]]|0;
}

function myHandleWorldgenStringChange(key) {
    let hash = XXH.h32()
    hash.update(key)
    worldSeed = hash.digest().toNumber()
    noiseSeed(worldSeed)
}

