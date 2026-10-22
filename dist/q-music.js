/* =========================================================
   音樂模組（國小 3–5 年級）— 自動生成 3200+ 題
   ========================================================= */
(function (g) {
  "use strict";
  var seed = 333001;
  function R() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function ri(a, b) { return a + Math.floor(R() * (b - a + 1)); }
  function pick(arr) { return arr[Math.floor(R() * arr.length)]; }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var seen = {}, out = [];
  function add(scene, q, opts, correct, explain) {
    var key = q + "|" + opts.join(",");
    if (seen[key]) return; seen[key] = 1;
    out.push({ scene: scene, q: q, opts: opts, correct: correct, explain: explain });
  }
  function four(ans, distractors, explain, q, scene) {
    var opts = shuffle([ans].concat(distractors.slice(0, 3)));
    add(scene, q, opts, opts.indexOf(ans), explain);
  }

  /* 1. 唱名與音名 */
  var NOTES = [["Do", "C"], ["Re", "D"], ["Mi", "E"], ["Fa", "F"], ["Sol", "G"], ["La", "A"], ["Si", "B"]];
  for (var i = 0; i < NOTES.length; i++) {
    var n = NOTES[i];
    var dN = NOTES.map(function (x) { return x[1]; }).filter(function (x) { return x !== n[1]; });
    four(n[1], shuffle(dN).slice(0, 3), "唱名「" + n[0] + "」的音名是 <b>" + n[1] + "</b>。",
      "唱名「" + n[0] + "」的音名是什麼？", "音樂案件·唱名音名");
    var dS = NOTES.map(function (x) { return x[0]; }).filter(function (x) { return x !== n[0]; });
    four(n[0], shuffle(dS).slice(0, 3), "音名「" + n[1] + "」唱作 <b>" + n[0] + "</b>。",
      "音名「" + n[1] + "」的唱名是什麼？", "音樂案件·唱名音名");
    /* 上行/下行下一個音 */
    var nxt = NOTES[(i + 1) % 7][0];
    four(nxt, shuffle(dS.filter(function (x) { return x !== nxt; })).slice(0, 3),
      n[0] + " 往上一個音是 <b>" + nxt + "</b>。",
      "「" + n[0] + "」往上一個音（音階上行）是什麼？", "音樂案件·音階順序");
  }

  /* 2. 音符時值 */
  var VALS = [["全音符", 4], ["二分音符", 2], ["四分音符", 1], ["八分音符", 0.5], ["十六分音符", 0.25]];
  var fmt = function (x) { return x === 0.5 ? "半拍（1/2 拍）" : x === 0.25 ? "1/4 拍" : x + " 拍"; };
  for (var i = 0; i < VALS.length; i++) {
    var v = VALS[i];
    var dV = VALS.map(function (x) { return x[0]; }).filter(function (x) { return x !== v[0]; });
    for (var j = 0; j < 6; j++) {
      four(fmt(v[1]), shuffle(VALS.map(function (x) { return fmt(x[1]); }).filter(function (x) { return x !== fmt(v[1]); })).slice(0, 3),
        "在 4/4 拍中，" + v[0] + "是 <b>" + fmt(v[1]) + "</b>。",
        "在 4/4 拍中，一個「" + v[0] + "」是幾拍？", "音樂案件·音符時值");
    }
  }
  /* 音符加總 */
  for (var i = 0; i < 700; i++) {
    var a = pick(VALS), b = pick(VALS);
    var total = a[1] + b[1];
    var allT = [];
    for (var k = 0; k < VALS.length; k++) for (var m = 0; m < VALS.length; m++) {
      var t = VALS[k][1] + VALS[m][1];
      if (allT.indexOf(t) < 0) allT.push(t);
    }
    var dT = allT.filter(function (x) { return x !== total; }).map(fmt);
    four(fmt(total), shuffle(dT).slice(0, 3),
      a[0] + "（" + fmt(a[1]) + "）＋ " + b[0] + "（" + fmt(b[1]) + "）＝ <b>" + fmt(total) + "</b>。",
      "一個「" + a[0] + "」加一個「" + b[0] + "」一共是幾拍？", "音樂案件·拍子加法");
  }
  /* 幾個音符等於幾拍 */
  for (var i = 0; i < 500; i++) {
    var v2 = pick(VALS), cnt = ri(2, 8);
    var tot = v2[1] * cnt;
    var dN2 = [tot * 2, tot / 2, tot + 1, tot - 1, tot + 0.5]
      .filter(function (x) { return x > 0 && x !== tot; })
      .map(fmt);
    var uniq = [];
    for (var u = 0; u < dN2.length; u++) if (uniq.indexOf(dN2[u]) < 0) uniq.push(dN2[u]);
    if (uniq.length < 3) continue;
    four(fmt(tot), uniq.slice(0, 3),
      cnt + " 個" + v2[0] + " = " + cnt + " × " + fmt(v2[1]) + " = <b>" + fmt(tot) + "</b>。",
      cnt + " 個「" + v2[0] + "」連在一起，一共是幾拍？", "音樂案件·拍子計算");
  }

  /* 3. 拍號 */
  var METER = [["2/4", 2], ["3/4", 3], ["4/4", 4], ["6/8", 6]];
  for (var i = 0; i < METER.length; i++) {
    var mt = METER[i];
    var dM = METER.map(function (x) { return x[0]; }).filter(function (x) { return x !== mt[0]; });
    four(String(mt[1]), ["2", "3", "4", "6"].filter(function (x) { return x !== String(mt[1]); }),
      mt[0] + " 拍表示「每小節有 <b>" + mt[1] + "</b> 拍」。",
      "「" + mt[0] + " 拍」表示每小節有幾拍？", "音樂案件·拍號");
  }

  /* 4. 力度記號 */
  var DYN = [
    ["p", "弱"], ["f", "強"], ["mp", "中弱"], ["mf", "中強"],
    ["pp", "很弱"], ["ff", "很強"], ["crescendo（漸強記號）", "漸強"], ["diminuendo（漸弱記號）", "漸弱"]
  ];
  var DYN_ALL = DYN.map(function (x) { return x[1]; });
  for (var i = 0; i < DYN.length; i++) {
    var dy = DYN[i];
    var dD = DYN_ALL.filter(function (x) { return x !== dy[1]; });
    four(dy[1], shuffle(dD).slice(0, 3), "力度記號「" + dy[0] + "」表示「<b>" + dy[1] + "</b>」。",
      "音樂記號「" + dy[0] + "」是什麼意思？", "音樂案件·力度記號");
    four(dy[0], shuffle(DYN.map(function (x) { return x[0]; }).filter(function (x) { return x !== dy[0]; })).slice(0, 3),
      "「" + dy[1] + "」的力度記號是 <b>" + dy[0] + "</b>。",
      "「" + dy[1] + "」要用哪個力度記號表示？", "音樂案件·力度記號");
  }

  /* 5. 速度術語 */
  var TEMPO = [
    ["Largo", "非常慢"], ["Adagio", "慢板"], ["Andante", "行板（走路的速度）"],
    ["Moderato", "中板"], ["Allegro", "快板"], ["Presto", "急板（非常快）"],
    ["ritardando", "漸慢"], ["accelerando", "漸快"]
  ];
  var TEMPO_ALL = TEMPO.map(function (x) { return x[1]; });
  for (var i = 0; i < TEMPO.length; i++) {
    var tp = TEMPO[i];
    var dT2 = TEMPO_ALL.filter(function (x) { return x !== tp[1]; });
    four(tp[1], shuffle(dT2).slice(0, 3), "速度術語「" + tp[0] + "」表示「<b>" + tp[1] + "</b>」。",
      "速度術語「" + tp[0] + "」是什麼意思？", "音樂案件·速度術語");
  }

  /* 6. 樂器分類 */
  var INST = [
    ["小提琴", "弦樂器"], ["中提琴", "弦樂器"], ["大提琴", "弦樂器"], ["低音提琴", "弦樂器"],
    ["吉他", "弦樂器"], ["豎琴", "弦樂器"], ["烏克麗麗", "弦樂器"], ["二胡", "弦樂器"],
    ["長笛", "木管樂器"], ["單簧管", "木管樂器"], ["雙簧管", "木管樂器"], ["低音管", "木管樂器"],
    ["薩克斯風", "木管樂器"], ["直笛", "木管樂器"], ["短笛", "木管樂器"], ["排笛", "木管樂器"],
    ["小號", "銅管樂器"], ["長號", "銅管樂器"], ["法國號", "銅管樂器"], ["低音號", "銅管樂器"],
    ["小喇叭", "銅管樂器"], ["短號", "銅管樂器"],
    ["定音鼓", "打擊樂器"], ["大鼓", "打擊樂器"], ["小鼓", "打擊樂器"], ["鈴鼓", "打擊樂器"],
    ["三角鐵", "打擊樂器"], ["木琴", "打擊樂器"], ["鐵琴", "打擊樂器"], ["響板", "打擊樂器"],
    ["鋼琴", "鍵盤樂器"], ["管風琴", "鍵盤樂器"], ["手風琴", "鍵盤樂器"], ["口風琴", "鍵盤樂器"]
  ];
  var FAMS = ["弦樂器", "木管樂器", "銅管樂器", "打擊樂器", "鍵盤樂器"];
  for (var i = 0; i < INST.length; i++) {
    var it = INST[i];
    var dF = FAMS.filter(function (x) { return x !== it[1]; });
    for (var j = 0; j < 4; j++) {
      four(it[1], shuffle(dF).slice(0, 3), "「" + it[0] + "」是<b>" + it[1] + "</b>。",
        "「" + it[0] + "」屬於哪一類樂器？", "音樂案件·樂器分類");
    }
  }
  /* 反向：哪個是弦樂器 */
  for (var i = 0; i < 1600; i++) {
    var fam = pick(FAMS);
    var inFam = INST.filter(function (x) { return x[1] === fam; }).map(function (x) { return x[0]; });
    var notFam = INST.filter(function (x) { return x[1] !== fam; }).map(function (x) { return x[0]; });
    four(pick(inFam), shuffle(notFam).slice(0, 3), "「<b>" + "」屬於" + fam + "。",
      "下列哪一個是「" + fam + "」？", "音樂案件·樂器分類");
  }

  /* 7. 音樂常識 */
  var FACTS = [
    ["五線譜有幾條線？", "5 條", ["4 條", "6 條", "7 條"], "五線譜顧名思義有 <b>5 條線</b>。"],
    ["五線譜有幾個間？", "4 個", ["3 個", "5 個", "6 個"], "五條線之間有 <b>4 個間</b>。"],
    ["高音譜記號又叫做什麼譜號？", "G 譜號", ["C 譜號", "F 譜號", "H 譜號"], "高音譜記號圍繞著 G 音，又叫 <b>G 譜號</b>。"],
    ["低音譜記號又叫做什麼譜號？", "F 譜號", ["G 譜號", "C 譜號", "D 譜號"], "低音譜記號標示 F 音的位置，又叫 <b>F 譜號</b>。"],
    ["一個全音符等於幾個四分音符？", "4 個", ["2 個", "3 個", "8 個"], "全音符 4 拍，四分音符 1 拍，4 ÷ 1 = <b>4 個</b>。"],
    ["一個二分音符等於幾個四分音符？", "2 個", ["1 個", "3 個", "4 個"], "二分音符 2 拍 = <b>2 個</b>四分音符。"],
    ["一個四分音符等於幾個八分音符？", "2 個", ["1 個", "4 個", "8 個"], "四分音符 1 拍 = <b>2 個</b>八分音符。"],
    ["附點四分音符是幾拍？", "1.5 拍", ["1 拍", "2 拍", "2.5 拍"], "附點加原本的一半：1 + 0.5 = <b>1.5 拍</b>。"],
    ["音樂中的「休止符」是什麼意思？", "不出聲、休息", ["唱大聲一點", "加快速度", "重複一次"], "休止符表示<b>不出聲、休息</b>。"],
    ["「升記號（♯）」會讓音怎麼樣？", "升高半音", ["降低半音", "變大聲", "變慢"], "♯ 把音<b>升高半音</b>。"],
    ["「降記號（♭）」會讓音怎麼樣？", "降低半音", ["升高半音", "變小聲", "變快"], "♭ 把音<b>降低半音</b>。"],
    ["圓滑線（︵）表示要怎麼演奏？", "圓滑連貫", ["斷斷續續", "越來越強", "立刻停止"], "圓滑線內的音要<b>圓滑連貫</b>。"],
    ["跳音記號（音上的圓點）表示要怎麼演奏？", "短促輕巧", ["拉長音", "越來越弱", "大聲演奏"], "跳音要<b>短促輕巧</b>。"],
    ["音樂術語「a tempo」是什麼意思？", "恢復原來速度", ["漸慢", "停止", "漸強"], "a tempo 表示<b>恢復原來的速度</b>。"],
    ["合唱團中「Soprano」是什麼聲部？", "女高音", ["男低音", "男高音", "女低音"], "Soprano 是<b>女高音</b>。"],
    ["「貝多芬」是哪一國的音樂家？", "德國", ["法國", "奧地利", "義大利"], "貝多芬是<b>德國</b>音樂家。"],
    ["「莫札特」是哪一國的音樂家？", "奧地利", ["德國", "法國", "英國"], "莫札特是<b>奧地利</b>音樂家。"],
    ["莫札特幾歲就會作曲，被稱為什麼？", "音樂神童", ["音樂之父", "歌曲之王", "鋼琴詩人"], "莫札特從小就會作曲，被稱為<b>音樂神童</b>。"],
    ["被稱為「音樂之父」的是誰？", "巴哈", ["貝多芬", "莫札特", "海頓"], "<b>巴哈</b>被稱為「音樂之父」。"],
    ["被稱為「歌曲之王」的是誰？", "舒伯特", ["蕭邦", "柴可夫斯基", "巴哈"], "<b>舒伯特</b>寫了六百多首歌曲，被稱為「歌曲之王」。"],
    ["被稱為「鋼琴詩人」的是誰？", "蕭邦", ["巴哈", "貝多芬", "莫札特"], "<b>蕭邦</b>的鋼琴曲充滿詩意，被稱為「鋼琴詩人」。"],
    ["《給愛麗絲》是誰的作品？", "貝多芬", ["莫札特", "巴哈", "蕭邦"], "《給愛麗絲》是<b>貝多芬</b>的鋼琴曲。"],
    ["《小星星》的旋律來自哪國民謠？", "法國", ["英國", "德國", "美國"], "《小星星》旋律來自<b>法國</b>民謠。"],
    ["直笛有幾個音孔（含背孔）？", "8 個", ["6 個", "7 個", "9 個"], "直笛正面 7 孔、背面 1 孔，共 <b>8 個</b>音孔。"],
    ["吹直笛時，「吐音」的口訣通常是哪個音？", "ㄊㄨ（tu）", ["ㄚ（a）", "ㄨ（wu）", "ㄏㄚ（ha）"], "吐音用舌尖發「<b>ㄊㄨ</b>」的音。"],
    ["音樂課常唱的 Do Re Mi 共有幾個唱名？", "7 個", ["5 個", "6 個", "8 個"], "Do、Re、Mi、Fa、Sol、La、Si 共 <b>7 個</b>。"],
    ["兩個音之間最小的距離叫什麼？", "半音", ["全音", "八度", "小節"], "最小的音距是<b>半音</b>。"],
    ["Do 到高一個 Do 之間叫做什麼？", "八度", ["五度", "三度", "半音"], "Do 到高八度的 Do 叫<b>八度</b>。"],
    ["「小節線」的作用是什麼？", "分隔小節", ["表示結束", "表示漸強", "表示重複"], "小節線用來<b>分隔小節</b>。"],
    ["樂曲最後的雙縱線（終止線）表示什麼？", "樂曲結束", ["從頭反覆", "休息一下", "加快速度"], "終止線表示<b>樂曲結束</b>。"]
  ];
  for (var i = 0; i < FACTS.length; i++) {
    var ft = FACTS[i];
    four(ft[1], ft[2], ft[3], ft[0], "音樂案件·音樂常識");
  }

  /* 8. 聲樂/合唱常識 */
  var CHOIR = [
    ["合唱時最重要的事情是什麼？", "大家一起配合", ["自己唱最大聲", "各唱各的調", "閉嘴不出聲"], "合唱最重要的是<b>大家一起配合</b>，不是比誰大聲。"],
    ["唱歌前為什麼要做發聲練習？", "讓聲音暖身、保護喉嚨", ["浪費時間", "讓肚子餓", "讓大家安靜"], "發聲練習讓聲音暖身，也<b>保護喉嚨</b>。"],
    ["唱歌的正確姿勢是什麼？", "站直、放鬆", ["彎腰駝背", "躺著唱", "閉眼睡覺"], "唱歌要<b>站直、身體放鬆</b>。"],
    ["唱歌時用哪裡呼吸最好？", "腹部（腹式呼吸）", ["肩膀", "頭頂", "耳朵"], "用<b>腹式呼吸</b>，氣息才夠長。"]
  ];
  for (var i = 0; i < CHOIR.length; i++) {
    four(CHOIR[i][1], CHOIR[i][2], CHOIR[i][3], CHOIR[i][0], "音樂案件·合唱常識");
  }

  /* 9. 音階第幾個音 */
  var SCALE = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
  for (var i = 0; i < 7; i++) {
    var dIdx = ["1", "2", "3", "4", "5", "6", "7"].filter(function (x) { return x !== String(i + 1); });
    four(String(i + 1), shuffle(dIdx).slice(0, 3), "Do、Re、Mi、Fa、Sol、La、Si，「" + SCALE[i] + "」是第 <b>" + (i + 1) + "</b> 個音。",
      "大調音階中，「" + SCALE[i] + "」是第幾個音？", "音樂案件·音階位置");
  }
  /* 兩音之間距幾個音名 */
  for (var a = 0; a < 7; a++) {
    for (var b = 0; b < 7; b++) {
      if (b <= a) continue;
      var steps = b - a;
      var dSt = [steps + 1, steps + 2, steps + 3, Math.max(1, steps - 1)].filter(function (x) { return x !== steps; });
      four(String(steps), shuffle(dSt).slice(0, 3).map(String),
        SCALE[a] + " → " + SCALE[b] + " 中間差了 <b>" + steps + "</b> 個音級。",
        "從「" + SCALE[a] + "」往上行到「" + SCALE[b] + "」，要經過幾個音級？", "音樂案件·音級計算");
    }
  }

  /* 10. 節奏聽想（數拍） */
  for (var i = 0; i < 900; i++) {
    var beats = ri(2, 8), kind = ri(1, 2);
    if (kind === 1) {
      var dB = [beats - 1, beats + 1, beats + 2].filter(function (x) { return x > 0 && x !== beats; }).map(String);
      four(String(beats), dB, "噠、噠……數一數，共拍了 <b>" + beats + "</b> 次。",
        "老師拍手，大家跟著數：噠！".repeat(beats) + "（共拍了幾次手？）", "音樂案件·數拍子");
    } else {
      var bars = ri(2, 4), per = pick([2, 3, 4]), tot2 = bars * per;
      var dT3 = [tot2 - 1, tot2 + 1, tot2 + per].filter(function (x) { return x > 0 && x !== tot2; }).map(String);
      four(String(tot2), dT3, per + "/" + "4 拍一小節 " + per + " 拍，" + bars + " 小節 = " + per + " × " + bars + " = <b>" + tot2 + "</b> 拍。",
        "「" + per + "/4 拍」的曲子有 " + bars + " 個小節，一共有幾拍？", "音樂案件·拍子計算");
    }
  }

  shuffle(out);
  g.BANK_MUSIC = out;
})(typeof window !== "undefined" ? window : globalThis);

// 難度標記：1 簡單 / 2 普通 / 3 困難（依題目類型分級）
(function(g){
  var TIER = {"唱名音名": 1, "音符時值": 1, "力度記號": 1, "樂器分類": 1, "音樂常識": 1, "數拍子": 1, "速度術語": 1, "拍子加法": 2, "拍號": 2, "音階順序": 2, "合唱常識": 2, "拍子計算": 3, "音階位置": 3, "音級計算": 3};
  (g.BANK_MUSIC || []).forEach(function(q){
    q.d = 2;
    for (var k in TIER) if ((q.scene || "").indexOf(k) >= 0) { q.d = TIER[k]; break; }
  });
})(typeof window !== "undefined" ? window : globalThis);
// 進階困難題庫：MUSIC（全部 d:3）
(function(g){
  function mulberry(seed){ return function(){ seed|=0; seed=(seed+0x6D2B79F5)|0; var t=Math.imul(seed^(seed>>>15),1|seed); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; }; }
  var rnd = mulberry(20261007);
  var seen = {};
  var out = [];
  function add(q, correct, wrongs, explain, scene){
    var opts = [String(correct)];
    for (var i=0;i<wrongs.length && opts.length<4;i++){
      var w = String(wrongs[i]);
      if (opts.indexOf(w) < 0) opts.push(w);
    }
    if (opts.length < 4) return;
    var key = q + opts.join(",");
    if (seen[key]) return;
    seen[key] = 1;
    // shuffle
    for (var s=opts.length-1;s>0;s--){ var j=Math.floor(rnd()*(s+1)); var tmp=opts[s]; opts[s]=opts[j]; opts[j]=tmp; }
    out.push({ scene: scene, q: q, opts: opts, correct: opts.indexOf(String(correct)), explain: explain, d: 3 });
  }

  // 1. 音程度數：C 大調內兩音之間的度數
  var noteNames = ["Do","Re","Mi","Fa","Sol","La","Si"];
  var degree = ["一度","二度","三度","四度","五度","六度","七度"];
  var allDeg = ["二度","三度","四度","五度","六度","七度","八度"];
  for (var a=0;a<7;a++) for (var b=a+1;b<7;b++){
    var d = b - a; // 1..6
    var ans = degree[d];
    var wrongs = allDeg.filter(function(x){ return x!==ans; });
    add("在 C 大調音階中，由「"+noteNames[a]+"」向上數到「"+noteNames[b]+"」，兩音相距多少度？",
      ans, [wrongs[0],wrongs[1],wrongs[2]],
      "從 "+noteNames[a]+" 數起（"+noteNames[a]+" 算第一個音），數到 "+noteNames[b]+" 共 "+(d+1)+" 個音，所以是"+ans+"。",
      "音程度數");
  }

  // 2. 調號：幾個升降號是甚麼大調
  var keys = [
    [1,"升","G 大調"],[2,"升","D 大調"],[3,"升","A 大調"],[4,"升","E 大調"],
    [1,"降","F 大調"],[2,"降","降B 大調"],[3,"降","降E 大調"]
  ];
  var allKeys = ["C 大調","G 大調","D 大調","A 大調","E 大調","F 大調","降B 大調","降E 大調"];
  keys.forEach(function(k){
    var wrongs = allKeys.filter(function(x){ return x!==k[2] && x!=="C 大調"; });
    add("一個大調的調號有 "+k[0]+" 個"+k[1]+"號，這是甚麼調？",
      k[2], [wrongs[0],wrongs[1],wrongs[2]],
      "調號有 "+k[0]+" 個"+k[1]+"號的是「"+k[2]+"」。",
      "調號推理");
  });

  // 3. 混合節奏拍值計算（4/4 拍）
  var dur = [ ["全音符",4], ["二分音符",2], ["四分音符",1], ["八分音符",0.5] ];
  function fmt(n){ return n===Math.floor(n) ? String(n) : n.toFixed(1).replace(".5","½"); }
  for (var m=0;m<24;m++){
    var i1=Math.floor(rnd()*4), i2=Math.floor(rnd()*4), i3=Math.floor(rnd()*4);
    var total = dur[i1][1]+dur[i2][1]+dur[i3][1];
    if (total < 1.5 || total > 8) continue;
    var totalStr = fmt(total);
    var cand = [total+1, total-1, total+0.5, total-0.5, total+2].filter(function(x){ return x>0 && x!==total; });
    add("在 4/4 拍中，一個"+dur[i1][0]+"、一個"+dur[i2][0]+"和一個"+dur[i3][0]+"加起來共幾拍？",
      totalStr+" 拍",
      cand.slice(0,3).map(function(x){ return fmt(x)+" 拍"; }),
      dur[i1][0]+"="+fmt(dur[i1][1])+"拍，"+dur[i2][0]+"="+fmt(dur[i2][1])+"拍，"+dur[i3][0]+"="+fmt(dur[i3][1])+"拍，合共 "+totalStr+" 拍。",
      "節奏進階");
  }

  // 4. 義大利術語原文 ↔ 意思
  var terms = [
    ["Allegro","快板"],["Andante","行板"],["Adagio","慢板"],["Moderato","中板"],
    ["Forte","強"],["Piano","弱"],["Crescendo","漸強"],["Diminuendo","漸弱"],
    ["Staccato","斷奏"],["Legato","圓滑奏"],["Ritardando","漸慢"],["Accelerando","漸快"],
    ["Fortissimo","很強"],["Pianissimo","很弱"],["Presto","急板"],["Largo","廣板／很緩慢"]
  ];
  var allMean = terms.map(function(t){return t[1];});
  terms.forEach(function(t){
    var wrongs = allMean.filter(function(x){return x!==t[1];});
    add("音樂術語「"+t[0]+"」是甚麼意思？",
      t[1], [wrongs[0],wrongs[3],wrongs[5]],
      "「"+t[0]+"」的意思是「"+t[1]+"」。",
      "術語原文");
  });

  // 5. 大調音階半音位置
  add("大調音階「全全半全全全半」中，第一個「半音」出現在第幾與第幾個音之間？",
    "第 3 與第 4 個音之間", ["第 2 與第 3 個音之間","第 4 與第 5 個音之間","第 1 與第 2 個音之間"],
    "大調音階的半音在第 3–4 音（Mi–Fa）和第 7–8 音（Si–Do）之間。","半音位置");
  add("C 大調音階中，哪兩個相鄰的音是半音關係？",
    "Mi 和 Fa", ["Do 和 Re","Re 和 Mi","Sol 和 La"],
    "Mi–Fa 之間沒有黑鍵，是半音；另一組是 Si–Do。","半音位置");
  add("鋼琴上，E 鍵右邊緊接的琴鍵是哪個音？",
    "F", ["降E","升E","D"],
    "E 和 F 之間沒有黑鍵，所以 E 右邊緊接的就是 F。","半音位置");
  add("「升 Fa」和哪個音其實是同一個琴鍵？",
    "降 Sol", ["Sol","Fa","升 Sol"],
    "升 Fa 與降 Sol 是「等音」，在鋼琴上是同一個黑鍵。","半音位置");

  // 6. 音名與唱名進階
  var pitch = [["C","Do"],["D","Re"],["E","Mi"],["F","Fa"],["G","Sol"],["A","La"],["B","Si"]];
  var allLet = pitch.map(function(p){return p[0];});
  pitch.forEach(function(p){
    var wrongs = allLet.filter(function(x){return x!==p[0];});
    add("唱名「"+p[1]+"」對應的音名（英文字母）是哪個？",
      p[0], [wrongs[1],wrongs[3],wrongs[5]],
      "「"+p[1]+"」的音名是 "+p[0]+"。","音名唱名");
  });

  // 7. 小調與關係調
  add("C 大調的「關係小調」是哪一個？",
    "A 小調", ["C 小調","G 小調","E 小調"],
    "C 大調向下數小三度（或數到第 6 個音 La）就是它的關係小調：A 小調。","關係調");
  add("G 大調音階中唯一需要升高的音是哪個？",
    "Fa（升 Fa）", ["Do（升 Do）","Si（升 Si）","Re（升 Re）"],
    "G 大調調號有一個升號：升 Fa。","關係調");

  // 8. 拍號判斷
  add("「3/4 拍」表示甚麼？",
    "每小節 3 拍，以四分音符為一拍",
    ["每小節 4 拍，以三分音符為一拍","每小節 3 拍，以八分音符為一拍","全曲只有 3 小節"],
    "拍號上面的數字是每小節拍數，下面的數字是以哪種音符為一拍。3/4 即每小節 3 拍、四分音符為一拍。","拍號進階");
  add("圓舞曲（Waltz）通常是甚麼拍子？",
    "3/4 拍", ["4/4 拍","2/4 拍","6/4 拍"],
    "圓舞曲的「強–弱–弱」三拍子特色，正是 3/4 拍。","拍號進階");

  g.BANK_MUSIC_HARD = out;
  g.BANK_MUSIC = (g.BANK_MUSIC || []).concat(out);
})(typeof window !== "undefined" ? window : globalThis);
