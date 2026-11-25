(() => {
  const stage=document.getElementById('editor-tour'), img=document.getElementById('editor-tour-image'), toggle=document.getElementById('editor-tour-play');
  const buttons=[...document.querySelectorAll('[data-editor-frame]')];
  const frames=['simple','monaco','full-editor'];
  const captions=['Simple: a focused plain-text editor for quick changes.','Editor engine: Monaco syntax highlighting, line numbers, and a minimap.','Full editor: the embedded VS Code–based code-server workspace.'];
  let playing=false, start=0, timer, selected=0, manuallyPaused=false;
  function label(index){selected=index;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));document.getElementById('editor-tour-caption').textContent=captions[index];}
  function stop(index=selected){playing=false;clearInterval(timer);img.onload=null;img.src='assets/editors/'+frames[index]+'-fictional.png';img.alt=captions[index]+' Fictional demo files and code.';toggle.textContent='Play animation';toggle.setAttribute('aria-pressed','false');label(index);}
  function play(){playing=true;label(0);toggle.textContent='Pause animation';toggle.setAttribute('aria-pressed','true');img.alt='Animated comparison of Simple, Monaco editor engine, and Full editor using fictional code.';img.onload=()=>{start=Date.now();clearInterval(timer);timer=setInterval(()=>label(Math.floor((Date.now()-start)/4000)%3),200);};img.src='assets/editors/editor-choices.gif?v=62';}
  toggle.onclick=()=>{if(playing){manuallyPaused=true;stop();}else{manuallyPaused=false;play();}};
  buttons.forEach(b=>b.onclick=()=>{manuallyPaused=true;stop(Number(b.dataset.editorFrame));});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)stop(0);else play();
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches){manuallyPaused=true;stop();}});
})();

// All examples are local UI demonstrations; no microphone or agent requests.
const castDefinitions={cat:{name:'Josie',description:'An orange tabby cat named Josie, with a cream muzzle, curious green eyes, and tall pointed ears.',change:'Give Josie a soft blue coat and a pink nose.',color:'#d58b43',changed:'#7b9cb1',ear:'#eab4a1'},dog:{name:'Peppie',description:'A blue heeler named Peppie, with upright ears, a pale muzzle, and a black patch surrounding her left eye (on the viewer’s right).',change:'Make one ear floppy and add a warm tan patch.',color:'#758a9d',changed:'#758a9d',ear:'#455b71'},frog:{name:'Chanticleer',description:'A bright green frog named Chanticleer, with big golden eyes, a pale belly, and a wide friendly smile.',change:'Give Chanticleer a tiny golden crown.',color:'#72a956',changed:'#72a956',ear:'#dbe6a2'}};
castDefinitions.poppie={name:'Poppie',description:'Poppie, the black Australian shepherd from your blueherd cast: slightly raised ears with outward-folding tips, a narrow white blaze, tan eyebrows, and a pale muzzle.',change:'Preview Poppie’s focused expression with her outward-folding ears.'};
const castPresets={cat:{model:'Astra',effort:'High',note:'Josie’s example preset'},dog:{model:'Mythos',effort:'Medium',note:'Peppie’s example preset'},poppie:{model:'Claude Opus',effort:'High',note:'Poppie’s example preset'},frog:{model:'Gemini Flash',effort:'Agent default',note:'Artistic & creative. A Gemini Flash preset for brainstorming, visual concepts, and imaginative alternatives.'}};
castDefinitions.julia={name:'Julia',description:'Josie’s rounder orange-tabby counterpart. A plush cream muzzle, a permanent scowl, and very little patience for fluff.',change:'Give Julia a slate-blue coat. Keep the attitude.',color:'#d58b43',changed:'#7b9cb1',ear:'#eab4a1'};
castDefinitions.piper={name:'Piper',description:'Piper in the shared dog portrait style, preserving her blue coat, pale blaze, and brown muzzle. Chanticleer’s playful energy, with a lightweight OpenAI preset.',change:'Preview Piper’s focused working expression.'};
castDefinitions.pennie={name:'Penny',description:'Penny (Pennie in the app): A black face, white muzzle, and black nose, with ears that stand three-quarters upright before folding outward. Cranky, concise, and focused on straightforward tasks.',change:'Preview Penny’s focused working expression.'};
castPresets.julia={model:'Grok',effort:'Agent default',note:'Blunt, impatient with fluff, and straight to the point.',reply:'The button needs a clearer label. Change it to “Save changes.” Done.'};
castPresets.piper={model:'GPT-6 Luna',effort:'Low',note:'Quick & playful. An OpenAI Luna preset for lightweight everyday help, with a little comic relief.',reply:'That button is playing hide-and-seek. Let’s call it “Save changes” so everyone wins.'};
castPresets.pennie={model:'Claude Haiku',effort:'Agent default',note:'No jokes. No small talk. A Claude Haiku preset for concise answers and focused everyday tasks; questions only when necessary.',reply:'Rename the button “Save changes.” Keep its position. Check keyboard access.'};
Object.assign(castPresets.cat,{note:'Old & wise. Thoughtful, capable, and attentive to the details.',reply:'Use “Save changes” to make the outcome clear. I’d also check contrast and keyboard focus.'});
Object.assign(castPresets.dog,{note:'Old & wise. A sharp partner for reasoning through difficult work.',reply:'Make the action explicit, then confirm that saving succeeds before showing a success message.'});
Object.assign(castPresets.poppie,{note:'Young-hearted, but very smart. Careful, thorough, and ready for complex problems.',reply:'I’d review the label, save behavior, loading state, and error feedback together.'});
castPresets.frog.reply='Try “Save changes” with a tiny checkmark animation. Clear words, a little visual delight, and no mystery about what happens next.';
function castSvg(kind,changed=false,mood='happy'){
if(['pennie','poppie','piper'].includes(kind)){
 const penny=kind==='pennie',poppy=kind==='poppie';
 let portrait=castSvg('dog',false,changed?'working':penny&&mood==='happy'?'waiting':mood).replace('Peppie',castDefinitions[kind].name);
 // Shared dog proportions, individual coat palettes, one eye on either side.
 const palette=penny?{'#758a9d':'#17191c','#455b71':'#343439','#cbd4da':'#17191c','#ece4ce':'#ffffff','#39473c':'#0c0c0b'}:poppy?{'#758a9d':'#2b2a30','#455b71':'#0c0b0d','#cbd4da':'#ffffff','#ece4ce':'#f2ede4','#39473c':'#0c0b0d','#17191c':'#2b2a30'}:{'#758a9d':'#6f86a8','#455b71':'#3a4558','#cbd4da':'#f2f2f0','#ece4ce':'#9a6234','#39473c':'#1c1c1f','#17191c':'#6f86a8','#dbeea7':'#fbfbf8'};
 portrait=portrait.replace(/#[0-9a-f]{6}/g,color=>palette[color]||color);
 if(penny||poppy){
 const coat=penny?'#17191c':'#2b2a30',fold=penny?'#343439':'#0c0b0d',top=penny?5:7;
 const ears=`<g aria-label="Raised ears folding outward"><rect x="4" y="3" width="6" height="8" fill="#e2edf8"/><rect x="14" y="3" width="6" height="8" fill="#e2edf8"/><path d="M5 11V${top+1}H6V${top}H9V11Z M15 11V${top}H18V${top+1}H19V11Z" fill="${coat}"/><path d="M6 ${top}H4V${top+1}H3V${top+4}H5V${top+2}H7V${top+1}H6Z M18 ${top}H20V${top+1}H21V${top+4}H19V${top+2}H17V${top+1}H18Z" fill="${fold}"/></g>`;
 portrait=portrait.replace('</svg>',ears+'</svg>');
 }
 if(poppy)portrait=portrait.replace('</svg>','<g fill="#b5652b"><rect x="7" y="10" width="3" height="1"/><rect x="14" y="10" width="3" height="1"/></g></svg>');
 return portrait;
}
const d=castDefinitions[kind],c=changed?d.changed:d.color;let out=`<svg viewBox="0 0 24 24" role="img" aria-label="${d.name}, ${mood}${changed?', revised example':''}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">`;const r=(x,y,w,h,f)=>out+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;r(2,2,20,20,'#e2edf8');if(kind==='frog'){r(5,6,5,5,c);r(14,6,5,5,c);r(4,10,16,9,c);r(6,19,12,2,c);r(6,7,3,4,'#ead88b');r(15,7,3,4,'#ead88b');r(7,8,1,2,'#233d30');r(16,8,1,2,'#233d30');r(7,16,10,3,'#c1d591');if(changed){r(9,3,6,3,'#e6b344');r(8,2,2,2,'#e6b344');r(11,1,2,3,'#e6b344');r(14,2,2,2,'#e6b344')}}else{r(5,4,4,8,c);r(15,4,4,8,c);r(6,6,2,4,d.ear);r(16,6,2,4,d.ear);r(4,10,16,8,c);r(6,18,12,3,c);r(7,15,10,5,'#ece4ce');if(kind==='julia'){r(2,11,20,8,c);r(4,18,16,4,c);r(6,15,12,6,'#ece4ce')}if(kind==='cat'||kind==='julia'){r(11,10,2,3,'#9b663e');r(4,13,3,1,'#9b663e');r(17,13,3,1,'#9b663e');r(2,16,5,1,'#6d6e5b');r(17,16,5,1,'#6d6e5b')}else{r(10,10,4,6,'#cbd4da');if(changed){r(15,4,4,4,'#e2edf8');r(17,8,4,7,c);r(5,10,5,5,'#bf925b')}}if(kind==='dog'){r(13,10,6,7,'#17191c')}r(7,12,3,2,'#263b35');r(14,12,3,2,'#263b35');r(8,12,1,1,'#dbeea7');r(15,12,1,1,'#dbeea7');r(11,16,2,2,changed&&kind==='cat'?'#c77f8b':'#39473c')}
const mouthY=kind==='frog'?15:19;if(kind==='julia'){r(6,10,3,1,'#764a32');r(8,11,2,1,'#764a32');r(15,10,3,1,'#764a32');r(14,11,2,1,'#764a32');r(10,mouthY-1,4,1,'#334c36')}else if(mood==='working'){r(8,12,2,1,'#243d31');r(14,12,2,1,'#243d31');r(10,mouthY,4,1,'#334c36')}else if(mood==='waiting'){r(10,mouthY-1,4,1,'#334c36');r(9,mouthY,1,1,'#334c36');r(14,mouthY,1,1,'#334c36')}else{r(9,mouthY-1,1,1,'#334c36');r(10,mouthY,4,1,'#334c36');r(14,mouthY-1,1,1,'#334c36')}return out+'</svg>'}
let selectedCast='cat',castChanged=false;function renderCast(){const d=castDefinitions[selectedCast];document.querySelector('#cast-description').textContent=d.description;document.querySelector('#cast-change-text').textContent=d.change;document.querySelector('#cast-name').textContent=d.name;document.querySelector('#cast-large').innerHTML=castSvg(selectedCast,castChanged);document.querySelector('#cast-status').textContent=castChanged?'Revised example · original preserved':'Illustrative cast portrait';const preset=castPresets[selectedCast];document.querySelector('#preset-model').textContent=preset.model;document.querySelector('#preset-effort').textContent=preset.effort;document.querySelector('#preset-personality').textContent=preset.note;document.querySelector('#preset-reply').textContent=preset.reply;document.querySelector('#preset-status').textContent=`${d.name} selected · ${preset.model} · ${preset.effort} effort. Demo only; no agent configuration is changed.`;document.querySelector('#cast-moods').innerHTML=['happy','working','waiting'].map(m=>`<div>${castSvg(selectedCast,castChanged,m)}<span>${m}</span></div>`).join('');document.querySelectorAll('[data-cast]').forEach(b=>{b.classList.toggle('selected',b.dataset.cast===selectedCast);b.setAttribute('aria-pressed',String(b.dataset.cast===selectedCast))})}
document.querySelectorAll('[data-avatar]').forEach(x=>x.innerHTML=castSvg(x.dataset.avatar));document.querySelectorAll('[data-cast]').forEach(b=>b.onclick=()=>{selectedCast=b.dataset.cast;castChanged=false;renderCast()});document.querySelector('#cast-redraw').onclick=()=>{castChanged=true;renderCast()};document.querySelector('#cast-reset').onclick=()=>{castChanged=false;renderCast()};renderCast();
document.querySelectorAll('[data-voice]').forEach(b=>b.onclick=()=>{document.querySelector('#voice-result').textContent=`Example: “${b.textContent}” → ${b.dataset.voice==='yes'?'Approved':'Denied'}. No real action was taken.`});
const signals={limit:['OpenAI: 83% of your 5-hour limit used','It resets in 4h.'],cost:['Today’s estimated AI usage passed $50','Review the projects and sessions behind the estimate.'],approval:['Claude needs your answer','Notes app · A request is waiting for Allow or Deny.']};document.querySelectorAll('[data-signal]').forEach(b=>b.onclick=()=>{const [title,body]=signals[b.dataset.signal];document.querySelector('#usage-title').textContent=title;document.querySelector('#usage-body').textContent=body;document.querySelectorAll('[data-signal]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))})});
const scrollDemo=document.querySelector('#hc-scroll');document.querySelector('#earlier-request').onclick=()=>scrollDemo.scrollTo({top:0,behavior:'smooth'});document.querySelector('#latest-reply').onclick=()=>scrollDemo.scrollTo({top:scrollDemo.scrollHeight,behavior:'smooth'});
document.querySelector('#see-reply-demo').onclick=()=>{const reply=document.querySelector('#located-reply');reply.classList.remove('reply-highlight');void reply.offsetWidth;reply.classList.add('reply-highlight');scrollDemo.scrollTo({top:reply.offsetTop-scrollDemo.offsetTop-20,behavior:'smooth'});document.querySelector('#reply-demo-status').textContent='Jumped to the response to your earlier request. This is a fictional example.'};

const marquee=document.querySelector('.brand-marquee'),marqueeToggle=document.querySelector('#marquee-toggle');marqueeToggle.onclick=()=>{const paused=marquee.classList.toggle('paused');marqueeToggle.setAttribute('aria-pressed',String(paused));marqueeToggle.textContent=paused?'Resume motion':'Pause motion'};

// Fictional, local-only workflow demonstrations.
(() => {
  const $ = id => document.getElementById(id);
  let revisionTimer;
  const choices = $('revision-choices'), thread = $('revision-thread');
  const variants = {
    manual: ['Actually, give me the commands so I can run them in my own terminal. Don’t execute them for me.', '<b>Updated plan · you run the commands.</b><p>I’ll inspect and explain the scripts first, then provide a walkthrough. I won’t execute the tests or build.</p><pre><code>npm test &amp;&amp; npm run build</code></pre><p>For this example project, the first command runs tests; the second builds only if they pass. Run it from the project folder after reviewing the scripts and their effects.</p><p class="waiting">Shall I prepare those instructions? I’ll wait.</p>'],
    docs: ['Before we continue, explain each command and give me links to its documentation.', '<b>Updated plan · understand it first.</b><p>I’ll explain the project’s scripts and their side effects before proposing any execution.</p><p><code>npm test</code> runs the configured test script. <code>&amp;&amp;</code> runs the next command only after success. <code>npm run build</code> runs the project’s build script.</p><p>Read the <a href="https://docs.npmjs.com/cli/v11/commands/npm-test" target="_blank" rel="noopener">npm test documentation</a>, <a href="https://docs.npmjs.com/cli/v11/commands/npm-run/" target="_blank" rel="noopener">npm run-script documentation</a>, and <a href="https://www.gnu.org/software/bash/manual/html_node/Lists.html" target="_blank" rel="noopener">Bash command lists</a>.</p><p class="waiting">No commands yet. Would you like me to continue with that explanation?</p>'],
    tests: ['Just run the tests for now. Don’t build anything yet.', '<b>Updated plan · tests only.</b><p>I’ll inspect the test script, explain any effects, then run only the tests after your go-ahead. I’ve removed the build step from the plan.</p><div class="plan-line"><span>WHAT CHANGED</span><p>Build step removed. No deployment. If tests fail, I’ll summarize the failures before proposing fixes.</p></div><p class="waiting">Does this smaller scope look right? I’ll wait for your go-ahead.</p>']
  };
  $('revise-demo').onclick = () => {
    choices.hidden = false;
    $('revise-demo').setAttribute('aria-expanded', 'true');
    $('plan-result').textContent = 'Choose an example below the original plan. You can change direction before work starts.';
    choices.querySelector('button').focus();
  };
  document.querySelectorAll('[data-revision]').forEach(button => button.onclick = () => {
    clearTimeout(revisionTimer);
    const [request, response] = variants[button.dataset.revision];
    thread.hidden = false;
    $('revision-request').textContent = request;
    $('revision-answer').textContent = 'Revising the plan around your request…';
    $('revision-answer').setAttribute('aria-busy','true');
    $('approve-demo').disabled = true;
    $('plan-result').textContent = 'Your follow-up is changing the proposed work. Nothing has run.';
    revisionTimer = setTimeout(() => {
      $('revision-answer').innerHTML = response;
      $('revision-answer').setAttribute('aria-busy','false');
      $('approve-demo').disabled = false;
      $('plan-result').textContent = 'Plan revised. Review the new approach, request another change, or give the go-ahead.';
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1000);
  });
  $('approve-demo').onclick = () => {
    $('plan-result').textContent = 'Go-ahead received for this example plan. In blueherd, this asks the agent to proceed; separate tool approvals still apply. This demo executes nothing.';
  };
  $('reset-plan').onclick = () => {
    clearTimeout(revisionTimer); choices.hidden = true; thread.hidden = true;
    $('approve-demo').disabled = false;
    $('revise-demo').setAttribute('aria-expanded','false');
    $('plan-result').textContent = 'Try “Ask for a change.” This demo never runs commands or contacts an AI.';
  };
  $('pass-demo').onclick = () => { $('pass-target').hidden = !$('pass-target').hidden; $('pass-demo').setAttribute('aria-expanded', String(!$('pass-target').hidden)); };
  $('pass-select').onclick = () => {
    $('pass-compose').value = 'From Claude Fable, in “blueherd development”:\n\nThe software is ready. I recommend creating a website that explains how blueherd brings agents and projects together, demonstrates its safety and team controls, and gives people a clear reason to try it.\n\nBuild me a website from this. Make it polished, detailed, and easy for both individual developers and companies to understand.';
    $('pass-target').hidden = true; $('pass-demo').setAttribute('aria-expanded','false');
    $('pass-response').textContent = 'Reply placed in the composer. Edit it or send this demo message.';
    $('pass-send').disabled = false; $('pass-compose').focus();
  };
  $('pass-compose').oninput = () => { $('pass-send').disabled = !$('pass-compose').value.trim(); };
  $('pass-send').onclick = () => {
    $('pass-response').textContent = 'Illustrative Astra reply: I’ll turn Fable’s product recommendation into a complete website plan, then build the page around the Herd, Explain first, team oversight, privacy choices, editors, and the features buyers will want explained. I’ll keep the demo content fictional and make the experience work on desktop and mobile.';
    $('pass-send').disabled = true;
  };
  const prompts = {
    git: 'Review the current diff, check for secrets and unrelated changes, and run the relevant checks. Summarize what is ready to commit and propose a commit message. Confirm the branch and remote with me before pushing.',
    review: 'Review my changes for correctness, edge cases, and regressions. Prioritize actionable findings and explain them in plain English.',
    explain: 'Explain this in plain English. Describe what it does, what could change, and anything I should understand before proceeding.'
  };
  document.querySelectorAll('[data-prompt]').forEach(button => button.onclick = () => {
    $('prompt-compose').value = prompts[button.dataset.prompt];
    $('prompt-status').textContent = 'Prompt inserted. Adjust it to suit your project. Nothing has been sent.';
  });
  $('save-prompt-demo').onclick = () => {
    const value = $('prompt-compose').value.trim();
    if (!value) { $('prompt-status').textContent = 'Type an instruction first, then save it as your custom prompt.'; $('prompt-compose').focus(); return; }
    const button = document.createElement('button'); button.textContent = value.slice(0,40) + (value.length > 40 ? '…' : '');
    button.onclick = () => { $('prompt-compose').value = value; $('prompt-status').textContent = 'Your custom prompt is back in the composer, ready to reuse.'; };
    $('custom-prompts').append(button);
    $('prompt-status').textContent = 'Custom prompt saved for this demo session. Click it to reuse your instruction.';
  };
})();

(() => {
  const toggle = document.getElementById('prompt-menu-toggle');
  const menu = document.getElementById('prompt-demo-menu');
  const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
  toggle.onclick = () => { menu.hidden = !menu.hidden; toggle.setAttribute('aria-expanded', String(!menu.hidden)); };
  menu.addEventListener('click', event => {
    if (event.target.closest('[data-prompt], #custom-prompts button')) { close(); document.getElementById('prompt-compose').focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.prompt-menu-anchor')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { close(); toggle.focus(); } });
  document.getElementById('prompt-send-demo').onclick = () => {
    document.getElementById('prompt-status').textContent = document.getElementById('prompt-compose').value.trim() ? 'Demo message submitted. In blueherd, Send passes your instruction to the selected agent. This website does not send an AI request.' : 'Pick a saved prompt or type a message first.';
  };
})();

(() => {
  const button = document.getElementById('recap-demo-button');
  const output = document.getElementById('recap-output');
  button.setAttribute('aria-controls','recap-output');
  button.setAttribute('aria-expanded','false');
  button.onclick = () => {
    output.hidden = !output.hidden;
    button.setAttribute('aria-expanded', String(!output.hidden));
    button.textContent = output.hidden ? 'Where are we?' : 'Reset example';
    document.getElementById('recap-status').textContent = output.hidden ? 'Click to reveal an example recap. No AI request is sent.' : 'Example recap ready: project purpose, completed work, open questions, and a suggested next step.';
  };
})();

// Keep generated feature copy and changing demo responses branded, too.
(() => {
  const excluded = 'script,style,textarea,input,pre,code,svg,.blueherd-wordmark';
  function brandText(node) {
    if (!node.parentElement || node.parentElement.closest(excluded) || !/\bblueherd\b/i.test(node.nodeValue)) return;
    const parts = node.nodeValue.split(/(\bblueherd\b)/gi);
    const fragment = document.createDocumentFragment();
    parts.forEach(part => {
      if (/^blueherd$/i.test(part)) {
        const logo = document.createElement('span');
        logo.className = 'blueherd-wordmark'; logo.setAttribute('aria-label','blueherd'); logo.textContent = 'blueherd'; fragment.append(logo);
      } else fragment.append(document.createTextNode(part));
    });
    node.replaceWith(fragment);
  }
  function scan(root) {
    if (root.nodeType === Node.TEXT_NODE) { brandText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(excluded)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(brandText);
  }
  scan(document.body);
  new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'characterData') scan(record.target);
      else record.addedNodes.forEach(scan);
    });
  }).observe(document.body, {childList:true, subtree:true, characterData:true});
})();

document.querySelectorAll('[data-editor-image]').forEach(button => button.addEventListener('click', () => {
  const lightbox = document.getElementById('lightbox');
  const image = lightbox.querySelector('img');
  image.src = button.dataset.editorImage;
  image.alt = button.querySelector('img').alt;
  lightbox.showModal();
}));

(() => {
  const dialog = document.getElementById('ai-summary');
  const trigger = document.getElementById('open-ai-summary');
  trigger.addEventListener('click', () => {
    document.querySelector('body>header').classList.remove('mobile-nav-open');
    const menu = document.querySelector('.mobile-menu-toggle');
    menu.setAttribute('aria-expanded','false');
    menu.querySelector('.mobile-menu-label').textContent='Menu';
    document.querySelectorAll('.nav-dropdown').forEach(item=>{item.querySelector('.nav-trigger').setAttribute('aria-expanded','false');item.querySelector('.nav-panel').hidden=true;});
    dialog.showModal(); dialog.scrollTop = 0;
    document.getElementById('close-ai-summary').focus();
  });
  document.getElementById('close-ai-summary').onclick = () => dialog.close();
  dialog.addEventListener('click', event => {
    if(event.target === dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}
  });
  dialog.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>dialog.close()));
})();


(() => {const strip=document.getElementById('press'),button=document.getElementById('press-marquee-toggle');button.addEventListener('click',()=>{const paused=strip.classList.toggle('paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Resume motion':'Pause motion';});})();
