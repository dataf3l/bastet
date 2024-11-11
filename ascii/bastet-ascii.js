
// the purpose of this game is to help people memorize the map
// between hexadecimal numbers and binary numbers
// this game is similar to tetris


var g_current_number = 0;
var g_score = 0;
var g_distance_from_top = 0;
var g_level = 1;
var g_timer;//
var g_game_is_started = false;
var g_audio = null;
var g_mode = 1; // 1 ==hexbin, 2 = binhex
var board_height=600
var g_max_level = 46;

// this function converts a hexadecimal number to binary
function hexToBin(hex) {
    return parseInt(hex, 16).toString(2);
}
function binToHex(bin) {
    return parseInt(bin, 2).toString(16);
}
function binToDec(bin){
    return parseInt(bin, 2);
}
function hexToDec(bin){
    return parseInt(bin, 16);
}
function decToBin(dec){
    return dec.toString(2).toUpperCase();
}
function decToHex(value){
    return value.toString(16).toUpperCase()
}

//ascii
function decToAscii(dec){
    return String.fromCharCode(dec);
}
function asciiToDec(ascii){
    return ascii.charCodeAt(0);
}

function getCanvasContext(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    return context;
}
function to_dec_func(value){
    // mode
    if(g_mode == 1){
        return asciiToDec(value);
    }else if(g_mode == 2){
        return hexToDec(value);
    }
}
function number_render_func(value){ // 65 -> "A"
    if(g_mode == 1){
        return decToHex(value);
    }else if(g_mode == 2){
        return decToAscii(value);
    }

}
function increase_score(){
    // if the value is a valid hexadecimal number
    g_score+=1;
    g_distance_from_top=0;
    if(g_score % get_requirement() == 0 && g_score != 0){
        if(g_level == g_max_level-1){
            alert("You win");
            g_timer = clearTimeout(g_timer);
        }
        set_level(g_level + 1);
        
    }
}
function get_input(){
    // get input from the input element which is a text input
    var input = document.getElementById("input");
    // get the value of the input
    var value = input.value;
    //console.log(binToDec(value)+"----" + )
    return value;
}
function check_input(){
    var value = get_input()
    if(to_dec_func(value) == g_current_number){
        increase_score();
        choose_random_number();
        input.value = "";
    }
}
function add_digit(d){
    var input = document.getElementById("input");
    input.value += d;
    check_input();
}


function send_input(){
    var value = get_input()
    if(to_dec_func(value) == g_current_number){
        increase_score();
    }else{
        g_distance_from_top=0;
    }
    choose_random_number();

    // clear the input
    input.value = "";
    
    return false;
}
/**
     for(var x=0;x<15;x++){
        console.log(get_number_range())
        g_level++;
    }
 */
function get_number_range(){
    //if(g_level == 1){           return [0,16 * 0.25];      // half  0x20,0x7f
    if(      g_level == 0x01){     return [0x30, 0x39+1];      // numbers, 1-9
    }else if(g_level == 0x02){     return [0x30, 0x39+1];      // 

    }else if(g_level == 0x03){     return [0x39, 0x3F+1];      // 9-?
    }else if(g_level == 0x04){     return [0x39, 0x3F +1];

    }else if(g_level == 0x05){     return [0x40, 0x48 +1];    // A-H
    }else if(g_level == 0x06){     return [0x40, 0x48 +1];    // A-H

    }else if(g_level == 0x07){     return [0x49, 0x4F+1];     // I-O
    }else if(g_level == 0x08){     return [0x49, 0x4F+1];     // I-O

    }else if(g_level == 0x09){     return [0x50, 0x58+1];     // P-X
    }else if(g_level == 0x0A){     return [0x50, 0x58+1];     // P-X

    }else if(g_level == 0x0B){     return [0x59, 0x5F+1];     // Y-_
    }else if(g_level == 0x0C){     return [0x59, 0x5F+1];     // Y-_

    }else if(g_level == 0x0D){    return [0x60, 0x68+1];      // `-h
    }else if(g_level == 0x0E){    return [0x60, 0x68+1];      // `-h

    }else if(g_level == 0x0F){    return [0x69, 0x6F+1];      // i-o
    }else if(g_level == 0x10){    return [0x69, 0x6F+1];      // i-o

    }else if(g_level == 0x11){    return [0x70, 0x78+1];      // p-x
    }else if(g_level == 0x12){    return [0x70, 0x78+1];      // p-x

    }else if(g_level == 0x13){    return [0x79, 0x7E+1];      // y-?
    }else if(g_level == 0x14){    return [0x79, 0x7E+1];      // y-?

    }else if(g_level == 0x15){    return [0x20, 0x28+1];      // space - (
    }else if(g_level == 0x16){    return [0x20, 0x28+1];      // space - (

    }else if(g_level == 0x17){    return [0x29, 0x2F+1];      // ) - /
    }else if(g_level == 0x18){    return [0x29, 0x2F+1];      // ) - /

    }else if(g_level == 0x19){    return [0x30, 0x3F+1];
    }else if(g_level == 0x1A){    return [0x30, 0x3F+1];

    }else if(g_level == 0x1B){    return [0x40, 0x4F+1];
    }else if(g_level == 0x1C){    return [0x40, 0x4F+1];

    }else if(g_level == 0x1D){    return [0x50, 0x5F+1];
    }else if(g_level == 0x1E){    return [0x50, 0x5F+1];

    }else if(g_level == 0x1F){    return [0x60, 0x6F+1];
    }else if(g_level == 0x20){    return [0x60, 0x6F+1]; // lvl32

    }else if(g_level == 0x21){    return [0x70, 0x7E+1]; // !!
    }else if(g_level == 0x22){    return [0x70, 0x7E+1];

    }else if(g_level == 0x23){    return [0x20, 0x3F+1];
    }else if(g_level == 0x24){    return [0x20, 0x3F+1];

    }else if(g_level == 0x24){    return [0x40, 0x5F+1];
    }else if(g_level == 0x26){    return [0x40, 0x5F+1];

    }else if(g_level == 0x27){    return [0x60, 0x7E+1]; //!
    }else if(g_level == 0x28){    return [0x60, 0x7E+1];

    }else if(g_level == 0x29){    return [0x20, 0x4F+1];
    }else if(g_level == 0x2A){    return [0x20, 0x4F+1];

    }else if(g_level == 0x2B){    return [0x50, 0x7E+1];
    }else if(g_level == 0x2C){    return [0x50, 0x7E+1];

    }else if(g_level == 0x2D){    return [0x20, 0x7E+1];
    }else if(g_level == 0x2E){    return [0x20, 0x7E+1]; // lvl46

    //}else if(g_level >= 0x2F){    return [0x60, 0x6F];

    }

}
function get_max_levels(){
    return g_max_level; // used to be 15
}
function get_game_speed(){
    let factor = 3; // 3*16 = 48 (about 46)
    if(g_level <= 0x01 * 3){        return 30;
    }else if(g_level <= 0x02 * factor ){ return 28;
    }else if(g_level <= 0x03 * factor ){ return 27;

    }else if(g_level <= 0x04 * factor ){ return 25;
    }else if(g_level <= 0x05 * factor ){ return 24;
    }else if(g_level <= 0x06 * factor ){ return 22;

    }else if(g_level <= 0x07 * factor ){ return 20;
    }else if(g_level <= 0x08 * factor ){ return 18;
    }else if(g_level <= 0x09 * factor ){ return 16;

    }else if(g_level <= 0x0A * factor ){ return 15;
    }else if(g_level <= 0x0B * factor ){ return 14;
    }else if(g_level <= 0x0C * factor ){ return 13;

    }else if(g_level <= 0x0D * factor ){ return 12;
    }else if(g_level <= 0x0E * factor ){ return 11;
    }else if(g_level <= 0x0F * factor ){ return 10;
    }
}

function reset_piece(){
    g_distance_from_top=0;            
    choose_random_number();
    var input = document.getElementById("input");
    input.value = "";

}
function setup_timers(){
    // setup the timers
    g_timer = setTimeout(update_game,get_game_speed()); // 10 is faster
}
function get_requirement(){
    return 16 ; //should be 16 .// todo fix this ugly number.
}
function update_game(){
    g_distance_from_top+=1;
    if(g_distance_from_top >= board_height-100){
        //g_score -=1;
        //if(g_level * get_requirement() > g_score){
        //    set_level(g_level - 1);
        //}

        reset_piece();
    }
    g_timer = setTimeout(update_game,get_game_speed());

}
function play_music(){
    var easy_songs = [
        "assets/sound/bensound-dance.mp3",
        "assets/sound/Chad Crouch - Action.mp3",
        "assets/sound/Errorbeauty & Serge Geyzel - Hacker.mp3",
        "assets/sound/Komiku - Action Techno.mp3",
        "assets/sound/Line Noise - Magenta Moon (Part II).mp3"];

    var hard_songs = [
        "assets/sound/Kris Keyser - Action Potential.mp3",
        "assets/sound/Lately Kind of Yeah - Attack of the Reptilians.mp3"];

    var songs = [];
    if(g_level <=get_max_levels() * 0.75 ){ // 12
        songs = easy_songs;
    }else{
        songs = hard_songs;
    }
    var song = songs[Math.floor(Math.random() * songs.length)];

    if(g_audio == null){
        //g_audio.stop();
        g_audio = new Audio(song);
        g_audio.loop = true;
    } else {
        g_audio.src = song;
        g_audio.load();
    }
    
    
    g_audio.play();
    
}
function toggle_sound(){
    if(g_audio.volume == 0){
        g_audio.volume = 1;
    }else{
        g_audio.volume = 0;
    }
}
function init(){
    document.getElementById("input").focus();
    if(g_game_is_started){
        return
    }
    g_game_is_started = true;
    // autofocus the input field
    
    play_music();
    choose_random_number();
    setup_timers();
    // testHexToBin();
    // testBinToHex();
    game_loop();
}
function set_level(level){
    level = parseInt(level);
    g_level = level;
    g_mode++; // modes alternate
    if(g_mode == 3){
        g_mode = 1;
    }
    reset_piece();
    play_music(); // changes music
    update_ascii_table();

}
function set_mode(mode){
    g_mode = mode;
}
function choose_random_number(){
    // choose a random number from 1 to 16
    var nr = get_number_range();
    g_current_number = nr[0] + Math.floor(Math.random() * (nr[1] - nr[0]));
}
function get_level_color(){

    if(g_level ==       0x01 || g_level == 0x11 || g_level == 0x21){ return "#FFF";
    }else if(g_level == 0x02 || g_level == 0x12 || g_level == 0x22){ return "#DDD";
    }else if(g_level == 0x03 || g_level == 0x13 || g_level == 0x23){ return "#CCC";
    }else if(g_level == 0x04 || g_level == 0x14 || g_level == 0x24){ return "#D8C";
    }else if(g_level == 0x05 || g_level == 0x15 || g_level == 0x25){ return "#D88";
    }else if(g_level == 0x06 || g_level == 0x16 || g_level == 0x26){ return "#E88";
    }else if(g_level == 0x07 || g_level == 0x17 || g_level == 0x27){ return "#F88";
    }else if(g_level == 0x08 || g_level == 0x18 || g_level == 0x28){ return "#F66";
    }else if(g_level == 0x09 || g_level == 0x19 || g_level == 0x29){ return "#F44";
    }else if(g_level == 0x0A || g_level == 0x1A || g_level == 0x2A){ return "#F00";
    }else if(g_level == 0x0B || g_level == 0x1B || g_level == 0x2B){ return "#C00";
    }else if(g_level == 0x0C || g_level == 0x1C || g_level == 0x2C){ return "#A00";
    }else if(g_level == 0x0D || g_level == 0x1D || g_level == 0x2D){ return "#800";
    }else if(g_level == 0x0E || g_level == 0x1E || g_level == 0x2E){ return "#400";
    }else if(g_level == 0x0F || g_level == 0x1F || g_level == 0x2F){ return "#A00";
    }else if(g_level == 0x10 || g_level == 0x20 || g_level >= 0x30){ return "#C00";        
    }

}

function render(){
    // get the canvas context
    var context = getCanvasContext();
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // draw black background
    context.fillStyle = "#000";
    context.fillRect(0, 0, 400, board_height);

    // draw the current number
    draw_number(context, g_current_number,g_distance_from_top);
    // draw the score
    draw_score(context);
    // draw horizontal line at height = 200
    context.beginPath();
    context.moveTo(0, 400);
    context.lineTo(context.canvas.width, 400);
    context.stroke();
    // change canvas border color
    document.getElementById("canvas").style.borderColor = get_level_color();
    // draw score as a horizontal bar
    // with height = 20 and width = g_score * 10
    context.fillStyle = get_level_color();
    context.fillRect(0, 40, 400*(g_score / (get_requirement()*get_max_levels())), 32);

}
function draw_score(context){
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + decToHex(g_score) + " Level: " + decToBin(g_level) + "  R: "+get_requirement(), 10, 30);
}
function draw_number(context, number,g_distance_from_top){
    // draw the number
    context.font = "64px courier new";
    context.fillStyle = "white";
    var x_offset = 200;
    if(g_mode == 2){
        x_offset = 10;
    }
    context.fillText(number_render_func(number), x_offset, 100+g_distance_from_top);
    // draw the binary representation
    
    context.font = "20px courier new";
    context.fillStyle = "white";
    /*
    var label = hexToBin(number.toString(16).toUpperCase());
    if(g_level >= 4){
        label = number.toString(16).toUpperCase();
        label = hexToBin(label);
        label = left_pad_with_zeros(label,8);
        label = split(label);
    }
    context.fillText(label, 10, 150);
    */
}
function left_pad_with_zeros(x,length){
    var padded = x.toString(2);
    while(padded.length < length){
        padded = "0" + padded;
    }
    return padded;
}

// converts "a cccc" to "a cccc"
function add_number_separator(str){
    return str.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
}

    
function instructions(){
    instructions_div = document.getElementById("instructions");
    if(instructions_div.style.display=='none'){
        instructions_div.style.display = "block";
    }else{
        instructions_div.style.display = "none";
    }

}

function game_loop(){
    render();
    requestAnimationFrame(game_loop);
}

function update_ascii_table(){
    // put ascii codes from 0 to 255 in a table inside a div called instructions
    // highlight the relevant part.
        
    var html = "";
    let max = 128;
    let rows = 128 / 8;
    let cols = 8;

    let current_number_range = get_number_range();
    let start = current_number_range[0];
    let end = current_number_range[1];
    //alert(decToHex(start) + " " + decToHex(end));

    for(var i=0;i<rows;i++){
        html += "<tr>";
        for(var j=0;j<cols;j++){
            var ascii_code = i + j * 16;
            var tag_start = "";
            var tag_end = "";
            var tag2_start = "";
            var tag2_end = "";
            if(ascii_code >= start && ascii_code < end){
                tag_start = "<div style='background-color:lime;color:black'>";
                tag_end = "</div>";
                tag2_start = "<div style='border:0.5px solid lime'>";
                tag2_end = "</div>";

            }
            html += "<td>"+tag_start + decToHex(ascii_code) + tag_end +"</td><td><div style='color:lime'>"+tag2_start + String.fromCharCode(ascii_code) + tag2_end+"</div></td>";
            html += "<td>&nbsp;&nbsp;&nbsp;</td>";
        }
        html += "</tr>";
    }

    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "<table border='0' cellspacing=0 cellpadding=2>"+html+"</table>";

}

//testHexToBin();
//testBinToHex();
function pre_init(){
    update_ascii_table();
}