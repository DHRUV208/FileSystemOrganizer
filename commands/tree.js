const fs = require("fs");
const path = require("path");
// const request = require("request");
// const cheerio = require("cheerio");
    function treeFn(dirPath){
        //   console.log("tree cmd implemented for" , dirPath);
        
           //console.log("organize cmd implemented for" , dirPath);
           // 1. input -> directory path given 
           // let destPath;
           if(dirPath == undefined){
               //console.log("Kindly enter the path");
               treeHelper(process.cwd(),"");
               return;
           }else{
              let doesExist =  fs.existsSync(dirPath);
             if(doesExist){
                   treeHelper(dirPath,"");
             }
              else{
                   console.log("Kindly Enter the correct path");
                   return;
              }
           }
       }
   
       function treeHelper(dirPath, indent){
          let isFile = fs.lstatSync(dirPath).isFile();
           if(isFile == true){
               let fileName = path.basename(dirPath);
               console.log(indent + "|—" + fileName);
           }else{
               let dirName = path.basename(dirPath);
               console.log(indent + "↪" + dirName);
               
               let children = fs.readdirSync(dirPath);
               for(let i=0; i<children.length; i++){
                   let childPath = path.join(dirPath,children[i]);
                   treeHelper(childPath, indent + "\t");   
   
               }
           }
       }

       module.exports={
        treeKey: treeFn
    }