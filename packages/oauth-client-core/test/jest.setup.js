const crypto = require("crypto");

Object.defineProperty(global.self, "crypto", {
  value: Object.setPrototypeOf({ subtle: crypto.subtle }, crypto),
});
