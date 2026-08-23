from docx import Document
import shutil
from docx.enum.text import WD_COLOR_INDEX

path = 'weimou_web——代码架构与设计（代码解释高亮版）.docx'
out = 'weimou_web——代码架构与设计（代码解释详细版）.docx'
shutil.copyfile(path, out)
d = Document(out)
texts = [
    '代码解释：useEffect 在页面或语言发生变化时重新绑定交互、视频播放器和地图。它调用 bindInteractions() 绑定 DOM 交互，调用 enhancePotPlayers() 创建视频播放器，进入 contact 页时调用 initializeLeafletMap() 初始化地图。这些调用会返回清理函数或清理函数集合。React 在依赖项变化或组件卸载时执行 return 中的 cleanup：释放地图、停止播放器并移除事件。该段最终没有向页面回送数据，而是把资源清理回调交还给 React 生命周期。',
    '代码解释：handleNews 接收 Node.js 的 request 和 response，先读取 newsCache 或调用 readNewsCache() 获取本地 JSON 缓存，再调用 sendJson(response, 200, payload) 回送 HTTP 200 和新闻 JSON，其中包含 news、syncedAt、source 等字段。它不在用户请求期间调用外部平台；外部同步由后台任务完成。缓存不存在时仍回送空数组，保证前端收到可解析的稳定响应。',
    '代码解释：这段处理链先调用 getClientAddress(request) 获取客户端地址，再调用 checkLeadRateLimit(client, Date.now()) 检查频率；超限时调用 sendJson() 回送 HTTP 429 和提示信息，流程立即结束。未超限时继续调用 readJson(request, leadBodyMaxBytes) 读取并限制请求体大小；格式错误则回送 HTTP 400。校验通过后才继续字段校验、幂等判断和外部平台调用，成功或失败都会通过统一 JSON 响应返回给前端。',
    '代码解释：preloadLeafletMapResources() 调用 loadLeafletStyle() 和 loadLeaflet()，通过 Promise.all 并行等待两个资源加载完成。函数回送一个 Promise，调用方可以 await 它来判断地图脚本和样式是否准备完毕；任一资源加载失败时 Promise 会进入 rejected 状态。预加载不创建地图实例，真正的 initializeLeafletMap() 仍在联系页进入时调用，并在离开页面时清理。',
]
found = 0
for p in d.paragraphs:
    if p.text.startswith('代码解释：') and found < len(texts):
        p.text = texts[found]
        for r in p.runs: r.font.highlight_color = WD_COLOR_INDEX.YELLOW
        found += 1
d.save(out)
print(f'updated {found} explanations')
