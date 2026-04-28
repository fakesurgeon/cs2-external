export const config = { runtime: "edge" };

const $ = (v) => v;

const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

const H = new Set([
  $("host"),
  $("connection"),
  $("keep-alive"),
  $("proxy-authenticate"),
  $("proxy-authorization"),
  $("te"),
  $("trailer"),
  $("transfer-encoding"),
  $("upgrade"),
  $("forwarded"),
  $("x-forwarded-host"),
  $("x-forwarded-proto"),
  $("x-forwarded-port"),
]);

const X = {
  V: "x-vercel-",
  R: "x-real-ip",
  F: "x-forwarded-for",
};

export default async function _(req) {
  if (!TARGET_BASE) {
    return new Response(
      "Misconfigured: TARGET_DOMAIN is not set",
      { status: 500 }
    );
  }

  try {
    const u = req.url;
    const i = u.indexOf("/", 8);

    const t =
      i === -1 ? TARGET_BASE + "/" : TARGET_BASE + u.slice(i);

    const h = new Headers();
    let ip = null;

    for (const [k, v] of req.headers) {
      if (H.has(k)) continue;
      if (k.startsWith(X.V)) continue;

      if (k === X.R) {
        ip = v;
        continue;
      }

      if (k === X.F) {
        if (!ip) ip = v;
        continue;
      }

      h.set(k, v);
    }

    if (ip) h.set(X.F, ip);

    const m = req.method;
    const b = m !== "GET" && m !== "HEAD";

    return fetch(t, {
      method: m,
      headers: h,
      body: b ? req.body : undefined,
      duplex: "half",
      redirect: "manual",
    });
  } catch (e) {
    console.error("relay error:", e);
    return new Response("Bad Gateway: Tunnel Failed", {
      status: 502,
    });
  }
}
