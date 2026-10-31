/* English copy for the same 17-scene research journey. All figures are fictional. */
window.StillValidEnglish = (() => {
  const green = {
    profit: ['Operating profit grows', 'Profit after operating costs'],
    sales: ['Revenue grows', 'Money earned from selling goods or services'],
    contract: ['A major contract or new business emerges', 'Orders, new factories, new business'],
    dividend: ['More value is returned to shareholders', 'Dividends or share buybacks'],
    unknown: ['I am not sure yet what will improve', 'A recommendation or a rising price · cannot be combined with another reason']
  };
  const red = {
    dilution: ['New shares could dilute my ownership', '2025 half-year report · ₩15 billion in convertible bonds outstanding.'],
    debt: ['Debt rises substantially', '2025 half-year report · the debt-to-equity ratio rose from 90% to 140% in one year.'],
    lawsuit: ['A lawsuit could lead to a major payment', '2025 half-year report · one ongoing lawsuit is listed under contingent liabilities.']
  };
  const name = id => (green[id] || [''])[0];
  const riskName = id => (red[id] || [''])[0];
  const riskEvidence = id => (red[id] || ['', ''])[1];
  const badge = (label, cls='') => '<span class="mini-badge '+cls+'">'+label+'</span>';
  const para = t => '<p class="lead">'+t+'</p>';
  const block = t => '<div class="plain-card">'+t+'</div>';
  const question = (title, body) => '<div class="question-block"><b>'+title+'</b>'+body+'</div>';
  function content(c) {
    const {s, btn, row, card, status, source, eyebrow, escapeHtml, redHit, statusNow} = c;
    const eg = id => name(id);
    const er = id => riskName(id);
    const stock = 'Hanbit Mobility';
    const pending = status('You may wait · unchanged');
    switch (s.scene) {
      case 'intro':
        return eyebrow('Hanbit Mobility · KOSDAQ · EV parts · ₩12,400')+
          '<h1>Before buying Hanbit Mobility,<br>set your flags with AI.</h1>'+
          para('Three short questions. When the price moves or the company makes an official filing, revisit the reasons you chose.')+
          '<div class="step-list"><div class="step-row"><span class="step-num">1</span><div><b>Green flag · Why buy?</b><span>Choose your reason, then decide with AI how to check it in filings.</span></div></div><div class="step-row red"><span class="step-num">2</span><div><b>Red flag · What would make you reconsider?</b><span>Choose from risks supported by the filings available when you buy.</span></div></div><div class="step-row gray"><span class="step-num">3</span><div><b>Price and available funds</b><span>Record your thinking. These answers do not affect the flag assessment.</span></div></div></div>'+
          row(btn('Set my criteria before buying (1 min)','next'),btn('Maybe later','skip','text-button'));
      case 'q1':
        return eyebrow('Question 1 / 3 · <span class="green-text">Green flag · Reason to buy</span>')+
          '<h1>What do you expect to improve at this company?</h1>'+
          para('Choose up to two. Your first choice is your main reason. Each can later be checked against an official company filing.')+
          '<div class="choice-grid">'+Object.entries(green).map(([id,g])=>'<button type="button" class="choice-card '+(s.greens.includes(id)?'selected green':'')+'" data-green="'+id+'"><span class="choice-top"><b>'+g[0]+'</b>'+(s.greens[0]===id?badge('Main reason'):s.greens[1]===id?badge('Also consider'):'')+'</span><small>'+g[1]+'</small></button>').join('')+'</div>'+
          '<div class="helper"><b>AI</b><span>Choose for yourself first. Next we will decide how to check your choice in a filing. I will not recommend a reason based only on past performance.</span></div>'+
          row(btn('Next · Define the check with AI','next','primary',!s.greens.length));
      case 'clarify':
        return eyebrow('Question 1 / 3 · <span class="green-text">Green flag</span> · Define the check with AI')+
          '<div class="chat"><div class="bubble ai"><span class="who">AI · Example conversation</span>You chose '+s.greens.map(eg).join(', ')+'. What makes you expect this? One line is enough, and you can skip it.</div>'+
          (s.memo?'<div class="bubble user"><span class="who">You</span>'+escapeHtml(s.memo)+'</div>':'')+
          '<div class="bubble ai"><span class="who">AI · Example conversation</span>Should we check the whole company or only its EV parts business? That choice can change how the same filing is assessed.</div></div>'+
          '<label class="field-label" for="memo">Why I expect this · optional</label><textarea id="memo" class="note-input" placeholder="For example: EV parts will sell well">'+escapeHtml(s.memo)+'</textarea>'+
          '<div class="section-label">Scope to check in the filing</div><div class="radio-row"><button type="button" data-scope="company" class="'+(s.scope==='company'?'selected':'')+'">Whole company</button><button type="button" data-scope="parts" class="'+(s.scope==='parts'?'selected':'')+'">EV parts business</button></div>'+
          (s.scope?card('green',s.greens.map((id,i)=>'<b>'+eg(id)+(i===0?'<small> · Main reason</small>':'')+'</b>').join('')+'<small>'+(s.scope==='company'?'Whole company':'EV parts business')+' · annual · compared with last year · check the next annual report</small>'):'')+
          row(btn('Use these criteria','next','primary',!s.scope),btn('Edit choices','back','secondary'))+
          source('Your words are saved as written. This example AI asks only questions that can change how a filing is assessed.');
      case 'q2':
        return eyebrow('Question 2 / 3 · <span class="red-text">Red flag · Reason to revisit</span>')+
          '<div class="helper"><b>AI</b><span>I found these possible concerns in filings available when you bought (2025 half-year report). Choose one.</span></div>'+
          '<h1 style="margin-top:19px">Which event would make you<br>reconsider your decision?</h1>'+
          '<div class="choice-grid">'+Object.entries(red).map(([id,r])=>'<button type="button" class="choice-card '+(s.risk===id?'selected red':'')+'" data-risk="'+id+'"><span class="choice-top"><b>'+r[0]+'</b>'+badge('AI suggestion','red')+'</span><small>'+r[1]+'</small></button>').join('')+'</div>'+
          block('A concern about no profit is omitted because it overlaps with the operating-profit Green flag.<br>These filing-based examples do not cover every risk. Their order does not indicate importance.')+
          block('<strong>Always monitor</strong><br>Audit opinion issues · embezzlement or breach of trust · trading suspension or delisting grounds')+
          row(btn('Next','next','primary',!s.risk),btn('Back','back','secondary'));
      case 'q3':
        return eyebrow('Question 3 / 3 · For your record')+
          '<h1>Two final questions:<br>price and available funds</h1>'+
          para('These answers capture what you thought when buying. They do not affect how filings are compared with your flags.')+
          question('The price rose 80% in the past year. Do you think your expected change is still underpriced?',
            '<div class="radio-row">'+[['yes','Yes'],['unsure','Not sure'],['no','No']].map(([id,t])=>'<button type="button" data-price-view="'+id+'" class="'+(s.priceView===id?'selected':'')+'">'+t+'</button>').join('')+'</div><div class="subtle">Some of that expectation may already be in the price. There is no right answer.</div>')+
          question('Will you not need this money within a year, and could you lose it without disrupting daily life?',
            '<div class="radio-row">'+[['yes','Yes, these are available funds'],['no','No']].map(([id,t])=>'<button type="button" data-funds="'+id+'" class="'+(s.funds===id?'selected':'')+'">'+t+'</button>').join('')+'</div>')+
          '<div class="subtle">The next check date and position size are recorded without another question.</div>'+
          row(btn('Next','next','primary',!s.priceView||!s.funds),btn('Back','back','secondary'));
      case 'review':
        return eyebrow(stock+' · Nov 12 · Not saved yet')+'<h1>Save these criteria?</h1>'+
          card('green',s.greens.map((id,i)=>'<small>'+(i?'Also consider':'Main reason')+' · Chosen by you</small><b>'+eg(id)+'</b>').join('')+'<small>How to check · Compare annual '+(s.scope==='parts'?'EV parts business':'whole-company')+' figures with last year.</small>')+
          card('red','<b>'+er(s.risk)+'</b><small>AI suggestion · Chosen by you · '+riskEvidence(s.risk)+'</small><br><small>Always monitor · Audit issues, embezzlement, trading suspension or delisting grounds</small>')+
          block('<strong>When to check</strong><br>Next annual report · expected late March 2026'+(s.memo?'<br><br>Your note · “'+escapeHtml(s.memo)+'”':''))+
          para('The first record stays intact. If your thinking changes, add a new version.')+
          row(btn('Save criteria','saveCriteria'),btn('Edit choices','back','secondary'));
      case 'saved':
        return '<div class="success-icon">✓</div>'+eyebrow(stock+' · Nov 12')+'<h1>Criteria saved</h1>'+
          para('The first record stays intact. If your thinking changes, add a new version.')+
          block('<strong>'+s.greens.length+' Green flag(s) · 1 Red flag + always-monitored issues</strong><br>Saved · version '+s.versions.length)+
          block('<strong>Simulated order</strong><br>No order has been placed. Saving criteria and ordering are separate actions.')+
          row(btn('View my stocks','next'),btn('View saved criteria','history','secondary'));
      case 'portfolio':
        return eyebrow('Dec 1 · 3 stocks')+'<h1>My stocks</h1>'+
          para('See the current status against the criteria you set when buying. Returns do not affect this assessment.')+
          '<div class="story-list"><div class="story-card"><div class="topline"><b>'+stock+'</b>'+status(statusNow(),redHit()?'red':'')+'</div><p>No filing has yet confirmed Green flag “'+eg(s.greens[0]||'profit')+'”, and '+(redHit()?'a filing related to your Red flag has appeared.':'your Red flag has not occurred.')+'</p><p>Next check · annual report, late March 2026</p></div>'+
          '<div class="story-card"><div class="topline"><b>Dodam Foods</b>'+status('Not enough to assess','blue')+'</div><p>A factory responsible for 22% of sales was suspended for three months. This announcement alone does not tell us whether annual revenue will rise.</p></div>'+
          '<div class="story-card"><div class="topline"><b>Garam Electronics</b>'+status('No criteria set','gray')+'</div><p>You did not set criteria when buying.</p></div></div>'+
          row(btn('Next scene · Jan 15','next'),btn('View history','history','secondary'));
      case 'price':
        return eyebrow(stock+' · Price −15% · Jan 15')+'<div style="margin-bottom:12px">'+pending+'</div>'+
          '<h1>No new filing has changed<br>your criteria yet</h1>'+
          para('The reason for a price move may lie outside company filings.')+
          '<div class="section-label">Your flags</div>'+card('green','<b>'+eg(s.greens[0]||'profit')+'</b>')+card('red','<b>'+er(s.risk||'dilution')+'</b>')+
          block('<strong>What we checked</strong><br>Price −15% · No new filing<br><br>The price move does not affect this assessment. Check your Green flag in the next annual report.')+
          row(btn('See the evidence','evidence'),btn('Next scene','lawsuit','secondary'));
      case 'evidence':
        return eyebrow('Jan 15 · Evidence checked')+'<h1>Why is the status unchanged?</h1>'+
          '<div class="timeline"><button type="button"><span class="dot green"></span><span><b>Criteria set when buying</b><small>'+s.greens.length+' Green flag(s) · 1 Red flag</small></span><time>Nov 12</time></button>'+
          '<button type="button"><span class="dot"></span><span><b>Quarterly report reviewed</b><small>No new fact matches your Red flag</small></span><time>Nov 14</time></button>'+
          '<button type="button"><span class="dot"></span><span><b>Price −15%</b><small>Price move outside filings · status unchanged</small></span><time>Jan 15</time></button></div>'+
          block('Check whether operating profit or revenue actually rose in the next annual report. An unchecked expectation is not marked as confirmed.')+
          row(btn('Next scene · Patent lawsuit','lawsuit'),btn('My stocks','portfolio','secondary'));
      case 'lawsuit':
        return eyebrow(stock+' · Jan 28')+'<h1>A new filing appeared,<br>but it does not match your flag</h1>'+
          para('A patent lawsuit was disclosed. This filing alone does not establish the financial impact relevant to your chosen Red flag or confirm the annual results for your Green flag.')+
          block('<strong>What happened</strong><br>Patent lawsuit filed · Jan 28<br><br><strong>Link to your criteria</strong><br>No direct link · previous status remains')+
          block(status('You may wait')+'<p style="margin:8px 0 0">A new filing alone does not change the assessment.</p>')+
          row(btn('Next scene · Convertible bonds','cb'),btn('See my criteria','evidence','secondary'));
      case 'cb':
        if ((s.risk||'dilution')!=='dilution')
          return eyebrow(stock+' · Feb 10 · Convertible bond decision')+'<div style="margin-bottom:12px">'+status('You may wait')+'</div>'+
            '<h1>This filing does not directly<br>match your chosen Red flag</h1>'+
            para('The company decided to issue ₩30 billion in convertible bonds. Your chosen Red flag is “'+er(s.risk)+'”, so this filing does not trigger a conflict with your criteria.')+
            card('red','<b>Your criterion · '+er(s.risk)+'</b><small>'+riskEvidence(s.risk)+'</small>')+
            block('A filing that does not directly match your criterion leaves the previous status in place.')+
            row(btn('View history','history'),btn('Choose another Red flag','q2','secondary'));
        return eyebrow(stock+' · Feb 10 · Convertible bond decision')+'<div style="margin-bottom:12px">'+status('Time to reconsider','red')+'</div>'+
          '<h1>Something now matches the<br>Red flag you set when buying</h1>'+
          para('Convertible bonds could create new shares and dilute ownership. Neither the price move nor unrelated filings led to this assessment.')+
          card('red','<small>Your original criterion</small><b>'+er(s.risk||'dilution')+'</b><small>New filing · ₩30 billion in convertible bonds · about 3 million shares on conversion, potentially 8% of current shares</small>')+
          block('<strong>Company explanation · Not yet verified</strong><br>Proceeds intended for new production equipment')+
          '<div class="helper"><b>AI</b><span>This does not tell you to sell. You asked to revisit your decision if this happened. The decision is yours.</span></div>'+
          row(btn('Next scene · CEO change','ceo'),btn('Reflect now','reflect','secondary'))+
          source('Fictional filing for this demo. Figures and AI responses illustrate the research journey.');
      case 'ceo':
        if ((s.risk||'dilution')!=='dilution')
          return eyebrow(stock+' · Feb 14')+'<h1>The CEO change does not<br>directly match your flag</h1>'+
            para('The previous status remains. A new filing does not automatically erase or reverse an earlier assessment.')+
            row(btn('View history','history'));
        return eyebrow(stock+' · Feb 14')+'<div style="margin-bottom:12px">'+status('Time to reconsider','red')+'</div>'+
          '<h1>A new filing arrived, but<br>your earlier concern remains</h1>'+
          para('The CEO change does not directly match your flags. Your Feb 10 Red flag stays open until you review it.')+
          '<div class="timeline"><button type="button" class="red"><span class="dot"></span><span><b>Convertible bond decision</b><small>Matches Red flag · Not reviewed yet</small></span><time>Feb 10</time></button>'+
          '<button type="button"><span class="dot"></span><span><b>CEO change</b><small>No direct link to your flags</small></span><time>Feb 14</time></button></div>'+
          row(btn('Revisit my criteria','reflect'),btn('History','history','secondary'));
      case 'reflect':
        return eyebrow(stock+' · Feb 15')+'<h1>Knowing this, do you still<br>hold your original expectation?</h1>'+
          para('Put your original criteria beside the new facts. You decide whether to buy or sell.')+
          block('<strong>Your original expectation</strong><br>'+eg(s.greens[0]||'profit')+'<br><br><strong>What we know now</strong><br>₩30 billion convertible bond decision · potentially 8% of current shares on conversion<br><br><strong>Company explanation · Unverified</strong><br>Proceeds intended for new production equipment')+
          question('What happened?',para('A filing disclosed a decision that could dilute ownership, the concern you identified when buying.'))+
          question('How does it affect your expectation?',para('Consider your growth expectation alongside the possibility of dilution.'))+
          row(btn('Choose what to do','choice'));
      case 'choice':
        return eyebrow(stock+' · Feb 15')+'<h1>Knowing this, do you still<br>hold your original expectation?</h1>'+
          para('No answer is preselected. Review your choice before confirming.')+
          '<div class="choice-grid"><button type="button" class="choice-card '+(s.decision==='keep'?'selected neutral':'')+'" data-decision="keep"><b>Yes, keep my criteria</b><small>Move this Red flag to reviewed events. Tell me if something similar happens again.</small></button>'+
          '<button type="button" class="choice-card '+(s.decision==='revise'?'selected neutral':'')+'" data-decision="revise"><b>Revise my criteria</b><small>Choose Green and Red flags again with AI. Keep the first version in history.</small></button>'+
          '<button type="button" class="choice-card '+(s.decision==='later'?'selected neutral':'')+'" data-decision="later"><b>Review later</b><small>The status stays “Time to reconsider” until I review it.</small></button></div>'+
          row(btn('Confirm','confirm','primary',!s.decision),btn('Back','reflect','secondary'));
      case 'confirmed':
        return '<div class="success-icon">✓</div>'+eyebrow(stock+' · Feb 15')+'<h1>Reviewed</h1>'+
          para('The Feb 10 event stays in reviewed events. Check the Green flag in the next annual report.')+
          block('<strong>Current status · Reassessed</strong><br><br>'+status('Under my criteria, I may wait')+'<p style="margin:10px 0 0">No unreviewed Red flag remains. There is still no filing to check your Green flag. One event reviewed.</p>')+
          block('<strong>My criteria</strong><br>Version '+s.versions.length+' · Feb 15 · kept after review<br>First version · Nov 12 · preserved')+
          row(btn('View history','history'),btn('My stocks','portfolio','secondary'));
      case 'history':
        return eyebrow(stock+' history')+'<h1>History</h1>'+
          block('<strong>Current status</strong><br>'+status(statusNow(),redHit()?'red':'')+'<br>Active criteria · version '+(s.versions.length||1)+' · first version preserved')+
          '<div class="timeline"><button type="button" class="'+(s.ack?'green':'')+'" data-action="confirmed"><span class="dot"></span><span><b>Feb 10 event '+(s.ack?'reviewed':'not yet reviewed')+'</b><small>'+(s.ack?'Criteria kept · Red flag moved to reviewed events':redHit()?'Time to reconsider':'No direct link to the chosen flag')+'</small></span><time>Feb 15</time></button>'+
          '<button type="button" data-action="ceo"><span class="dot"></span><span><b>CEO change</b><small>No direct link to my flags</small></span><time>Feb 14</time></button>'+
          '<button type="button" class="red" data-action="cb"><span class="dot"></span><span><b>₩30 billion convertible bond decision</b><small>'+((s.risk||'dilution')==='dilution'?'Matches Red flag → Time to reconsider':'No direct link to my Red flag')+'</small></span><time>Feb 10</time></button>'+
          '<button type="button" data-action="lawsuit"><span class="dot"></span><span><b>Patent lawsuit filed</b><small>No direct link to my flags</small></span><time>Jan 28</time></button>'+
          '<button type="button" data-action="price"><span class="dot"></span><span><b>Price −15%</b><small>Outside filings · status unchanged</small></span><time>Jan 15</time></button>'+
          '<button type="button" class="green" data-action="review"><span class="dot"></span><span><b>First criteria recorded</b><small>'+(s.greens.length||2)+' Green flag(s) · 1 Red flag + always-monitored issues · preserved</small></span><time>Nov 12</time></button></div>'+
          row(btn('My stocks','portfolio'),btn('Start again','intro','secondary'));
      default: return '';
    }
  }
  function market(c) {
    const {s, status, redHit, statusNow, chart} = c;
    const holding = ['portfolio','price','evidence','lawsuit','cb','ceo','reflect','choice','confirmed','history'].includes(s.scene);
    if (holding) {
      const down = ['price','evidence','lawsuit','cb','ceo','reflect','choice','confirmed','history'].includes(s.scene);
      return '<div class="market-head"><h2>My holdings</h2><div class="subtle">Virtual funds ₩10,000,000 · 3 stocks</div></div>'+
        '<div class="market-body"><table class="market-table"><thead><tr><th>Stock</th><th>My criteria</th><th>Held</th><th>Value · Return</th></tr></thead><tbody>'+
        '<tr class="highlight"><td class="stock">Hanbit Mobility <span class="tag">My criteria</span></td><td>'+status(statusNow(),redHit()?'red':'')+'</td><td>40 shares</td><td>'+(down?'₩421,600 · −15.0%':'₩504,000 · +1.6%')+'</td></tr>'+
        '<tr><td class="stock">Dodam Foods <span class="tag">My criteria</span></td><td>'+status('Not enough to assess','blue')+'</td><td>20 shares</td><td>₩1,124,000 · +6.0%</td></tr>'+
        '<tr><td class="stock">Garam Electronics</td><td>'+status('No criteria set','gray')+'</td><td>8 shares</td><td>₩912,000 · −2.0%</td></tr></tbody></table>'+
        '<div class="market-note">Stocks with my criteria · All stocks are fictional.</div></div>';
    }
    const tabs = [['chart','Chart'],['orderbook','Order book'],['disclosures','Filings'],['about','Info']];
    const periods = [['1일','1D'],['1주','1W'],['3개월','3M'],['1년','1Y']];
    let body = '';
    if (s.marketTab==='chart')
      body = '<div class="quote"><div><span class="price">₩12,400</span><span class="delta">▲ ₩120 (+0.98%)</span></div><div class="period">'+periods.map(([id,t])=>'<button type="button" data-period="'+id+'" class="'+(s.period===id?'active':'')+'">'+t+'</button>').join('')+'</div></div>'+chart(false);
    else if (s.marketTab==='disclosures')
      body = '<div class="plain-card"><strong>Recent filings</strong><p>Nov 14, 2025 · Quarterly report</p><p>Aug 14, 2025 · Half-year report</p></div><div class="chart-wrap"></div>';
    else if (s.marketTab==='orderbook')
      body = '<div class="plain-card"><strong>Order book · Simulated</strong><p>Bid ₩12,400 · Ask ₩12,410</p></div><div class="chart-wrap"></div>';
    else
      body = '<div class="plain-card"><strong>Hanbit Mobility</strong><p>A fictional EV parts company. These sample figures support the StillValid journey on the right.</p></div><div class="chart-wrap"></div>';
    return '<div class="market-head"><div class="market-titlebar"><div><h2>Hanbit Mobility</h2><div class="subtle">KOSDAQ · EV parts · Fictional stock</div></div><div class="market-tabs">'+tabs.map(([id,t])=>'<button type="button" data-market-tab="'+id+'" class="'+(s.marketTab===id?'active':'')+'">'+t+'</button>').join('')+'</div></div></div>'+
      '<div class="market-body '+(['q1','clarify','q2','q3','review'].includes(s.scene)?'muted-market':'')+'">'+body+
      '<div class="order-card"><div class="order-lines"><span>Order type</span><span>Limit buy</span><span>Order price</span><span>₩12,400</span><span>Quantity</span><span>40 shares</span><strong>Order amount</strong><strong>₩496,000</strong></div>'+
      '<div class="order-action"><button type="button" data-action="mockOrder">Place buy order</button><small>Awaiting confirmation · Simulated</small></div></div></div>';
  }
  return {content, market, name, riskName};
})();
