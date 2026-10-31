const fs = require('fs');
const path = require('path');

const BACK_PILL_CSS = `
/* Nút quay về trang chính & chân trang tác giả */
.back-pill{background:var(--accent-soft);color:var(--accent);font-weight:600;border:1px solid var(--accent);text-decoration:none;margin-right:6px;display:inline-flex;align-items:center}
.back-pill:hover{background:var(--accent);color:var(--accent-ink)}
.author-footer{margin-top:48px;padding:24px 16px;text-align:center;border-top:1px solid var(--line);background:var(--paper);border-radius:14px;color:var(--muted);font-size:.88rem;line-height:1.7}
.author-footer .badge{display:inline-block;padding:3px 12px;background:var(--accent-soft);color:var(--accent);border-radius:999px;font-size:.78rem;font-weight:700;margin-bottom:8px}
.author-footer a{color:var(--accent);text-decoration:none}
.author-footer a:hover{text-decoration:underline}
`;

function getAuthorFooter(gradeNum, totalLessons) {
  return `
<footer class="author-footer wrap">
  <div class="badge">Toán Song Ngữ THCS · Lớp ${gradeNum} Chuẩn SGK (${totalLessons} bài)</div>
  <div><b>© Bản quyền nội dung &amp; Phần mềm: Thầy Lê Tâm</b></div>
  <div>Giáo viên trường THCS Quang Trung, Phường Xuân Hương, TP. Đà Lạt, Tỉnh Lâm Đồng</div>
  <div class="author-contact" style="margin-top:6px;">📞 Liên hệ / Zalo: <a href="tel:0913443127"><b>0913.443.127</b></a></div>
</footer>
`;
}

const NEW_RANK_VOICE = `function rankVoice(v){
  const n=v.name.toLowerCase(), l=(v.lang||"").replace("_","-").toLowerCase();
  if(!l.startsWith("en"))return -1;
  const isGB = l === "en-gb";
  const isUS = l === "en-us";
  const wantGB = TTS.accent === "gb";
  
  // Điểm nền: 1000 cho đúng giọng đã chọn (ưu tiên tuyệt đối Anh-Anh khi chọn gb)
  let sc = (wantGB ? isGB : isUS) ? 1000 : (wantGB ? isUS : isGB) ? 100 : (l.startsWith("en-") ? 50 : 10);
  if(/natural|neural|online/.test(n)) sc += 200;
  if(wantGB){
    if(/google uk english/.test(n)) sc += 150;
    if(/sonia|ryan|libby|maisie|george|hazel|susan|daniel|oliver|serena|kate|arthur|martha|stephanie/.test(n)) sc += 100;
  } else {
    if(/google us english/.test(n)) sc += 150;
    if(/aria|jenny|guy|samantha|ava|allison|evan|nicky|zira/.test(n)) sc += 100;
  }
  if(/compact|novelty|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|albert|junior|ralph|kathy/.test(n)) sc -= 500;
  return sc;
}`;

const NEW_LOAD_VOICES = `function loadVoices(){
  const all=speechSynthesis.getVoices().map(v=>({v,s:rankVoice(v)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
  TTS.voices=all.map(x=>x.v);
  const sel=$("#voice"); const saved=store.get("voice",null);
  sel.innerHTML=TTS.voices.length?TTS.voices.map(v=>\`<option value="\${esc(v.voiceURI)}">\${esc(v.name)} (\${esc(v.lang)})</option>\`).join(""):'<option value="">Mặc định của trình duyệt</option>';
  const wantLang = TTS.accent==="gb" ? "en-gb" : "en-us";
  TTS.voice=TTS.voices.find(v=>v.voiceURI===saved&&(v.lang||"").replace("_","-").toLowerCase()===wantLang)
    || TTS.voices.find(v=>(v.lang||"").replace("_","-").toLowerCase()===wantLang)
    || TTS.voices[0] || null;
  if(TTS.voice)sel.value=TTS.voice.voiceURI;
  $("#vnote").textContent=TTS.voices.length?(TTS.voice&&(TTS.voice.lang||"").replace("_","-").toLowerCase()===wantLang?"Đã chọn giọng "+(TTS.accent==="gb"?"Anh–Anh (chuẩn phiên âm tài liệu)":"Anh–Mỹ")+" tốt nhất trên thiết bị. Có thể đổi ở đây.":"Thiết bị chưa có giọng "+(TTS.accent==="gb"?"Anh–Anh (en-GB)":"Anh–Mỹ")+", đang dùng giọng tiếng Anh gần nhất. Hãy cài thêm giọng English (UK) trong cài đặt hệ thống để đọc chuẩn nhất."):"Thiết bị chưa có giọng tiếng Anh; hãy cài giọng English (UK) trong cài đặt hệ thống của thiết bị.";
}`;

function processHtmlFile(filePath, gradeNum) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Ensure CSS has back-pill and author-footer
  if (!content.includes('.back-pill{')) {
    content = content.replace('</style>', `${BACK_PILL_CSS}\n</style>`);
  }

  // 2. Ensure back-pill button in .brand
  if (!content.includes('class="btn back-pill"')) {
    content = content.replace(
      /<div class="brand">(\s*)<b id="brand"/,
      '<div class="brand">$1<a href="/" class="btn back-pill" title="Quay lại ứng dụng chính (Lớp 6–9)">← Về trang chính</a><b id="brand"'
    );
  }

  // 3. Extract DATA and GROUPS to get count
  const dMatch = content.match(/const DATA\s*=\s*(\[[\s\S]*?\]);\s*const PAGES/);
  const gMatch = content.match(/const GROUPS\s*=\s*(\[[\s\S]*?\]);/);
  if (!dMatch) {
    throw new Error(`Could not find const DATA in ${filePath}`);
  }
  const data = JSON.parse(dMatch[1]);
  const groups = gMatch ? JSON.parse(gMatch[1]) : [];

  // 4. Ensure author-footer in HTML right after </main>
  // Remove any existing author footer first to avoid duplicate
  content = content.replace(/<footer class="author-footer[\s\S]*?<\/footer>\s*/g, '');
  const footerHtml = getAuthorFooter(gradeNum, data.length);
  content = content.replace('</main>', `</main>\n${footerHtml}`);

  // 5. Replace rankVoice
  content = content.replace(
    /function rankVoice\(v\)\s*\{[\s\S]*?return sc;\s*\}/,
    NEW_RANK_VOICE
  );

  // 6. Replace loadVoices
  content = content.replace(
    /function loadVoices\(\)\s*\{[\s\S]*?loadVoices\)\}/,
    `${NEW_LOAD_VOICES}\nif(TTS.ok){loadVoices();speechSynthesis.addEventListener&&speechSynthesis.addEventListener("voiceschanged",loadVoices)}`
  );

  // 7. Ensure accent buttons in settings
  if (!content.includes('data-acc="gb"')) {
    const rateGroup = `<div><span class="lab">Tốc độ đọc</span>
        <div class="seg" role="group" aria-label="Tốc độ đọc">
          <button class="btn" data-rate="0.75">Chậm</button>
          <button class="btn" data-rate="0.95">Vừa</button>
        </div></div>`;
    const accGroup = `
      <div><span class="lab" id="lacc">Giọng (phiên âm trong tài liệu là Anh–Anh)</span>
        <div class="seg" role="group" aria-labelledby="lacc"><button class="btn" data-acc="gb">Anh–Anh</button><button class="btn" data-acc="us">Anh–Mỹ</button></div></div>`;
    content = content.replace(rateGroup, `${rateGroup}${accGroup}`);
  }

  // 8. Ensure accent click handler in document.addEventListener("click"
  if (!content.includes('const ac=t.closest("[data-acc]")')) {
    content = content.replace(
      'const cl=t.closest("[data-rate]");',
      'const ac=t.closest("[data-acc]"); if(ac){TTS.accent=ac.dataset.acc;store.set("accent",TTS.accent);store.set("voice",null);loadVoices();syncAcc();say("Mathematics is fun!");return}\n  const cl=t.closest("[data-rate]");'
    );
  }

  // 9. Ensure syncAcc function and call
  if (!content.includes('function syncAcc()')) {
    content = content.replace(
      'function syncRate()',
      'function syncAcc(){$$("[data-acc]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.acc===TTS.accent)))}\nfunction syncRate()'
    );
  }
  if (!content.includes('syncAcc();')) {
    content = content.replace('syncRate();', 'syncRate(); syncAcc();');
  }

  // 10. Ensure TTS.accent in TTS object
  if (!content.includes('accent:store.get("accent","gb")')) {
    content = content.replace(
      /rate:store\.get\("rate",[\d.]+\)/,
      'rate:store.get("rate",0.95),accent:store.get("accent","gb")'
    );
  }

  // 11. Ensure speakTTS uses TTS.accent
  content = content.replace(
    /u\.lang=TTS\.voice\?TTS\.voice\.lang:"en-US";/,
    'u.lang=TTS.voice?TTS.voice.lang:(TTS.accent==="gb"?"en-GB":"en-US");'
  );

  return { content, data, groups };
}

console.log('Processing all 4 grades...');

// 1. Grade 6
console.log('--> Processing Grade 6...');
const g6Result = processHtmlFile('public/toan6.html', 6);
fs.writeFileSync('public/toan6.html', g6Result.content, 'utf8');

// For toan6-tu-vung.html (backup), strip out large base64 PAGES if present or sync
let g6Clean = g6Result.content;
if (g6Clean.includes('const PAGES = {')) {
  // in toan6-tu-vung.html keep PAGES = null for light size
  g6Clean = g6Clean.replace(/const PAGES\s*=\s*\{[\s\S]*?\};\s*const GROUPS/, 'const PAGES = null;\nconst GROUPS');
}
fs.writeFileSync('toan6-tu-vung.html', g6Clean, 'utf8');

// Data for Grade 6
fs.writeFileSync('data/toan6.json', JSON.stringify({ groups: g6Result.groups, lessons: g6Result.data }, null, 2), 'utf8');
fs.writeFileSync('public/toan6-data.js', `window.TOAN6_DATA = ${JSON.stringify(g6Result.data)};\nwindow.TOAN6_GROUPS = ${JSON.stringify(g6Result.groups)};\n`, 'utf8');

// 2. Grade 7
console.log('--> Processing Grade 7...');
const g7Result = processHtmlFile('public/toan7.html', 7);
fs.writeFileSync('public/toan7.html', g7Result.content, 'utf8');
fs.writeFileSync('toan7-tu-vung.html', g7Result.content, 'utf8');

// Data for Grade 7
fs.writeFileSync('data/toan7.json', JSON.stringify({ groups: g7Result.groups, lessons: g7Result.data }, null, 2), 'utf8');
fs.writeFileSync('public/toan7-data.js', `window.TOAN7_DATA = ${JSON.stringify(g7Result.data)};\nwindow.TOAN7_GROUPS = ${JSON.stringify(g7Result.groups)};\n`, 'utf8');

// 3. Grade 8
console.log('--> Processing Grade 8...');
const g8Result = processHtmlFile('toan8-tu-vung.html', 8);
fs.writeFileSync('public/toan8.html', g8Result.content, 'utf8');
fs.writeFileSync('toan8-tu-vung.html', g8Result.content, 'utf8');

// Data for Grade 8
fs.writeFileSync('data/toan8.json', JSON.stringify({ groups: g8Result.groups, lessons: g8Result.data }, null, 2), 'utf8');
fs.writeFileSync('public/toan8-data.js', `window.TOAN8_DATA = ${JSON.stringify(g8Result.data)};\nwindow.TOAN8_GROUPS = ${JSON.stringify(g8Result.groups)};\n`, 'utf8');

// 4. Grade 9
console.log('--> Processing Grade 9...');
const g9Result = processHtmlFile('toan9-tu-vung.html', 9);
fs.writeFileSync('public/toan9.html', g9Result.content, 'utf8');
fs.writeFileSync('toan9-tu-vung.html', g9Result.content, 'utf8');

// Data for Grade 9
fs.writeFileSync('data/toan9.json', JSON.stringify({ groups: g9Result.groups, lessons: g9Result.data }, null, 2), 'utf8');
fs.writeFileSync('public/toan9-data.js', `window.TOAN9_DATA = ${JSON.stringify(g9Result.data)};\nwindow.TOAN9_GROUPS = ${JSON.stringify(g9Result.groups)};\n`, 'utf8');

// Clean up duplicate stray files in root if any
['toan6-tu-vung (1).html', 'toan7-tu-vung (2).html'].forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log('Removed stray file:', f);
  }
});

console.log('Done processing all 4 grades successfully!');
console.log(`Summary:
- Grade 6: ${g6Result.data.length} lessons, ${g6Result.groups.length} groups
- Grade 7: ${g7Result.data.length} lessons, ${g7Result.groups.length} groups
- Grade 8: ${g8Result.data.length} lessons, ${g8Result.groups.length} groups
- Grade 9: ${g9Result.data.length} lessons, ${g9Result.groups.length} groups
`);
