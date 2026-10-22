/* =========================================================
   數學模組（國小 3–5 年級）— 自動生成 3200+ 題
   ========================================================= */
(function (g) {
  "use strict";
  var seed = 20261007;
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
    if (!opts || opts.length !== 4) return;
    var u = {}; for (var z = 0; z < 4; z++) { if (u[opts[z]]) return; u[opts[z]] = 1; }
    var key = q + "|" + opts[correct];
    if (seen[key]) return; seen[key] = 1;
    out.push({ scene: scene, q: q, opts: opts, correct: correct, explain: explain });
  }
  // 由正確數值產生四個選項（含單位），回傳 {opts, correct}
  function numOpts(ans, unit, spread) {
    var set = {}, opts = [], a = String(ans) + unit;
    opts.push(a); set[a] = 1;
    var tries = 0;
    while (opts.length < 4 && tries < 60) {
      tries++;
      var d = Math.max(1, Math.round(Math.abs(ans) * (R() * 0.5 + 0.08))) + ri(0, spread || 6);
      var cand = (R() < 0.5 ? ans + d : ans - d);
      if (cand < 0) cand = ans + d;
      var s = String(cand) + unit;
      if (!set[s]) { set[s] = 1; opts.push(s); }
    }
    while (opts.length < 4) { var s2 = String(ans + opts.length * 7 + 3) + unit; if (!set[s2]) { set[s2]=1; opts.push(s2); } }
    var idx = shuffle([0, 1, 2, 3]);
    var final = idx.map(function (i) { return opts[i]; });
    return { opts: final, correct: idx.indexOf(0) };
  }
  var NAMES = ["小偵探", "小蘭", "園子", "元太", "步美", "光彥", "小哀", "阿笠博士", "目暮警官", "服部", "和葉", "小五郎"];
  var THINGS = [
    ["筆記本", "本"], ["糖果", "顆"], ["鉛筆", "枝"], ["貼紙", "張"], ["餅乾", "塊"],
    ["氣球", "個"], ["彈珠", "顆"], ["漫畫", "本"], ["蘋果", "個"], ["橘子", "個"],
    ["瓶牛奶", "瓶"], ["張卡片", "張"], ["顆星星", "顆"], ["朵小花", "朵"]
  ];

  /* 1. 兩步驟四則應用題（類型最多） */
  for (var i = 0; i < 2400; i++) {
    var n = pick(NAMES), t = pick(THINGS), kind = ri(1, 4);
    if (kind === 1) {
      var a = ri(2, 9), b = ri(3, 12), c = ri(1, a * b - 2);
      var ans = a * b - c, o = numOpts(ans, t[1]);
      add("數學案件·分與拿", n + "有 " + a + " 盒" + t[0] + "，每盒 " + b + " " + t[1] + "，送給朋友 " + c + " " + t[1] + "。還剩多少" + t[1] + "？",
        o.opts, o.correct, a + " × " + b + " = " + (a * b) + "，" + (a * b) + " − " + c + " = <b>" + ans + " " + t[1] + "</b>。");
    } else if (kind === 2) {
      var p = ri(2, 9) * 5, q2 = ri(2, 8), m = ri(2, 6);
      var ans2 = (p + q2) * m, o2 = numOpts(ans2, "元");
      add("數學案件·買東西", n + "買了 " + m + " 組文具，每組有 " + p + " 元的筆和 " + q2 + " 元的橡皮擦。一共要多少元？",
        o2.opts, o2.correct, "每組 " + p + " + " + q2 + " = " + (p + q2) + " 元，" + (p + q2) + " × " + m + " = <b>" + ans2 + " 元</b>。");
    } else if (kind === 3) {
      var tot = ri(4, 9) * ri(3, 9), per = ri(2, 5);
      while (tot % per !== 0) { tot = per * ri(2, 12); }
      var groups = tot / per, o3 = numOpts(groups, "組");
      add("數學案件·分組", n + "把 " + tot + " " + t[1] + t[0] + "平分，每 " + per + " " + t[1] + "一組，可以分成幾組？",
        o3.opts, o3.correct, tot + " ÷ " + per + " = <b>" + groups + " 組</b>。");
    } else {
      var x = ri(20, 90), y = ri(10, x - 5), z = ri(5, 15);
      var ans4 = x - y + z, o4 = numOpts(ans4, t[1]);
      add("數學案件·增增減減", n + "原本有 " + x + " " + t[1] + t[0] + "，用掉 " + y + " " + t[1] + "，又得到 " + z + " " + t[1] + "。現在有多少" + t[1] + "？",
        o4.opts, o4.correct, x + " − " + y + " + " + z + " = <b>" + ans4 + " " + t[1] + "</b>。");
    }
  }

  /* 2. 單位換算 */
  for (var i = 0; i < 800; i++) {
    var kind = ri(1, 6);
    if (kind === 1) {
      var m5 = ri(2, 30), ans5 = m5 * 100, o5 = numOpts(ans5, " 公分");
      add("數學案件·長度換算", m5 + " 公尺等於多少公分？", o5.opts, o5.correct, "1 公尺 = 100 公分，" + m5 + " × 100 = <b>" + ans5 + " 公分</b>。");
    } else if (kind === 2) {
      var cm = ri(2, 40) * 100 + ri(1, 9) * 10, m6 = cm / 100, o6 = numOpts(m6, " 公尺");
      add("數學案件·長度換算", cm + " 公分等於多少公尺？", o6.opts, o6.correct, cm + " ÷ 100 = <b>" + m6 + " 公尺</b>。");
    } else if (kind === 3) {
      var l = ri(2, 9), ml = l * 1000, o7 = numOpts(ml, " 毫升");
      add("數學案件·容量換算", l + " 公升等於多少毫升？", o7.opts, o7.correct, "1 公升 = 1000 毫升，" + l + " × 1000 = <b>" + ml + " 毫升</b>。");
    } else if (kind === 4) {
      var kg = ri(2, 12), gm = kg * 1000, o8 = numOpts(gm, " 公克");
      add("數學案件·重量換算", kg + " 公斤等於多少公克？", o8.opts, o8.correct, "1 公斤 = 1000 公克，" + kg + " × 1000 = <b>" + gm + " 公克</b>。");
    } else if (kind === 5) {
      var h = ri(2, 8), mins = h * 60, o9 = numOpts(mins, " 分鐘");
      add("數學案件·時間換算", h + " 小時等於多少分鐘？", o9.opts, o9.correct, "1 小時 = 60 分鐘，" + h + " × 60 = <b>" + mins + " 分鐘</b>。");
    } else {
      var cm2 = ri(3, 25), mm = cm2 * 10, o10 = numOpts(mm, " 毫米");
      add("數學案件·長度換算", cm2 + " 公分等於多少毫米？", o10.opts, o10.correct, "1 公分 = 10 毫米，" + cm2 + " × 10 = <b>" + mm + " 毫米</b>。");
    }
  }

  /* 3. 時鐘與時間 */
  for (var i = 0; i < 750; i++) {
    var sh = ri(1, 11), sm = ri(0, 5) * 10, dur = ri(2, 11) * 5;
    var em = sm + dur, eh = sh;
    while (em >= 60) { em -= 60; eh++; }
    var kind = ri(1, 2);
    if (kind === 1) {
      var o11 = numOpts(dur, " 分鐘");
      add("數學案件·時間計算", "時鐘從 " + sh + ":" + (sm < 10 ? "0" + sm : sm) + " 走到 " + eh + ":" + (em < 10 ? "0" + em : em) + "，一共經過多少分鐘？",
        o11.opts, o11.correct, "從 " + sh + ":" + (sm < 10 ? "0" + sm : sm) + " 到 " + eh + ":" + (em < 10 ? "0" + em : em) + " 共 <b>" + dur + " 分鐘</b>。");
    } else {
      var opts = [eh + ":" + (em < 10 ? "0" + em : em), (eh + 1) + ":" + (em < 10 ? "0" + em : em), eh + ":" + ((em + 10) % 60 < 10 ? "0" + ((em + 10) % 60) : ((em + 10) % 60)), sh + ":" + (sm < 10 ? "0" + sm : sm)];
      var lab = ["A", "B", "C", "D"];
      add("數學案件·時間計算", "現在是 " + sh + ":" + (sm < 10 ? "0" + sm : sm) + "，再過 " + dur + " 分鐘是幾點幾分？",
        opts, 0, sh + ":" + (sm < 10 ? "0" + sm : sm) + " 加 " + dur + " 分鐘 = <b>" + eh + ":" + (em < 10 ? "0" + em : em) + "</b>。");
    }
  }

  /* 4. 周長與面積 */
  for (var i = 0; i < 750; i++) {
    var L = ri(3, 15), W = ri(2, L);
    var kind = ri(1, 3);
    if (kind === 1) {
      var per = (L + W) * 2, o12 = numOpts(per, " 公分");
      add("數學案件·周長", "一個長方形長 " + L + " 公分、寬 " + W + " 公分，周長是多少公分？",
        o12.opts, o12.correct, "(" + L + " + " + W + ") × 2 = <b>" + per + " 公分</b>。");
    } else if (kind === 2) {
      var area = L * W, o13 = numOpts(area, " 平方公分");
      add("數學案件·面積", "一個長方形長 " + L + " 公分、寬 " + W + " 公分，面積是多少平方公分？",
        o13.opts, o13.correct, L + " × " + W + " = <b>" + area + " 平方公分</b>。");
    } else {
      var s = ri(3, 15), o14 = numOpts(s * s, " 平方公分");
      add("數學案件·正方形面積", "邊長 " + s + " 公分的正方形，面積是多少平方公分？",
        o14.opts, o14.correct, s + " × " + s + " = <b>" + (s * s) + " 平方公分</b>。");
    }
  }

  /* 5. 倍數、因數、奇偶 */
  for (var i = 0; i < 750; i++) {
    var kind = ri(1, 4);
    if (kind === 1) {
      var base = ri(3, 9), cnt = ri(4, 9), nums = [];
      for (var k2 = 1; k2 <= cnt; k2++) nums.push(base * k2);
      var pickN = pick(nums), bad = pickN + pick([1, -1, 2]);
      while (bad % base === 0 || bad <= 0) bad = pickN + ri(1, base - 1);
      var opts15 = shuffle([String(pickN), String(bad), String(bad + base + 1), String(bad + 1)]);
      add("數學案件·倍數", "下列哪一個數是 " + base + " 的倍數？", opts15, opts15.indexOf(String(pickN)),
        pickN + " ÷ " + base + " = " + (pickN / base) + "，可以整除，所以 <b>" + pickN + "</b> 是 " + base + " 的倍數。");
    } else if (kind === 2) {
      var num = ri(12, 60), facts = [];
      for (var f = 2; f <= num; f++) if (num % f === 0 && f !== num) facts.push(f);
      if (!facts.length) continue;
      var good = pick(facts), badf = ri(3, 11);
      while (num % badf === 0) badf = ri(3, 11);
      var opts16 = shuffle([String(good), String(badf), String(badf + 2), String(num)]);
      add("數學案件·因數", "下列哪一個數是 " + num + " 的因數？", opts16, opts16.indexOf(String(good)),
        num + " ÷ " + good + " = " + (num / good) + "，可以整除，所以 <b>" + good + "</b> 是 " + num + " 的因數。");
    } else if (kind === 3) {
      var ev = ri(2, 50) * 2, od = ri(1, 50) * 2 + 1, askEven = R() < 0.5;
      var arr = askEven ? [ev, od, od + 2, od + 4] : [od, ev, ev + 2, ev + 4];
      var opts17 = shuffle(arr.map(String));
      var ansS = String(askEven ? ev : od);
      add("數學案件·奇數與偶數", "下列哪一個是" + (askEven ? "偶數" : "奇數") + "？", opts17, opts17.indexOf(ansS),
        "個位是 " + (askEven ? "0、2、4、6、8" : "1、3、5、7、9") + " 的數是" + (askEven ? "偶數" : "奇數") + "，所以是 <b>" + ansS + "</b>。");
    } else {
      var d = ri(2, 9), r0 = ri(0, d - 1), qv = ri(3, 12), dv = d * qv + r0;
      var o18 = numOpts(r0, "");
      add("數學案件·餘數", dv + " ÷ " + d + " 的餘數是多少？", o18.opts, o18.correct,
        dv + " = " + d + " × " + qv + " + " + r0 + "，所以餘數是 <b>" + r0 + "</b>。");
    }
  }

  /* 6. 位值與比較 */
  for (var i = 0; i < 750; i++) {
    var kind = ri(1, 3);
    if (kind === 1) {
      var th = ri(1, 9), hu = ri(0, 9), te = ri(0, 9), on = ri(0, 9);
      var val = th * 1000 + hu * 100 + te * 10 + on;
      var opts19 = shuffle([String(val), String(th * 1000 + te * 100 + hu * 10 + on), String(hu * 1000 + th * 100 + te * 10 + on), String(val + ri(1, 9) * 10)]);
      add("數學案件·位值", "千位是 " + th + "、百位是 " + hu + "、十位是 " + te + "、個位是 " + on + " 的數是多少？",
        opts19, opts19.indexOf(String(val)), th + "000 + " + hu + "00 + " + te + "0 + " + on + " = <b>" + val + "</b>。");
    } else if (kind === 2) {
      var a19 = ri(1000, 9999), b19 = a19 + pick([ri(1, 99), -ri(1, 99)]);
      var big = Math.max(a19, b19);
      var opts20 = shuffle([String(big), String(Math.min(a19, b19)), String(big - 1), String(big + 10)]);
      add("數學案件·比大小", a19 + " 和 " + b19 + "，哪一個比較大？",
        opts20, opts20.indexOf(String(big)), "從千位開始比較，<b>" + big + "</b> 比較大。");
    } else {
      var t21 = ri(11, 99), o21 = numOpts(t21 * 10, "");
      add("數學案件·十倍", t21 + " 的 10 倍是多少？", o21.opts, o21.correct, t21 + " × 10 = <b>" + (t21 * 10) + "</b>。");
    }
  }

  /* 7. 分數初步 */
  for (var i = 0; i < 750; i++) {
    var den = pick([2, 3, 4, 5, 6, 8, 10]), nume = ri(1, den - 1), t22 = pick(THINGS);
    var kind = ri(1, 2);
    if (kind === 1) {
      var whole = den * ri(2, 8), part = nume * (whole / den), o23 = numOpts(part, t22[1]);
      add("數學案件·分數", "一盒" + t22[0] + "有 " + whole + " " + t22[1] + "，其中的 " + nume + "/" + den + " 是多少" + t22[1] + "？",
        o23.opts, o23.correct, whole + " ÷ " + den + " = " + (whole / den) + "，" + (whole / den) + " × " + nume + " = <b>" + part + " " + t22[1] + "</b>。");
    } else {
      var opts24 = shuffle([nume + "/" + den, den + "/" + nume, (nume + 1) + "/" + den, nume + "/" + (den + 1)]);
      add("數學案件·分數", "把一個披薩平分成 " + den + " 片，吃掉 " + nume + " 片，吃掉了幾分之幾？",
        opts24, opts24.indexOf(nume + "/" + den), "分成 " + den + " 片吃 " + nume + " 片，就是 <b>" + nume + "/" + den + "</b>。");
    }
  }

  /* 8. 植樹/間隔問題 */
  for (var i = 0; i < 550; i++) {
    var pts = ri(4, 15), gap = ri(2, 9) * 10, span = (pts - 1) * gap, o25 = numOpts(span, " 公尺");
    add("數學案件·間隔問題", "一排路燈共 " + pts + " 盞，相鄰兩盞相距 " + gap + " 公尺。從第一盞到最後一盞共多長？",
      o25.opts, o25.correct, pts + " 盞燈之間有 <b>" + (pts - 1) + " 個間隔</b>，" + (pts - 1) + " × " + gap + " = <b>" + span + " 公尺</b>。");
  }

  /* 9. 找錢與價格 */
  for (var i = 0; i < 550; i++) {
    var n9 = pick(NAMES), price = ri(15, 95), cnt9 = ri(2, 6), pay = Math.ceil(price * cnt9 / 100) * 100 + pick([0, 50, 100]);
    var change = pay - price * cnt9, o26 = numOpts(change, " 元");
    add("數學案件·找錢", n9 + "買了 " + cnt9 + " 個麵包，每個 " + price + " 元，付了 " + pay + " 元，可以找回多少元？",
      o26.opts, o26.correct, cnt9 + " 個共 " + price + " × " + cnt9 + " = " + (price * cnt9) + " 元，" + pay + " − " + (price * cnt9) + " = <b>" + change + " 元</b>。");
  }

  /* 10. 簡單邏輯 */
  var LOGIC = [
    ["甲說「我沒拿」；乙說「甲拿了」；丙說「乙在說謊」。恰好一人說真話，誰拿了餅乾？", ["丙", "甲", "乙", "沒人"],
      "若甲拿→乙真話丙也真話（兩真不合）；若乙拿→甲真話丙真話（兩真不合）；若<b>丙拿</b>→只有甲說真話，符合！"],
    ["三個盒子只有一個有寶藏。紅盒說「不在我這」；藍盒說「在紅盒裡」；綠盒說「不在我這」。只有一個說真話，寶藏在哪？", ["綠盒", "紅盒", "藍盒", "沒有寶藏"],
      "若在紅盒→藍真話，綠也真話（兩真不合）；若在藍盒→紅真話綠真話（不合）；若在<b>綠盒</b>→只有紅盒說真話，符合！"]
  ];
  for (var i = 0; i < 60; i++) {
    var L0 = LOGIC[i % LOGIC.length];
    var opts27 = shuffle(L0[1].slice());
    add("數學案件·邏輯推理", L0[0], opts27, opts27.indexOf(L0[1][0]), L0[2]);
  }

  // 打亂題庫順序
  shuffle(out);
  g.BANK_MATH = out;
})(typeof window !== "undefined" ? window : globalThis);

// 難度標記：1 簡單 / 2 普通 / 3 困難（依題目類型分級）
(function(g){
  var TIER = {"分與拿": 1, "增增減減": 1, "比大小": 1, "奇數與偶數": 1, "十倍": 1, "買東西": 1, "找錢": 2, "分組": 2, "周長": 2, "時間計算": 2, "長度換算": 2, "位值": 2, "重量換算": 2, "容量換算": 2, "時間換算": 2, "正方形面積": 2, "餘數": 3, "間隔問題": 3, "面積": 3, "分數": 3, "因數": 3, "倍數": 3, "邏輯推理": 3};
  (g.BANK_MATH || []).forEach(function(q){
    q.d = 2;
    for (var k in TIER) if ((q.scene || "").indexOf(k) >= 0) { q.d = TIER[k]; break; }
  });
})(typeof window !== "undefined" ? window : globalThis);

// ===== 進階困難題（d=3，多步驟/高年級挑戰） =====
(function(g){
  var out = [];
  function mulberry(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; var t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  var rnd = mulberry(20261007);
  function ri(a,b){ return a + Math.floor(rnd()*(b-a+1)); }
  var seen = {};
  function shuffleArr(a){ for(var i=a.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function add(q, correct, wrongs, explain, scene){
    var opts = [String(correct)];
    for (var i=0;i<wrongs.length;i++){ var w = String(wrongs[i]); if (opts.indexOf(w)<0) opts.push(w); if (opts.length>=4) break; }
    if (opts.length < 4) return;
    var opts0 = opts.join(",");
    opts = shuffleArr(opts);
    var key = q + opts0;
    if (seen[key]) return; seen[key]=1;
    out.push({ scene:scene, q:q, opts:opts, correct:opts.indexOf(String(correct)), explain:explain, d:3 });
  }
  function four(correct, wrongs, explain, q, scene){ add(q, correct, wrongs, explain, scene); }

  var NAMES = ["柯南","小蘭","元太","步美","光彥","小哀","阿笠博士","目暮警官"];
  var ITEMS = [["蘋果","個"],["糖果","顆"],["貼紙","張"],["鉛筆","枝"],["餅乾","塊"],["氣球","個"]];

  // 1) 兩步應用題
  for (var i1=0; i1<NAMES.length; i1++){
    var it = ITEMS[i1 % ITEMS.length], price = ri(15,98), paid = (Math.ceil(price*ri(2,5)/100))*100 + ri(0,1)*100;
    var n1 = ri(2,6);
    var total = price*n1;
    if (total >= paid) continue;
    four((paid-total)+" 元", [(paid-total+10)+" 元",(paid-total-10)+" 元",(paid-total+5)+" 元"],
      price+"×"+n1+"＝"+total+"，"+paid+"−"+total+"＝"+(paid-total)+"。",
      NAMES[i1]+"買了 "+n1+" "+it[1]+it[0]+"，每"+it[1]+" "+price+" 元，付了 "+paid+" 元，找回多少元？",
      "數學案件·進階兩步應用");
  }
  // 2) 混合四則（先乘除後加減）
  for (var i2=0; i2<40; i2++){
    var a = ri(3,12), b = ri(3,12), c = ri(5,60);
    var ans = a*b + c;
    four(ans+"", [ans+a+"", ans-c%10+"", a*(b+c)+""],
      "先算乘除："+a+"×"+b+"＝"+(a*b)+"，再加 "+c+"＝"+ans+"。",
      "算算看："+a+" × "+b+" + "+c+" = ？", "數學案件·混合四則");
  }
  // 3) 括號先算
  for (var i3=0; i3<40; i3++){
    var a3 = ri(2,9), b3 = ri(3,15), c3 = ri(2,9);
    var ans3 = a3*(b3+c3);
    four(ans3+"", [a3*b3+c3+"", a3*b3+a3*c3-2+"", (a3+b3)*c3+""],
      "括號先算："+b3+"+"+c3+"＝"+(b3+c3)+"，"+a3+"×"+(b3+c3)+"＝"+ans3+"。",
      "算算看："+a3+" × ("+b3+" + "+c3+") = ？", "數學案件·括號先算");
  }
  // 4) 年齡問題
  for (var i4=0; i4<30; i4++){
    var kid = ri(6,12), diff = ri(18,30), yrs = ri(3,10);
    var ans4 = kid + diff + yrs;
    four(ans4+" 歲", [kid+diff+" 歲", kid+yrs+" 歲", ans4+yrs+" 歲"],
      "爸爸現在 "+(kid+diff)+" 歲，"+yrs+" 年後是 "+ans4+" 歲。",
      "小明今年 "+kid+" 歲，爸爸比他大 "+diff+" 歲。"+yrs+" 年後爸爸幾歲？", "數學案件·年齡推理");
  }
  // 5) 雞兔同籠（小數字）
  for (var i5=0; i5<30; i5++){
    var chickens = ri(2,6), rabbits = ri(2,6);
    var heads = chickens + rabbits, legs = chickens*2 + rabbits*4;
    four(rabbits+" 隻", [chickens+" 隻", (rabbits+1)+" 隻", heads+" 隻"],
      "假設全是雞有 "+heads*2+" 隻腳，少了 "+(legs-heads*2)+" 隻，每隻兔子多 2 隻腳，兔子有 "+rabbits+" 隻。",
      "籠子裡有雞和兔共 "+heads+" 隻，腳共有 "+legs+" 隻。兔子有幾隻？", "數學案件·雞兔同籠");
  }
  // 6) 分數比較與加減（同分母/簡單異分母）
  var FR = [["1/2",2,1],["1/3",3,1],["2/3",3,2],["1/4",4,1],["3/4",4,3],["1/5",5,1],["2/5",5,2],["3/5",5,3],["1/6",6,1],["5/6",6,5]];
  for (var i6=0; i6<FR.length; i6++){
    for (var j6=i6+1; j6<FR.length; j6++){
      var f1 = FR[i6], f2 = FR[j6];
      var v1 = f1[2]/f1[1], v2 = f2[2]/f2[1];
      if (Math.abs(v1-v2) < 0.01) continue;
      var big = v1>v2 ? f1[0] : f2[0], small = v1>v2 ? f2[0] : f1[0];
      four(big, [small, "一樣大", "無法比較"],
        "通分後比較，"+big+" 比 "+small+" 大。",
        "哪個分數比較大？", "數學案件·分數比大小");
    }
  }
  // 7) 周長反推
  for (var i7=0; i7<25; i7++){
    var L = ri(5,12), W = ri(2,L-1), peri = (L+W)*2;
    four(W+" 公分", [L+" 公分", (peri/2)+" 公分", (peri-L)+" 公分"],
      "長+寬＝"+peri+"÷2＝"+(peri/2)+"，寬＝"+(peri/2)+"−"+L+"＝"+W+"。",
      "長方形周長是 "+peri+" 公分，長是 "+L+" 公分，寬是多少公分？", "數學案件·周長反推");
  }
  // 8) 倍數推理
  for (var i8=0; i8<30; i8++){
    var base = ri(3,9), mult = ri(3,8), extra = ri(2,20);
    var ans8 = base*mult + extra;
    four(ans8+"", [base*mult+"", base*(mult+1)+"", ans8+base+""],
      base+" 的 "+mult+" 倍是 "+(base*mult)+"，再多 "+extra+" 是 "+ans8+"。",
      "一個數是 "+base+" 的 "+mult+" 倍再多 "+extra+"，這個數是多少？", "數學案件·倍數推理");
  }
  // 9) 規律數列
  var seqs = [];
  for (var i9=0; i9<30; i9++){
    var st = ri(2,20), step = ri(3,9);
    var s = [st, st+step, st+step*2, st+step*3];
    four((st+step*4)+"", [st+step*3+step-1+"", st+step*5+"", st+step*4+2+""],
      "每次加 "+step+"，下一個是 "+(st+step*3)+"+"+step+"＝"+(st+step*4)+"。",
      "依照規律，下一個數是多少？ "+s.join("、")+"、？", "數學案件·數字規律");
  }
  // 10) 平均問題
  for (var i10=0; i10<25; i10++){
    var g1 = ri(60,95), g2 = ri(60,95), g3 = ri(60,95);
    var tot = g1+g2+g3;
    four(tot+" 分", [tot-g3+" 分", (Math.round(tot/3))+" 分", tot+10+" 分"],
      "平均×3＝總分："+g1+"+"+g2+"+"+g3+"＝"+tot+"。",
      "小蘭三次考試分別是 "+g1+" 分、"+g2+" 分、"+g3+" 分，三次總分是多少？", "數學案件·平均與總分");
  }
  g.BANK_MATH_HARD = out;
  g.BANK_MATH = (g.BANK_MATH || []).concat(out);
})(typeof window !== "undefined" ? window : globalThis);
