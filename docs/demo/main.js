/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/main.styles.scss":
/*!*************************************!*\
  !*** ./src/assets/main.styles.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n        const styles = `:host {\n  display: flex;\n}\n\n:host([hidden]) {\n  display: none;\n}\n\naudio,\nvideo {\n  display: block;\n  max-width: 100%;\n}\n\n#wrapper {\n  position: relative;\n  color: white;\n}\n\n#player {\n  position: absolute;\n  inset: 0;\n  background: #5007;\n  display: flex;\n  gap: 2em;\n  align-items: center;\n  justify-content: center;\n}`;\n        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);\n    \n\n//# sourceURL=webpack://avl-player/./src/assets/main.styles.scss?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Avl\": () => (/* binding */ Avl)\n/* harmony export */ });\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ \"./src/index.ts\");\n/* harmony import */ var _src_assets_main_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/assets/main.styles.scss */ \"./src/assets/main.styles.scss\");\n/* harmony import */ var _src_views_videoUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/views/videoUI */ \"./src/views/videoUI.ts\");\n/* harmony import */ var _src_views_audioUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/views/audioUI */ \"./src/views/audioUI.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\nclass Avl extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.templateEl = document.createElement('template');\r\n        this.shadow = this.attachShadow({ mode: 'open' });\r\n        const styleEl = document.createElement('style');\r\n        styleEl.textContent = _src_assets_main_styles_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        this.shadow.appendChild(styleEl);\r\n        if (this.hasAttribute('css-file')) {\r\n            const customCssFile = this.getAttribute('css-file');\r\n            const customCssEl = document.createElement('style');\r\n            customCssEl.textContent = `@import \"${customCssFile}\"`;\r\n            this.shadow.appendChild(customCssEl);\r\n        }\r\n    }\r\n    static get observedAttributes() {\r\n        return ['type', 'src', 'provider', 'id'];\r\n    }\r\n    //@TODO: move the templating stuff one layer deeper (to the player)\r\n    _setTemplate() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            // media content\r\n            const audioTemplate = `<audio id=\"media-source\" controls></audio>`;\r\n            const videoTemplate = `<video id=\"media-source\" controls></video>`;\r\n            let mediaSrcTemplate = this.hasAttribute('type') && this.getAttribute('type') === 'audio'\r\n                ? audioTemplate\r\n                : videoTemplate;\r\n            // player content\r\n            let playerTemplate = _src_views_audioUI__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\n            if (!this.hasAttribute('type') && this.getAttribute('type') !== 'audio') {\r\n                playerTemplate = _src_views_videoUI__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\n            }\r\n            if (this.hasAttribute('html-file')) {\r\n                const htmlFileRes = yield fetch(this.getAttribute('html-file'));\r\n                playerTemplate = yield htmlFileRes.text();\r\n            }\r\n            this.templateEl.innerHTML = `\r\n      <div id=\"wrapper\" >\r\n        ${mediaSrcTemplate}\r\n        ${playerTemplate}\r\n      </div>\r\n    `;\r\n            // Remove existing element on update\r\n            const wrapperEl = this.shadow.getElementById('wrapper');\r\n            if (wrapperEl) {\r\n                wrapperEl.parentNode.removeChild(wrapperEl);\r\n            }\r\n            this.shadow.appendChild(this.templateEl.content.cloneNode(true));\r\n        });\r\n    }\r\n    _initialize() {\r\n        this._setTemplate();\r\n        this.mediaSourceEl = this.shadow.getElementById('media-source');\r\n        console.log(this.mediaSourceEl);\r\n        new _src_index__WEBPACK_IMPORTED_MODULE_0__.Player(this.shadow.getElementById('player'), this.mediaSourceEl, {\r\n            provider: this.getAttribute('provider'),\r\n            id: this.getAttribute('id'),\r\n        });\r\n        const playpause = this.shadow.getElementById('big-play-pause-button');\r\n        if (playpause) {\r\n            playpause.addEventListener('click', () => this.toggle());\r\n        }\r\n    }\r\n    play() {\r\n        this.mediaSourceEl.play();\r\n    }\r\n    pause() {\r\n        this.mediaSourceEl.pause();\r\n    }\r\n    toggle() {\r\n        if (this.mediaSourceEl.paused) {\r\n            return this.mediaSourceEl.play();\r\n        }\r\n        this.mediaSourceEl.pause();\r\n    }\r\n    connectedCallback() {\r\n        this._initialize();\r\n    }\r\n    attributeChangedCallback(name, oldValue, newValue) {\r\n        //@TODO: get rid of the multiple calls\r\n        switch (name) {\r\n            case 'type':\r\n                this._setTemplate();\r\n                break;\r\n            default:\r\n                this._initialize();\r\n        }\r\n    }\r\n}\r\nwindow.customElements.define('avl-player', Avl);\r\n\n\n//# sourceURL=webpack://avl-player/./index.ts?");

/***/ }),

/***/ "./src/core/Provider.ts":
/*!******************************!*\
  !*** ./src/core/Provider.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Provider\": () => (/* binding */ Provider)\n/* harmony export */ });\nclass Provider {\r\n    constructor(provider, id) {\r\n        this.baseUrls = new Map();\r\n        this.baseUrls.set('youtube', 'https://www.youtube.com/embed/');\r\n        this.baseUrls.set('local', './');\r\n        this.currentProvider = provider;\r\n        this.currentId = id;\r\n    }\r\n    getMediaSrc() {\r\n        const provider = this.baseUrls.get(this.currentProvider || 'local');\r\n        return provider + this.currentId;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://avl-player/./src/core/Provider.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _core_Provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Provider */ \"./src/core/Provider.ts\");\n\r\nclass Player {\r\n    constructor(stage, source, config) {\r\n        console.log('player instantiated', config);\r\n        const provider = new _core_Provider__WEBPACK_IMPORTED_MODULE_0__.Provider(config.provider, config.id);\r\n        const src = provider.getMediaSrc();\r\n        if (source && src) {\r\n            source.src = src;\r\n            source.setAttribute('type', 'video/mp4');\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://avl-player/./src/index.ts?");

/***/ }),

/***/ "./src/views/audioUI.ts":
/*!******************************!*\
  !*** ./src/views/audioUI.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*html*/`\r\n  <div id=\"player\">\r\n    <button id=\"big-play-pause-button\">play/pause</button>\r\n    <span>Other Audio Content</span>\r\n  </div>\r\n`);\r\n\n\n//# sourceURL=webpack://avl-player/./src/views/audioUI.ts?");

/***/ }),

/***/ "./src/views/videoUI.ts":
/*!******************************!*\
  !*** ./src/views/videoUI.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*html*/`\r\n  <div id=\"player\">\r\n    <span>Other Video Content</span>\r\n    <button id=\"big-play-pause-button\">play/pause</button>\r\n  </div>\r\n`);\r\n\n\n//# sourceURL=webpack://avl-player/./src/views/videoUI.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;