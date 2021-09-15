const fs = require("fs");
const path = require("path");
//const types = require("../main")
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    pictures: ["png", "PNG", "jpg", "jpeg"]
  };
    function organizeFn(dirPath){
        //console.log("organize cmd implemented for" , dirPath);
        // 1. input -> directory path given 
        let destPath;
        if(dirPath == undefined){
            //console.log("Kindly enter the path");
            destPath = process.cwd();
            return;
        }else{
           let doesExist =  fs.existsSync(dirPath);
           if(doesExist){
                // 2. create ->organized_files -> directory
             destPath = path.join(dirPath,"organized_files");
                if(fs.existsSync(destPath) == false){
                  fs.mkdirSync(destPath); 
                 }
           }else{
                console.log("Kindly Enter the correct path");
                return;
           }
        }
        organizeHelper(dirPath,destPath);
                
    }
    function organizeHelper(src,dest){
        // 3. identify category of all the files present in that input directory
        let childNames = fs.readdirSync(src);
        //console.log("childnames",childNames)
        for(let i=0; i<childNames.length; i++){
            let childAddress = path.join(src,childNames[i]);
            let isFile = fs.lstatSync(childAddress).isFile();
            if(isFile){
                let category =  getCategory(childNames[i]);

                // 4. Copy files to that organized directoryinside of any of category folder
                sendFiles(childAddress,dest,category);
            }
        }

    }

    function sendFiles(srcFilePath,dest,category){
        let categoryPath = path.join(dest,category);
        if(fs.existsSync(categoryPath) == false){
            fs.mkdirSync(categoryPath);
        }
        let fileName = path.basename(srcFilePath);
        let destFilePath = path.join(categoryPath , fileName);
        fs.copyFileSync(srcFilePath,destFilePath);
        //console.log(fileName + "copied to" + category);
        //fs.unlinkSync(srcFilePath);
    }

    function getCategory(name){

        let ext = path.extname(name);
        console.log("ext",ext);
         ext=ext.slice(1);
         console.log("ext after ",ext);
        for(let type in types){
           let currTypeArray =  types[type];
           for(let i = 0; i<currTypeArray.length; i++){
               if(ext == currTypeArray[i]){
                   
                return type;
                
               }
               console.log(type);
           }
           
        }
        return "others";
    }
    module.exports={
        organizeKey: organizeFn
    };