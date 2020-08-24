module.exports = function (source) {
        console.log('123',source);
    return `const ele =document.createElement('style');
    ele.innerHTML = ${source};
    document.head.appendChild(ele);`;
}
