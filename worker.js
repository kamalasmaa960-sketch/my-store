// متجر على Cloudflare Workers + D1 (ملف واحد، من غير مكتبات)
// الملف ده بيتولد من مجلد src بسكربت build.mjs. لو عدلتي، عدلي في الملفات اللي في src.
const CSS = ":root{--primary:#5b3df5;--bg:#f6f7fb;--head:#fff;--text:#1f2430;--radius:12px}\n*{box-sizing:border-box}\nbody{margin:0;font-family:\"Segoe UI\",Tahoma,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.65;-webkit-text-size-adjust:100%}\na{color:var(--primary);text-decoration:none}\nimg{max-width:100%}\n.ic{vertical-align:middle;flex:none}\n.wrap{max-width:1180px;margin:0 auto;padding:20px 16px}\n.muted{color:#6b7280;font-size:14px}\nh2{margin:6px 0 16px;font-size:26px}h3{margin:4px 0 12px}h4{margin:0 0 8px;font-size:17px}\n/* header */\n.top{background:var(--head);border-bottom:1px solid #0000000f;position:sticky;top:0;z-index:20;box-shadow:0 2px 10px #0000000a}\n.bar{max-width:1180px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;gap:14px}\n.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:22px;color:var(--primary);white-space:nowrap}\n.logo{height:38px;width:auto;border-radius:8px}\n.search{display:flex;flex:1;max-width:520px;margin:0 auto}\n.search input{border-radius:0 999px 999px 0;border-left:0;padding-right:18px}\n.search button{border-radius:999px 0 0 999px;padding:0 18px}\n.nav{display:flex;gap:6px;margin-right:auto}\n.nav a{display:flex;align-items:center;gap:6px;color:var(--text);padding:8px 12px;border-radius:999px;font-size:15px;position:relative}\n.nav a:hover{background:#0000000a}\n.pill{background:var(--primary);color:#fff;border-radius:999px;font-size:12px;min-width:20px;height:20px;line-height:20px;text-align:center;padding:0 5px}\n/* forms */\ninput,textarea,select{width:100%;padding:11px 12px;border:1px solid #d8dbe6;border-radius:var(--radius);font:inherit;background:#fff;color:var(--text)}\ninput:focus,textarea:focus,select:focus{outline:2px solid color-mix(in srgb,var(--primary) 35%,transparent);border-color:var(--primary)}\ninput[type=color]{padding:2px;height:44px}\nlabel{display:block;margin:12px 0 5px;font-weight:600;font-size:15px}\nbutton,.btn{background:var(--primary);color:#fff;border:0;padding:11px 20px;border-radius:var(--radius);cursor:pointer;font:inherit;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:filter .15s,transform .05s}\nbutton:hover,.btn:hover{filter:brightness(1.08)}button:active,.btn:active{transform:translateY(1px)}\n.btn.gray,button.gray{background:#64748b}.btn.red,button.red{background:#dc2626}.btn.sm,button.sm{padding:6px 14px;font-size:14px;border-radius:calc(var(--radius) - 2px)}\n.btn.light{background:#fff;color:var(--primary);border:1px solid var(--primary)}\n/* hero */\n.hero{background:linear-gradient(135deg,var(--primary),color-mix(in srgb,var(--primary) 55%,#000));color:#fff;border-radius:calc(var(--radius) + 6px);padding:38px 30px;margin-bottom:22px;position:relative;overflow:hidden}\n.hero:after{content:\"\";position:absolute;left:-60px;top:-60px;width:240px;height:240px;border-radius:50%;background:#ffffff1c}\n.hero h1{margin:0 0 8px;font-size:34px;line-height:1.3}.hero p{margin:0 0 18px;font-size:18px;opacity:.92;max-width:560px}\n.hero .btn{background:#fff;color:var(--primary)}\n/* products */\n.chips{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 18px}\n.chip{background:#fff;border:1px solid #e2e5ee;border-radius:999px;padding:6px 16px;color:var(--text);font-size:15px}.chip.on{background:var(--primary);color:#fff;border-color:var(--primary)}\n.sec-title{display:flex;align-items:center;justify-content:space-between;margin:8px 0 12px}\n.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:18px}\n.card{background:#fff;border-radius:var(--radius);box-shadow:0 1px 3px #0000001a;overflow:hidden;display:flex;flex-direction:column;transition:transform .15s,box-shadow .15s;position:relative}\n.card:hover{transform:translateY(-3px);box-shadow:0 10px 24px #00000018}\n.card .im{display:block;aspect-ratio:1/1;background:#eceef6;overflow:hidden}\n.card .im img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.card:hover .im img{transform:scale(1.04)}\n.card .b{padding:14px;display:flex;flex-direction:column;gap:8px;flex:1}\n.card .nm{color:var(--text);font-weight:700;line-height:1.4}\n.card .b form{margin-top:auto}.card .b button{width:100%}\n.price{font-weight:800;color:#0a8f5a;font-size:18px}\n.ribbon{position:absolute;top:10px;right:10px;background:#111827cc;color:#fff;font-size:12px;padding:3px 10px;border-radius:999px;z-index:2}\n.pd{display:grid;grid-template-columns:1.1fr 1fr;gap:28px;background:#fff;border-radius:calc(var(--radius) + 4px);padding:22px;box-shadow:0 1px 3px #0000001a}\n.pd .pic img{width:100%;border-radius:var(--radius);display:block}\n.pd h1{margin:0 0 6px;font-size:28px}.pd .price{font-size:28px}.crumbs{font-size:14px;margin-bottom:10px;color:#6b7280}\n.stock-ok{color:#0a8f5a;font-weight:600}.stock-no{color:#dc2626;font-weight:600}\n.qty{display:flex;gap:10px;align-items:center;margin:14px 0}.qty input{width:90px}\n.chips+.banner{margin-top:0}\n/* misc blocks */\n.notice{background:#e8f7ee;border:1px solid #b6e3c7;padding:11px 16px;border-radius:var(--radius);margin-bottom:16px}.err{background:#fdecec;border-color:#f3b5b5}\ntable{width:100%;border-collapse:collapse;background:#fff;border-radius:var(--radius);overflow:hidden;box-shadow:0 1px 3px #0000001a}\nth,td{padding:12px;border-bottom:1px solid #eef0f6;text-align:right;vertical-align:middle}th{background:#f3f4fa;font-size:14px;color:#475569}\n.box{background:#fff;border-radius:calc(var(--radius) + 2px);padding:20px;box-shadow:0 1px 3px #0000001a;margin-bottom:18px}\n.two{display:grid;grid-template-columns:1fr 1fr;gap:22px}\n.thumb{width:54px;height:54px;object-fit:cover;border-radius:10px}\n.badge{padding:3px 12px;border-radius:999px;background:#eef0f6;font-size:13px;font-weight:600}\n.tbl-wrap{overflow-x:auto}.narrow{max-width:440px;margin:40px auto}\n.banner{padding:13px 18px;text-align:center;font-weight:700;margin:0 0 16px;border-radius:var(--radius)}\nbody>.banner{border-radius:0;margin:0}\n.pay{border:1px dashed #bbb;border-radius:10px;padding:8px 12px;margin:6px 0;background:#fafafa}\n/* footer + contact buttons */\n.foot{background:#0f172a;color:#cbd5e1;margin-top:40px;padding:34px 16px 18px}\n.foot .muted{color:#94a3b8}.foot h4{color:#fff}\n.fgrid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px}\n.cbtns{display:flex;flex-wrap:wrap;gap:10px}\n.cbtn{display:inline-flex;align-items:center;gap:8px;background:var(--bc);color:#fff;padding:9px 14px;border-radius:999px;font-size:14px;font-weight:600;box-shadow:0 2px 6px #0003}\n.cbtn:hover{filter:brightness(1.1)}\n.copy{max-width:1180px;margin:22px auto 0;padding-top:16px;border-top:1px solid #ffffff1f;text-align:center;font-size:14px;color:#94a3b8}\n.adminlink{color:#cbd5e1;border:1px solid #ffffff33;border-radius:999px;padding:3px 12px;display:inline-flex;align-items:center;gap:6px}\n/* admin */\nbody.admin{--primary:#4f46e5;--bg:#f3f4f9;--head:#fff;--text:#1f2430;--radius:10px}\n.adm{display:flex;min-height:100vh}\n.side{width:236px;background:#111827;color:#e5e7eb;padding:18px 12px;position:sticky;top:0;height:100vh;overflow-y:auto;flex:none}\n.sbrand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:800;font-size:18px;padding:6px 10px 16px}\n.side nav a{display:flex;align-items:center;gap:10px;color:#cbd5e1;padding:10px 12px;border-radius:10px;margin-bottom:2px;font-size:15px}\n.side nav a:hover{background:#ffffff14;color:#fff}.side nav a.on{background:var(--primary);color:#fff}\n.adm-main{flex:1;min-width:0}\n.adm-main .wrap{max-width:1100px}\n.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin-bottom:22px}\n.tile{background:#fff;border-radius:14px;padding:18px;box-shadow:0 1px 3px #0000001a;display:flex;flex-direction:column;gap:6px;color:var(--text);position:relative;transition:transform .15s,box-shadow .15s}\na.tile:hover{transform:translateY(-3px);box-shadow:0 10px 22px #0000001a}\n.tile .ti{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--tc) 14%,#fff);color:var(--tc)}\n.tile b{font-size:26px;line-height:1.2}.tile small{color:#6b7280;font-size:14px}\n.tile .dot{position:absolute;top:14px;left:14px;background:#dc2626;color:#fff;border-radius:999px;font-size:12px;padding:1px 9px;font-weight:700}\n.bars{display:flex;align-items:flex-end;gap:10px;height:150px;margin-top:10px}\n.bars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;font-size:12px;color:#6b7280}\n.bars i{display:block;width:100%;max-width:46px;background:var(--primary);border-radius:8px 8px 0 0;min-height:3px}\n.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:16px}.stat{background:#fff;border-radius:14px;padding:18px;text-align:center;box-shadow:0 1px 3px #0000001a}.stat b{display:block;font-size:24px;color:var(--primary)}\n.cbtn.static{box-shadow:none}\n@media(max-width:860px){\n .adm{flex-direction:column}.side{width:100%;height:auto;position:static;padding:10px}\n .side nav{display:flex;gap:6px;overflow-x:auto;white-space:nowrap;padding-bottom:6px}.side nav a{margin:0;flex:none}\n .sbrand{padding:2px 6px 8px}\n .pd{grid-template-columns:1fr}.two{grid-template-columns:1fr}\n}\n@media(max-width:640px){\n .bar{flex-wrap:wrap;gap:8px}.brand{font-size:19px}.search{order:3;flex:1 1 100%;max-width:none}\n .nav a span:not(.pill){display:none}.nav a{padding:8px}.cartlink span{display:none}\n .grid{grid-template-columns:repeat(2,1fr);gap:12px}.card .b{padding:10px}.price{font-size:16px}\n .hero{padding:26px 20px}.hero h1{font-size:25px}.hero p{font-size:16px}\n h2{font-size:22px}.wrap{padding:14px 12px}\n th,td{padding:8px;font-size:14px}\n}\n";
const ICON_ST = {"user":"<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/>","users":"<path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>","chart":"<line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/>","box":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/>","return":"<polyline points=\"1 4 1 10 7 10\"/><path d=\"M3.51 15a9 9 0 1 0 2.13-9.36L1 10\"/>","truck":"<rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"/><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/>","sliders":"<line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"/><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"/><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"/><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"/><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"/><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"/><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"/><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"/>","money":"<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"/><path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/>","card":"<rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\"/><line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"/>","image":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/>","list":"<line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"/><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"/><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"/><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"/><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"/><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"/>","grid":"<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/>","eye":"<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","lock":"<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/>","logout":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"/>","home":"<path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>","cart":"<circle cx=\"9\" cy=\"21\" r=\"1\"/><circle cx=\"20\" cy=\"21\" r=\"1\"/><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"/>","shield":"<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>","alert":"<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/>","check":"<polyline points=\"20 6 9 17 4 12\"/>","tag":"<path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"/><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"/>"};
const ICON_FL = {"phone":"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z","email":"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z","facebook":"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z","telegram":"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z","whatsapp":"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"};

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');
const money = (n) => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ج.م';
const colorOk = (c) => /^#[0-9a-fA-F]{6}$/.test(String(c || ''));
const html = (body, status = 200, headers = {}) => new Response(body, { status, headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'no-store', ...headers } });
const redirect = (to) => new Response(null, { status: 303, headers: { location: to, 'cache-control': 'no-store' } });
const notice = (m) => `<div class="notice err">${esc(m)}</div>`;
const str = (v, max = 500) => String(v ?? '').trim().slice(0, max);

function icon(n, size = 20) {
  const a = `width="${size}" height="${size}" aria-hidden="true" class="ic"`;
  if (ICON_FL[n]) return `<svg ${a} viewBox="0 0 24 24" fill="currentColor"><path d="${ICON_FL[n]}"/></svg>`;
  return `<svg ${a} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_ST[n] || ''}</svg>`;
}

// ---------- الوقت (بتوقيت القاهرة) ----------
const cairoFmt = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
const cairoNow = () => cairoFmt.format(new Date());
const dayAdd = (day, n) => new Date(Date.parse(day + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);

const ORDER_LABELS = { new: 'جديد', confirmed: 'مؤكد', shipped: 'خرج للتوصيل', delivered: 'تم التسليم', failed: 'تعذر التسليم', cancelled: 'ملغي', returned: 'مرتجع' };

// ---------- قاعدة البيانات ----------
let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  const t = (s) => db.prepare(s);
  await db.batch([
    t('CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, pass_hash TEXT NOT NULL)'),
    t('CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, kind TEXT NOT NULL DEFAULT \'admin\', uid INTEGER NOT NULL, csrf TEXT NOT NULL, expires INTEGER NOT NULL)'),
    t('CREATE TABLE IF NOT EXISTS login_log (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, ident TEXT NOT NULL, ts INTEGER NOT NULL)'),
    t('CREATE TABLE IF NOT EXISTS settings (k TEXT PRIMARY KEY, v TEXT)'),
    t('CREATE TABLE IF NOT EXISTS visits (day TEXT NOT NULL, vid TEXT NOT NULL, PRIMARY KEY (day, vid))'),
    t('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'),
    t("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER, name TEXT NOT NULL, description TEXT, price REAL NOT NULL DEFAULT 0, stock INTEGER NOT NULL DEFAULT 0, image_url TEXT, image_data TEXT, img_v INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT '')"),
    t("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL, phone TEXT NOT NULL, phone2 TEXT NOT NULL DEFAULT '', location TEXT NOT NULL DEFAULT '', address TEXT NOT NULL, notes TEXT, total REAL NOT NULL, status TEXT NOT NULL DEFAULT 'new', payment_method TEXT NOT NULL DEFAULT '', delivery_time TEXT NOT NULL DEFAULT '', delivered_at TEXT NOT NULL DEFAULT '', driver_id INTEGER, driver_note TEXT, created_at TEXT NOT NULL)"),
    t('CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL, product_id INTEGER, name TEXT NOT NULL, price REAL NOT NULL, qty INTEGER NOT NULL)'),
    t("CREATE TABLE IF NOT EXISTS returns (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL, reason TEXT, amount REAL NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'requested', created_at TEXT NOT NULL)"),
    t("CREATE TABLE IF NOT EXISTS drivers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, username TEXT NOT NULL UNIQUE, phone TEXT NOT NULL DEFAULT '', pass_hash TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1)"),
    t("CREATE TABLE IF NOT EXISTS boxes (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, bg_color TEXT NOT NULL, text_color TEXT NOT NULL, position TEXT NOT NULL, link TEXT NOT NULL DEFAULT '', active INTEGER NOT NULL DEFAULT 1, sort_order INTEGER NOT NULL DEFAULT 0)"),
    t('CREATE TABLE IF NOT EXISTS payment_methods (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT NOT NULL, number TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1)'),
    t("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, value TEXT NOT NULL, label TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1)"),
    t("CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL UNIQUE, phone2 TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', pass_hash TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT '')"),
    t('CREATE TABLE IF NOT EXISTS cart_items (customer_id INTEGER NOT NULL, product_id INTEGER NOT NULL, qty INTEGER NOT NULL, PRIMARY KEY (customer_id, product_id))'),
  ]);
  try { await db.prepare('ALTER TABLE orders ADD COLUMN customer_id INTEGER').run(); } catch (e) { /* العمود موجود */ }
  for (const col of ['google_sub TEXT', 'email TEXT']) { try { await db.prepare('ALTER TABLE customers ADD COLUMN ' + col).run(); } catch (e) { /* موجود */ } }
  schemaReady = true;
}
const cnt = async (db, sql, ...b) => { const r = await db.prepare(sql).bind(...b).first(); return r ? Number(Object.values(r)[0]) || 0 : 0; };

// ---------- كلمات السر والجلسات ----------
const b64 = (buf) => { let s = ''; for (const x of new Uint8Array(buf)) s += String.fromCharCode(x); return btoa(s); };
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
async function pbkdf2(pass, salt, iter) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256);
}
const iterOf = (c) => Math.max(1000, Math.min(100000, parseInt(c.env.PBKDF2_ITER || '100000') || 100000));
async function hashPass(c, pass) { const salt = crypto.getRandomValues(new Uint8Array(16)); const it = iterOf(c); return it + '$' + b64(salt) + '$' + b64(await pbkdf2(pass, salt, it)); }
async function checkPass(pass, stored) { const [it, s, h] = String(stored).split('$'); if (!h) return false; return b64(await pbkdf2(pass, unb64(s), parseInt(it))) === h; }
async function sha256(s) { return b64(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))); }
const randToken = () => b64(crypto.getRandomValues(new Uint8Array(24))).replace(/[+/=]/g, 'x');
const passOkAdmin = (p) => p.length >= 10 && /[A-Za-z]/.test(p) && /\d/.test(p);
const passOkStaff = (p) => p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);
const userOk = (u) => /^[A-Za-z0-9_.-]{4,30}$/.test(u);

function getCookie(req, name) {
  const m = (req.headers.get('cookie') || '').split(/;\s*/).find((x) => x.startsWith(name + '='));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : '';
}
function setCookie(c, name, val, maxAge, httpOnly = true) {
  c.cookies.push(`${name}=${encodeURIComponent(val)}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure${httpOnly ? '; HttpOnly' : ''}`);
}
async function getSession(c, cookieName, kind) {
  const t = getCookie(c.req, cookieName); if (!t) return null;
  return (await c.db.prepare('SELECT * FROM sessions WHERE token_hash=? AND kind=? AND expires>?').bind(await sha256(t), kind, Date.now()).first()) || null;
}
async function startSession(c, cookieName, kind, uid) {
  const tok = randToken();
  await c.db.batch([
    c.db.prepare('DELETE FROM sessions WHERE expires<?').bind(Date.now()),
    c.db.prepare('INSERT INTO sessions (token_hash,kind,uid,csrf,expires) VALUES (?,?,?,?,?)').bind(await sha256(tok), kind, uid, randToken(), Date.now() + 7 * 864e5),
  ]);
  setCookie(c, cookieName, tok, 7 * 86400);
}

// تحديد محاولات الدخول: 8 فاشلة لكل IP أو 5 لكل اسم مستخدم خلال 10 دقايق
async function loginBlocked(c, kind, user) {
  const since = Math.floor(Date.now() / 1000) - 600; const ip = c.req.headers.get('cf-connecting-ip') || 'x';
  await c.db.prepare('DELETE FROM login_log WHERE ts<?').bind(since - 85800).run();
  const a = await cnt(c.db, 'SELECT COUNT(*) FROM login_log WHERE kind=? AND ident=? AND ts>?', kind, 'ip:' + ip, since);
  const b = await cnt(c.db, 'SELECT COUNT(*) FROM login_log WHERE kind=? AND ident=? AND ts>?', kind, 'u:' + user.toLowerCase(), since);
  return a >= 8 || b >= 5;
}
async function loginFail(c, kind, user) {
  const ip = c.req.headers.get('cf-connecting-ip') || 'x'; const ts = Math.floor(Date.now() / 1000);
  await c.db.batch([c.db.prepare('INSERT INTO login_log (kind,ident,ts) VALUES (?,?,?)').bind(kind, 'ip:' + ip, ts), c.db.prepare('INSERT INTO login_log (kind,ident,ts) VALUES (?,?,?)').bind(kind, 'u:' + user.toLowerCase(), ts)]);
}

// csrf للنماذج العامة (كوكي + حقل مخفي)
function pubCsrf(c) {
  if (!c.ct) { c.ct = getCookie(c.req, 'ct'); if (!/^[A-Za-z0-9]{20,}$/.test(c.ct)) { c.ct = randToken(); setCookie(c, 'ct', c.ct, 86400 * 30); } }
  return c.ct;
}
const pubField = (c) => `<input type="hidden" name="csrf" value="${esc(pubCsrf(c))}">`;
const pubCheck = (c) => c.form && c.form.get('csrf') && c.form.get('csrf') === getCookie(c.req, 'ct');

// ---------- الإعدادات ----------
const setting = (c, k, d = '') => (c.S[k] !== undefined && c.S[k] !== null && c.S[k] !== '' ? c.S[k] : d);
async function setSetting(c, k, v) { await c.db.prepare('INSERT INTO settings (k,v) VALUES (?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').bind(k, String(v)).run(); c.S[k] = String(v); }
const sname = (c) => setting(c, 'store_name', c.env.STORE_NAME || 'متجري');

// ---------- وسائل التواصل ----------
const CONTACT_KINDS = {
  whatsapp: ['واتساب', '#25D366', 'رقم الواتساب بالكود الدولي، مثال 201012345678'],
  telegram: ['تيليجرام', '#229ED9', 'اسم المستخدم (بدون @) أو لينك t.me'],
  facebook: ['فيسبوك', '#1877F2', 'لينك الصفحة (https://facebook.com/...)'],
  email: ['البريد الإلكتروني', '#EA4335', 'عنوان الإيميل'],
  phone: ['اتصال', '#334155', 'رقم التليفون'],
};
function contactUrl(kind, v) {
  v = String(v || '').trim();
  switch (kind) {
    case 'whatsapp': { const d = v.replace(/\D/g, ''); return d ? 'https://wa.me/' + d : ''; }
    case 'telegram': { if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(v)) return v; const u = v.replace(/^@+/, ''); return /^[A-Za-z0-9_]{4,64}$/.test(u) ? 'https://t.me/' + u : ''; }
    case 'facebook': return /^https?:\/\/([a-z0-9.-]+\.)?(facebook\.com|fb\.com|fb\.me)\//i.test(v) ? v : '';
    case 'email': return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v) ? 'mailto:' + v : '';
    case 'phone': { const d = v.replace(/[^0-9+]/g, ''); return d.length >= 6 ? 'tel:' + d : ''; }
  }
  return '';
}
async function contactButtons(c, size = 22) {
  const rows = (await c.db.prepare('SELECT * FROM contacts WHERE active=1 ORDER BY sort_order, id').all()).results;
  let out = '';
  for (const r of rows) {
    const k = CONTACT_KINDS[r.kind]; if (!k) continue; const u = contactUrl(r.kind, r.value); if (!u) continue;
    const label = r.label || k[0]; const ext = r.kind === 'email' || r.kind === 'phone' ? '' : ' target="_blank" rel="noopener"';
    out += `<a class="cbtn" style="--bc:${k[1]}" href="${esc(u)}"${ext} title="${esc(label)}" aria-label="${esc(label)}">${icon(r.kind, size)}<span>${esc(label)}</span></a>`;
  }
  return out;
}

// ---------- اللافتات الملونة ----------
async function renderBoxes(c, pos) {
  const rows = (await c.db.prepare('SELECT * FROM boxes WHERE active=1 AND position=? ORDER BY sort_order, id').bind(pos).all()).results;
  return rows.map((b) => {
    let inner = nl2br(b.body);
    if (b.link && /^(https?:\/\/|\/|tel:|mailto:)/i.test(b.link)) inner = `<a href="${esc(b.link)}" style="color:inherit;text-decoration:underline">${inner}</a>`;
    return `<div class="banner" style="background:${esc(b.bg_color)};color:${esc(b.text_color)}">${inner}</div>`;
  }).join('');
}

// ---------- الزوار ----------
async function trackVisit(c) {
  const ua = c.req.headers.get('user-agent') || '';
  if (!ua || /bot|crawl|spider|slurp|curl|wget|preview|monitor/i.test(ua)) return;
  const today = cairoNow().slice(0, 10);
  if (getCookie(c.req, 'vd') === today) return;
  let vid = getCookie(c.req, 'vid');
  if (!/^[A-Za-z0-9]{20,40}$/.test(vid)) { vid = randToken(); setCookie(c, 'vid', vid, 86400 * 365); }
  await c.db.prepare('INSERT OR IGNORE INTO visits (day,vid) VALUES (?,?)').bind(today, vid).run();
  setCookie(c, 'vd', today, 86400);
}

// ---------- السلة (كوكي) ----------
async function loadCart(c, cust) {
  const k = {}; if (!cust) return k;
  for (const r of (await c.db.prepare('SELECT product_id,qty FROM cart_items WHERE customer_id=?').bind(cust.id).all()).results) k[r.product_id] = Math.min(99, r.qty);
  return k;
}
async function saveCart(c, cust, cart) {
  const st = [c.db.prepare('DELETE FROM cart_items WHERE customer_id=?').bind(cust.id)];
  for (const [id, q] of Object.entries(cart)) if (+id > 0 && q > 0) st.push(c.db.prepare('INSERT INTO cart_items (customer_id,product_id,qty) VALUES (?,?,?)').bind(cust.id, +id, Math.min(99, q)));
  await c.db.batch(st);
}
async function getCustomer(c) {
  const sess = await getSession(c, 'csid', 'cust'); if (!sess) return null;
  const u = await c.db.prepare('SELECT * FROM customers WHERE id=? AND active=1').bind(sess.uid).first();
  return u ? { ...u, csrf: sess.csrf, token_hash: sess.token_hash } : null;
}
const PCOLS = "id,name,price,stock,image_url,img_v,(image_data IS NOT NULL AND image_data<>'') AS has_img";
async function cartItems(db, cart) {
  const ids = Object.keys(cart).map(Number); if (!ids.length) return { items: [], total: 0 };
  const rows = (await db.prepare(`SELECT ${PCOLS} FROM products WHERE active=1 AND stock>0 AND id IN (${ids.map(() => '?').join(',')})`).bind(...ids).all()).results;
  let total = 0; const items = rows.map((r) => { const qty = Math.min(cart[r.id], r.stock); const line = qty * r.price; total += line; return { ...r, qty, line }; });
  return { items, total };
}
const imgSrc = (p) => (p.has_img ? `/img/${p.id}?v=${p.img_v}` : p.image_url ? p.image_url : '/noimg.svg');
const mapLink = (o) => (/^https?:\/\//i.test(o.location) ? o.location : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.location || o.address));

// ---------- القوالب ----------
async function shopLayout(c, title, body, seo = {}) {
  if (!c.path.startsWith('/driver')) await trackVisit(c);
  const store = sname(c); const tagline = setting(c, 'tagline');
  const full = title === 'الرئيسية' ? store + (tagline ? ' - ' + tagline : '') : `${title} | ${store}`;
  const desc = seo.desc || setting(c, 'seo_description', store + (tagline ? ' - ' + tagline : ''));
  const origin = c.url.origin; const canon = origin + (seo.path || '/');
  const logo = setting(c, 'logo');
  const logoSrc = logo ? (logo.startsWith('data:') ? '/logo?v=' + logo.length : logo) : '';
  let head = `<meta name="description" content="${esc(desc)}">`;
  if (setting(c, 'seo_keywords')) head += `<meta name="keywords" content="${esc(setting(c, 'seo_keywords'))}">`;
  if (seo.noindex) head += '<meta name="robots" content="noindex,follow">';
  head += `<link rel="canonical" href="${esc(canon)}"><meta property="og:type" content="${seo.jsonld ? 'product' : 'website'}"><meta property="og:locale" content="ar_AR"><meta property="og:site_name" content="${esc(store)}"><meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(canon)}">`;
  const ogimg = seo.image || (logoSrc ? origin + logoSrc : '');
  if (ogimg) head += `<meta property="og:image" content="${esc(ogimg)}">`;
  const tel = (await c.db.prepare("SELECT value FROM contacts WHERE kind='phone' AND active=1 ORDER BY id LIMIT 1").first())?.value || '';
  const ld = seo.jsonld || ((seo.path || '/') === '/' ? { '@context': 'https://schema.org', '@type': 'Store', name: store, url: origin + '/', description: desc, telephone: tel } : null);
  if (ld) head += `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;
  const col = (k, d) => (colorOk(setting(c, k, d)) ? setting(c, k, d) : d);
  const radius = Math.max(0, Math.min(30, parseInt(setting(c, 'radius', '12')) || 12));
  const cartN = c.cust ? await cnt(c.db, 'SELECT COALESCE(SUM(qty),0) FROM cart_items WHERE customer_id=?', c.cust.id) : 0;
  const brand = (logoSrc ? `<img class="logo" src="${esc(logoSrc)}" alt=""> ` : '') + `<span>${esc(store)}</span>`;
  const q = c.url.searchParams.get('s') || '';
  const top = await renderBoxes(c, 'top');
  const flash = c.url.searchParams.get('m');
  const footerBoxes = await renderBoxes(c, 'footer');
  const pms = (await c.db.prepare('SELECT * FROM payment_methods WHERE active=1 ORDER BY id').all()).results;
  const cb = await contactButtons(c, 22); const addr = setting(c, 'address');
  let foot = `<footer class="foot"><div class="fgrid"><div><h4>${esc(store)}</h4><p class="muted">${esc(tagline)}</p>${addr ? `<p class="muted">${esc(addr)}</p>` : ''}</div>`;
  if (cb) foot += `<div><h4>تواصل معنا</h4><div class="cbtns">${cb}</div></div>`;
  if (pms.length) foot += `<div><h4>طرق الدفع</h4><p class="muted">الدفع عند الاستلام</p>${pms.map((r) => `<p class="muted">${esc(r.label)}: <span dir="ltr">${esc(r.number)}</span></p>`).join('')}</div>`;
  foot += `</div><div class="copy">© ${new Date().getFullYear()} ${esc(store)}`;
  if (c.path === '/' && setting(c, 'show_admin_link', '1') === '1') foot += ` &nbsp;·&nbsp; <a class="adminlink" href="/admin">${icon('lock', 14)} دخول الإدارة</a>`;
  foot += '</div></footer>';
  return html(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(full)}</title>${head}<link rel="stylesheet" href="/style.css?v=${CSS.length}"><style>:root{--primary:${col('c_primary', '#5b3df5')};--bg:${col('c_bg', '#f6f7fb')};--head:${col('c_head', '#ffffff')};--text:${col('c_text', '#1f2430')};--radius:${radius}px}</style></head><body class="shop">${top}<header class="top"><div class="bar"><a class="brand" href="/">${brand}</a><form class="search" action="/"><input name="s" placeholder="ابحث عن منتج" value="${esc(q)}"><button aria-label="بحث">${icon('search', 18)}</button></form><nav class="nav"><a href="${c.cust ? '/account' : '/account/login'}">${icon('user', 20)}<span>${c.cust ? esc(c.cust.name.split(' ')[0]) : 'دخول / تسجيل'}</span></a><a href="/driver/login">${icon('truck', 20)}<span>الموظفين</span></a><a href="/return">${icon('return', 20)}<span>مرتجع</span></a><a class="cartlink" href="/cart">${icon('cart', 22)}<span>السلة</span>${cartN ? `<b class="pill">${cartN}</b>` : ''}</a></nav></div></header><main class="wrap">${flash ? `<div class="notice">${esc(flash)}</div>` : ''}${body}</main>${footerBoxes}${foot}</body></html>`, seo.status || 200);
}

const ADMIN_NAV = [['/admin', 'الرئيسية', 'home'], ['/admin/products', 'المنتجات', 'box'], ['/admin/categories', 'الأقسام', 'grid'], ['/admin/orders', 'الطلبات', 'list'], ['/admin/returns', 'المرتجعات', 'return'], ['/admin/drivers', 'الموظفين', 'truck'], ['/admin/customers', 'العملاء', 'user'], ['/admin/reports', 'التقارير', 'chart'], ['/admin/boxes', 'اللافتات', 'image'], ['/admin/settings', 'الشكل والإعدادات', 'sliders'], ['/admin/payments', 'الدفع والتواصل', 'card'], ['/admin/account', 'حسابي', 'shield']];
function adminLayout(c, title, body, status = 200) {
  const store = sname(c); const flash = c.url.searchParams.get('m');
  const nav = ADMIN_NAV.map(([h, l, i]) => `<a href="${h}" class="${c.path === h ? 'on' : ''}">${icon(i, 18)}<span>${l}</span></a>`).join('');
  return html(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} | ${esc(store)}</title><link rel="stylesheet" href="/style.css?v=${CSS.length}"></head><body class="admin"><div class="adm"><aside class="side"><a class="sbrand" href="/admin">${icon('shield', 22)}<span>${esc(store)}</span></a><nav>${nav}<a href="/" target="_blank">${icon('eye', 18)}<span>عرض المتجر</span></a><a href="/admin/logout">${icon('logout', 18)}<span>خروج</span></a></nav></aside><div class="adm-main"><main class="wrap">${flash ? `<div class="notice">${esc(flash)}</div>` : ''}${body}</main></div></div></body></html>`, status);
}
// صفحة بسيطة من غير قايمة (تركيب / دخول الإدارة)
function plainAdmin(c, title, body) {
  return html(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} | ${esc(sname(c))}</title><link rel="stylesheet" href="/style.css?v=${CSS.length}"></head><body class="admin"><main class="wrap">${body}</main></body></html>`);
}
const back = (p, msg) => redirect(`${p}?m=${encodeURIComponent(msg)}`);

// ---------- المتجر ----------
async function shop(c) {
  const { db, req, url, path, form } = c;
  const L = (title, body, seo) => shopLayout(c, title, body, seo);
  let m;

  if (path === '/') {
    const cat = parseInt(url.searchParams.get('cat') || '0'), s = str(url.searchParams.get('s'), 100);
    let where = 'active=1'; const binds = [];
    if (cat) { where += ' AND category_id=?'; binds.push(cat); }
    if (s) { where += ' AND (name LIKE ? OR description LIKE ?)'; binds.push(`%${s}%`, `%${s}%`); }
    const prods = (await db.prepare(`SELECT ${PCOLS} FROM products WHERE ${where} ORDER BY id DESC`).bind(...binds).all()).results;
    const cats = (await db.prepare('SELECT * FROM categories ORDER BY name').all()).results;
    let hero = '';
    if (setting(c, 'hero_on', '1') === '1' && !cat && !s) hero = `<section class="hero"><h1>${esc(setting(c, 'hero_title', 'أهلا بيك في ' + sname(c)))}</h1><p>${esc(setting(c, 'hero_text', setting(c, 'tagline', 'أفضل المنتجات بأفضل الأسعار')))}</p><a class="btn" href="#products">${esc(setting(c, 'hero_btn_text', 'تسوق الآن'))}</a></section>`;
    const chips = `<div class="chips"><a class="chip ${cat ? '' : 'on'}" href="/">الكل</a>${cats.map((k) => `<a class="chip ${cat === k.id ? 'on' : ''}" href="/?cat=${k.id}">${esc(k.name)}</a>`).join('')}</div>`;
    const grid = prods.length ? `<div class="grid">${prods.map((p) => `<div class="card">${p.stock <= 0 ? '<span class="ribbon">غير متاح</span>' : ''}<a class="im" href="/p/${p.id}"><img src="${esc(imgSrc(p))}" alt="${esc(p.name)}" loading="lazy"></a><div class="b"><a class="nm" href="/p/${p.id}">${esc(p.name)}</a><span class="price">${money(p.price)}</span>${p.stock > 0 ? `<form method="post" action="/cart/add"><input type="hidden" name="id" value="${p.id}"><button class="sm">${icon('cart', 16)} أضف للسلة</button></form>` : ''}</div></div>`).join('')}</div>` : '<p class="muted">مفيش منتجات دلوقتي.</p>';
    return L('الرئيسية', (await renderBoxes(c, 'home_top')) + hero + chips + `<div id="products" class="sec-title"><h3>${s ? 'نتائج البحث' : 'المنتجات'}</h3><span class="muted">${prods.length} منتج</span></div>` + grid + (await renderBoxes(c, 'home_bottom')), { path: '/', noindex: !!(s || cat) });
  }
  if (path === '/robots.txt') return new Response(`User-agent: *\nDisallow: /admin\nDisallow: /driver\nDisallow: /cart\nDisallow: /checkout\nDisallow: /return\nDisallow: /account\nSitemap: ${url.origin}/sitemap.xml\n`, { headers: { 'content-type': 'text/plain;charset=utf-8' } });
  if (path === '/sitemap.xml') {
    const ps = (await db.prepare('SELECT id FROM products WHERE active=1 ORDER BY id DESC LIMIT 2000').all()).results;
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.origin}/</loc></url>${ps.map((p) => `<url><loc>${url.origin}/p/${p.id}</loc></url>`).join('')}</urlset>`, { headers: { 'content-type': 'application/xml;charset=utf-8' } });
  }
  if (path === '/logo') {
    const d = setting(c, 'logo'); const mm = d.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
    if (!mm) return new Response('not found', { status: 404 });
    return new Response(unb64(mm[2]), { headers: { 'content-type': mm[1], 'cache-control': 'public, max-age=3600' } });
  }
  if ((m = path.match(/^\/img\/(\d+)$/))) {
    const r = await db.prepare('SELECT image_data FROM products WHERE id=?').bind(+m[1]).first();
    const mm = r?.image_data && r.image_data.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
    if (!mm) return new Response('not found', { status: 404 });
    return new Response(unb64(mm[2]), { headers: { 'content-type': mm[1], 'cache-control': 'public, max-age=31536000, immutable' } });
  }
  if ((m = path.match(/^\/p\/(\d+)$/))) {
    const p = await db.prepare(`SELECT ${PCOLS},description,category_id FROM products WHERE id=? AND active=1`).bind(+m[1]).first();
    if (!p) return L('غير موجود', '<div class="box"><p>المنتج مش موجود.</p><a class="btn" href="/">رجوع للمتجر</a></div>', { noindex: true, status: 404 });
    const img = imgSrc(p);
    const body = (await renderBoxes(c, 'product')) + `<div class="crumbs"><a href="/">الرئيسية</a> / ${esc(p.name)}</div><div class="pd"><div class="pic"><img src="${esc(img)}" alt="${esc(p.name)}"></div><div><h1>${esc(p.name)}</h1><p class="price">${money(p.price)}</p><p>${p.stock > 0 ? `<span class="stock-ok">${icon('check', 16)} متاح${p.stock <= 5 ? ` (باقي ${p.stock} فقط)` : ''}</span>` : '<span class="stock-no">غير متاح حاليا</span>'}</p><p>${nl2br(p.description)}</p>${p.stock > 0 ? `<form method="post" action="/cart/add"><input type="hidden" name="id" value="${p.id}"><div class="qty"><label style="margin:0">الكمية</label><input type="number" name="qty" value="1" min="1" max="${p.stock}"><button>${icon('cart', 18)} أضف للسلة</button></div></form>` : ''}<p class="muted">${icon('truck', 16)} الدفع عند الاستلام أو تحويل على أرقامنا</p></div></div>`;
    const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: String(p.description || p.name).slice(0, 300), image: img.startsWith('http') ? img : url.origin + img, offers: { '@type': 'Offer', priceCurrency: 'EGP', price: Number(p.price).toFixed(2), availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url: url.origin + '/p/' + p.id } };
    return L(p.name, body, { path: '/p/' + p.id, desc: String(p.description || '').slice(0, 160) || undefined, image: img.startsWith('http') ? img : url.origin + img, jsonld: ld });
  }
  if (path.startsWith('/account')) return account(c);
  const cust = c.cust;
  if (!cust && (path.startsWith('/cart') || path === '/checkout')) return redirect('/account/login?next=' + encodeURIComponent(path === '/cart/add' || path === '/cart/update' ? '/cart' : path));
  const cart = cust ? await loadCart(c, cust) : {};
  if (path === '/cart/add' && form) {
    const id = parseInt(form.get('id')), q = Math.max(1, parseInt(form.get('qty') || '1') || 1);
    const ok = await db.prepare('SELECT id FROM products WHERE id=? AND active=1 AND stock>0').bind(id).first();
    if (ok) cart[id] = Math.min(99, (cart[id] || 0) + q);
    await saveCart(c, cust, cart);
    const ref = req.headers.get('referer'); let to = '/cart';
    try { if (ref && new URL(ref).origin === url.origin) to = new URL(ref).pathname + new URL(ref).search; } catch {}
    return redirect(to);
  }
  if (path === '/cart/update' && form) {
    const rm = form.get('remove');
    if (rm) delete cart[parseInt(rm)];
    else for (const [k, v] of form.entries()) { const mm = k.match(/^qty_(\d+)$/); if (mm) { const n = parseInt(v); if (n > 0) cart[+mm[1]] = Math.min(n, 99); else delete cart[+mm[1]]; } }
    await saveCart(c, cust, cart);
    return redirect('/cart');
  }
  if (path === '/cart') {
    const { items, total } = await cartItems(db, cart); const bx = await renderBoxes(c, 'cart');
    if (!items.length) return L('السلة', bx + '<h2>سلة المشتريات</h2><div class="box"><p>السلة فاضية.</p><a class="btn" href="/">كمّلي التسوق</a></div>', { noindex: true });
    return L('السلة', bx + `<h2>سلة المشتريات</h2><form method="post" action="/cart/update"><div class="tbl-wrap"><table><tr><th></th><th>المنتج</th><th>السعر</th><th>الكمية</th><th>الإجمالي</th><th></th></tr>${items.map((r) => `<tr><td><img class="thumb" src="${esc(imgSrc(r))}" alt=""></td><td>${esc(r.name)}</td><td>${money(r.price)}</td><td><input type="number" min="0" max="${r.stock}" name="qty_${r.id}" value="${r.qty}" style="width:80px"></td><td>${money(r.line)}</td><td><button class="sm red" name="remove" value="${r.id}">حذف</button></td></tr>`).join('')}</table></div><p><b>الإجمالي: ${money(total)}</b></p><button class="gray">تحديث الكميات</button> <a class="btn" href="/checkout">إتمام الطلب</a></form>`, { noindex: true });
  }
  if (path === '/checkout') {
    if (!hasPhone(cust)) return redirect('/account/phone?next=/checkout');
    const { items, total } = await cartItems(db, cart);
    if (!items.length) return redirect('/cart');
    const pms = (await db.prepare('SELECT * FROM payment_methods WHERE active=1 ORDER BY id').all()).results;
    let err = ''; const g = (k) => (form ? str(form.get(k), 500) : ({ name: cust.name, phone: cust.phone, phone2: cust.phone2, address: cust.address }[k] || ''));
    if (form) {
      if (!pubCheck(c)) err = 'الصفحة انتهت، حدّثيها وحاولي تاني.';
      else {
        const n = g('name'), ph = g('phone'), ph2 = g('phone2'), ad = g('address'), nt = g('notes'), loc = g('location');
        const pmid = parseInt(form.get('pm') || '0'); let pmname = 'الدفع عند الاستلام';
        for (const pm of pms) if (pm.id === pmid) pmname = `${pm.label} (${pm.number})`;
        const phOk = (x) => /^[0-9+\s-]{8,20}$/.test(x);
        if (n.split(/\s+/).filter(Boolean).length < 2 || !ad || !phOk(ph) || (ph2 && !phOk(ph2))) err = 'اكتبي الاسم بالكامل (اسمين على الأقل)، ورقم تليفون صحيح، والعنوان بالتفصيل.';
        else {
          const ins = await db.prepare('INSERT INTO orders (customer_name,phone,phone2,location,address,notes,total,payment_method,created_at,customer_id) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(n, ph, ph2, loc, ad, nt, total, pmname, cairoNow(), cust.id).run();
          const oid = ins.meta.last_row_id; const done = []; let failed = null;
          for (const r of items) {
            const u = await db.prepare('UPDATE products SET stock=stock-? WHERE id=? AND stock>=?').bind(r.qty, r.id, r.qty).run();
            if (!u.meta.changes) { failed = r.name; break; }
            done.push(r);
          }
          if (failed) {
            for (const r of done) await db.prepare('UPDATE products SET stock=stock+? WHERE id=?').bind(r.qty, r.id).run();
            await db.prepare('DELETE FROM orders WHERE id=?').bind(oid).run();
            err = `الكمية المتاحة من "${failed}" مش كفاية.`;
          } else {
            await db.batch(items.map((r) => db.prepare('INSERT INTO order_items (order_id,product_id,name,price,qty) VALUES (?,?,?,?,?)').bind(oid, r.id, r.name, r.price, r.qty)));
            await db.prepare('DELETE FROM cart_items WHERE customer_id=?').bind(cust.id).run(); if (!cust.address) await db.prepare('UPDATE customers SET address=?, phone2=? WHERE id=?').bind(ad, ph2, cust.id).run(); setCookie(c, 'lo', String(oid), 3600);
            return redirect('/thanks');
          }
        }
      }
    }
    const geo = "if(!navigator.geolocation){alert('المتصفح مش بيدعم تحديد الموقع');return}navigator.geolocation.getCurrentPosition(function(p){document.getElementById('loc').value='https://www.google.com/maps?q='+p.coords.latitude+','+p.coords.longitude},function(){alert('ما قدرناش نحدد موقعك، اكتبيه يدوي')})";
    return L('إتمام الطلب', (await renderBoxes(c, 'checkout')) + `<div class="two"><div class="box"><h2>بيانات التوصيل</h2>${err ? notice(err) : ''}<form method="post">${pubField(c)}<label>الاسم بالكامل</label><input name="name" required value="${esc(g('name'))}"><label>رقم التليفون</label><input name="phone" required dir="ltr" value="${esc(g('phone'))}"><label>رقم تليفون تاني (اختياري)</label><input name="phone2" dir="ltr" value="${esc(g('phone2'))}"><label>العنوان بالتفصيل (المحافظة، المدينة، الشارع، رقم العمارة)</label><textarea name="address" rows="3" required>${esc(g('address'))}</textarea><label>الموقع على الخريطة (اختياري)</label><input name="location" id="loc" dir="ltr" placeholder="لينك أو علامة مميزة" value="${esc(g('location'))}"><p><button type="button" class="sm gray" onclick="${esc(geo)}">استخدام موقعي الحالي</button></p><label>ملاحظات (اختياري)</label><textarea name="notes" rows="2">${esc(g('notes'))}</textarea><label>طريقة الدفع</label><label style="font-weight:normal"><input type="radio" name="pm" value="0" style="width:auto" checked> الدفع عند الاستلام</label>${pms.map((pm) => `<label style="font-weight:normal"><input type="radio" name="pm" value="${pm.id}" style="width:auto"> تحويل على ${esc(pm.label)}: <span dir="ltr">${esc(pm.number)}</span></label>`).join('')}${pms.length ? '<p class="muted">لو اخترتي التحويل، حوّلي المبلغ على الرقم وابعتي صورة الإيصال لنا على بيانات التواصل.</p>' : ''}<p><button>تأكيد الطلب</button></p></form></div><div class="box"><h2>ملخص الطلب</h2>${items.map((r) => `<p>${esc(r.name)} × ${r.qty} <span style="float:left">${money(r.line)}</span></p>`).join('')}<hr><b>الإجمالي: ${money(total)}</b></div></div>`, { noindex: true });
  }
  if (path === '/thanks') return L('تم الطلب', `<div class="box narrow"><h2>شكرا لطلبك</h2><p>رقم الطلب: <b>#${parseInt(getCookie(req, 'lo') || '0')}</b></p><p>هنكلمك على رقمك لتأكيد التوصيل.</p><a class="btn" href="/">رجوع للمتجر</a></div>`, { noindex: true });
  if (path === '/return') {
    let err = '';
    if (form) {
      const oid = parseInt(form.get('order_id') || '0'), ph = String(form.get('phone') || '').replace(/\D/g, ''), why = str(form.get('reason'), 1000);
      const o = oid ? await db.prepare('SELECT * FROM orders WHERE id=?').bind(oid).first() : null;
      if (!pubCheck(c)) err = 'الصفحة انتهت، حدّثيها وحاولي تاني.';
      else if (!o || !ph || o.phone.replace(/\D/g, '').slice(-9) !== ph.slice(-9)) err = 'رقم الطلب أو التليفون مش مطابق.';
      else if (o.status !== 'delivered') err = 'طلب المرتجع متاح بعد استلام الطلب بس.';
      else if (!why) err = 'اكتبي سبب الإرجاع.';
      else if (await cnt(db, "SELECT COUNT(*) FROM returns WHERE order_id=? AND status IN ('requested','approved')", oid)) err = 'فيه طلب مرتجع بالفعل لهذا الطلب.';
      else { await db.prepare('INSERT INTO returns (order_id,reason,amount,status,created_at) VALUES (?,?,?,?,?)').bind(oid, why, o.total, 'requested', cairoNow()).run(); return back('/', 'تم استلام طلب المرتجع، هنتواصل معاكي.'); }
    }
    return L('طلب مرتجع', `<div class="box narrow"><h2>طلب مرتجع</h2>${err ? notice(err) : ''}<form method="post">${pubField(c)}<label>رقم الطلب</label><input name="order_id" type="number" required dir="ltr"><label>رقم التليفون اللي استخدمتيه في الطلب</label><input name="phone" required dir="ltr"><label>سبب الإرجاع</label><textarea name="reason" rows="3" required></textarea><p><button>إرسال</button></p></form></div>`, { noindex: true });
  }
  return L('غير موجود', '<div class="box"><p>الصفحة مش موجودة.</p><a class="btn" href="/">رجوع للمتجر</a></div>', { noindex: true, status: 404 });
}

// ---------- بوابة الموظفين ----------
async function driverArea(c) {
  const { db, path, form } = c;
  const L = (title, body) => shopLayout(c, title, body, { noindex: true });
  if (path === '/driver/login') {
    let err = '';
    if (form) {
      const u = str(form.get('username'), 60);
      if (!pubCheck(c)) err = 'الصفحة انتهت، حدّثيها وحاولي تاني.';
      else if (await loginBlocked(c, 'staff', u)) err = 'محاولات كتير. استنى 10 دقايق.';
      else {
        const d = await db.prepare('SELECT * FROM drivers WHERE username=? AND active=1').bind(u).first();
        if (d && (await checkPass(String(form.get('password') || ''), d.pass_hash))) { await startSession(c, 'dsid', 'driver', d.id); return redirect('/driver'); }
        await loginFail(c, 'staff', u); err = 'اسم المستخدم أو كلمة السر غلط.';
      }
    }
    return L('دخول الموظفين', `<div class="box narrow"><h2>دخول الموظفين</h2>${err ? notice(err) : ''}<form method="post">${pubField(c)}<label>اسم المستخدم</label><input name="username" dir="ltr" required autocomplete="username"><label>كلمة السر</label><input type="password" name="password" dir="ltr" required autocomplete="current-password"><p><button>دخول</button></p></form></div>`);
  }
  const sess = await getSession(c, 'dsid', 'driver');
  if (path === '/driver/logout') { if (sess) await db.prepare('DELETE FROM sessions WHERE token_hash=?').bind(sess.token_hash).run(); setCookie(c, 'dsid', '', 0); return redirect('/driver/login'); }
  if (!sess) return redirect('/driver/login');
  const me = await db.prepare('SELECT * FROM drivers WHERE id=? AND active=1').bind(sess.uid).first();
  if (!me) { setCookie(c, 'dsid', '', 0); return redirect('/driver/login'); }
  if (form) {
    if (form.get('csrf') !== sess.csrf) return html('طلب غير صالح، ارجع للصفحة وحاول تاني.', 400);
    const id = parseInt(form.get('id') || '0'), act = String(form.get('act') || '');
    const o = await db.prepare('SELECT * FROM orders WHERE id=? AND driver_id=?').bind(id, me.id).first();
    const map = { out: 'shipped', done: 'delivered', fail: 'failed' };
    if (o && map[act] && ['confirmed', 'shipped', 'failed'].includes(o.status)) {
      await db.prepare('UPDATE orders SET status=?, driver_note=?, delivered_at=? WHERE id=?').bind(map[act], str(form.get('note'), 300), act === 'done' ? cairoNow() : '', id).run();
      return back('/driver', 'تم تحديث الطلب #' + id);
    }
    return redirect('/driver');
  }
  const csrf = `<input type="hidden" name="csrf" value="${esc(sess.csrf)}">`;
  const open = (await db.prepare("SELECT * FROM orders WHERE driver_id=? AND status IN ('confirmed','shipped','failed') ORDER BY id DESC").bind(me.id).all()).results;
  const done = (await db.prepare("SELECT * FROM orders WHERE driver_id=? AND status='delivered' ORDER BY id DESC LIMIT 20").bind(me.id).all()).results;
  let cards = '';
  for (const o of open) {
    const its = (await db.prepare('SELECT * FROM order_items WHERE order_id=?').bind(o.id).all()).results;
    cards += `<div class="box"><b>طلب #${o.id}</b> <span class="badge">${esc(ORDER_LABELS[o.status] || o.status)}</span><p>${icon('user', 16)} <b>${esc(o.customer_name)}</b><br>${icon('phone', 16)} <a href="tel:${esc(o.phone)}" dir="ltr">${esc(o.phone)}</a>${o.phone2 ? ` &nbsp; <a href="tel:${esc(o.phone2)}" dir="ltr">${esc(o.phone2)}</a>` : ''}<br>${nl2br(o.address)}${o.location && !/^https?:\/\//i.test(o.location) ? `<br>الموقع: ${esc(o.location)}` : ''}<br><a class="btn sm" target="_blank" rel="noopener" href="${esc(mapLink(o))}">فتح على الخريطة</a>${o.notes ? `<br><span class="muted">ملاحظات: ${esc(o.notes)}</span>` : ''}</p><p class="muted">وقت الطلب: ${esc(o.created_at)}<br>موعد التوصيل: <b>${o.delivery_time ? esc(o.delivery_time) : 'لسه ما اتحددش'}</b></p><p>المنتجات (${its.length} منتج، ${its.reduce((a, i) => a + i.qty, 0)} قطعة):</p><ul>${its.map((i) => `<li>${esc(i.name)} × ${i.qty} = ${money(i.price * i.qty)}</li>`).join('')}</ul><p>السعر الإجمالي: <b>${money(o.total)}</b></p><p><b>المطلوب تحصيله: ${o.payment_method === 'الدفع عند الاستلام' ? money(o.total) : 'مدفوع بالتحويل (' + esc(o.payment_method) + ')'}</b></p><form method="post">${csrf}<input type="hidden" name="id" value="${o.id}"><input name="note" placeholder="ملاحظة (اختياري)" value="${esc(o.driver_note)}"><p style="display:flex;gap:8px;flex-wrap:wrap">${o.status !== 'shipped' ? '<button name="act" value="out" class="sm gray">خرجت للتوصيل</button>' : ''}<button name="act" value="done" class="sm">تم التسليم</button><button name="act" value="fail" class="sm red">تعذر التسليم</button></p></form></div>`;
  }
  return L('طلباتي', `<h2>أهلا ${esc(me.name)} <a class="btn sm gray" href="/driver/logout">خروج</a></h2><h3>طلبات للتوصيل (${open.length})</h3>${open.length ? '' : '<p class="muted">مفيش طلبات متسلمة ليك دلوقتي.</p>'}${cards}${done.length ? `<h3>آخر الطلبات المسلّمة</h3><div class="tbl-wrap"><table>${done.map((o) => `<tr><td>#${o.id}</td><td>${esc(o.customer_name)}</td><td>${money(o.total)}</td><td>${esc(o.delivered_at)}</td></tr>`).join('')}</table></div>` : ''}`);
}

// ---------- حسابات العملاء ----------
const phoneNorm = (p) => String(p || '').replace(/[^0-9+]/g, '');
const phoneOk = (p) => /^\+?[0-9]{8,15}$/.test(p);
const hasPhone = (u) => !String(u.phone).startsWith('g:');
const b64urlJson = (t) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(t.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(t.length / 4) * 4, '=')), (ch) => ch.charCodeAt(0))));
const googleOn = (c) => !!(c.env.GOOGLE_CLIENT_ID && c.env.GOOGLE_CLIENT_SECRET);
const googleBtn = (c, nq) => (googleOn(c) ? `<p style="text-align:center;margin:14px 0 0"><a class="btn gray" style="display:block" href="/account/google${nq}">الدخول بحساب Google</a></p>` : '');
const safeNext = (n) => (/^\/(?!\/)[A-Za-z0-9_\-\/.?=&%]*$/.test(n || '') ? n : '/account');
async function account(c) {
  const { db, path, form, url } = c; const cust = c.cust;
  const L = (t, b) => shopLayout(c, t, b, { noindex: true });
  const next = safeNext((form && form.get('next')) || url.searchParams.get('next') || '');
  const nextF = `<input type="hidden" name="next" value="${esc(next)}">`;
  const nq = next !== '/account' ? '?next=' + encodeURIComponent(next) : '';


  if (path === '/account/google') {
    if (!googleOn(c)) return redirect('/account/login');
    const state = randToken(), nonce = randToken();
    setCookie(c, 'gst', state, 600); setCookie(c, 'gnc', nonce, 600); setCookie(c, 'gnx', next, 600);
    const q = new URLSearchParams({ client_id: c.env.GOOGLE_CLIENT_ID, redirect_uri: url.origin + '/account/google/callback', response_type: 'code', scope: 'openid email profile', state, nonce, prompt: 'select_account' });
    return redirect((c.env.GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth') + '?' + q);
  }
  if (path === '/account/google/callback') {
    const fail = (m) => { for (const k of ['gst', 'gnc', 'gnx']) setCookie(c, k, '', 0); return back('/account/login', m); };
    if (!googleOn(c)) return redirect('/account/login');
    const st = getCookie(c.req, 'gst'), nonce = getCookie(c.req, 'gnc'), nx = safeNext(getCookie(c.req, 'gnx'));
    const code = url.searchParams.get('code') || '';
    if (!st || url.searchParams.get('state') !== st || !code) return fail('تعذر الدخول بحساب Google، جربي تاني.');
    let p;
    try {
      const tr = await fetch(c.env.GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: c.env.GOOGLE_CLIENT_ID, client_secret: c.env.GOOGLE_CLIENT_SECRET, redirect_uri: url.origin + '/account/google/callback', grant_type: 'authorization_code' }) });
      const tj = await tr.json(); if (!tr.ok || !tj.id_token) throw new Error('token');
      p = b64urlJson(tj.id_token.split('.')[1]);
    } catch (e) { return fail('تعذر الدخول بحساب Google، جربي تاني.'); }
    const issOk = p.iss === 'https://accounts.google.com' || p.iss === 'accounts.google.com' || !!c.env.GOOGLE_TOKEN_URL;
    if (!issOk || p.aud !== c.env.GOOGLE_CLIENT_ID || !(p.exp * 1000 > Date.now()) || !nonce || p.nonce !== nonce || !p.sub || p.email_verified !== true) return fail('تعذر التحقق من حساب Google.');
    let u = await db.prepare('SELECT * FROM customers WHERE google_sub=?').bind(String(p.sub)).first();
    if (!u) {
      const nm = str(p.name || String(p.email || '').split('@')[0] || 'عميل', 100);
      const r = await db.prepare("INSERT INTO customers (name,phone,pass_hash,created_at,google_sub,email) VALUES (?,?,'!',?,?,?)").bind(nm, 'g:' + p.sub, cairoNow(), String(p.sub), str(p.email, 200)).run();
      u = { id: r.meta.last_row_id, active: 1 };
    }
    if (!u.active) return fail('الحساب موقوف.');
    for (const k of ['gst', 'gnc', 'gnx']) setCookie(c, k, '', 0);
    await startSession(c, 'csid', 'cust', u.id);
    return redirect(nx);
  }
  if (path === '/account/register') {
    if (cust) return redirect(next);
    let err = '';
    if (form) {
      const n = str(form.get('name'), 100), ph = phoneNorm(form.get('phone')), p = String(form.get('password') || '');
      if (!pubCheck(c)) err = 'الصفحة انتهت، حدّثيها وحاولي تاني.';
      else if (await loginBlocked(c, 'reg', ph || 'x')) err = 'محاولات كتير. استني 10 دقايق.';
      else {
        await loginFail(c, 'reg', ph || 'x');
        if (n.split(/\s+/).filter(Boolean).length < 2) err = 'اكتبي اسمك بالكامل (اسمين على الأقل).';
        else if (!phoneOk(ph)) err = 'رقم التليفون مش صحيح.';
        else if (!passOkStaff(p) || /^(.)\1+$/.test(p)) err = 'كلمة السر 8 حروف على الأقل وفيها حروف وأرقام.';
        else if (p !== String(form.get('password2') || '')) err = 'كلمتا السر مش متطابقتين.';
        else if (await cnt(db, 'SELECT COUNT(*) FROM customers WHERE phone=?', ph)) err = 'الرقم ده مسجل قبل كده، سجلي دخول.';
        else {
          const r = await db.prepare('INSERT INTO customers (name,phone,pass_hash,created_at) VALUES (?,?,?,?)').bind(n, ph, await hashPass(c, p), cairoNow()).run();
          await startSession(c, 'csid', 'cust', r.meta.last_row_id);
          return redirect(next);
        }
      }
    }
    const fv = (k) => esc(form ? form.get(k) : '');
    return L('حساب جديد', `<div class="box narrow"><h2>إنشاء حساب</h2>${err ? notice(err) : ''}<form method="post">${pubField(c)}${nextF}<label>الاسم بالكامل</label><input name="name" required value="${fv('name')}" autocomplete="name"><label>رقم التليفون (هو اللي هتدخلي بيه)</label><input name="phone" required dir="ltr" value="${fv('phone')}" autocomplete="tel"><label>كلمة السر (8 حروف على الأقل، حروف وأرقام)</label><input type="password" name="password" required dir="ltr" autocomplete="new-password"><label>أعد كتابة كلمة السر</label><input type="password" name="password2" required dir="ltr" autocomplete="new-password"><p><button>إنشاء الحساب</button></p></form>${googleBtn(c, nq)}<p class="muted">عندك حساب؟ <a href="/account/login${nq}">سجلي دخول</a></p></div>`);
  }
  if (path === '/account/login') {
    if (cust) return redirect(next);
    let err = '';
    if (form) {
      const ph = phoneNorm(form.get('phone'));
      if (!pubCheck(c)) err = 'الصفحة انتهت، حدّثيها وحاولي تاني.';
      else if (await loginBlocked(c, 'cust', ph)) err = 'محاولات كتير. استني 10 دقايق.';
      else {
        const u = await db.prepare('SELECT * FROM customers WHERE phone=? AND active=1').bind(ph).first();
        if (u && (await checkPass(String(form.get('password') || ''), u.pass_hash))) { await startSession(c, 'csid', 'cust', u.id); return redirect(next); }
        await loginFail(c, 'cust', ph); err = 'رقم التليفون أو كلمة السر غلط.';
      }
    }
    return L('تسجيل الدخول', `<div class="box narrow"><h2>تسجيل الدخول</h2>${err ? notice(err) : ''}<form method="post">${pubField(c)}${nextF}<label>رقم التليفون</label><input name="phone" required dir="ltr" autocomplete="tel"><label>كلمة السر</label><input type="password" name="password" required dir="ltr" autocomplete="current-password"><p><button>دخول</button></p></form>${googleBtn(c, nq)}<p class="muted">مفيش عندك حساب؟ <a href="/account/register${nq}">أنشئي حساب جديد</a></p></div>`);
  }
  if (!cust) return redirect('/account/login?next=' + encodeURIComponent(path === '/account/logout' ? '/' : path));
  const csrf = `<input type="hidden" name="csrf" value="${esc(cust.csrf)}">`;
  if (form && form.get('csrf') !== cust.csrf) return html('طلب غير صالح، ارجعي للصفحة وحاولي تاني.', 400);
  if (path === '/account/logout' && form) { await db.prepare('DELETE FROM sessions WHERE token_hash=?').bind(cust.token_hash).run(); setCookie(c, 'csid', '', 0); return redirect('/'); }
  if (path === '/account/phone') {
    let err = '';
    if (form) {
      const ph = phoneNorm(form.get('phone'));
      if (!phoneOk(ph)) err = 'رقم التليفون مش صحيح.';
      else if (await cnt(db, 'SELECT COUNT(*) FROM customers WHERE phone=? AND id<>?', ph, cust.id)) err = 'الرقم ده مسجل على حساب تاني.';
      else { await db.prepare('UPDATE customers SET phone=? WHERE id=?').bind(ph, cust.id).run(); return redirect(next); }
    }
    return L('رقم التليفون', `<div class="box narrow"><h2>اكتبي رقم تليفونك</h2><p class="muted">محتاجينه عشان نكلمك لتأكيد الطلب والتوصيل.</p>${err ? notice(err) : ''}<form method="post">${csrf}${nextF}<label>رقم التليفون</label><input name="phone" required dir="ltr" autocomplete="tel"><p><button>حفظ</button></p></form></div>`);
  }
  let m;
  if ((m = path.match(/^\/account\/order\/(\d+)$/))) {
    const o = await db.prepare('SELECT * FROM orders WHERE id=? AND customer_id=?').bind(+m[1], cust.id).first();
    if (!o) return L('غير موجود', '<div class="box"><p>الطلب مش موجود.</p><a class="btn" href="/account">حسابي</a></div>');
    const its = (await db.prepare('SELECT * FROM order_items WHERE order_id=?').bind(o.id).all()).results;
    return L('طلب #' + o.id, `<div class="box narrow"><h2>طلب #${o.id} <span class="badge">${esc(ORDER_LABELS[o.status] || o.status)}</span></h2><p class="muted">${esc(o.created_at)}</p><div class="tbl-wrap"><table><tr><th>المنتج</th><th>السعر</th><th>الكمية</th></tr>${its.map((i) => `<tr><td>${esc(i.name)}</td><td>${money(i.price)}</td><td>${i.qty}</td></tr>`).join('')}</table></div><p>الإجمالي: <b>${money(o.total)}</b></p><p>الدفع: ${esc(o.payment_method)}</p><p>العنوان: ${esc(o.address)}</p>${o.delivery_time ? `<p>موعد التوصيل: ${esc(o.delivery_time)}</p>` : ''}<p>${o.status === 'delivered' ? '<a class="btn gray" href="/return">طلب مرتجع</a> ' : ''}<a class="btn" href="/account">رجوع</a></p></div>`);
  }
  if (path === '/account') {
    let err = '', ok = '';
    if (form) {
      const act = String(form.get('act') || '');
      if (act === 'profile') {
        const n = str(form.get('name'), 100), p2 = phoneNorm(form.get('phone2')), ad = str(form.get('address'), 500);
        if (n.split(/\s+/).filter(Boolean).length < 2) err = 'اكتبي اسمك بالكامل (اسمين على الأقل).';
        else if (p2 && !phoneOk(p2)) err = 'رقم التليفون التاني مش صحيح.';
        else { await db.prepare('UPDATE customers SET name=?,phone2=?,address=? WHERE id=?').bind(n, p2, ad, cust.id).run(); return back('/account', 'تم حفظ بياناتك.'); }
      } else if (act === 'pass') {
        const np = String(form.get('new_pass') || '');
        if (cust.pass_hash === '!' || !hasPhone(cust)) err = 'حسابك بحساب Google. أضيفي رقم تليفونك الأول وبعدين اطلبي من الإدارة كلمة سر، أو كمّلي بـ Google.';
        else if (!(await checkPass(String(form.get('cur_pass') || ''), cust.pass_hash))) err = 'كلمة السر الحالية غلط.';
        else if (!passOkStaff(np) || /^(.)\1+$/.test(np)) err = 'كلمة السر الجديدة 8 حروف على الأقل وفيها حروف وأرقام.';
        else if (np !== String(form.get('new_pass2') || '')) err = 'كلمتا السر الجديدتان مش متطابقتين.';
        else { await db.batch([db.prepare('UPDATE customers SET pass_hash=? WHERE id=?').bind(await hashPass(c, np), cust.id), db.prepare("DELETE FROM sessions WHERE kind='cust' AND uid=? AND token_hash<>?").bind(cust.id, cust.token_hash)]); return back('/account', 'تم تغيير كلمة السر.'); }
      }
    }
    const orders = (await db.prepare('SELECT id,total,status,created_at FROM orders WHERE customer_id=? ORDER BY id DESC LIMIT 50').bind(cust.id).all()).results;
    const fv = (k, d) => esc(form ? form.get(k) : d);
    return L('حسابي', `<h2>أهلا ${esc(cust.name)}</h2>${err ? notice(err) : ''}<div class="two"><div class="box"><h3>طلباتي</h3>${orders.length ? `<div class="tbl-wrap"><table><tr><th>رقم</th><th>التاريخ</th><th>الإجمالي</th><th>الحالة</th></tr>${orders.map((o) => `<tr><td><a href="/account/order/${o.id}">#${o.id}</a></td><td>${esc(o.created_at)}</td><td>${money(o.total)}</td><td>${esc(ORDER_LABELS[o.status] || o.status)}</td></tr>`).join('')}</table></div>` : '<p class="muted">لسه ما عملتيش طلبات.</p>'}<p><a class="btn" href="/cart">سلتي</a></p></div><div><div class="box"><h3>بياناتي</h3><form method="post">${csrf}<input type="hidden" name="act" value="profile"><label>الاسم بالكامل</label><input name="name" required value="${fv('name', cust.name)}">${hasPhone(cust) ? `<label>رقم الدخول</label><input value="${esc(cust.phone)}" dir="ltr" disabled>` : `<p class="notice">سجلتي بحساب Google${cust.email ? ' (' + esc(cust.email) + ')' : ''}. <a href="/account/phone">أضيفي رقم تليفونك</a> قبل أول طلب.</p>`}<label>رقم تليفون تاني (اختياري)</label><input name="phone2" dir="ltr" value="${fv('phone2', cust.phone2)}"><label>عنوان التوصيل المحفوظ</label><textarea name="address" rows="3">${fv('address', cust.address)}</textarea><p><button>حفظ</button></p></form></div>${cust.pass_hash === '!' ? '' : '<div class="box"><h3>تغيير كلمة السر</h3><form method="post">${csrf}<input type="hidden" name="act" value="pass"><label>كلمة السر الحالية</label><input type="password" name="cur_pass" dir="ltr" required><label>الجديدة</label><input type="password" name="new_pass" dir="ltr" required><label>أعد كتابة الجديدة</label><input type="password" name="new_pass2" dir="ltr" required><p><button>تغيير</button></p></form></div>'}<form method="post" action="/account/logout">${csrf}<button class="gray">تسجيل الخروج</button></form></div></div>`);
  }
  return redirect('/account');
}

// ---------- الإدارة ----------
const IMG_JS = (formId, fileId, hidId, stId, max) => `<script>
(function(){const inp=document.getElementById('${fileId}'),hid=document.getElementById('${hidId}'),st=document.getElementById('${stId}'),f=document.getElementById('${formId}');
inp.addEventListener('change',function(){const file=inp.files[0];hid.value='';if(!file)return;st.textContent='جاري تجهيز الصورة...';const im=new Image();im.onload=function(){const M=${max},r=Math.min(1,M/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*r);cv.height=Math.round(im.height*r);const x=cv.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);x.drawImage(im,0,0,cv.width,cv.height);let q=0.85,d=cv.toDataURL('image/jpeg',q);while(d.length>1300000&&q>0.3){q-=0.1;d=cv.toDataURL('image/jpeg',q)}hid.value=d;st.textContent='الصورة جاهزة'};im.onerror=function(){st.textContent='الصورة دي مش مقروءة، جربي غيرها.'};im.src=URL.createObjectURL(file)});
f.addEventListener('submit',function(e){if(inp.files[0]&&!hid.value){e.preventDefault();alert('استني لحد ما الصورة تتجهز.')}});})();
</script>`;
const dataImgOk = (d) => /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(d) && d.length <= 1_500_000;
const urlOk = (u) => /^https?:\/\/[^\s"<>]{3,450}$/i.test(u);

async function admin(c) {
  const { db, req, url, path, form, env } = c;
  const ip = req.headers.get('cf-connecting-ip') || 'x';
  const adminCount = await cnt(db, 'SELECT COUNT(*) FROM admins');

  if (path === '/admin/setup') {
    if (adminCount > 0) return redirect('/admin/login');
    let err = '';
    if (!env.SETUP_KEY) err = 'لازم تضيفي متغير سري اسمه SETUP_KEY في إعدادات الـ Worker الأول (شوفي الدليل)، وبعدها حدّثي الصفحة.';
    else if (form) {
      const u = str(form.get('username'), 40), p = String(form.get('password') || '');
      if (form.get('setup_key') !== env.SETUP_KEY) err = 'مفتاح التركيب غلط.';
      else if (!userOk(u)) err = 'اسم المستخدم 4 إلى 30 حرف إنجليزي أو أرقام.';
      else if (!passOkAdmin(p)) err = 'كلمة السر 10 حروف على الأقل وفيها حروف وأرقام.';
      else if (p !== form.get('password2')) err = 'كلمتا السر مش متطابقتين.';
      else { await db.prepare('INSERT INTO admins (username,pass_hash) VALUES (?,?)').bind(u, await hashPass(c, p)).run(); return redirect('/admin/login'); }
    }
    return plainAdmin(c, 'تركيب', `<div class="box narrow"><h2>إنشاء حساب الإدارة</h2>${err ? notice(err) : ''}<form method="post"><label>مفتاح التركيب (SETUP_KEY)</label><input name="setup_key" type="password" dir="ltr" required><label>اسم المستخدم</label><input name="username" dir="ltr" required><label>كلمة السر (10 حروف على الأقل، حروف وأرقام)</label><input type="password" name="password" dir="ltr" required><label>أعد كتابتها</label><input type="password" name="password2" dir="ltr" required><p><button>إنشاء</button></p></form></div>`);
  }
  if (adminCount === 0) return redirect('/admin/setup');

  if (path === '/admin/login') {
    let err = '';
    if (form) {
      const u = str(form.get('username'), 60);
      if (await loginBlocked(c, 'admin', u)) err = 'محاولات كتير. استني 10 دقايق.';
      else {
        const a = await db.prepare('SELECT * FROM admins WHERE username=?').bind(u).first();
        if (a && (await checkPass(String(form.get('password') || ''), a.pass_hash))) { await startSession(c, 'sid', 'admin', a.id); return redirect('/admin'); }
        await loginFail(c, 'admin', u); err = 'اسم المستخدم أو كلمة السر غلط.';
      }
    }
    return plainAdmin(c, 'دخول الإدارة', `<div class="box narrow"><h2>دخول لوحة التحكم</h2>${err ? notice(err) : ''}<form method="post"><label>اسم المستخدم</label><input name="username" dir="ltr" required><label>كلمة السر</label><input type="password" name="password" dir="ltr" required><p><button>دخول</button></p></form></div>`);
  }

  const sess = await getSession(c, 'sid', 'admin');
  if (!sess) return redirect('/admin/login');
  if (form && form.get('csrf') !== sess.csrf) return html('طلب غير صالح، ارجعي للصفحة وحاولي تاني.', 400);
  const csrf = `<input type="hidden" name="csrf" value="${esc(sess.csrf)}">`;
  const A = (title, body) => adminLayout(c, title, body);

  if (path === '/admin/logout') { await db.prepare('DELETE FROM sessions WHERE token_hash=?').bind(sess.token_hash).run(); setCookie(c, 'sid', '', 0); return redirect('/admin/login'); }

  // ----- لوحة التحكم -----
  if (path === '/admin') {
    const today = cairoNow().slice(0, 10);
    const visits = await cnt(db, 'SELECT COUNT(*) FROM visits WHERE day=?', today);
    const salesToday = await cnt(db, "SELECT COALESCE(SUM(total),0) FROM orders WHERE status<>'cancelled' AND created_at>=?", today);
    const newOrders = await cnt(db, "SELECT COUNT(*) FROM orders WHERE status='new'");
    const pendingRet = await cnt(db, "SELECT COUNT(*) FROM returns WHERE status='requested'");
    const products = await cnt(db, 'SELECT COUNT(*) FROM products');
    const low = await cnt(db, 'SELECT COUNT(*) FROM products WHERE active=1 AND stock<=3');
    const salesAll = await cnt(db, "SELECT COALESCE(SUM(total),0) FROM orders WHERE status<>'cancelled'");
    const retAll = await cnt(db, "SELECT COALESCE(SUM(amount),0) FROM returns WHERE status='approved'");
    const openDeliv = await cnt(db, "SELECT COUNT(*) FROM orders WHERE driver_id IS NOT NULL AND status IN ('confirmed','shipped')");
    const days = {}; for (let i = 6; i >= 0; i--) days[dayAdd(today, -i)] = 0;
    for (const r of (await db.prepare("SELECT SUBSTR(created_at,1,10) d, SUM(total) t FROM orders WHERE status<>'cancelled' AND created_at>=? GROUP BY SUBSTR(created_at,1,10)").bind(Object.keys(days)[0]).all()).results) if (r.d in days) days[r.d] = r.t;
    const max = Math.max(1, ...Object.values(days));
    const tile = (href, ic, color, big, label, dot = 0) => `<a class="tile" href="${href}" style="--tc:${color}">${dot ? `<span class="dot">${dot}</span>` : ''}<span class="ti">${icon(ic, 24)}</span><b>${big}</b><small>${esc(label)}</small></a>`;
    return A('لوحة التحكم', `<h2>أهلا بيكي</h2><div class="tiles">${tile('/admin/reports', 'money', '#16a34a', money(salesToday), 'مبيعات اليوم')}${tile('/admin/reports', 'eye', '#0ea5e9', visits, 'زوار اليوم')}${tile('/admin/orders', 'list', '#f59e0b', newOrders, 'طلبات جديدة', newOrders)}${tile('/admin/returns', 'return', '#dc2626', pendingRet, 'مرتجعات منتظرة', pendingRet)}${tile('/admin/reports', 'chart', '#4f46e5', money(salesAll - retAll), 'صافي المبيعات (بعد المرتجعات)')}${tile('/admin/drivers', 'truck', '#0d9488', openDeliv, 'طلبات عند المندوبين')}${tile('/admin/products', 'box', '#7c3aed', products, 'منتجات' + (low ? ` (${low} مخزونها قليل)` : ''), low)}</div><div class="box"><h3>مبيعات آخر 7 أيام</h3><div class="bars">${Object.entries(days).map(([d, v]) => `<div><span>${v > 0 ? Math.round(v).toLocaleString('en-US') : ''}</span><i style="height:${Math.max(2, Math.round((v / max) * 100))}%"></i><span>${d.slice(5)}</span></div>`).join('')}</div></div><h3>الأقسام</h3><div class="tiles">${tile('/admin/products', 'box', '#7c3aed', '', 'المنتجات')}${tile('/admin/categories', 'grid', '#0ea5e9', '', 'الأقسام')}${tile('/admin/orders', 'list', '#f59e0b', '', 'الطلبات')}${tile('/admin/returns', 'return', '#dc2626', '', 'المرتجعات')}${tile('/admin/drivers', 'users', '#0d9488', '', 'الموظفين والمندوبين')}${tile('/admin/boxes', 'image', '#ec4899', '', 'اللافتات الملونة')}${tile('/admin/settings', 'sliders', '#64748b', '', 'الشكل والإعدادات')}${tile('/admin/payments', 'card', '#16a34a', '', 'الدفع والتواصل')}${tile('/admin/account', 'shield', '#4f46e5', '', 'حسابي')}</div>`);
  }

  // ----- حسابي -----
  if (path === '/admin/account') {
    const a = await db.prepare('SELECT * FROM admins WHERE id=?').bind(sess.uid).first();
    let err = '';
    if (form) {
      const u = str(form.get('username'), 40), np = String(form.get('new_pass') || '');
      if (!(await checkPass(String(form.get('cur_pass') || ''), a.pass_hash))) err = 'كلمة السر الحالية غلط.';
      else if (!userOk(u)) err = 'اسم المستخدم 4 إلى 30 حرف إنجليزي أو أرقام.';
      else if (np && !passOkAdmin(np)) err = 'كلمة السر الجديدة 10 حروف على الأقل وفيها حروف وأرقام.';
      else if (np !== String(form.get('new_pass2') || '')) err = 'كلمتا السر الجديدتان مش متطابقتين.';
      else {
        await db.prepare('UPDATE admins SET username=? WHERE id=?').bind(u, a.id).run();
        if (np) await db.batch([db.prepare('UPDATE admins SET pass_hash=? WHERE id=?').bind(await hashPass(c, np), a.id), db.prepare("DELETE FROM sessions WHERE kind='admin' AND uid=? AND token_hash<>?").bind(a.id, sess.token_hash)]);
        return back('/admin/account', 'تم تحديث بيانات الدخول.');
      }
    }
    return A('حسابي', `<div class="box narrow"><h2>تغيير بيانات الدخول</h2>${err ? notice(err) : ''}<form method="post">${csrf}<label>اسم المستخدم</label><input name="username" dir="ltr" required value="${esc(form ? form.get('username') : a.username)}"><label>كلمة السر الحالية</label><input type="password" name="cur_pass" dir="ltr" required><label>كلمة سر جديدة (سيبيها فاضية لو مش عايزة تغيريها)</label><input type="password" name="new_pass" dir="ltr"><label>أعد كتابة الجديدة</label><input type="password" name="new_pass2" dir="ltr"><p><button>حفظ</button></p></form></div>`);
  }

  // ----- الأقسام -----
  if (path === '/admin/categories') {
    if (form) {
      if (form.get('del')) { const id = parseInt(form.get('del')); await db.batch([db.prepare('UPDATE products SET category_id=NULL WHERE category_id=?').bind(id), db.prepare('DELETE FROM categories WHERE id=?').bind(id)]); }
      else if (str(form.get('name'))) await db.prepare('INSERT INTO categories (name) VALUES (?)').bind(str(form.get('name'), 100)).run();
      return redirect('/admin/categories');
    }
    const cats = (await db.prepare('SELECT * FROM categories ORDER BY name').all()).results;
    return A('الأقسام', `<h2>الأقسام</h2><div class="box"><form method="post" style="display:flex;gap:8px">${csrf}<input name="name" placeholder="اسم قسم جديد" required><button>إضافة</button></form></div><table>${cats.map((k) => `<tr><td>${esc(k.name)}</td><td><form method="post" onsubmit="return confirm('حذف القسم؟')">${csrf}<button class="sm red" name="del" value="${k.id}">حذف</button></form></td></tr>`).join('')}</table>`);
  }

  // ----- المنتجات -----
  if (path === '/admin/products') {
    let err = '';
    if (form) {
      try {
        if (form.get('del')) { await db.prepare('DELETE FROM products WHERE id=?').bind(parseInt(form.get('del'))).run(); return back('/admin/products', 'تم حذف المنتج.'); }
        const id = parseInt(form.get('id') || '0'), name = str(form.get('name'), 200);
        const price = parseFloat(String(form.get('price') || '0').replace(',', '.')); const stock = Math.max(0, parseInt(form.get('stock') || '0') || 0);
        if (!name || !(price >= 0)) throw new Error('اكتبي اسم المنتج وسعر صحيح.');
        const cat = parseInt(form.get('category_id') || '0') || null, active = form.get('active') ? 1 : 0, desc = str(form.get('description'), 2000);
        const imageUrl = str(form.get('image_url'), 500), data = String(form.get('image_data') || '');
        if (imageUrl && !urlOk(imageUrl)) throw new Error('لينك الصورة لازم يبدأ بـ http أو https.');
        if (data && !dataImgOk(data)) throw new Error('الصورة كبيرة أو نوعها مش مدعوم (JPG/PNG/WEBP).');
        if (id) {
          await db.prepare('UPDATE products SET name=?,description=?,price=?,stock=?,category_id=?,active=? WHERE id=?').bind(name, desc, price, stock, cat, active, id).run();
          if (data) await db.prepare('UPDATE products SET image_data=?, image_url=NULL, img_v=img_v+1 WHERE id=?').bind(data, id).run();
          else if (imageUrl) await db.prepare('UPDATE products SET image_url=?, image_data=NULL, img_v=img_v+1 WHERE id=?').bind(imageUrl, id).run();
        } else await db.prepare('INSERT INTO products (name,description,price,stock,category_id,active,image_url,image_data,created_at) VALUES (?,?,?,?,?,?,?,?,?)').bind(name, desc, price, stock, cat, active, data ? null : imageUrl || null, data || null, cairoNow()).run();
        return back('/admin/products', 'تم حفظ المنتج.');
      } catch (e) { err = e.message; }
    }
    const eid = parseInt(url.searchParams.get('edit') || '0');
    const ed = eid ? await db.prepare('SELECT id,name,description,price,stock,category_id,active,image_url FROM products WHERE id=?').bind(eid).first() : null;
    const cats = (await db.prepare('SELECT * FROM categories ORDER BY name').all()).results;
    const rows = (await db.prepare(`SELECT p.id,p.name,p.price,p.stock,p.active,p.image_url,p.img_v,(p.image_data IS NOT NULL AND p.image_data<>'') AS has_img,k.name cname FROM products p LEFT JOIN categories k ON k.id=p.category_id ORDER BY p.id DESC`).all()).results;
    return A('المنتجات', `<h2>المنتجات</h2><div class="box"><h3>${ed ? 'تعديل منتج' : 'إضافة منتج'}</h3>${err ? notice(err) : ''}<form method="post" id="pf">${csrf}<input type="hidden" name="id" value="${ed ? ed.id : 0}"><input type="hidden" name="image_data" id="imgdata"><div class="two"><div><label>اسم المنتج</label><input name="name" required value="${esc(ed?.name)}"><label>السعر (ج.م)</label><input name="price" required dir="ltr" value="${esc(ed?.price)}"><label>الكمية بالمخزن</label><input type="number" name="stock" min="0" value="${esc(ed ? ed.stock : 10)}"></div><div><label>القسم</label><select name="category_id"><option value="">بدون قسم</option>${cats.map((k) => `<option value="${k.id}" ${ed?.category_id === k.id ? 'selected' : ''}>${esc(k.name)}</option>`).join('')}</select><label>صورة من جهازك</label><input type="file" id="imgfile" accept="image/*"><div class="muted" id="imgst"></div><label>أو لينك صورة (لو ما اخترتيش ملف)</label><input name="image_url" dir="ltr" placeholder="https://..." value="${esc(ed?.image_url)}"><label style="font-weight:normal"><input type="checkbox" name="active" style="width:auto" ${!ed || ed.active ? 'checked' : ''}> ظاهر في المتجر</label></div></div><label>الوصف</label><textarea name="description" rows="3">${esc(ed?.description)}</textarea><p><button>حفظ</button> ${ed ? '<a class="btn gray" href="/admin/products">إلغاء</a>' : ''}</p></form></div>${IMG_JS('pf', 'imgfile', 'imgdata', 'imgst', 1000)}<div class="tbl-wrap"><table><tr><th></th><th>الاسم</th><th>القسم</th><th>السعر</th><th>المخزون</th><th>الحالة</th><th></th></tr>${rows.map((r) => `<tr><td><img class="thumb" src="${esc(imgSrc(r))}" alt=""></td><td>${esc(r.name)}</td><td>${esc(r.cname || '-')}</td><td>${money(r.price)}</td><td>${r.stock}</td><td>${r.active ? 'ظاهر' : 'مخفي'}</td><td><a class="btn sm gray" href="/admin/products?edit=${r.id}">تعديل</a> <form method="post" style="display:inline" onsubmit="return confirm('حذف المنتج؟')">${csrf}<button class="sm red" name="del" value="${r.id}">حذف</button></form></td></tr>`).join('')}</table></div>`);
  }

  // ----- الطلبات -----
  if (path === '/admin/orders') {
    if (form) {
      const id = parseInt(form.get('id') || '0'); const st = String(form.get('status') || '');
      if (ORDER_LABELS[st]) await db.prepare('UPDATE orders SET status=? WHERE id=?').bind(st, id).run();
      const dt = str(form.get('delivery_time'), 20);
      if (dt === '' || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dt)) await db.prepare('UPDATE orders SET delivery_time=? WHERE id=?').bind(dt.replace('T', ' '), id).run();
      const did = parseInt(form.get('driver_id') || '0');
      if (did && (await cnt(db, 'SELECT COUNT(*) FROM drivers WHERE id=? AND active=1', did))) await db.batch([db.prepare('UPDATE orders SET driver_id=? WHERE id=?').bind(did, id), db.prepare("UPDATE orders SET status='confirmed' WHERE id=? AND status='new'").bind(id)]);
      else if (!did) await db.prepare('UPDATE orders SET driver_id=NULL WHERE id=?').bind(id).run();
      return back('/admin/orders', 'تم تحديث الطلب.');
    }
    const drivers = (await db.prepare('SELECT id,name FROM drivers WHERE active=1 ORDER BY name').all()).results;
    const orders = (await db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 200').all()).results;
    const items = orders.length ? (await db.prepare(`SELECT * FROM order_items WHERE order_id IN (${orders.map(() => '?').join(',')})`).bind(...orders.map((o) => o.id)).all()).results : [];
    return A('الطلبات', `<h2>الطلبات</h2>${orders.length ? '' : '<p class="muted">مفيش طلبات لسه.</p>'}${orders.map((o) => `<div class="box"><b>طلب #${o.id}</b> <span class="badge">${esc(ORDER_LABELS[o.status] || o.status)}</span> <span class="muted">${esc(o.created_at)}</span><p>${esc(o.customer_name)} - <a href="tel:${esc(o.phone)}" dir="ltr">${esc(o.phone)}</a>${o.phone2 ? ` - <span dir="ltr">${esc(o.phone2)}</span>` : ''}<br>${nl2br(o.address)}${o.location ? `<br>الموقع: ${esc(o.location)}` : ''}${o.notes ? `<br><span class="muted">ملاحظات: ${esc(o.notes)}</span>` : ''}${o.delivery_time ? `<br><span class="muted">موعد التوصيل: ${esc(o.delivery_time)}</span>` : ''}<br><span class="muted">الدفع: ${esc(o.payment_method)}</span>${o.driver_note ? `<br><span class="muted">ملاحظة المندوب: ${esc(o.driver_note)}</span>` : ''}</p><ul>${items.filter((i) => i.order_id === o.id).map((i) => `<li>${esc(i.name)} × ${i.qty} = ${money(i.price * i.qty)}</li>`).join('')}</ul><b>الإجمالي: ${money(o.total)}</b><form method="post" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">${csrf}<input type="hidden" name="id" value="${o.id}"><select name="status" style="width:auto">${Object.entries(ORDER_LABELS).map(([k, v]) => `<option value="${k}" ${k === o.status ? 'selected' : ''}>${v}</option>`).join('')}</select><select name="driver_id" style="width:auto"><option value="0">بدون مندوب</option>${drivers.map((d) => `<option value="${d.id}" ${o.driver_id === d.id ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select><label style="margin:0;font-weight:normal">موعد التوصيل:</label><input type="datetime-local" name="delivery_time" value="${esc((o.delivery_time || '').replace(' ', 'T'))}" style="width:auto"><button class="sm">تحديث</button></form></div>`).join('')}`);
  }

  // ----- المرتجعات -----
  if (path === '/admin/returns') {
    if (form) {
      const id = parseInt(form.get('id') || '0'); const amt0 = parseFloat(String(form.get('amount') || '').replace(',', '.'));
      if (form.get('create')) {
        const o = await db.prepare('SELECT * FROM orders WHERE id=?').bind(parseInt(form.get('order_id') || '0')).first();
        if (!o) return back('/admin/returns', 'رقم الطلب مش موجود.');
        const amt = Math.min(o.total, Math.max(0, Number.isFinite(amt0) ? amt0 : o.total));
        await db.prepare("INSERT INTO returns (order_id,reason,amount,status,created_at) VALUES (?,?,?,'approved',?)").bind(o.id, str(form.get('reason'), 1000), amt, cairoNow()).run();
        await db.prepare("UPDATE orders SET status='returned' WHERE id=?").bind(o.id).run();
        return back('/admin/returns', 'تم تسجيل المرتجع.');
      }
      if (form.get('approve')) {
        const r = await db.prepare('SELECT r.*, o.total FROM returns r JOIN orders o ON o.id=r.order_id WHERE r.id=?').bind(id).first();
        if (r) { const amt = Math.min(r.total, Math.max(0, Number.isFinite(amt0) ? amt0 : r.amount)); await db.batch([db.prepare("UPDATE returns SET status='approved', amount=? WHERE id=?").bind(amt, id), db.prepare("UPDATE orders SET status='returned' WHERE id=?").bind(r.order_id)]); }
        return back('/admin/returns', 'تم قبول المرتجع.');
      }
      if (form.get('reject')) { await db.prepare("UPDATE returns SET status='rejected' WHERE id=?").bind(id).run(); return back('/admin/returns', 'تم رفض المرتجع.'); }
      return redirect('/admin/returns');
    }
    const st = { requested: 'قيد المراجعة', approved: 'مقبول', rejected: 'مرفوض' };
    const rows = (await db.prepare('SELECT r.*, o.customer_name, o.phone, o.total FROM returns r JOIN orders o ON o.id=r.order_id ORDER BY r.id DESC LIMIT 200').all()).results;
    return A('المرتجعات', `<h2>المرتجعات</h2><div class="box"><h3>تسجيل مرتجع يدوي</h3><form method="post" style="display:flex;gap:8px;flex-wrap:wrap">${csrf}<input type="hidden" name="create" value="1"><input name="order_id" type="number" placeholder="رقم الطلب" required style="width:140px"><input name="amount" placeholder="المبلغ (فاضي = كل الطلب)" dir="ltr" style="width:200px"><input name="reason" placeholder="السبب" style="flex:1;min-width:160px"><button>تسجيل</button></form></div>${rows.length ? '' : '<p class="muted">مفيش مرتجعات.</p>'}${rows.map((r) => `<div class="box"><b>مرتجع #${r.id}</b> للطلب #${r.order_id} <span class="badge">${esc(st[r.status] || r.status)}</span> <span class="muted">${esc(r.created_at)}</span><p>${esc(r.customer_name)} - <span dir="ltr">${esc(r.phone)}</span><br>السبب: ${esc(r.reason)}<br>المبلغ: ${money(r.amount)} من ${money(r.total)}</p>${r.status === 'requested' ? `<form method="post" style="display:flex;gap:8px;flex-wrap:wrap">${csrf}<input type="hidden" name="id" value="${r.id}"><input name="amount" value="${esc(r.amount)}" dir="ltr" style="width:140px"><button class="sm" name="approve" value="1">قبول</button><button class="sm red" name="reject" value="1">رفض</button></form>` : ''}</div>`).join('')}`);
  }

  // ----- التقارير -----
  if (path === '/admin/reports') {
    const today = cairoNow().slice(0, 10); const days = {};
    for (let i = 0; i < 30; i++) days[dayAdd(today, -i)] = { v: 0, o: 0, s: 0, r: 0 };
    const from = dayAdd(today, -29);
    for (const r of (await db.prepare('SELECT day, COUNT(*) c FROM visits WHERE day>=? GROUP BY day').bind(from).all()).results) if (days[r.day]) days[r.day].v = r.c;
    for (const r of (await db.prepare("SELECT SUBSTR(created_at,1,10) d, COUNT(*) c, SUM(total) t FROM orders WHERE status<>'cancelled' AND created_at>=? GROUP BY SUBSTR(created_at,1,10)").bind(from).all()).results) if (days[r.d]) { days[r.d].o = r.c; days[r.d].s = r.t; }
    for (const r of (await db.prepare("SELECT SUBSTR(created_at,1,10) d, SUM(amount) t FROM returns WHERE status='approved' AND created_at>=? GROUP BY SUBSTR(created_at,1,10)").bind(from).all()).results) if (days[r.d]) days[r.d].r = r.t;
    const tot = (k) => Object.values(days).reduce((a, x) => a + x[k], 0);
    const sumAll = await cnt(db, "SELECT COALESCE(SUM(total),0) FROM orders WHERE status<>'cancelled'"), retAll = await cnt(db, "SELECT COALESCE(SUM(amount),0) FROM returns WHERE status='approved'"), visAll = await cnt(db, 'SELECT COUNT(*) FROM visits');
    const t = days[today];
    return A('التقارير', `<h2>التقارير</h2><div class="stats"><div class="stat"><b>${t.v}</b>زوار اليوم</div><div class="stat"><b>${tot('v')}</b>زوار آخر 30 يوم</div><div class="stat"><b>${money(t.s)}</b>مبيعات اليوم</div><div class="stat"><b>${money(tot('s'))}</b>مبيعات آخر 30 يوم</div><div class="stat"><b>${money(tot('r'))}</b>مرتجعات آخر 30 يوم</div><div class="stat"><b>${money(tot('s') - tot('r'))}</b>الصافي آخر 30 يوم</div></div><p class="muted">كل الفترة: زيارات ${visAll} (جهاز/يوم) - مبيعات ${money(sumAll)} - مرتجعات ${money(retAll)} - صافي ${money(sumAll - retAll)}</p><div class="tbl-wrap"><table><tr><th>اليوم</th><th>الزوار</th><th>الطلبات</th><th>المبيعات</th><th>المرتجعات</th><th>الصافي</th></tr>${Object.entries(days).map(([d, r]) => `<tr><td>${d}</td><td>${r.v}</td><td>${r.o}</td><td>${money(r.s)}</td><td>${money(r.r)}</td><td>${money(r.s - r.r)}</td></tr>`).join('')}</table></div><p class="muted">الزائر بيتحسب مرة واحدة في اليوم لكل جهاز/متصفح (بكوكي). لو العميل مسح الكوكيز أو استخدم متصفح تاني بيتحسب تاني. الزحف الآلي (زي بوتات جوجل) مش محسوب. المبيعات مش بتشمل الطلبات الملغية، والمرتجعات المحسوبة هي المقبولة بس.</p>`);
  }

  // ----- اللافتات -----
  if (path === '/admin/boxes') {
    const positions = { top: 'أعلى كل الصفحات (شريط إعلان)', home_top: 'الرئيسية - فوق المنتجات', home_bottom: 'الرئيسية - تحت المنتجات', product: 'صفحة المنتج', cart: 'صفحة السلة', checkout: 'صفحة إتمام الطلب', footer: 'أسفل كل الصفحات' };
    let err = '';
    if (form) {
      if (form.get('del')) { await db.prepare('DELETE FROM boxes WHERE id=?').bind(parseInt(form.get('del'))).run(); return back('/admin/boxes', 'تم الحذف.'); }
      if (form.get('toggle')) { await db.prepare('UPDATE boxes SET active=1-active WHERE id=?').bind(parseInt(form.get('toggle'))).run(); return redirect('/admin/boxes'); }
      const body = str(form.get('body'), 1000), bg = String(form.get('bg_color') || ''), tc = String(form.get('text_color') || ''), pos = String(form.get('position') || ''), link = str(form.get('link'), 500);
      if (!body) err = 'اكتبي النص.'; else if (!colorOk(bg) || !colorOk(tc)) err = 'لون غير صحيح.'; else if (!positions[pos]) err = 'اختاري مكان.';
      else if (link && !/^(https?:\/\/|\/|tel:|mailto:)/i.test(link)) err = 'اللينك لازم يبدأ بـ https أو / أو tel:';
      else {
        const id = parseInt(form.get('id') || '0');
        if (id) await db.prepare('UPDATE boxes SET body=?,bg_color=?,text_color=?,position=?,link=? WHERE id=?').bind(body, bg, tc, pos, link, id).run();
        else await db.prepare('INSERT INTO boxes (body,bg_color,text_color,position,link) VALUES (?,?,?,?,?)').bind(body, bg, tc, pos, link).run();
        return back('/admin/boxes', 'تم حفظ اللافتة.');
      }
    }
    const eid = parseInt(url.searchParams.get('edit') || '0'); const ed = eid ? await db.prepare('SELECT * FROM boxes WHERE id=?').bind(eid).first() : null;
    const rows = (await db.prepare('SELECT * FROM boxes ORDER BY id DESC').all()).results;
    return A('اللافتات', `<h2>اللافتات الملونة</h2><div class="box"><h3>${ed ? 'تعديل لافتة' : 'إضافة لافتة'}</h3>${err ? notice(err) : ''}<form method="post">${csrf}<input type="hidden" name="id" value="${ed?.id || 0}"><label>النص</label><textarea name="body" rows="2" required>${esc(ed?.body)}</textarea><div class="two"><div><label>لون الخلفية</label><input type="color" name="bg_color" value="${esc(ed?.bg_color || '#5b3df5')}"></div><div><label>لون النص</label><input type="color" name="text_color" value="${esc(ed?.text_color || '#ffffff')}"></div></div><label>المكان</label><select name="position">${Object.entries(positions).map(([k, l]) => `<option value="${k}" ${(ed?.position || 'home_top') === k ? 'selected' : ''}>${l}</option>`).join('')}</select><label>لينك عند الضغط (اختياري)</label><input name="link" dir="ltr" value="${esc(ed?.link)}" placeholder="https://..."><p><button>حفظ</button> ${ed ? '<a class="btn gray" href="/admin/boxes">إلغاء</a>' : ''}</p></form></div>${rows.map((b) => `<div class="box"><div class="banner" style="background:${esc(b.bg_color)};color:${esc(b.text_color)};margin:0 0 10px">${nl2br(b.body)}</div><span class="muted">${esc(positions[b.position] || b.position)} - ${b.active ? 'ظاهرة' : 'مخفية'}</span> <form method="post" style="display:inline">${csrf}<a class="btn sm gray" href="/admin/boxes?edit=${b.id}">تعديل</a> <button class="sm gray" name="toggle" value="${b.id}">إظهار/إخفاء</button> <button class="sm red" name="del" value="${b.id}" onclick="return confirm('حذف؟')">حذف</button></form></div>`).join('')}`);
  }

  // ----- الشكل والإعدادات -----
  if (path === '/admin/settings') {
    let err = '';
    if (form) {
      try {
        const name = str(form.get('store_name'), 80); if (!name) throw new Error('اكتبي اسم المتجر.');
        for (const k of ['c_primary', 'c_bg', 'c_head', 'c_text']) if (!colorOk(form.get(k))) throw new Error('لون غير صحيح.');
        let logo = null; const ld = String(form.get('logo_data') || ''), lu = str(form.get('logo_url'), 500);
        if (ld) { if (!dataImgOk(ld) || ld.length > 400000) throw new Error('الشعار كبير أو نوعه مش مدعوم.'); logo = ld; }
        else if (lu) { if (!urlOk(lu)) throw new Error('لينك الشعار لازم يبدأ بـ http أو https.'); logo = lu; }
        else if (form.get('remove_logo')) logo = '';
        const map = { store_name: name, tagline: str(form.get('tagline'), 120), seo_description: str(form.get('seo_description'), 300), seo_keywords: str(form.get('seo_keywords'), 300), c_primary: form.get('c_primary'), c_bg: form.get('c_bg'), c_head: form.get('c_head'), c_text: form.get('c_text'), radius: String(Math.max(0, Math.min(30, parseInt(form.get('radius') || '12') || 0))), hero_on: form.get('hero_on') ? '1' : '0', hero_title: str(form.get('hero_title'), 120), hero_text: str(form.get('hero_text'), 250), hero_btn_text: str(form.get('hero_btn_text'), 40), show_admin_link: form.get('show_admin_link') ? '1' : '0' };
        for (const [k, v] of Object.entries(map)) await setSetting(c, k, v);
        if (logo !== null) await setSetting(c, 'logo', logo);
        return back('/admin/settings', 'تم حفظ الإعدادات.');
      } catch (e) { err = e.message; }
    }
    const v = (k, d = '') => esc(setting(c, k, d)); const lg = setting(c, 'logo');
    return A('الشكل والإعدادات', `<h2>الشكل والإعدادات</h2>${err ? notice(err) : ''}<form method="post" id="sf">${csrf}<input type="hidden" name="logo_data" id="logodata"><div class="box"><h3>اسم المتجر والبحث في جوجل</h3><label>اسم المتجر</label><input name="store_name" required value="${v('store_name', sname(c))}"><label>جملة تعريفية قصيرة (تظهر في عنوان الصفحة)</label><input name="tagline" value="${v('tagline')}" placeholder="مثال: متجر Zoom للإلكترونيات"><label>وصف المتجر لمحركات البحث (حتى 300 حرف)</label><textarea name="seo_description" rows="2">${v('seo_description')}</textarea><label>كلمات مفتاحية (مفصولة بفاصلة)</label><input name="seo_keywords" value="${v('seo_keywords')}" placeholder="متجر Zoom, متجر إلكتروني"><p class="muted">ملحوظة: ده بيساعد جوجل يفهم الموقع، بس ما بيضمنش الظهور أو الترتيب.</p></div><div class="box"><h3>الألوان والشكل</h3><div class="two"><div><label>اللون الأساسي (الأزرار والروابط)</label><input type="color" name="c_primary" value="${v('c_primary', '#5b3df5')}"><label>لون الخلفية</label><input type="color" name="c_bg" value="${v('c_bg', '#f6f7fb')}"></div><div><label>لون الشريط العلوي</label><input type="color" name="c_head" value="${v('c_head', '#ffffff')}"><label>لون النص</label><input type="color" name="c_text" value="${v('c_text', '#1f2430')}"></div></div><label>استدارة الزوايا (0 إلى 30)</label><input type="number" name="radius" min="0" max="30" value="${v('radius', '12')}" style="width:100px"></div><div class="box"><h3>الصورة الرئيسية في أول الصفحة (Hero)</h3><label style="font-weight:normal"><input type="checkbox" name="hero_on" style="width:auto" ${setting(c, 'hero_on', '1') === '1' ? 'checked' : ''}> إظهار الصورة الرئيسية</label><label>العنوان</label><input name="hero_title" value="${v('hero_title')}" placeholder="أهلا بيك في ${esc(sname(c))}"><label>النص</label><input name="hero_text" value="${v('hero_text')}"><label>نص الزر</label><input name="hero_btn_text" value="${v('hero_btn_text')}" placeholder="تسوق الآن"></div><div class="box"><h3>زر دخول الإدارة</h3><label style="font-weight:normal"><input type="checkbox" name="show_admin_link" style="width:auto" ${setting(c, 'show_admin_link', '1') === '1' ? 'checked' : ''}> إظهار زر "دخول الإدارة" أسفل الصفحة الرئيسية</label><p class="muted">لو أخفيتيه، تقدري تدخلي من الرابط المباشر <span dir="ltr">${esc(url.origin)}/admin</span> (احفظيه). إخفاء الزر مش بيغني عن كلمة السر القوية.</p></div><div class="box"><h3>الشعار</h3>${lg ? `<p><img class="logo" style="height:60px" src="${esc(lg.startsWith('data:') ? '/logo?v=' + lg.length : lg)}" alt=""></p>` : ''}<label>رفع شعار من جهازك</label><input type="file" id="logofile" accept="image/*"><div class="muted" id="logost"></div><label>أو لينك شعار</label><input name="logo_url" dir="ltr" placeholder="https://..."><label style="font-weight:normal"><input type="checkbox" name="remove_logo" value="1" style="width:auto"> إزالة الشعار الحالي</label></div><p><button>حفظ</button></p></form>${IMG_JS('sf', 'logofile', 'logodata', 'logost', 300)}`);
  }

  // ----- الدفع والتواصل -----
  if (path === '/admin/payments') {
    let err = '';
    if (form) {
      if (form.get('save_addr')) { await setSetting(c, 'address', str(form.get('address'), 200)); return back('/admin/payments', 'تم حفظ العنوان.'); }
      if (form.get('save_contact')) {
        const id = parseInt(form.get('id') || '0'), kind = String(form.get('kind') || ''), val = str(form.get('value'), 300), lab = str(form.get('label'), 60);
        if (!CONTACT_KINDS[kind]) err = 'اختاري نوع وسيلة التواصل.';
        else if (!contactUrl(kind, val)) err = 'القيمة مش صحيحة: ' + CONTACT_KINDS[kind][2];
        else {
          if (id) await db.prepare('UPDATE contacts SET kind=?,value=?,label=? WHERE id=?').bind(kind, val, lab, id).run();
          else await db.prepare('INSERT INTO contacts (kind,value,label,sort_order) VALUES (?,?,?,(SELECT COALESCE(MAX(sort_order),0)+1 FROM contacts))').bind(kind, val, lab).run();
          return back('/admin/payments', 'تم حفظ وسيلة التواصل.');
        }
      } else if (form.get('del_c')) { await db.prepare('DELETE FROM contacts WHERE id=?').bind(parseInt(form.get('del_c'))).run(); return back('/admin/payments', 'تم الحذف.'); }
      else if (form.get('toggle_c')) { await db.prepare('UPDATE contacts SET active=1-active WHERE id=?').bind(parseInt(form.get('toggle_c'))).run(); return redirect('/admin/payments'); }
      else if (form.get('add_pm')) {
        const l = str(form.get('label'), 100), n = str(form.get('number'), 100);
        if (!l || !n) return back('/admin/payments', 'اكتبي اسم الوسيلة والرقم.');
        await db.prepare('INSERT INTO payment_methods (label,number) VALUES (?,?)').bind(l, n).run(); return back('/admin/payments', 'تمت الإضافة.');
      } else if (form.get('del_pm')) { await db.prepare('DELETE FROM payment_methods WHERE id=?').bind(parseInt(form.get('del_pm'))).run(); return back('/admin/payments', 'تم الحذف.'); }
      else if (form.get('toggle_pm')) { await db.prepare('UPDATE payment_methods SET active=1-active WHERE id=?').bind(parseInt(form.get('toggle_pm'))).run(); return redirect('/admin/payments'); }
    }
    const pms = (await db.prepare('SELECT * FROM payment_methods ORDER BY id').all()).results;
    const cs = (await db.prepare('SELECT * FROM contacts ORDER BY sort_order, id').all()).results;
    const eid = parseInt(url.searchParams.get('edit') || '0'); const ed = eid ? await db.prepare('SELECT * FROM contacts WHERE id=?').bind(eid).first() : null;
    const selKind = ed?.kind || (form ? form.get('kind') : '') || '';
    return A('الدفع والتواصل', `<h2>الدفع والتواصل</h2><div class="box"><h3>${ed ? 'تعديل وسيلة تواصل' : 'إضافة وسيلة تواصل'}</h3>${err ? notice(err) : ''}<form method="post">${csrf}<input type="hidden" name="save_contact" value="1"><input type="hidden" name="id" value="${ed?.id || 0}"><div class="two"><div><label>النوع</label><select name="kind">${Object.entries(CONTACT_KINDS).map(([k, kv]) => `<option value="${k}" ${selKind === k ? 'selected' : ''}>${kv[0]}</option>`).join('')}</select></div><div><label>الاسم اللي يظهر (اختياري)</label><input name="label" value="${esc(ed?.label)}" placeholder="مثال: كلمينا على واتساب"></div></div><label>الرقم أو الرابط</label><input name="value" dir="ltr" required value="${esc(ed?.value || (form ? form.get('value') : ''))}"><p class="muted">واتساب: رقم بالكود الدولي (201012345678). تيليجرام: اسم المستخدم. فيسبوك: لينك الصفحة. إيميل: العنوان. اتصال: رقم التليفون.</p><p><button>${icon('check', 18)} حفظ</button> ${ed ? '<a class="btn gray" href="/admin/payments">إلغاء</a>' : ''}</p></form>${cs.length ? `<div class="cbtns" style="margin:14px 0">${cs.filter((r) => CONTACT_KINDS[r.kind]).map((r) => `<div class="box" style="margin:0;padding:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap${r.active ? '' : ';opacity:.55'}"><span class="cbtn static" style="--bc:${CONTACT_KINDS[r.kind][1]}">${icon(r.kind, 20)}<span>${esc(r.label || CONTACT_KINDS[r.kind][0])}</span></span><span dir="ltr" class="muted">${esc(r.value)}</span><form method="post" style="display:flex;gap:6px">${csrf}<a class="btn sm gray" href="/admin/payments?edit=${r.id}">تعديل</a><button class="sm gray" name="toggle_c" value="${r.id}">${r.active ? 'إخفاء' : 'إظهار'}</button><button class="sm red" name="del_c" value="${r.id}" onclick="return confirm('حذف؟')">حذف</button></form></div>`).join('')}</div>` : ''}</div><div class="box"><h3>العنوان</h3><form method="post" style="display:flex;gap:8px">${csrf}<input type="hidden" name="save_addr" value="1"><input name="address" value="${esc(setting(c, 'address'))}" placeholder="عنوان المتجر (اختياري)"><button>حفظ</button></form></div><div class="box"><h3>أرقام الدفع (فودافون كاش، إنستاباي...)</h3><form method="post" style="display:flex;gap:8px;flex-wrap:wrap">${csrf}<input type="hidden" name="add_pm" value="1"><input name="label" placeholder="الاسم، مثال: فودافون كاش" style="flex:1;min-width:160px" required><input name="number" placeholder="الرقم" dir="ltr" style="flex:1;min-width:160px" required><button>إضافة</button></form><div class="tbl-wrap" style="margin-top:12px"><table>${pms.map((r) => `<tr><td>${esc(r.label)}</td><td dir="ltr">${esc(r.number)}</td><td>${r.active ? 'ظاهر' : 'مخفي'}</td><td><form method="post" style="display:inline">${csrf}<button class="sm gray" name="toggle_pm" value="${r.id}">إظهار/إخفاء</button> <button class="sm red" name="del_pm" value="${r.id}" onclick="return confirm('حذف؟')">حذف</button></form></td></tr>`).join('')}</table></div><p class="muted">بتظهر للعميل في صفحة إتمام الطلب وأسفل الموقع. الدفع الأونلاين التلقائي مش مفعّل: العميل بيحوّل ويبعتلك الإيصال.</p></div>`);
  }

  // ----- الموظفين -----
  if (path === '/admin/customers') {
    if (form) {
      const id = parseInt(form.get('id') || '0');
      if (form.get('setpass')) {
        const p = String(form.get('pw') || '');
        if (!passOkStaff(p)) return back('/admin/customers', 'كلمة السر 8 حروف على الأقل وفيها حروف وأرقام.');
        await db.batch([db.prepare('UPDATE customers SET pass_hash=? WHERE id=?').bind(await hashPass(c, p), id), db.prepare("DELETE FROM sessions WHERE kind='cust' AND uid=?").bind(id)]);
        return back('/admin/customers', 'تم تغيير كلمة سر العميل.');
      }
      if (form.get('toggle')) await db.batch([db.prepare('UPDATE customers SET active=1-active WHERE id=?').bind(id), db.prepare("DELETE FROM sessions WHERE kind='cust' AND uid=?").bind(id)]);
      return redirect('/admin/customers');
    }
    const rows = (await db.prepare('SELECT u.*, (SELECT COUNT(*) FROM orders o WHERE o.customer_id=u.id) AS n FROM customers u ORDER BY u.id DESC LIMIT 300').all()).results;
    return A('العملاء', `<h2>العملاء (${rows.length})</h2><div class="box"><div class="tbl-wrap"><table><tr><th>الاسم</th><th>التليفون</th><th>الطلبات</th><th>التسجيل</th><th>الحالة</th><th></th></tr>${rows.map((r) => `<tr><td>${esc(r.name)}</td><td dir="ltr">${String(r.phone).startsWith('g:') ? 'Google ' + esc(r.email || '') : esc(r.phone)}</td><td>${r.n}</td><td>${esc(r.created_at)}</td><td>${r.active ? 'شغال' : 'موقوف'}</td><td><form method="post">${csrf}<input type="hidden" name="id" value="${r.id}"><button class="sm gray" name="toggle" value="1">${r.active ? 'إيقاف' : 'تفعيل'}</button></form><form method="post" style="display:flex;gap:4px;margin-top:6px">${csrf}<input type="hidden" name="id" value="${r.id}"><input type="password" name="pw" dir="ltr" placeholder="كلمة سر جديدة" style="width:130px"><button class="sm" name="setpass" value="1">تغيير</button></form></td></tr>`).join('') || '<tr><td colspan="6" class="muted">لسه مفيش عملاء.</td></tr>'}</table></div><p class="muted">كلمات سر العملاء متشفرة ومحدش يقدر يشوفها. لو عميل نسي كلمة السر، اكتبي له كلمة سر جديدة من هنا وابعتيهاله، وهو يغيرها من حسابه.</p></div>`);
  }
  if (path === '/admin/drivers') {
    let err = '';
    if (form) {
      const id = parseInt(form.get('id') || '0');
      if (form.get('add')) {
        const n = str(form.get('name'), 100), u = str(form.get('username'), 40), p = String(form.get('password') || ''), ph = String(form.get('phone') || '').replace(/[^0-9+]/g, '');
        if (!n) err = 'اكتبي اسم الموظف.';
        else if (!userOk(u)) err = 'اسم المستخدم 4 إلى 30 حرف إنجليزي أو أرقام.';
        else if (!passOkStaff(p)) err = 'كلمة السر 8 حروف على الأقل وفيها حروف وأرقام.';
        else if (await cnt(db, 'SELECT COUNT(*) FROM drivers WHERE username=?', u)) err = 'اسم المستخدم ده متسجل قبل كده.';
        else { await db.prepare('INSERT INTO drivers (name,username,phone,pass_hash) VALUES (?,?,?,?)').bind(n, u, ph, await hashPass(c, p)).run(); return back('/admin/drivers', 'تمت إضافة الموظف. رابط دخوله: ' + url.origin + '/driver/login'); }
      } else if (form.get('setpass')) {
        const p = String(form.get('password') || '');
        if (!passOkStaff(p)) return back('/admin/drivers', 'كلمة السر 8 حروف على الأقل وفيها حروف وأرقام.');
        await db.batch([db.prepare('UPDATE drivers SET pass_hash=? WHERE id=?').bind(await hashPass(c, p), id), db.prepare("DELETE FROM sessions WHERE kind='driver' AND uid=?").bind(id)]);
        return back('/admin/drivers', 'تم تغيير كلمة السر.');
      } else if (form.get('toggle')) { await db.batch([db.prepare('UPDATE drivers SET active=1-active WHERE id=?').bind(id), db.prepare("DELETE FROM sessions WHERE kind='driver' AND uid=?").bind(id)]); return redirect('/admin/drivers'); }
      else if (form.get('del')) { await db.batch([db.prepare('UPDATE orders SET driver_id=NULL WHERE driver_id=?').bind(id), db.prepare('DELETE FROM drivers WHERE id=?').bind(id), db.prepare("DELETE FROM sessions WHERE kind='driver' AND uid=?").bind(id)]); return back('/admin/drivers', 'تم حذف الموظف.'); }
    }
    const rows = (await db.prepare("SELECT d.*, (SELECT COUNT(*) FROM orders o WHERE o.driver_id=d.id AND o.status IN ('confirmed','shipped','failed')) AS open_orders, (SELECT COUNT(*) FROM orders o WHERE o.driver_id=d.id AND o.status='delivered') AS done FROM drivers d ORDER BY d.id DESC").all()).results;
    const fv = (k) => esc(form ? form.get(k) : '');
    return A('الموظفين', `<h2>الموظفين (المندوبين والسواقين)</h2><div class="box"><h3>إضافة موظف</h3>${err ? notice(err) : ''}<form method="post">${csrf}<input type="hidden" name="add" value="1"><div class="two"><div><label>الاسم</label><input name="name" required value="${fv('name')}"><label>رقم التليفون (اختياري)</label><input name="phone" dir="ltr" value="${fv('phone')}"></div><div><label>اسم المستخدم (إنجليزي)</label><input name="username" dir="ltr" required value="${fv('username')}"><label>كلمة السر (8 حروف على الأقل، حروف وأرقام)</label><input type="password" name="password" dir="ltr" required></div></div><p><button>إضافة</button></p><p class="muted">الموظف بيدخل من زر "الموظفين" في الصفحة الرئيسية أو من <span dir="ltr">${esc(url.origin)}/driver/login</span>. كلمات السر بتتخزن مشفّرة ومش بتظهر لحد.</p></form></div><div class="tbl-wrap"><table><tr><th>الاسم</th><th>اسم المستخدم</th><th>التليفون</th><th>جارية</th><th>تم تسليمها</th><th>الحالة</th><th></th></tr>${rows.map((r) => `<tr><td>${esc(r.name)}</td><td dir="ltr">${esc(r.username)}</td><td dir="ltr">${esc(r.phone)}</td><td>${r.open_orders}</td><td>${r.done}</td><td>${r.active ? 'شغال' : 'موقوف'}</td><td><form method="post" style="display:flex;gap:6px;flex-wrap:wrap">${csrf}<input type="hidden" name="id" value="${r.id}"><input type="password" name="password" placeholder="كلمة سر جديدة" dir="ltr" style="width:140px"><button class="sm" name="setpass" value="1">تغيير</button><button class="sm gray" name="toggle" value="1">إيقاف/تشغيل</button><button class="sm red" name="del" value="1" onclick="return confirm('حذف الموظف؟')">حذف</button></form></td></tr>`).join('')}</table></div>`);
  }
  return redirect('/admin');
}

// ---------- نقطة الدخول ----------
const NOIMG = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#eceef6"/><text x="200" y="210" font-size="22" text-anchor="middle" fill="#9aa0b5" font-family="Arial">no image</text></svg>';
export default {
  async fetch(req, env) {
    const url = new URL(req.url); const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === '/style.css') return new Response(CSS, { headers: { 'content-type': 'text/css;charset=utf-8', 'cache-control': 'public, max-age=300' } });
    if (path === '/noimg.svg') return new Response(NOIMG, { headers: { 'content-type': 'image/svg+xml', 'cache-control': 'public, max-age=86400' } });
    if (!env.DB) return html('<p dir="rtl" style="font-family:Tahoma;padding:20px">قاعدة البيانات D1 مش مربوطة. اربطيها باسم DB من إعدادات الـ Worker (Bindings) زي ما في الدليل.</p>', 500);
    const c = { req, env, db: env.DB, url, path, cookies: [], form: null, S: {}, ct: '' };
    try {
      await ensureSchema(c.db);
      for (const r of (await c.db.prepare('SELECT k,v FROM settings').all()).results) c.S[r.k] = r.v;
      if (!path.startsWith('/admin')) c.cust = await getCustomer(c);
      if (req.method === 'POST') c.form = await req.formData();
      const res = path.startsWith('/admin') ? await admin(c) : path.startsWith('/driver') ? await driverArea(c) : await shop(c);
      for (const ck of c.cookies) res.headers.append('set-cookie', ck);
      return res;
    } catch (e) {
      return html(`<p dir="rtl" style="font-family:Tahoma;padding:20px">حصل خطأ: ${esc(e.message)}</p>`, 500);
    }
  },
};

