(function(graph){
                function require(module){
                    function otherRequire(relativePath){
                        console.log(relativePath)
                        console.log(module)
                        console.log(graph[module]);
                        return require(graph[module].dependencies[relativePath]);
                    }
                    var exports = {};
                    (function(require,exports,code){
                        eval(code);
                    })(otherRequire,exports,graph[module].code)
                    return exports;
                }
                require('./src/asset/index1.js')
            })({"./src/asset/index1.js":{"dependencies":{"./a.js":"./src/asset/a.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nconsole.log(\"hello world,\".concat(_a.str));"},"./src/asset/a.js":{"dependencies":{"./b.js":"./src/asset/b.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str = void 0;\n\nvar _b = require(\"./b.js\");\n\nvar str = \"this is hao ge ge,\".concat(_b.number);\nexports.str = str;"},"./src/asset/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.number = void 0;\nvar number = '2';\nexports.number = number;"}})
