export async function onRequest(context) {
  try {
    // 从你的 Worker 地址获取最新的 sub.yaml
    const res = await fetch("https://clash.wubozh.workers.dev/sub.yaml");

    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`);
    }

    const body = await res.text();

    // 返回 YAML 内容，带上正确的响应头
    return new Response(body, {
      headers: {
        "Content-Type": "text/yaml",
        "Cache-Control": "no-cache"
      }
    });
  } catch (err) {
    // 出错时返回提示信息
    return new Response("Upstream fetch failed: " + err.message, {
      status: 502,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
