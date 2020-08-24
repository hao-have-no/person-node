const less = require('less');

//暗号:可以写，但是没必要

module.exports = function (source) {
    less.render(source,(e,output)=>{
        this.callback(e,output.css);
    })
}
