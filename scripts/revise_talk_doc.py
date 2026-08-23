from docx import Document

path = 'weimou_web——架构展示与集成讲解稿.docx'
d = Document(path)
replacements = {
    '这个项目采用 React 应用壳层、页面交互层、专项能力模块、Node.js 服务端和本地数据缓存的分层架构。': '这个项目采用“React 应用壳层 + app.js 命令式 DOM 页面层 + 专项能力模块 + Node.js 服务端 + 本地数据缓存”的混合分层架构。React 主要负责应用入口、路由状态和生命周期，具体页面模板与大量交互由 app.js 完成。',
    '页面层渲染内容并请求同源 API；Node.js 读取本地缓存或同步外部平台；最后把标准化数据返回给页面。': 'app.js 生成页面结构并请求同源 API；Node.js 读取本地缓存或同步外部平台；最后把标准化数据返回给页面。',
    '打开 src/main.jsx。App 组件维护当前页面和语言。当 Hash 变化时更新 page 状态，页面随之切换。': '打开 src/main.jsx。App 组件维护当前页面和语言，但它不是所有业务页面的 JSX 渲染器，而是应用壳层。Hash 变化时更新 page 状态，随后由 app.js 根据当前页面生成和绑定具体内容。',
    '打开 app.js。新闻页面通过 /api/news 获取数据，浏览器不直接请求飞书等外部平台。前端只访问自己的同源接口。': '打开 app.js。这里采用命令式 DOM 方式生成和更新新闻页面，通过 /api/news 获取数据；浏览器不直接请求飞书等外部平台，前端只访问自己的同源接口。',
    '服务端负责拉取远程数据、校验字段、下载图片并写入 data/news/news.json。页面读取和后台同步互相解耦。': '服务端负责拉取远程数据、校验字段、下载图片并写入 data/news/news.json；同步可以由启动同步、定时轮询或事件触发。页面读取和后台同步互相解耦。',
}
for p in d.paragraphs:
    for old, new in replacements.items():
        if old in p.text:
            for run in p.runs:
                if old in run.text:
                    run.text = run.text.replace(old, new)
            if old in p.text:
                p.text = p.text.replace(old, new)
d.save(path)
print(path)
