export async function onRequest(context) {
  const res = await fetch("https://clash.wubozh.workers.dev");
  const body = await res.text();

  return new Response(body, {
    headers: {
      "Content-Type": "text/yaml",
      "Cache-Control": "no-cache"
    }
  });
}
