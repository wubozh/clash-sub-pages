export async function onRequest(context) {
  const urls = [
    "https://raw.githubusercontent.com/freefq/free/master/v2",
    "https://raw.githubusercontent.com/ermaozi/get_subscribe/main/subscribe/clash.yml",
    "https://raw.githubusercontent.com/openitvn/freevpn/main/clash.yml"
  ];

  let nodes = [];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      nodes.push(text);
    } catch (e) {
      // 可以加日志或忽略错误
    }
  }

  const merged = nodes.join("\n");

  const clashConfig = `
port: 7890
socks-port: 7891
allow-lan: true
mode: rule
log-level: info
external-controller: 0.0.0.0:9090

proxies:
${merged}

proxy-groups:
  - name: "Auto"
    type: url-test
    proxies:
      - DIRECT
    url: http://www.gstatic.com/generate_204
    interval: 300

rules:
  - GEOIP,CN,DIRECT
  - MATCH,Auto
`;

  return new Response(clashConfig, {
    headers: {
      "Content-Type": "text/yaml",
      "Cache-Control": "no-cache"
    }
  });
}
