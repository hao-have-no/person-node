// 需要使⽤module.hot.accept来观察模块更新 从⽽更新
function counter() {
    var div = document.createElement("div");
    div.setAttribute("id", "counter");
    div.innerHTML = 1;
    div.onclick = function() {
        div.innerHTML = parseInt(div.innerHTML, 10) + 1;
    };
    document.body.appendChild(div);
}
export default counter;

