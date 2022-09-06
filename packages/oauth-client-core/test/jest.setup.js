import { TextEncoder, TextDecoder } from 'util';
const crypto = require("crypto");

Object.defineProperty(global.self, "crypto", {
  value: Object.setPrototypeOf({ subtle: crypto.subtle }, crypto),
});

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
