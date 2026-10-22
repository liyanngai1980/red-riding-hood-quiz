/* =========================================================
   英文模組（國小 3–5 年級）— 自動生成 3200+ 題
   ========================================================= */
(function (g) {
  "use strict";
  var seed = 777001;
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
    var key = q + "|" + opts[correct];
    if (seen[key]) return; seen[key] = 1;
    out.push({ scene: scene, q: q, opts: opts, correct: correct, explain: explain });
  }
  function four(ans, distractors, explain, q, scene) {
    var opts = shuffle([ans].concat(distractors.slice(0, 3)));
    add(scene, q, opts, opts.indexOf(ans), explain);
  }

  /* 單字庫：[英文, 中文, 詞性] */
  var WORDS = [
    ["apple","蘋果","n"],["banana","香蕉","n"],["orange","橘子","n"],["grape","葡萄","n"],
    ["milk","牛奶","n"],["bread","麵包","n"],["rice","米飯","n"],["water","水","n"],
    ["cake","蛋糕","n"],["egg","蛋","n"],["fish","魚","n"],["chicken","雞肉","n"],
    ["dog","狗","n"],["cat","貓","n"],["bird","鳥","n"],["rabbit","兔子","n"],
    ["tiger","老虎","n"],["lion","獅子","n"],["monkey","猴子","n"],["elephant","大象","n"],
    ["panda","熊貓","n"],["horse","馬","n"],["pig","豬","n"],["cow","牛","n"],
    ["book","書","n"],["pen","筆","n"],["pencil","鉛筆","n"],["ruler","尺","n"],
    ["eraser","橡皮擦","n"],["bag","書包","n"],["desk","書桌","n"],["chair","椅子","n"],
    ["table","桌子","n"],["door","門","n"],["window","窗戶","n"],["bed","床","n"],
    ["school","學校","n"],["park","公園","n"],["zoo","動物園","n"],["home","家","n"],
    ["library","圖書館","n"],["hospital","醫院","n"],["store","商店","n"],["station","車站","n"],
    ["teacher","老師","n"],["student","學生","n"],["doctor","醫生","n"],["nurse","護士","n"],
    ["police","警察","n"],["farmer","農夫","n"],["cook","廚師","n"],["singer","歌手","n"],
    ["father","爸爸","n"],["mother","媽媽","n"],["brother","兄弟","n"],["sister","姊妹","n"],
    ["grandpa","爺爺","n"],["grandma","奶奶","n"],["baby","嬰兒","n"],["friend","朋友","n"],
    ["red","紅色","n"],["blue","藍色","n"],["yellow","黃色","n"],["green","綠色","n"],
    ["black","黑色","n"],["white","白色","n"],["pink","粉紅色","n"],["purple","紫色","n"],
    ["sun","太陽","n"],["moon","月亮","n"],["star","星星","n"],["cloud","雲","n"],
    ["rain","雨","n"],["snow","雪","n"],["wind","風","n"],["sky","天空","n"],
    ["car","汽車","n"],["bus","公車","n"],["train","火車","n"],["ship","船","n"],
    ["plane","飛機","n"],["bike","腳踏車","n"],["taxi","計程車","n"],["boat","小船","n"],
    ["eye","眼睛","n"],["ear","耳朵","n"],["nose","鼻子","n"],["mouth","嘴巴","n"],
    ["hand","手","n"],["foot","腳","n"],["head","頭","n"],["hair","頭髮","n"],
    ["shirt","襯衫","n"],["pants","褲子","n"],["dress","洋裝","n"],["shoes","鞋子","n"],
    ["hat","帽子","n"],["coat","外套","n"],["sock","襪子","n"],["skirt","裙子","n"],
    ["one","一","n"],["two","二","n"],["three","三","n"],["four","四","n"],
    ["five","五","n"],["six","六","n"],["seven","七","n"],["eight","八","n"],
    ["nine","九","n"],["ten","十","n"],["eleven","十一","n"],["twelve","十二","n"],
    ["run","跑","v"],["jump","跳","v"],["swim","游泳","v"],["walk","走路","v"],
    ["read","讀書","v"],["write","寫字","v"],["draw","畫畫","v"],["sing","唱歌","v"],
    ["dance","跳舞","v"],["eat","吃","v"],["drink","喝","v"],["sleep","睡覺","v"],
    ["play","玩","v"],["cook","煮飯","v"],["wash","洗","v"],["clean","打掃","v"],
    ["open","打開","v"],["close","關上","v"],["help","幫忙","v"],["look","看","v"],
    ["big","大的","adj"],["small","小的","adj"],["tall","高的","adj"],["short","矮的","adj"],
    ["long","長的","adj"],["fast","快的","adj"],["slow","慢的","adj"],["happy","快樂的","adj"],
    ["sad","難過的","adj"],["hot","熱的","adj"],["cold","冷的","adj"],["new","新的","adj"],
    ["old","舊的","adj"],["good","好的","adj"],["bad","壞的","adj"],["beautiful","美麗的","adj"],
    ["in","在…裡面","prep"],["on","在…上面","prep"],["under","在…下面","prep"],["behind","在…後面","prep"],
    ["morning","早上","n"],["afternoon","下午","n"],["evening","傍晚","n"],["night","夜晚","n"],
    ["Monday","星期一","n"],["Tuesday","星期二","n"],["Wednesday","星期三","n"],["Thursday","星期四","n"],
    ["Friday","星期五","n"],["Saturday","星期六","n"],["Sunday","星期日","n"],["today","今天","n"]
  ];
  var zhAll = WORDS.map(function (w) { return w[1]; });
  var enAll = WORDS.map(function (w) { return w[0]; });
  function zhOthers(zh, n) {
    var o = [], tries = 0;
    while (o.length < n && tries < 80) { tries++; var c = pick(zhAll); if (c !== zh && o.indexOf(c) < 0) o.push(c); }
    return o;
  }
  function enOthers(en, n) {
    var o = [], tries = 0;
    while (o.length < n && tries < 80) { tries++; var c = pick(enAll); if (c !== en && o.indexOf(c) < 0) o.push(c); }
    return o;
  }

  /* 1. 英翻中 / 中翻英 */
  for (var i = 0; i < WORDS.length; i++) {
    var w = WORDS[i];
    four(w[1], zhOthers(w[1], 3), "<b>" + w[0] + "</b> 就是「" + w[1] + "」。",
      "英文單字「" + w[0] + "」的中文是什麼？", "英文案件·單字偵探");
    four(w[0], enOthers(w[0], 3), "「" + w[1] + "」的英文是 <b>" + w[0] + "</b>。",
      "「" + w[1] + "」的英文是什麼？", "英文案件·單字偵探");
  }

  /* 2. 拼字：選出正確拼法 */
  function misspell(wd) {
    var a = wd.split(""), kind = ri(1, 3);
    if (kind === 1 && a.length > 3) { var k = ri(1, a.length - 2); var t = a[k]; a[k] = a[k + 1]; a[k + 1] = t; }
    else if (kind === 2) { a[ri(0, a.length - 1)] = String.fromCharCode(97 + ri(0, 25)); }
    else { a.splice(ri(1, a.length - 1), 1); }
    var s = a.join("");
    return s === wd ? wd + "s" : s;
  }
  for (var i = 0; i < WORDS.length; i++) {
    var w = WORDS[i];
    if (w[0].length < 3) continue;
    var d1 = misspell(w[0]), d2 = misspell(w[0]), d3 = misspell(w[0]);
    if (d1 === d2 || d2 === d3 || d1 === d3) continue;
    four(w[0], [d1, d2, d3], "正確拼法是 <b>" + w[0] + "</b>（" + w[1] + "）。",
      "哪一個是「" + w[1] + "」的正確英文拼法？", "英文案件·拼字高手");
  }

  /* 3. a / an */
  var AN = WORDS.filter(function (w) { return w[2] === "n"; });
  for (var i = 0; i < AN.length; i++) {
    var w = AN[i];
    var an = /^[aeiou]/.test(w[0]) ? "an" : "a";
    var other = an === "a" ? "an" : "a";
    four(an, [other, "two", "the"], "母音開頭用 <b>an</b>，其他用 <b>a</b>。「" + w[0] + "」是 " + w[0][0] + " 開頭，所以用 <b>" + an + "</b>。",
      "I have ___ " + w[0] + ".（我有一個" + w[1] + "）空格要填什麼？", "英文案件·a 還是 an");
  }

  /* 4. 複數形 */
  var IRREG = { foot: "feet", child: "children", man: "men", woman: "women", tooth: "teeth", mouse: "mice" };
  for (var i = 0; i < AN.length; i++) {
    var w = AN[i], en = w[0], pl;
    if (IRREG[en]) pl = IRREG[en];
    else if (/[^aeiou]y$/.test(en)) pl = en.replace(/y$/, "ies");
    else if (/(s|x|ch|sh|o)$/.test(en)) pl = en + "es";
    else pl = en + "s";
    var wrong = [en + "s", en + "es", en].filter(function (x) { return x !== pl; });
    while (wrong.length < 3) wrong.push(en + "es" + wrong.length);
    four(pl, wrong, "「" + en + "」的複數是 <b>" + pl + "</b>。",
      "I see three ___.（我看到三" + (w[1].match(/^[一二三四五六七八九十]/) ? "個" : "") + w[1] + "）空格要填什麼？", "英文案件·複數形");
  }

  /* 5. is / am / are */
  var SUBJ = [["I", "am"], ["You", "are"], ["He", "is"], ["She", "is"], ["It", "is"],
    ["We", "are"], ["They", "are"], ["My father", "is"], ["My friends", "are"],
    ["The dog", "is"], ["The cats", "are"], ["Conan", "is"], ["Ran and Sonoko", "are"], ["This", "is"], ["These", "are"]];
  var ADJ = ["happy", "tall", "short", "strong", "cute", "busy", "hungry", "smart", "kind", "fast"];
  for (var i = 0; i < SUBJ.length; i++) {
    for (var j = 0; j < 6; j++) {
      var s = SUBJ[i], adj = pick(ADJ);
      var wrongB = ["am", "is", "are"].filter(function (b) { return b !== s[1]; });
      four(s[1], wrongB.concat(["be"]), s[0] + " 後面要用 <b>" + s[1] + "</b>。",
        s[0] + " ___ " + adj + ". 空格要填什麼？", "英文案件·be 動詞");
    }
  }

  /* 6. 現在式 / 過去式 */
  var VERBS = [["play", "played"], ["walk", "walked"], ["cook", "cooked"], ["help", "helped"],
    ["watch", "watched"], ["jump", "jumped"], ["clean", "cleaned"], ["wash", "washed"],
    ["eat", "ate"], ["drink", "drank"], ["run", "ran"], ["swim", "swam"], ["sing", "sang"],
    ["write", "wrote"], ["read", "read"], ["go", "went"], ["see", "saw"], ["take", "took"],
    ["come", "came"], ["make", "made"], ["get", "got"], ["sleep", "slept"]];
  for (var i = 0; i < VERBS.length; i++) {
    var v = VERBS[i];
    var pastD = [v[0], v[0] + "ed", v[0] + "ing", v[0] + "s"].filter(function (x, id, ar) { return x !== v[1] && ar.indexOf(x) === id; });
    while (pastD.length < 3) pastD.push(v[0] + "ed" + (pastD.length + 1));
    four(v[1], pastD.slice(0, 3),
      "「" + v[0] + "」的過去式是 <b>" + v[1] + "</b>。",
      "Yesterday, I ___ with my friends.（昨天）空格要填 " + v[0] + " 的哪一種形式？", "英文案件·過去式");
    var nowD = [v[1], v[0] + "ing", v[0] + "es"].filter(function (x) { return x !== v[0]; });
    while (nowD.length < 3) nowD.push(v[0] + "ed");
    four(v[0], nowD.slice(0, 3),
      "句首是 <b>Every day</b>（每天），要用現在式 <b>" + v[0] + "</b>。",
      "Every day, I ___ at home. 空格要填什麼？", "英文案件·現在式");
  }

  /* 7. 介係詞 */
  var PREP = [["in", "在…裡面"], ["on", "在…上面"], ["under", "在…下面"], ["behind", "在…後面"], ["next to", "在…旁邊"]];
  var ANIMALS = [["cat", "貓"], ["dog", "狗"], ["bird", "鳥"], ["rabbit", "兔子"], ["fish", "魚"]];
  var PLACES = [["box", "箱子"], ["table", "桌子"], ["chair", "椅子"], ["bed", "床"], ["desk", "書桌"]];
  for (var i = 0; i < PREP.length; i++) {
    for (var j = 0; j < ANIMALS.length; j++) {
      for (var k = 0; k < PLACES.length; k++) {
        var p = PREP[i], a = ANIMALS[j], pl2 = PLACES[k];
        var others = PREP.map(function (x) { return x[0]; }).filter(function (x) { return x !== p[0]; });
        four(p[0], shuffle(others).slice(0, 3), "「" + p[1] + "」的英文是 <b>" + p[0] + "</b>。",
          "The " + a[0] + " is ___ the " + pl2[0] + ".（" + a[1] + p[1].replace("…", pl2[1]) + "）空格要填什麼？", "英文案件·介係詞");
      }
    }
  }

  /* 8. 比較級 */
  var CMP = [["tall", "taller"], ["short", "shorter"], ["big", "bigger"], ["small", "smaller"],
    ["fast", "faster"], ["slow", "slower"], ["long", "longer"], ["happy", "happier"],
    ["hot", "hotter"], ["cold", "colder"], ["strong", "stronger"], ["old", "older"]];
  for (var i = 0; i < CMP.length; i++) {
    var c = CMP[i];
    var wrongC = [c[0], c[0] + "er", "more " + c[0]].filter(function (x) { return x !== c[1]; });
    while (wrongC.length < 3) wrongC.push(c[0] + "est");
    four(c[1], wrongC, "「" + c[0] + "」的比較級是 <b>" + c[1] + "</b>。",
      "The elephant is ___ than the cat.（大象比貓更" + "）空格要填 " + c[0] + " 的哪一種形式？", "英文案件·比較級");
  }

  /* 9. 代名詞 */
  var PRON = [["He", "他"], ["She", "她"], ["It", "它"], ["They", "他們"], ["We", "我們"]];
  var PEOPLE = [["Conan is a boy.", "He"], ["Ran is a girl.", "She"], ["The dog is cute.", "It"],
    ["The students are happy.", "They"], ["My friends and I are in Class 4.", "We"],
    ["Dr. Agasa is a man.", "He"], ["Sonoko is a girl.", "She"], ["The books are new.", "They"]];
  for (var i = 0; i < PEOPLE.length; i++) {
    var pp = PEOPLE[i];
    var wrongP = PRON.map(function (x) { return x[0]; }).filter(function (x) { return x !== pp[1]; });
    four(pp[1], shuffle(wrongP).slice(0, 3), "這裡要用 <b>" + pp[1] + "</b>。",
      pp[0] + " ___ 後面要接哪一個代名詞？", "英文案件·代名詞");
  }

  /* 10. 句型問答 */
  var QA = [
    ["What is your name?", ["My name is Conan.", "I am ten.", "It is red.", "Yes, I am."], "問「你叫什麼名字」，要回答名字。"],
    ["How old are you?", ["I am ten years old.", "My name is Ran.", "It is a dog.", "No, thanks."], "問「你幾歲」，要回答年齡。"],
    ["What color is it?", ["It is red.", "I am fine.", "It is a cat.", "Yes, it is."], "問「是什麼顏色」，要回答顏色。"],
    ["How are you?", ["I am fine, thank you.", "I am nine.", "It is blue.", "He is Tom."], "問「你好嗎」，要回答近況。"],
    ["What is this?", ["It is a pencil.", "I am a student.", "Yes, please.", "I am happy."], "問「這是什麼」，要回答物品。"],
    ["Where is the cat?", ["It is under the chair.", "It is a cat.", "I like cats.", "Yes, it is."], "問「貓在哪裡」，要回答地點。"],
    ["Do you like apples?", ["Yes, I do.", "I like apples very much yesterday.", "It is apple.", "Apples is red."], "用 Do 開頭問，用 <b>Yes, I do.</b> 回答最正確。"],
    ["Can you swim?", ["Yes, I can.", "I am swim.", "I like swim.", "Swim is fun."], "用 Can 開頭問，用 <b>Yes, I can.</b> 回答。"],
    ["What time is it?", ["It is three o'clock.", "It is Monday.", "It is sunny.", "It is my book."], "問「幾點了」，要回答時間。"],
    ["What day is today?", ["It is Monday.", "It is five o'clock.", "It is May.", "It is hot."], "問「今天星期幾」，要回答星期。"]
  ];
  for (var i = 0; i < QA.length; i++) {
    var qa = QA[i];
    four(qa[1][0], qa[1].slice(1), qa[2], "「" + qa[0] + "」最好的回答是什麼？", "英文案件·會話達人");
  }

  /* 11. 選出正確句子 */
  var GRAM = [
    [["She likes apples.", "She like apples.", "She liking apples.", "She is like apples."], "第三人稱單數現在式要加 <b>s</b>：like<b>s</b>。"],
    [["They are students.", "They is students.", "They am students.", "They be students."], "They 要搭配 <b>are</b>。"],
    [["I can swim.", "I can swims.", "I can swimming.", "I can to swim."], "can 後面接<b>原形動詞</b>。"],
    [["He does not like fish.", "He do not like fish.", "He does not likes fish.", "He not like fish."], "第三人稱否定用 <b>does not + 原形</b>。"],
    [["There are five books.", "There is five books.", "There be five books.", "There am five books."], "五本書是複數，用 <b>There are</b>。"],
    [["We went to the zoo yesterday.", "We go to the zoo yesterday.", "We goes to the zoo yesterday.", "We going to the zoo yesterday."], "yesterday 要用過去式 <b>went</b>。"]
  ];
  for (var i = 0; i < GRAM.length; i++) {
    four(GRAM[i][0][0], GRAM[i][0].slice(1), GRAM[i][1], "哪一個英文句子是「正確的」？", "英文案件·文法警察");
  }

  /* 12. 看中文填單字（多種句框） */
  var FRAMES = [
    ["This is a ___.（這是一個{zh}）", "n"],
    ["I have a ___.（我有一個{zh}）", "n"],
    ["I can see a ___.（我看到一個{zh}）", "n"],
    ["The ___ is big.（這個{zh}很大）", "n"],
    ["I like to ___.（我喜歡{zh}）", "v"],
    ["He can ___ well.（他很會{zh}）", "v"],
    ["It is very ___.（它非常{zh}）", "adj"]
  ];
  for (var i = 0; i < WORDS.length; i++) {
    var w = WORDS[i];
    for (var f = 0; f < FRAMES.length; f++) {
      if (FRAMES[f][1] !== w[2]) continue;
      four(w[0], enOthers(w[0], 3), "<b>" + w[0] + "</b> 就是「" + w[1] + "」。",
        FRAMES[f][0].replace("{zh}", w[1]) + " 空格要填什麼？", "英文案件·填空高手");
    }
  }

  /* 13. 第三人稱單數動詞加 s */
  for (var i = 0; i < VERBS.length; i++) {
    var v = VERBS[i];
    var s3 = /(s|x|ch|sh|o)$/.test(v[0]) ? v[0] + "es" : v[0] + "s";
    var d3 = [v[0], v[1], v[0] + "ing", v[0] + "ed"].filter(function (x, id, ar) { return x !== s3 && ar.indexOf(x) === id; });
    while (d3.length < 3) d3.push(v[0] + "ed" + d3.length);
    four(s3, d3.slice(0, 3), "主詞是 <b>He</b>（第三人稱單數），動詞要加 s：<b>" + s3 + "</b>。",
      "He ___ every day. 空格要填 " + v[0] + " 的哪一種形式？", "英文案件·動詞變化");
  }

  /* 14. 英文算式 */
  var NUMW = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
  for (var a9 = 1; a9 <= 15; a9++) {
    for (var b9 = 1; b9 <= 15; b9++) {
      var sum = a9 + b9;
      if (sum > 20) continue;
      var dSum = [NUMW[Math.max(0, sum - 1)], NUMW[Math.min(20, sum + 1)], NUMW[Math.min(20, sum + 2)], NUMW[Math.max(0, sum - 2)], NUMW[Math.max(0, sum - 3)], NUMW[Math.min(20, sum + 3)]]
        .filter(function (x, id, ar) { return x && x !== NUMW[sum] && ar.indexOf(x) === id; });
      four(NUMW[sum], dSum.slice(0, 3), NUMW[a9] + " + " + NUMW[b9] + " = <b>" + NUMW[sum] + "</b>。",
        "What is " + NUMW[a9] + " plus " + NUMW[b9] + "?（" + a9 + " + " + b9 + " = ?）", "英文案件·英文算式");
    }
  }

  /* 15. 日子/月份順序 */
  var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var DAYS_ZH = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MONTHS_ZH = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  for (var i = 0; i < DAYS.length; i++) {
    var nxt = DAYS[(i + 1) % 7], nxz = DAYS_ZH[(i + 1) % 7];
    var dD = DAYS.filter(function (x) { return x !== nxt && x !== DAYS[i]; });
    four(nxt, shuffle(dD).slice(0, 3), DAYS[i] + "（" + DAYS_ZH[i] + "）的隔天是 <b>" + nxt + "</b>（" + nxz + "）。",
      "Which day comes after " + DAYS[i] + "?（" + DAYS_ZH[i] + "之後是哪一天？）", "英文案件·星期順序");
  }
  for (var i = 0; i < MONTHS.length; i++) {
    var mn = MONTHS[(i + 1) % 12], mz = MONTHS_ZH[(i + 1) % 12];
    var dM = MONTHS.filter(function (x) { return x !== mn && x !== MONTHS[i]; });
    four(mn, shuffle(dM).slice(0, 3), MONTHS[i] + "（" + MONTHS_ZH[i] + "）的下個月是 <b>" + mn + "</b>（" + mz + "）。",
      "Which month comes after " + MONTHS[i] + "?（" + MONTHS_ZH[i] + "之後是哪個月？）", "英文案件·月份順序");
    four(MONTHS_ZH[i], zhOthers2(MONTHS_ZH[i], MONTHS_ZH), "<b>" + MONTHS[i] + "</b> 就是「" + MONTHS_ZH[i] + "」。",
      "英文「" + MONTHS[i] + "」是幾月？", "英文案件·月份單字");
  }
  function zhOthers2(zh, pool) {
    var o = pool.filter(function (x) { return x !== zh; });
    return shuffle(o).slice(0, 3);
  }

  /* 16. many / much / some / any */
  var CNT = [["books","書"],["apples","蘋果"],["pencils","鉛筆"],["dogs","狗"],["chairs","椅子"],["eggs","蛋"],["stars","星星"],["birds","鳥"]];
  var UNC = [["water","水"],["milk","牛奶"],["rice","米飯"],["bread","麵包"],["juice","果汁"],["soup","湯"]];
  for (var i = 0; i < CNT.length; i++) {
    four("many", ["much", "any", "a"], "可數名詞「" + CNT[i][0] + "」要用 <b>many</b>。",
      "How ___ " + CNT[i][0] + " do you have?（你有多少" + CNT[i][1] + "？）", "英文案件·many 還是 much");
    four("many", ["much", "some", "a"], "「" + CNT[i][0] + "」是可數名詞複數，用 <b>many</b>。",
      "There are ___ " + CNT[i][0] + " in the park.（公園裡有很多" + CNT[i][1] + "）", "英文案件·many 還是 much");
  }
  for (var i = 0; i < UNC.length; i++) {
    four("much", ["many", "a", "two"], "不可數名詞「" + UNC[i][0] + "」要用 <b>much</b>。",
      "How ___ " + UNC[i][0] + " do you drink?（你喝多少" + UNC[i][1] + "？）", "英文案件·many 還是 much");
    four("some", ["a", "an", "many"], "「" + UNC[i][0] + "」不可數，肯定句用 <b>some</b>。",
      "I want ___ " + UNC[i][0] + ".（我想要一些" + UNC[i][1] + "）", "英文案件·some 的用法");
  }

  /* 17. This is / These are */
  var CNT1 = ["book","pen","dog","cat","apple","egg","chair","desk","bird","fish","bag","hat"];
  for (var i = 0; i < CNT1.length; i++) {
    four("This is", ["These is", "This are", "These are"], "一個" + CNT1[i] + "是單數，用 <b>This is</b>。",
      "___ a " + CNT1[i] + ".（這是一個/隻 " + CNT1[i] + "）", "英文案件·This 還是 These");
    four("These are", ["This is", "This are", "These is"], "很多" + CNT1[i] + "s 是複數，用 <b>These are</b>。",
      "___ many " + CNT1[i] + "s.（這些是很多 " + CNT1[i] + "）", "英文案件·This 還是 These");
  }

  /* 18. Wh- 疑問詞 */
  var WH = [
    ["What", "叫什麼名字用 <b>What</b>。", "___ is your name?（你叫什麼名字？）"],
    ["Where", "問地點用 <b>Where</b>。", "___ do you live?（你住在哪裡？）"],
    ["Who", "問「誰」用 <b>Who</b>。", "___ is that boy?（那個男孩是誰？）"],
    ["When", "問時間用 <b>When</b>。", "___ is your birthday?（你的生日是什麼時候？）"],
    ["How", "問「如何、好不好」用 <b>How</b>。", "___ are you?（你好嗎？）"],
    ["How old", "問年齡用 <b>How old</b>。", "___ are you?（你幾歲？）"],
    ["What color", "問顏色用 <b>What color</b>。", "___ is your bag?（你的書包是什麼顏色？）"],
    ["How many", "問數量用 <b>How many</b>。", "___ pencils do you have?（你有幾枝鉛筆？）"]
  ];
  var WH_ALL = WH.map(function (x) { return x[0]; });
  for (var i = 0; i < WH.length; i++) {
    var dW = WH_ALL.filter(function (x) { return x !== WH[i][0]; });
    four(WH[i][0], shuffle(dW).slice(0, 3), WH[i][1], WH[i][2] + " 空格要填什麼？", "英文案件·疑問詞");
  }

  /* 19. 反義詞 */
  var OPP = [["big","small","大的","小的"],["tall","short","高的","矮的"],["fast","slow","快的","慢的"],
    ["hot","cold","熱的","冷的"],["happy","sad","快樂的","難過的"],["new","old","新的","舊的"],
    ["long","short","長的","短的"],["good","bad","好的","壞的"],["open","close","打開","關上"],
    ["day","night","白天","夜晚"],["boy","girl","男孩","女孩"],["up","down","上","下"]];
  for (var i = 0; i < OPP.length; i++) {
    var op = OPP[i];
    var dO = enOthers(op[1], 3);
    four(op[1], dO, "<b>" + op[0] + "</b>（" + op[2] + "）的相反詞是 <b>" + op[1] + "</b>（" + op[3] + "）。",
      "「" + op[0] + "」（" + op[2] + "）的相反詞是什麼？", "英文案件·相反詞");
  }

  /* 20. 身體部位數量 */
  var BODY = [["eyes", 2, "眼睛"], ["ears", 2, "耳朵"], ["hands", 2, "手"], ["feet", 2, "腳"],
    ["legs", 2, "腿"], ["arms", 2, "手臂"], ["nose", 1, "鼻子"], ["mouth", 1, "嘴巴"], ["head", 1, "頭"]];
  for (var i = 0; i < BODY.length; i++) {
    var bd = BODY[i];
    var nw = NUMW[bd[1]];
    var dN = [NUMW[bd[1] + 1], NUMW[Math.max(0, bd[1] - 1)], NUMW[Math.min(20, bd[1] + 2)]]
      .filter(function (x) { return x !== nw; });
    four(nw, dN.slice(0, 3), "人有 <b>" + bd[1] + "</b> 個" + bd[2] + "（" + bd[0] + "）。",
      "How many " + bd[0] + " do you have?（你有幾個" + bd[2] + "？）", "英文案件·身體部位");
  }

  /* 21. 更多名詞句框填空 */
  var FRAMES2 = [
    "The ___ is on the desk.（{zh}在桌上）",
    "I see the ___.（我看到{zh}）",
    "Where is my ___?（我的{zh}在哪裡？）",
    "This ___ is mine.（這個{zh}是我的）",
    "I want a ___.（我想要一個{zh}）",
    "Look at the ___!（看那個{zh}！）",
    "I can draw a ___.（我會畫{zh}）",
    "My ___ is nice.（我的{zh}很棒）",
    "Do you like the ___?（你喜歡{zh}嗎？）"
  ];
  for (var i = 0; i < AN.length; i++) {
    var w = AN[i];
    for (var f = 0; f < FRAMES2.length; f++) {
      four(w[0], enOthers(w[0], 3), "<b>" + w[0] + "</b> 就是「" + w[1] + "」。",
        FRAMES2[f].replace("{zh}", w[1]) + " 空格要填什麼？", "英文案件·看句填字");
    }
  }

  /* 22. 介係詞中翻英 */
  for (var i = 0; i < PREP.length; i++) {
    var p = PREP[i];
    var dP = PREP.map(function (x) { return x[0]; }).filter(function (x) { return x !== p[0]; });
    for (var j = 0; j < 6; j++) {
      var a22 = pick(ANIMALS), pl22 = pick(PLACES);
      four(p[0], shuffle(dP).slice(0, 3), "「" + p[1] + "」的英文是 <b>" + p[0] + "</b>。",
        a22[1] + "在" + pl22[1] + p[1].slice(3) + "。英文「The " + a22[0] + " is ___ the " + pl22[0] + ".」空格要填什麼？", "英文案件·介係詞");
    }
  }

  /* 23. 第二輪拼字（不同錯法） */
  for (var i = 0; i < WORDS.length; i++) {
    var w = WORDS[i];
    if (w[0].length < 4) continue;
    var d1 = w[0].split("").reverse().join("");
    var d2 = w[0].slice(1) + w[0][0];
    var d3 = w[0] + "e";
    var uniq = [d1, d2, d3].filter(function (x, id, ar) { return x !== w[0] && ar.indexOf(x) === id; });
    if (uniq.length < 3) continue;
    four(w[0], uniq, "正確拼法是 <b>" + w[0] + "</b>（" + w[1] + "）。",
      "哪一個是「" + w[1] + "」的正確英文拼法？", "英文案件·拼字高手");
  }

  /* 24. 形容詞填空 */
  var ADJW = WORDS.filter(function (w) { return w[2] === "adj"; });
  var NOUNZ = [["dog","狗"],["elephant","大象"],["cat","貓"],["house","房子"],["boy","男孩"],["girl","女孩"],["tree","樹"],["car","車子"]];
  for (var i = 0; i < ADJW.length; i++) {
    var aw = ADJW[i];
    var enAdj = WORDS.filter(function (x) { return x[2] === "adj"; }).map(function (x) { return x[0]; });
    var dA = enAdj.filter(function (x) { return x !== aw[0]; });
    for (var j = 0; j < NOUNZ.length; j++) {
      four(aw[0], shuffle(dA).slice(0, 3), "<b>" + aw[0] + "</b> 就是「" + aw[1] + "」。",
        "The " + NOUNZ[j][0] + " is very ___.（這" + NOUNZ[j][1] + "非常" + aw[1] + "）空格要填什麼？", "英文案件·形容詞");
    }
  }

  /* 25. 動詞看圖填空 */
  var VERBW = WORDS.filter(function (w) { return w[2] === "v"; });
  var SUBJ2 = ["I", "You", "We", "They"];
  for (var i = 0; i < VERBW.length; i++) {
    var vw = VERBW[i];
    var enV = VERBW.map(function (x) { return x[0]; });
    var dV = enV.filter(function (x) { return x !== vw[0]; });
    for (var j = 0; j < SUBJ2.length; j++) {
      four(vw[0], shuffle(dV).slice(0, 3), "<b>" + vw[0] + "</b> 就是「" + vw[1] + "」。",
        SUBJ2[j] + " ___ every day.（每天{zh}）".replace("{zh}", vw[1]) + " 空格要填什麼？", "英文案件·動詞填空");
    }
  }

  shuffle(out);
  g.BANK_ENGLISH = out;
})(typeof window !== "undefined" ? window : globalThis);

// 難度標記：1 簡單 / 2 普通 / 3 困難（依題目類型分級）
(function(g){
  var TIER = {"單字偵探": 1, "拼字高手": 1, "a 還是 an": 1, "be 動詞": 1, "身體部位": 1, "星期順序": 1, "月份單字": 1, "相反詞": 1, "This 還是 These": 1, "複數形": 1, "介係詞": 2, "填空高手": 2, "動詞填空": 2, "會話達人": 2, "形容詞": 2, "月份順序": 2, "動詞變化": 2, "疑問詞": 2, "many 還是 much": 2, "代名詞": 2, "some 的用法": 2, "英文算式": 3, "比較級": 3, "過去式": 3, "現在式": 3, "文法警察": 3, "看句填字": 3};
  (g.BANK_ENGLISH || []).forEach(function(q){
    q.d = 2;
    for (var k in TIER) if ((q.scene || "").indexOf(k) >= 0) { q.d = TIER[k]; break; }
  });
})(typeof window !== "undefined" ? window : globalThis);

// ===== 進階困難題（d=3）：文法句型與閱讀 =====
(function(g){
  var out = [];
  function mulberry(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; var t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  var rnd = mulberry(31415926);
  function ri(a,b){ return a + Math.floor(rnd()*(b-a+1)); }
  var seen = {};
  function shuffleArr(a){ for(var i=a.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function add(q, correct, wrongs, explain, scene){
    var opts = [String(correct)];
    for (var i=0;i<wrongs.length;i++){ var w=String(wrongs[i]); if(opts.indexOf(w)<0) opts.push(w); if(opts.length>=4) break; }
    if (opts.length<4) return;
    var key = q + opts.join(",");
    opts = shuffleArr(opts);
    if (seen[key]) return; seen[key]=1;
    out.push({ scene:scene, q:q, opts:opts, correct:opts.indexOf(String(correct)), explain:explain, d:3 });
  }

  // 1) 過去式填空（不規則動詞）
  var IRR = [["go","went","去"],["eat","ate","吃"],["see","saw","看見"],["take","took","拿"],["buy","bought","買"],["come","came","來"],["run","ran","跑"],["write","wrote","寫"],["read","read","讀"],["make","made","做"],["give","gave","給"],["fly","flew","飛"],["swim","swam","游泳"],["drink","drank","喝"],["sing","sang","唱"]];
  for (var i1=0;i1<IRR.length;i1++){
    var v = IRR[i1];
    add("Yesterday, I ___ to the park.（昨天我去了公園）",
      v[1], [v[0], v[0]+"ed", "going"],
      "「"+v[0]+"」的過去式是不規則變化「"+v[1]+"」。", "英文案件·過去式進階");
    add("She ___ a song at the party last night.（她昨晚唱了一首歌）",
      "sang", ["sing","sings","singed"],
      "sing 的過去式是 sang（不規則）。", "英文案件·過去式進階");
    break;
  }
  // 批量：用每個不規則動詞出「選過去式」
  for (var i1b=0;i1b<IRR.length;i1b++){
    var vb = IRR[i1b];
    add("「"+vb[0]+"（"+vb[2]+"）」的過去式是哪一個？",
      vb[1], [vb[0]+"ed", vb[0]+"d", vb[0]+"ing"],
      vb[0]+" → "+vb[1]+"（不規則變化，要背起來）。", "英文案件·不規則動詞");
  }
  // 2) 現在進行式
  var VERBS = [["run","running","跑"],["swim","swimming","游泳"],["sit","sitting","坐"],["write","writing","寫"],["make","making","做"],["dance","dancing","跳舞"],["read","reading","讀"],["play","playing","玩"]];
  for (var i2=0;i2<VERBS.length;i2++){
    var vv = VERBS[i2];
    add("Look! The boy is ___.（看！那個男孩正在"+vv[2]+"）",
      vv[1], [vv[0], vv[0]+"ing".replace(vv[0].slice(-1)+vv[0].slice(-1),vv[0].slice(-1)), vv[0]+"s"],
      "現在進行式：be 動詞 + V-ing，「"+vv[0]+"→"+vv[1]+"」。", "英文案件·現在進行式");
  }
  // 3) 第三人稱單數
  var S3 = [["He","plays","play","踢足球"],["She","watches","watch","看電視"],["It","runs","run","跑"],["My father","works","work","工作"],["Amy","studies","study","讀書"],["Tom","goes","go","上學"]];
  var ACT = [["soccer every day","plays","play"],["TV at night","watches","watch"],["fast","runs","run"],["hard","works","work"],["English","studies","study"],["to school by bus","goes","go"]];
  for (var i3=0;i3<S3.length;i3++){
    var s = S3[i3];
    add(s[0]+" ___ "+ACT[i3][0]+".（第三人稱單數）",
      s[1], [s[2], s[2]+"ing", s[1]+"s"],
      "主詞是第三人稱單數（he/she/it/單一人名），動詞要加 -s/-es："+s[2]+"→"+s[1]+"。", "英文案件·三單動詞");
  }
  // 4) 比較級/最高級句型
  var CMP = [["tall","taller","tallest","高"],["big","bigger","biggest","大"],["happy","happier","happiest","快樂"],["fast","faster","fastest","快"],["long","longer","longest","長"]];
  for (var i4=0;i4<CMP.length;i4++){
    var cp = CMP[i4];
    add("An elephant is ___ than a cat.（大象比貓___）",
      cp[0]==="big" ? "bigger" : cp[1], [cp[0], cp[2], "more "+cp[0]],
      "兩者比較用比較級 "+cp[0]+"→"+cp[1]+" + than。", "英文案件·比較級句型");
    add("Monday is the ___ day of my week.（用最高級："+cp[3]+"）",
      cp[2], [cp[0], cp[1], "most "+cp[0]],
      "三者以上或「最…」用最高級 the + "+cp[2]+"。", "英文案件·最高級句型");
  }
  // 5) 介係詞時間/地點進階
  add("We have English class ___ Monday morning.", "on", ["in","at","for"],
    "特定某天的早上用 on：on Monday morning。", "英文案件·介係詞進階");
  add("My birthday is ___ July.", "in", ["on","at","for"],
    "月份前面用 in：in July。", "英文案件·介係詞進階");
  add("The train arrives ___ 7 o'clock.", "at", ["in","on","for"],
    "時刻前面用 at：at 7 o'clock。", "英文案件·介係詞進階");
  add("I have lived here ___ five years.", "for", ["since","in","at"],
    "持續一段時間用 for：for five years。", "英文案件·介係詞進階");
  // 6) 疑問句語序
  add("___ is your name? — My name is Conan.", "What", ["Who","Where","When"],
    "問「什麼」用 What。", "英文案件·疑問句");
  add("___ do you go to school? — By bus.", "How", ["What","Where","Who"],
    "問「方式」用 How。", "英文案件·疑問句");
  add("___ is the library? — It's next to the park.", "Where", ["What","When","How"],
    "問「地點」用 Where。", "英文案件·疑問句");
  add("選出正確的問句語序：", "What time is it?", ["What time it is?","It is what time?","What is time it?"],
    "疑問句要把 be 動詞放到主詞前面：What time is it?", "英文案件·疑問句語序");
  add("選出正確的問句語序：", "Where do you live?", ["Where you do live?","Where live you?","You live where do?"],
    "助動詞 do 放主詞前：Where do you live?", "英文案件·疑問句語序");
  // 7) 閱讀理解（短文）
  var RC = [
    ["Tom has a dog. The dog is black and white. It likes to run in the park.", "What color is the dog?", "Black and white", ["Black","White","Brown"]],
    ["Amy gets up at seven. She has breakfast at seven thirty. She goes to school at eight.", "When does Amy go to school?", "At eight", ["At seven","At seven thirty","At nine"]],
    ["There are twelve boys and fifteen girls in my class.", "How many students are there in the class?", "27", ["12","15","30"]],
    ["Ken likes apples but he doesn't like bananas. His sister likes bananas.", "Who likes bananas?", "Ken's sister", ["Ken","Ken's brother","Ken's father"]]
  ];
  for (var i7=0;i7<RC.length;i7++){
    var r = RC[i7];
    add("閱讀短文：「"+r[0]+"」<br>問題："+r[1], r[2], r[3],
      "答案就在短文裡，仔細找關鍵字。", "英文案件·閱讀理解");
  }
  // 8) 反義句改寫概念
  add("「I can swim.」的否定句是？", "I can't swim.", ["I not can swim.","I don't can swim.","I can not swims."],
    "can 的否定是 can't（cannot）。", "英文案件·否定句");
  add("「She likes cats.」的否定句是？", "She doesn't like cats.", ["She don't like cats.","She not likes cats.","She doesn't likes cats."],
    "第三人稱單數用 doesn't + 原形動詞 like。", "英文案件·否定句");
  g.BANK_ENGLISH_HARD = out;
  g.BANK_ENGLISH = (g.BANK_ENGLISH || []).concat(out);
})(typeof window !== "undefined" ? window : globalThis);
