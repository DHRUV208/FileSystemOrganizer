#!/usr/bin/env node

let path = require("path");
let fs = require("fs");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
let inputArr = process.argv.slice(2);
console.log("inputArr");
console.log(inputArr); 
// node main.js tree "directory"
// node main.js organize "directoryPath"
// node main.js help
 

let command = inputArr[0];
switch(command){
    case "tree" :
        treeObj.treeKey(inputArr[1]);
        break;
        
    case "organize" :
        organizeObj.organizeKey(inputArr[1]);
        break;    

    case "help" :
       helpObj.helpKey();
        break;
    
    default :
        console.log('Please 🙏 input right command');
        break;

    }
