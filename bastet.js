
// the purpose of this game is to help people memorize the map
// between ascii and hexadecimal numbers.
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

function getCanvasContext(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    return context;
}
function to_dec_func(value){
    // mode
    if(g_mode == 1){
        return binToDec(value);
    }else if(g_mode == 2){
        return hexToDec(value);
    }
}
function number_render_func(value){
    if(g_mode == 1){
        return decToHex(value);
    }else if(g_mode == 2){
        return add_number_separator(decToBin(value));
    }

}
function increase_score(){
    // if the value is a valid hexadecimal number
    g_score+=1;
    g_distance_from_top=0;
    if(g_score % get_requirement() == 0 && g_score != 0){
        if(g_level == 16-1){
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
    if(g_level == 1){           return [0,16 * 0.25];      // half
    }else if(g_level == 2){     return [0,16 * 0.50];      // 
    }else if(g_level == 3){     return [0,16 * 0.75];

    }else if(g_level == 4){     return [16*0.5, 16  ];
    }else if(g_level == 5){     return [16*0.5, 16  ];
    }else if(g_level == 6){     return [0, 16  ];

    }else if(g_level == 7){     return [17,(16*16 * 0.25)];
    }else if(g_level == 8){     return [17,(16*16 * 0.5) ];
    }else if(g_level == 9){     return [17,(16*16 * 0.75)];

    }else if(g_level == 10){    return [17,16*16 * 1.00 -16];
    }else if(g_level == 11){    return [17,16*16 * 1.00 -16];
    }else if(g_level == 12){    return [17,16*16 * 1.00 -16];

    }else if(g_level == 13){    return [16*16+1,16*16*16 * 0.5  -16*16];
    }else if(g_level == 14){    return [16*16+1,16*16*16 * 0.75 -16*16];
    }else if(g_level >= 15){    return [16*16+1,16*16*16 * 1.00 -16*16];
    }

}
function get_max_levels(){
    return 15;
}
function get_game_speed(){
    if(g_level == 1){        return 30;
    }else if(g_level == 2){  return 28;
    }else if(g_level == 3){  return 27;

    }else if(g_level == 4){  return 25;
    }else if(g_level == 5){  return 24;
    }else if(g_level == 6){  return 22;

    }else if(g_level == 7){  return 20;
    }else if(g_level == 8){  return 18;
    }else if(g_level == 9){  return 16;

    }else if(g_level == 10){ return 15;
    }else if(g_level == 11){ return 14;
    }else if(g_level == 12){ return 13;

    }else if(g_level == 13){ return 12;
    }else if(g_level == 14){ return 11;
    }else if(g_level >= 15){ return 10;
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
    return 16;
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
    if(g_level <=12 ){ // C
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

}
function set_mode(mode){
    g_mode = mode;
}
function choose_random_number(){
    // choose a random number from 1 to 16 // 256???? (ASCII)
    var nr = get_number_range();
    g_current_number = nr[0] + Math.floor(Math.random() * (nr[1] - nr[0]));
}
function get_level_color(){

    if(g_level ==       0x01){
        return "#FFF";
    }else if(g_level == 0x02){
        return "#DDD";
    }else if(g_level == 0x03){
        return "#CCC";
    }else if(g_level == 0x04){
        return "#D8C";
    }else if(g_level == 0x05){
        return "#D88";
    }else if(g_level == 0x06){
        return "#E88";
    }else if(g_level == 0x07){
        return "#F88";
    }else if(g_level == 0x08){
        return "#F66";
    }else if(g_level >= 0x09){
        return "#F44";
    }else if(g_level >= 0x0A){
        return "#F00";
    }else if(g_level >= 0x0B){
        return "#C00";
    }else if(g_level >= 0x0C){
        return "#A00";
    }else if(g_level >= 0x0D){
        return "#800";
    }else if(g_level >= 0x0E){
        return "#400";
    }else if(g_level >= 0x0F){
        return "#000";
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
    context.font = "30px courier new";
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
    instructions_div.style.display = "block";

}

function game_loop(){
    render();
    requestAnimationFrame(game_loop);
}

//testHexToBin();
//testBinToHex();