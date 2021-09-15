
    // Help fn
    function helpFn(){
        console.log(`
        List of All the commands :
                            node main.js tree "directory"
                            node main.js organize "directoryPath"
                            node main.js help

        `);
    }

    module.exports={
        helpKey: helpFn
    }