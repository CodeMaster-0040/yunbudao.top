/* =========================================================
   云不道 · 数据配置
   格式：{ name:"名称", url:"链接", desc:"简介", cat:"分类", tag:"标签" }
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

  // —— APP 下载 ——
  { name:"微信",         url:"https://weixin.qq.com/",              desc:"腾讯官方微信下载",       cat:"APP", tag:"常用" },
  { name:"QQ",           url:"https://im.qq.com/",                  desc:"腾讯官方 QQ 下载",       cat:"APP" },
  { name:"抖音",         url:"https://www.douyin.com/download",     desc:"抖音客户端下载",         cat:"APP" },
  { name:"哔哩哔哩",     url:"https://app.bilibili.com/",           desc:"B站客户端下载",          cat:"APP" },
  { name:"Chrome",       url:"https://www.google.cn/chrome/",       desc:"谷歌浏览器下载",         cat:"APP" },
  { name:"Edge",         url:"https://www.microsoft.com/edge",      desc:"微软 Edge 浏览器下载",   cat:"APP" },

  // —— 接口网址 ——
  { name:"免费 API 合集", url:"https://github.com/public-apis/public-apis", desc:"各类免费 API 接口汇总", cat:"接口", tag:"热门" },
  { name:"JSONPlaceholder", url:"https://jsonplaceholder.typicode.com/", desc:"免费测试用 REST API",  cat:"接口" },
  { name:"天气 API",      url:"http://www.weather.com.cn",           desc:"中国天气数据接口",     cat:"接口" },
  { name:"高德开放平台",   url:"https://lbs.amap.com/",                    desc:"地图、定位相关 API",   cat:"接口" },
  { name:"聚合数据",       url:"https://www.juhe.cn/",                     desc:"各类数据接口服务",     cat:"接口" },
  { name:"API 文档导航",   url:"https://apifox.com/",                      desc:"接口调试与文档管理",   cat:"接口" },

  // —— 网盘资源 ——
  { name:"影视资源合集", url:"https://pan.baidu.com/s/1DKIFbhr8jM71W7EgMar2Gg?pwd=ybd8", desc:"提取码：ybd8", cat:"网盘资源", tag:"热门" },
  { name:"软件安装包",   url:"https://pan.quark.cn/s/xxxxx", desc:"常用软件安装包大全", cat:"网盘资源" },
  { name:"学习资料",     url:"https://www.aliyundrive.com/s/xxxxx", desc:"各类教程与文档", cat:"网盘资源" },
  { name:"字体库",       url:"https://pan.baidu.com/s/xxxxx", desc:"提取码：abcd，常用中英文字体", cat:"网盘资源" },

  // —— 社区与媒体 ——
  { name:"云不道QQ频道", url:"https://pd.qq.com/pd63695515",      desc:"加入频道交流反馈，获取更新", cat:"社区", tag:"官方" },
  { name:"视频与图片",   url:"media.html",                        desc:"浏览图片和视频合集",         cat:"媒体", tag:"新" },
];

/* ========== 以下逻辑无需修改 ========== */

const gridEl   = document.getElementById('grid');
const catsEl   = document.getElementById('cats');
const emptyEl  = document.getElementById('empty');
const searchEl = document.getElementById('searchInput');
const clearEl  = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');

let currentCat = '全部';
let keyword = '';

const CATS = ['全部', ...new Set(SITES.map(s => s.cat))];

function colorOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h},68%,58%), hsl(${(h + 40) % 360},70%,50%))`;
}

function initialOf(name) {
  const c = name.trim().charAt(0);
  return /[a-zA-Z]/.test(c) ? c.toUpperCase() : c;
}

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

function setTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('yb-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

setTheme(
  localStorage.getItem('yb-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

renderCats();
renderGrid();

/* =========================================================
   科技感 3D 粒子网络特效
   ========================================================= */
(function initParticles() {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  const particleCount = window.innerWidth < 600 ? 45 : 90;
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.z = Math.random() * 1.5 + 0.5;
      this.size = this.z * 2;
    }

    update() {
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null && mouse.y !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 110, 247, ${this.z * 0.6})`; 
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          let opacity = (1 - dist / 120) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79, 110, 247, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  animate();
})();
