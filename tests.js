
function testHexToBin(){
    // test all hexadecimal numbers from 0 to F
    for (var i = 0; i < 16; i++) {
        var hex = i.toString(16);
        // print the results
        console.log(hex + " = " + hexToBin(hex));
    }
}

function testBinToHex(){
    // 
    for (var i = 0; i < 16; i++) {
        var bin = i.toString(2);
        // print the results
        console.log(bin + " = " + binToHex(bin));
    }
}