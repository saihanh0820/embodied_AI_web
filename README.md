# weimou_web

青岛城市学院-宇树科技产业学院具身智能社团网站。项目围绕课程实训、项目协作、竞赛展示与成员招募组织页面，保留中英文切换、响应式布局、新闻模块、联系表单和视频播放器。

文档更新日期：2026-07-30

## 技术栈

- React 19
- Vite 7
- 原生 Node.js HTTP API
- 原生 HTML5 Video 与自定义播放器控件
- 飞书开放平台多维表格 API

## 环境要求

- Node.js 20 或更高版本
- npm
- Windows 下建议使用 `npm.cmd`

## 快速开始

在项目根目录执行：

```powershell
npm.cmd install
npm.cmd run dev
```

默认开发地址：<http://127.0.0.1:4175>

`npm.cmd run dev` 会启动 Vite 前端和本地 API。API 已运行时会复用现有进程；退出开发命令时，会关闭由该命令启动的服务。

默认 API 地址为 <http://127.0.0.1:8787>。如端口已占用，可临时修改前端端口：

```powershell
npm.cmd run dev -- --port 5174
```

如需单独启动 API：

```powershell
npm.cmd run api
```

局域网调试时，可使用本机 IPv4 地址访问，例如 `http://<本机 IPv4 地址>:4175/#/home`。

### HTTPS

当前项目默认使用 HTTP 进行本地开发和验收。正式上线时，再为公网域名配置 HTTPS；推荐由 CDN、负载均衡或反向代理终止 TLS，并将请求转发到本应用。

如部署环境需要由本项目直接提供 HTTPS，再在服务器的 `.env` 中配置证书与私钥：

```env
HTTPS_ENABLED=true
HTTPS_KEY_PATH=certs/your-domain-key.pem
HTTPS_CERT_PATH=certs/your-domain.pem
```

证书必须由受信任的证书机构签发；私钥仅保存在服务器，不能提交 Git。启用后，前端、预览服务和 API 会同时切换为 HTTPS。

## 环境变量

服务端读取根目录下的 `.env`；已经存在的进程环境变量优先，其次是 `.env` 中的值。

首次配置时复制示例文件：

```powershell
Copy-Item .env.example .env
```

飞书线索写入需要配置：

```env
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxx
FEISHU_BITABLE_APP_TOKEN=xxxxxxxxxxxxxxxx
FEISHU_BITABLE_TABLE_ID=tblxxxxxxxxxxxxx
FEISHU_FIELD_NAME=姓名
FEISHU_FIELD_PHONE=电话
FEISHU_FIELD_COMPANY=公司名称
FEISHU_FIELD_EMAIL=邮箱
FEISHU_FIELD_MESSAGE=留言内容
API_PORT=8787
```

联系表单提交到 `POST /api/leads`。目标多维表格需要将飞书应用添加为协作者；字段名不一致时，通过 `FEISHU_FIELD_*` 修改。

`.env` 可能包含密钥，禁止把真实凭证提交到 Git 仓库。生产环境应使用部署平台的密钥管理能力，并为飞书应用配置最小权限。

## 企业荣誉配置

飞书多维表格是企业荣誉的增删改查入口。服务端启动时执行一次初始同步，之后由飞书 Bitable 事件回调触发同步：记录新增、编辑、删除或字段变化后，服务端会更新本地缓存目录。网页访问 `GET /api/honors` 时只读取本地缓存，因此飞书临时不可用时仍可稳定展示上一次成功同步的内容。默认缓存目录为 `data/honors/`，其中包含 `honors.json` 和 `images/`；首次同步尚未完成时页面会保留内置证书图片。页面首次打开、切换分类和停留期间每 30 秒会重新读取本地接口。

可使用线索表的 App Token，也可以单独配置荣誉表：

```env
FEISHU_HONORS_APP_TOKEN=xxxxxxxxxxxxxxxx
FEISHU_HONORS_TABLE_ID=tblxxxxxxxxxxxxx
FEISHU_HONORS_FIELD_CATEGORY=分类
FEISHU_HONORS_FIELD_TITLE=荣誉名称
FEISHU_HONORS_FIELD_IMAGE=图片
FEISHU_HONORS_FIELD_ORDER=排序
FEISHU_HONORS_FIELD_PUBLISHED=官网展示
FEISHU_EVENT_VERIFICATION_TOKEN=replace-with-feishu-event-verification-token
# 默认开启轮询，确保事件回调延迟或不可用时也会同步本地缓存
FEISHU_HONORS_POLLING_ENABLED=true
FEISHU_HONORS_SYNC_INTERVAL_MS=300000
# 可选：默认使用项目目录下的 data/honors
FEISHU_HONORS_CACHE_DIR=data/honors
```

在飞书开放平台事件订阅中，将请求地址配置为 `https://你的域名/api/feishu/events`，并订阅 Bitable 应用数据表记录新增、编辑、删除等事件。回调地址必须能被飞书服务器访问，局域网地址（例如 `192.168.1.73`）不能直接使用；事件回调的校验 Token 需要与 `FEISHU_EVENT_VERIFICATION_TOKEN` 一致。

荣誉表字段要求：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| 分类 | 单选或文本 | 支持 `发明专利`、`相关荣誉`、`学术成果`，也支持 `patent`、`award`、`academic`。 |
| 荣誉名称 | 文本 | 用于图片的无障碍说明。 |
| 图片 | 附件 | 每条记录至少上传一张，网站使用第一张。 |
| 排序 | 数字 | 数字越小越靠前，空值排在后面。 |
| 官网展示 | 复选框或文本 | `否`、`false`、`0`、`不展示` 会隐藏记录。 |

## 新闻配置

新闻页面同样由飞书多维表格维护。服务端启动时执行一次初始同步，之后由飞书 Bitable 事件回调触发同步：新闻记录新增、编辑、删除或字段变化后，服务端会更新本地缓存目录。网页访问 `/api/news` 时只读取本地缓存，启动网页和日常访问不依赖飞书实时接口；飞书同步失败时保留上一次成功缓存。默认每 5 分钟轮询一次，用于补偿事件回调延迟或不可用的情况；可设置 `FEISHU_NEWS_POLLING_ENABLED=false` 关闭，或通过 `FEISHU_NEWS_SYNC_INTERVAL_MS` 调整频率。

新闻表建议配置以下字段：

```env
FEISHU_NEWS_APP_TOKEN=xxxxxxxxxxxxxxxx
FEISHU_NEWS_TABLE_ID=tblxxxxxxxxxxxxx
FEISHU_NEWS_FIELD_TITLE=标题
FEISHU_NEWS_FIELD_DATE=发布日期
FEISHU_NEWS_FIELD_CATEGORY=分类
FEISHU_NEWS_FIELD_TAG=标签
FEISHU_NEWS_FIELD_SUMMARY=摘要
FEISHU_NEWS_FIELD_IMAGE=封面图
FEISHU_NEWS_FIELD_HOME_IMAGE=首页底栏新闻信息图
FEISHU_NEWS_FIELD_ORDER=排序
FEISHU_NEWS_FIELD_FEATURED=首页推荐
FEISHU_NEWS_FIELD_PUBLISHED=官网展示
FEISHU_NEWS_FIELD_LINK=详情链接
# 默认开启轮询，确保事件回调延迟或不可用时也会同步本地缓存
FEISHU_NEWS_POLLING_ENABLED=true
FEISHU_NEWS_SYNC_INTERVAL_MS=300000
FEISHU_NEWS_CACHE_DIR=data/news
```

官网新闻仅以“官网展示”、标题和发布日期中的年份决定是否展示；所有满足条件的记录都会进入新闻列表。分类和封面图不再影响展示，首页推荐、摘要、详情链接也均为可选字段。首页底栏会优先使用“首页底栏新闻信息图”的首张附件，字段为空时回退到“封面图”。新闻页可按年份筛选，默认“全部年份”。

## 视频播放器与字幕翻译

视频使用原生 HTML5 Video 和自定义 PotPlayer 风格控件，支持播放/暂停、前后 10 秒、进度拖动、音量、倍速、字幕轨、画中画和全屏。服务端支持 MP4 HTTP Range 分段响应。

AI 翻译仅处理当前显示且已审核的 WebVTT 源字幕文本。视频音频、访问者身份和服务端密钥不会发送到浏览器。启用翻译需要在 `.env` 配置：

```env
AI_TRANSLATION_URL=https://your-approved-ai-translation-service.example/v1/translate
AI_TRANSLATION_TOKEN=replace-with-server-side-secret
```

翻译服务接收 `{ sourceText, sourceLanguage, targetLanguage, format }`，并返回 `{ translation }`。`/api/translate-captions` 按来源 IP 限制为每分钟 30 次请求；生产环境还应在网关层增加身份验证、日志脱敏和缓存。

如需手动切换视频清晰度，可在对应 `<video>` 元素上设置：

```html
data-quality-sources='[{"label":"1080p","src":"/media/demo-1080.mp4"},{"label":"720p","src":"/media/demo-720.mp4"}]'
```

## 页面路由

- `#/home`：首页
- `#/about`：关于我们
- `#/news`：新闻中心
- `#/support`：服务支持
- 顶部“联系我们”按钮和各页咨询入口：返回首页并定位到页脚联系方式
- `#/research`：机器人开发实训平台
- `#/ois`：项目资料与代码协同平台
- `#/v3`：宇树机器人项目实训
- `#/v4`：进阶项目预告
- `#/consumables`：机器人开发套件

## API 端点

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| `GET` | `/api/health` | 检查 API 是否正常运行。 |
| `POST` | `/api/leads` | 校验并写入联系表单线索。 |
| `POST` | `/api/translate-captions` | 调用服务端配置的字幕翻译服务。 |
| `POST` | `/api/feishu/events` | 接收飞书 Bitable 变更事件并触发本地缓存更新。 |
| `GET` | `/api/honors` | 从本地缓存读取企业荣誉数据。 |
| `GET` | `/api/honors/image` | 从本地缓存读取荣誉图片。 |
| `GET` | `/api/news` | 从本地缓存读取新闻数据。 |
| `GET` | `/api/news/image` | 从本地缓存读取新闻封面图。 |

## 联系表单防 DoS / 防刷

联系表单的保护分为两层：

1. 应用层：`POST /api/leads` 默认按客户端地址限制为 10 秒最多 2 次、60 秒最多 5 次；同时限制全局并发、单客户端并发、请求体大小、字段长度，并拦截隐藏字段、重复内容和重复请求标识。被限流时接口返回 `429` 和 `Retry-After`。
2. 网关层：生产环境仍应在服务器前接入 CDN/WAF 或反向代理，启用 Bot 防护、连接数/请求速率限制和黑名单。应用内存限流只保护单个 Node 进程，不能替代抗 DDoS 清洗。

可通过环境变量调整阈值：`TRUST_PROXY`、`LEAD_RATE_LIMIT_WINDOW_MS`、`LEAD_RATE_LIMIT_MAX`、`LEAD_BURST_WINDOW_MS`、`LEAD_BURST_LIMIT_MAX`、`LEAD_MAX_CONCURRENT`、`LEAD_DUPLICATE_WINDOW_MS` 和 `LEAD_BODY_MAX_BYTES`。只有部署在可信反向代理后，才设置 `TRUST_PROXY=true`；否则攻击者可以伪造 `X-Forwarded-For` 绕过限流。

反向代理应只把 `/api/leads` 转发到 Node 服务，并在代理层配置更严格的规则，例如单 IP 每分钟 10 次、单请求体不超过 8KB、上游连接超时 10 秒。多实例部署时，应将限流状态放到 Redis 等共享存储，或直接使用 WAF/CDN 的边缘限流。

## 构建与检查

```powershell
npm.cmd run build
npm.cmd run test:interactions
npm.cmd run test:range
npm.cmd run preview
```

命令说明：

- `npm.cmd run build`：构建现代浏览器和 legacy SystemJS 产物到 `dist/`。
- `npm.cmd run test:interactions`：运行页面交互冒烟测试。
- `npm.cmd run test:range`：验证视频 Range 分段响应。
- `npm.cmd run test:visual`：运行视觉回归脚本。
- `npm.cmd run preview`：预览构建产物，默认地址为 <http://127.0.0.1:4175>；正式上线时再配置 HTTPS。

## 目录说明

- `src/main.jsx`：React 入口及页面挂载。
- `src/pot-player.js`：视频播放器及字幕翻译交互。
- `app.js`、`i18n.js`、`styles.css`：页面逻辑、国际化文案和全局样式。
- `server.js`：静态资源服务、本地 API、飞书集成和视频 Range 响应。
- `scripts/`：开发启动、交互、视觉和媒体服务验证脚本。
- `assets/`：图片、视频和其他网站资源。

## 浏览器支持

- Chrome / Chromium 64+
- Edge 79+
- Firefox 67+
- Safari 14.1+ / iOS Safari 14.5+

IE 11 不在支持范围内。
