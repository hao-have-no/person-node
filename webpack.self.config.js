const path=require('path');

module.exports={
    entry: "./src/asset/index1.js",
    mode:"development",
    output:{
        path:path.resolve(__dirname,"./dist1"),
        filename: "main.js"
    }
};
