
// Minimal static site Worker: serves index.html on / and /home, static files for CSS/images
const files = {
  "/index.html": ``,
  "/style.css": ``,
};

// We'll fill files["/index.html"] and files["/style.css"] with their real content below

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === "/" || path === "/home") path = "/index.html";
    if (files[path]) {
      let contentType = "text/html";
      if (path.endsWith(".css")) contentType = "text/css";
      if (path.endsWith(".js")) contentType = "application/javascript";
      if (path.endsWith(".png")) contentType = "image/png";
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";
      if (path.endsWith(".svg")) contentType = "image/svg+xml";
      return new Response(files[path], { headers: { "content-type": contentType } });
    }
    return new Response("Not found", { status: 404 });
  }
}
