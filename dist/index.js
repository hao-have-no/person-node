/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/asset/index1.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asset/a.js":
/*!************************!*\
  !*** ./src/asset/a.js ***!
  \************************/
/*! exports provided: str */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"str\", function() { return str; });\nconst str = 'hello world';//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXNzZXQvYS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hc3NldC9hLmpzP2RjY2EiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHN0ciA9ICdoZWxsbyB3b3JsZCc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/asset/a.js\n");

/***/ }),

/***/ "./src/asset/index1.js":
/*!*****************************!*\
  !*** ./src/asset/index1.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a.js */ \"./src/asset/a.js\");\n // import css from './index.css';\n//\n// import less from './index.less';\n// var btn = document.createElement(\"button\");\n// btn.innerHTML = \"新增\";\n// document.body.appendChild(btn);\n// btn.onclick = function() {\n//     var div = document.createElement(\"div\");\n//     div.innerHTML = \"item\";\n//     document.body.appendChild(div);\n// };\n// console.log('index')\n// import counter from \"../counter\";\n// import number from \"../number\";\n// counter();\n// number();\n// if (module.hot) {\n//     module.hot.accept(\"../number\", function() {\n//         document.body.removeChild(document.getElementById(\"number\"));\n//         number();\n//     });\n// }\n//\n// import gif1 from '../assets/images/kelamayi.gif'\n//\n// var img = new Image();\n// img.src = gif1;\n// var root = document.getElementById(\"app\");\n// // img.classList.add(\"logo\");\n// root.append(img);\n//\n//\n\nconsole.log(`hello world,${_a_js__WEBPACK_IMPORTED_MODULE_0__[\"str\"]}`); // console.log('laofeng');//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXNzZXQvaW5kZXgxLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0L2luZGV4MS5qcz81NWU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c3RyfSBmcm9tICcuL2EuanMnXG4vLyBpbXBvcnQgY3NzIGZyb20gJy4vaW5kZXguY3NzJztcbi8vXG4vLyBpbXBvcnQgbGVzcyBmcm9tICcuL2luZGV4Lmxlc3MnO1xuLy8gdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4vLyBidG4uaW5uZXJIVE1MID0gXCLmlrDlop5cIjtcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnRuKTtcbi8vIGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgZGl2LmlubmVySFRNTCA9IFwiaXRlbVwiO1xuLy8gICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbi8vIH07XG4vLyBjb25zb2xlLmxvZygnaW5kZXgnKVxuXG4vLyBpbXBvcnQgY291bnRlciBmcm9tIFwiLi4vY291bnRlclwiO1xuLy8gaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyXCI7XG4vLyBjb3VudGVyKCk7XG4vLyBudW1iZXIoKTtcbi8vIGlmIChtb2R1bGUuaG90KSB7XG4vLyAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuLi9udW1iZXJcIiwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudW1iZXJcIikpO1xuLy8gICAgICAgICBudW1iZXIoKTtcbi8vICAgICB9KTtcbi8vIH1cblxuLy9cbi8vIGltcG9ydCBnaWYxIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMva2VsYW1heWkuZ2lmJ1xuLy9cbi8vIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbi8vIGltZy5zcmMgPSBnaWYxO1xuLy8gdmFyIHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcbi8vIC8vIGltZy5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKTtcbi8vIHJvb3QuYXBwZW5kKGltZyk7XG4vL1xuLy9cbmNvbnNvbGUubG9nKGBoZWxsbyB3b3JsZCwke3N0cn1gKTtcblxuLy8gY29uc29sZS5sb2coJ2xhb2ZlbmcnKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/asset/index1.js\n");

/***/ })

/******/ });