var py_logging_$lib=null,py_logging_$addon_exports=null,py_logging_$util=null;if("object"==typeof window&&window){if(!window.py_logging)throw new Error("There isn't py_logging variable.");py_logging_$lib=py_logging_$addon_exports=window.py_logging,py_logging_$util=window.py_logging._util}else{if("function"!=typeof require||"object"!=typeof module)throw new Error("Unsupported platform.");py_logging_$lib=require("./logging"),py_logging_$addon_exports=module.exports,py_logging_$util=require("util")}!function(i,o,g){"use strict";function n(i){i=void 0!==i?i:2,this._maxAmount=i}py_logging_$util.inherits(n,o.Filter),n.prototype.filter=function(i){var o=i.name.split(".");return i.originalname=i.name,i.name=o.slice(-this._maxAmount).join("."),!0},i.NameShortenerFilter=n}(py_logging_$addon_exports,py_logging_$lib);