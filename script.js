/* =========================================================
   云布岛 · 工具数据
   添加工具：在 SITES 数组里加一行即可，格式：
   { name:"名称", url:"链接", desc:"简介", cat:"分类", tag:"标签" }
   tag 可以不写。
   ========================================================= */
const SITES = [
  // —— 开发工具 ——
  { name:"JSON 格式化",  url:"https://www.json.cn/",              desc:"在线校验、格式化、压缩 JSON", cat:"开发工具", tag:"热门" },
  { name:"Regex101",     url:"https://regex101.com/",             desc:"正则表达式在线测试与解释",   cat:"开发工具" },
  { name:"Can I use",    url:"https://caniuse.com/",              desc:"查询浏览器特性兼容性",       cat:"开发工具" },
  { name:"CodePen",      url:"https://codepen.io/",               desc:"前端代码在线演示与分享",     cat:"开发工具" },

  // —— 学习资源 ——
  { name:"菜鸟教程",     url:"https://www.runoob.com/",           desc:"各类编程语言入门教程",       cat:"学习资源", tag:"热门" },
  { name:"MDN 文档",     url:"https://developer.mozilla.org/zh-CN/", desc:"Web 技术权威中文文档",    cat:"学习资源" },
  { name:"哔哩哔哩",     url:"https://www.bilibili.com/",         desc:"学习视频、技术分享",         cat:"学习资源" },

  // —— 实用工具 ——
  { name:"Tinypng",      url:"https://tinypng.com/",              desc:"在线压缩 PNG / JPG 图片",    cat:"实用工具", tag:"热门" },
  { name:"草料二维码",   url:"https://cli.im/",                   desc:"二维码生成与管理",           cat:"实用工具" },
  { name:"在线 PS",      url:"https://www.uupoop.com/",           desc:"浏览器里的图片编辑器",       cat:"实用工具" },
  { name:"PDF24",        url:"https://tools.pdf24.org/zh/",       desc:"PDF 合并、压缩、转换",       cat:"实用工具" },

  // —— AI 工具 ——
  { name:"DeepSeek",     url:"https://chat.deepseek.com/",        desc:"深度求索对话助手",           cat:"AI 工具", tag:"热门" },
  { name:"Kimi",         url:"https://kimi.moonshot.cn/",         desc:"长文本智能助手",             cat:"AI 工具" },
  { name:"通义千问",     url:"https://tongyi.aliyun.com/",        desc:"阿里云大模型助手",           cat:"AI 工具" },

  // —— 生活娱乐 ——
  { name:"网易云音乐",   url:"https://music.163.com/",            desc:"在线音乐播放",               cat:"生活娱乐" },
  { name:"豆瓣",         url:"https://www.douban.com/",           desc:"书影音评分与记录",           cat:"生活娱乐" },
];

/* ========== 以下逻辑一般无需修改 ========== */

const gridEl   = document.getElementById('grid');
const catsEl   = document.getElementById('cats');
const emptyEl  = document.getElementById('empty');
const searchEl = document.getElementById('searchInput');
const clearEl  = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');

let currentCat = '全部';
let keyword = '';

// 分类列表（按数据中首次出现顺序）
const CATS = ['全部', ...new Set(SITES.map(s => s.cat))];

// 根据名称生成稳定颜色
function colorOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h},68%,58%), hsl(${(h + 40) % 360},70%,50%))`;
}

// 取首字（中文取第一个字，英文取首字母大写）
function initialOf(name) {
  const c = name.trim().charAt(0);
  return /[a-zA-Z]/.test(c) ? c.toUpperCase() : c;
}

// 转义，防止数据里含特殊字符破坏页面
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function renderCats() {
  catsEl.innerHTML = CATS.map(c =>
    `<button class="cat${c === currentCat ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
  ).join('');
}

function renderGrid() {
  const kw = keyword.trim().toLowerCase();

  const list = SITES.filter(s => {
    // 有搜索词时全局搜索，忽略当前分类
    const okCat = kw ? true : (currentCat === '全部' || s.cat === currentCat);
    const hay = `${s.name} ${s.desc} ${s.cat} ${s.tag || ''}`.toLowerCase();
    return okCat && (!kw || hay.includes(kw));
  });

  if (!list.length) {
    gridEl.innerHTML = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  gridEl.innerHTML = list.map(s => `
    <a class="card" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">
      <div class="card-top">
        <span class="icon" style="background:${colorOf(s.name)}">${esc(initialOf(s.name))}</span>
        ${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ''}
      </div>
      <h3 class="card-title">${esc(s.name)}</h3>
      <p class="card-desc">${esc(s.desc)}</p>
    </a>
  `).join('');
}

/* ---------- 事件绑定 ---------- */

catsEl.addEventListener('click', e => {
  const btn = e.target.closest('.cat');
  if (!btn) return;
  currentCat = btn.dataset.cat;
  renderCats();
  renderGrid();
});

searchEl.addEventListener('input', e => {
  keyword = e.target.value;
  clearEl.hidden = !keyword;
  renderGrid();
});

clearEl.addEventListener('click', () => {
  keyword = '';
  searchEl.value = '';
  clearEl.hidden = true;
  searchEl.focus();
  renderGrid();
});

/* ---------- 主题切换 ---------- */

function setTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('yb-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// 初始化主题：优先本地记录，其次跟随系统
setTheme(
  localStorage.getItem('yb-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

/* ---------- 初始化 ---------- */
renderCats();
renderGrid();
