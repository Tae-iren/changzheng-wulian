/* ===== 活动二 共用数据与工具 ===== */
window.CZ = (function(){
  var EVENT = {
    title: '“重走长征路”校园智行挑战赛',
    short: '校园智行挑战赛',
    time: '2027年1月',
    place: '泉州师范学院 · 校园六点位',
    org: '2024级物联网工程团支部'
  };

  var TEAMS = [
    {id:'t1', name:'瑞金连', color:'#A92D20'},
    {id:'t2', name:'赤水连', color:'#BE8C46'},
    {id:'t3', name:'泸定连', color:'#8397A4'},
    {id:'t4', name:'雪山连', color:'#6E1A12'},
    {id:'t5', name:'草地连', color:'#9A6236'}
  ];

  var STATIONS = [
    {id:'ruijin', no:'01', name:'瑞金出发', date:'1934.10', place:'第二操场', dist:'0.0 km',
     intro:'1934年10月，中央红军8.6万人从江西瑞金等地出发，四天四夜渡过于都河，开始长征。',
     task:'全队到齐合影，答对“出发地”一题，方可领下一段路条。',
     q:{q:'中央红军长征的主要出发地是？', opts:['江西瑞金、于都一带','湖南长沙','陕西延安'], a:0,
        note:'1934年10月，中央红军从江西瑞金等地出发，渡过于都河，踏上长征路。'}},

    {id:'zunyi', no:'02', name:'遵义会议', date:'1935.01', place:'第一操场', dist:'0.6 km',
     intro:'1935年1月，遵义会议召开，确立了以毛泽东同志为主要代表的马克思主义正确路线在党中央的领导地位。',
     task:'在“转折点”展板前完成一题，答对得 2 分。',
     q:{q:'遵义会议最重要的历史意义是？', opts:['确立了毛泽东同志在党中央的领导地位','宣布长征结束','决定成立新中国'], a:0,
        note:'遵义会议是党的历史上一个生死攸关的转折点，开始形成以毛泽东同志为核心的党的第一代中央领导集体。'}},

    {id:'luding', no:'03', name:'飞夺泸定桥', date:'1935.05', place:'荣茂楼', dist:'1.4 km',
     intro:'1935年5月，红四团一昼夜奔袭240里，22名突击队员冒着火力攀铁索夺下泸定桥。',
     task:'全队完成 22 次接力跳绳（每人至少 1 次），再答一题。',
     q:{q:'飞夺泸定桥时，率先攀索突击的勇士有多少人？', opts:['22 名','72 名','120 名'], a:0,
        note:'22 名突击队员攀着铁索冲过桥面，为大部队打开通道。'}},

    {id:'jiajin', no:'04', name:'翻越夹金山', date:'1935.06', place:'清源湖', dist:'2.1 km',
     intro:'1935年6月，中央红军翻越长征途中第一座大雪山——夹金山，海拔4000余米，空气稀薄。',
     task:'全队手拉手通过“雪线”绳圈，不得断开，答对一题。',
     q:{q:'中央红军长征中翻越的第一座大雪山是？', opts:['夹金山','六盘山','岷山'], a:0,
        note:'夹金山是中央红军长征翻越的第一座大雪山，翻越后在懋功与红四方面军会师。'}},

    {id:'caodi', no:'05', name:'穿越草地', date:'1935.08', place:'图书馆', dist:'2.8 km',
     intro:'1935年8月，红军进入松潘草地。表面是草原，下面是沼泽，无粮无水，约七天走出这片“死亡之海”。',
     task:'按路标走完 S 形“草地路线”，不得踩线，答对一题。',
     q:{q:'红军长征走过的草地位于？', opts:['四川松潘（若尔盖）一带','内蒙古草原','江苏沿海滩涂'], a:0,
        note:'松潘草地位于四川西北部，沼泽遍布，是长征中最艰苦的一段路。'}},

    {id:'huining', no:'06', name:'会宁会师', date:'1936.10', place:'理工楼', dist:'3.4 km',
     intro:'1936年10月，红一、红二、红四方面军在会宁、将台堡会师，长征胜利结束。',
     task:'全队把三面旗插上终点牌，答对最后一题，计时停止。',
     q:{q:'红军三大主力会师的地点是？', opts:['甘肃会宁、将台堡','贵州遵义','陕西延安'], a:0,
        note:'1936年10月，三大主力在甘肃会宁、将台堡会师，标志着长征胜利结束。'}}
  ];

  var KEY = 'czsz-data-v1';

  function blank(){ var o = {}; TEAMS.forEach(function(t){ o[t.id] = {records: []}; }); return o; }

  function load(){
    var o = null;
    try { o = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e){}
    if (!o || !o.teams) return {teams: blank(), updated: Date.now(), demo: false};
    TEAMS.forEach(function(t){ if (!o.teams[t.id]) o.teams[t.id] = {records: []}; });
    return o;
  }
  function save(o){
    o.updated = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(o)); return true; } catch(e){ return false; }
  }
  function reset(){ try { localStorage.removeItem(KEY); } catch(e){} }

  function station(id){ for (var i=0;i<STATIONS.length;i++){ if (STATIONS[i].id === id) return STATIONS[i]; } return null; }
  function team(id){ for (var i=0;i<TEAMS.length;i++){ if (TEAMS[i].id === id) return TEAMS[i]; } return null; }

  function stats(o){
    var rows = TEAMS.map(function(t){
      var recs = (o.teams[t.id] && o.teams[t.id].records) || [];
      var score = 0;
      recs.forEach(function(r){ score += Number(r.score || 0); });
      var last = recs.length ? recs[recs.length - 1] : null;
      return {
        id: t.id, name: t.name, color: t.color,
        arrived: recs.length,
        mins: last ? Number(last.mins || 0) : 0,
        score: score,
        rate: recs.length ? Math.round(score / (recs.length * 2) * 100) : 0,
        last: last,
        done: recs.length >= STATIONS.length
      };
    });
    rows.sort(function(a,b){
      if (b.arrived !== a.arrived) return b.arrived - a.arrived;
      if (a.mins !== b.mins) return a.mins - b.mins;
      return b.rate - a.rate;
    });
    rows.forEach(function(r,i){ r.rank = i + 1; });
    return rows;
  }

  function fmtTime(ts){
    var d = new Date(ts);
    function p(n){ return ('0' + n).slice(-2); }
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  function fmtDate(ts){
    var d = new Date(ts);
    return d.getFullYear() + '.' + ('0' + (d.getMonth()+1)).slice(-2) + '.' + ('0'+d.getDate()).slice(-2);
  }
  function makeCode(teamId, stationId){
    var t = team(teamId), s = station(stationId);
    var pre = (t ? t.name.charAt(0) : 'X') + (s ? s.no : '00');
    return pre + '-' + Math.floor(1000 + Math.random() * 9000);
  }

  return {EVENT:EVENT, TEAMS:TEAMS, STATIONS:STATIONS,
          load:load, save:save, reset:reset, blank:blank,
          station:station, team:team, stats:stats,
          fmtTime:fmtTime, fmtDate:fmtDate, makeCode:makeCode};
})();
