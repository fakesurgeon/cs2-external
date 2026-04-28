export const config = { runtime: "edge" };

const _0xe10523 = _0x41e7;

(function (_0x4410a5, _0x21cfff) {
  const _0x145ce5 = _0x41e7,
    _0x54fb9e = _0x4410a5();

  while (!![]) {
    try {
      const _0x564010 =
        -parseInt(_0x145ce5(0x1d1)) / 0x1 *
          (-parseInt(_0x145ce5(0x1d4)) / 0x2) +
        -parseInt(_0x145ce5(0x1df)) / 0x3 +
        -parseInt(_0x145ce5(0x1d6)) / 0x4 +
        -parseInt(_0x145ce5(0x1d2)) / 0x5 +
        -parseInt(_0x145ce5(0x1d8)) / 0x6 +
        -parseInt(_0x145ce5(0x1cc)) / 0x7 +
        -parseInt(_0x145ce5(0x1c2)) / 0x8 +
        parseInt(_0x145ce5(0x1ce)) / 0xa;

      if (_0x564010 === _0x21cfff) break;
      else _0x54fb9e.push(_0x54fb9e.shift());
    } catch (_0xe47ea5) {
      _0x54fb9e.push(_0x54fb9e.shift());
    }
  }
})(_0x47ab, 0x44aea);

//  FIX 1: runtime 
//  Dalege Mojtaba Ro gaedam 
// xe10523(0x1c4)
const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

const STRIP_HEADERS = new Set([
  _0xe10523(0x1bc),
  _0xe10523(0x1db),
  _0xe10523(0x1c3),
  _0xe10523(0x1c0),
  _0xe10523(0x1c1),
  "te",
  _0xe10523(0x1be),
  "transfer-encoding",
  _0xe10523(0x1bf),
  _0xe10523(0x1de),
  _0xe10523(0x1c9),
  _0xe10523(0x1cf),
  "x-forwarded-port",
]);

function _0x41e7(_0x4d34fb, _0x387bb1) {
  _0x4d34fb = _0x4d34fb - 0x1bb;
  const _0x47ab53 = _0x47ab();
  return _0x47ab53[_0x4d34fb];
}

function _0x47ab() {
  const _0x33e855 = [
    "x-forwarded-host",
    "x-forwarded-port",
    "x-forwarded-proto",
    "x-forwarded-for",
    "connection",
    "keep-alive",
    "upgrade",
    "forwarded",
    "trailer",
    "proxy-authenticate",
    "proxy-authorization",
    "host",
    "method",
    "url",
    "slice",
    "indexOf",
    "replace",
    "set",
    "error",
    "GET",
    "HEAD",
    "edge",
    "half",
    "manual",
    "relay error:",
    "Bad Gateway: Tunnel Failed",
    "Misconfigured: TARGET_DOMAIN is not set",
  ];

  _0x47ab = function () {
    return _0x33e855;
  };

  return _0x47ab();
}

export default async function handler(_0x1f0c5a) {
  const _0x3a6ffe = _0xe10523;

  if (!TARGET_BASE)
    return new Response("Misconfigured: TARGET_DOMAIN is not set", {
      status: 500,
    });

  try {
    const _0x9a9681 = _0x1f0c5a.url.indexOf("/", 8);
    const _0x545f6d =
      _0x9a9681 === -1
        ? TARGET_BASE + "/"
        : TARGET_BASE + _0x1f0c5a.url.slice(_0x9a9681);

    const _0x202928 = new Headers();
    let _0x67ec9e = null;

    for (const [_0x381895, _0x1b7490] of _0x1f0c5a.headers) {
      if (STRIP_HEADERS.has(_0x381895)) continue;
      if (_0x381895.startsWith("x-vercel-")) continue;

      if (_0x381895 === "x-real-ip") {
        _0x67ec9e = _0x1b7490;
        continue;
      }

      if (_0x381895 === "x-forwarded-for") {
        if (!_0x67ec9e) _0x67ec9e = _0x1b7490;
        continue;
      }

      _0x202928.set(_0x381895, _0x1b7490);
    }

    if (_0x67ec9e) _0x202928.set("x-forwarded-for", _0x67ec9e);

    const _0x285cc2 = _0x1f0c5a.method;
    const _0x67ec6c = _0x285cc2 !== "GET" && _0x285cc2 !== "HEAD";

    return await fetch(_0x545f6d, {
      method: _0x285cc2,
      headers: _0x202928,
      body: _0x67ec6c ? _0x1f0c5a.body : undefined,
      duplex: "half",
      redirect: "manual",
    });
  } catch (_0x504bf4) {
    console.error("relay error:", _0x504bf4);
    return new Response("Bad Gateway: Tunnel Failed", { status: 502 });
  }
}
