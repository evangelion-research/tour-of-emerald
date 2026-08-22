const lessons = [
  ['00_getting_started','Welcome & setup','Install the compiler and take your first steps.'],
  ['01_hello_world','Hello, world','Meet the shape of a tiny Emerald program.'],
  ['02_names_and_values','Names & values','Store data, do arithmetic, and name things.'],
  ['03_text','Text','Join, slice, inspect, and convert strings.'],
  ['04_decisions','Decisions','Make programs choose with conditions.'],
  ['05_loops','Loops','Repeat work with for, while, and range.'],
  ['06_lists','Lists','Keep ordered collections of values.'],
  ['07_functions','Functions','Package logic into reusable pieces.'],
  ['08_types','Types','Read the promises that programs make.'],
  ['09_records','Records','Group related values under clear names.'],
  ['10_unions','Unions','Model one-of-many values safely.'],
  ['11_generics','Generics','Write code that works across types.'],
  ['12_functions_as_values','Functions as values','Map, filter, reduce, and compose.'],
  ['13_modules','Modules','Organize code and use the standard library.'],
  ['14_errors','Errors','Handle failure explicitly with Result.'],
  ['15_files','Files','Read files, write files, and accept arguments.'],
  ['16_word_count','Word count','Build a complete program end to end.'],
  ['17_tensors','Tensors','Work with grids whose shapes are checked.'],
  ['18_promises','Promises','Explore purity, termination, and proof mode.'],
  ['19_concurrency','Concurrency','Coordinate tasks with channels and green threads.'],
  ['20_reference','Reference','Keep the language cheat sheet close.'],
  ['exercises/index','Exercises','Put the ideas to work with guided problems.']
];

const grid = document.querySelector('#lesson-grid');
const numberedLessons = lessons.filter(l => /^\d{2}_/.test(l[0]) && !l[0].endsWith('_reference'));
grid.innerHTML = numberedLessons.map((l,i) => `<a class="lesson-card" href="#lesson/${l[0]}"><small>${String(i).padStart(2,'0')}</small><h3>${l[1]}</h3><p>${l[2]}</p><b aria-hidden="true">→</b></a>`).join('');

const lessonLinks = lessons.map((l,i) => `<a href="#lesson/${l[0]}" data-slug="${l[0]}">${i < numberedLessons.length ? String(i).padStart(2,'0')+' · ' : ''}${l[1]}</a>`).join('');
document.querySelector('#reader-links').innerHTML = lessonLinks;
document.querySelector('#reader-links-mobile').innerHTML = lessonLinks;

const escapeHtml = text => text.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const emeraldWords = {
  keyword: new Set('if elif else while for def return and or not import from as type const pure partial match try catch error break continue pass dim'.split(' ')),
  constant: new Set('True False None'.split(' ')),
  builtin: new Set('print eprint pp_format pprint pprint_err range len str int float sqrt rand dict set append slice freeze thaw ord chr map filter reduce read_line read_all input run argv exit spawn join task_done task_stats task_yield sleep chan send recv chan_close chan_len zeros ones full arange tensor randn exp log tanh relu matmul reshape transpose permute expand sum mean max argmax tslice item shape ndim dtype astype gc_stats gc_collect file_exists write_file append_file write_out write_err flush seed_rand'.split(' ')),
  type: new Set('int float str bool int8 int16 int32 int64 uint8 uint16 uint32 uint64 f32 f64 char string list seq dict set option result error task chan'.split(' '))
};
// Token classes follow the upstream grammar:
// https://github.com/evangelion-research/emlsp/blob/main/emrald.tmLanguage
// Keeping the lexer here makes highlighting work without a TextMate runtime.
function highlightEmerald(source){
  const token = /(^#.*$)|((?:f)?(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))|\b(?:0[xX][\da-fA-F]+|0[bB][01]+|0[0-7]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|\b[A-Za-z_]\w*\b|->|\|>|==|!=|<=|>=|[<>!+\-*\/%^&|]|[:,(){}\[\]]/gm;
  let html='', last=0;
  for(const match of source.matchAll(token)){
    html += escapeHtml(source.slice(last,match.index));
    const value=match[0]; let kind='punctuation';
    if(match[1]) kind='comment';
    else if(match[2]) {
      const escaped=escapeHtml(value).replace(/(\\.)/g,'<span class="tok-escape">$1</span>');
      html += `<span class="tok-string">${escaped}</span>`;
      last=match.index+value.length;
      continue;
    }
    else if(/^\d/.test(value)) kind='number';
    else if(value==='dim') kind='dimension';
    else if(emeraldWords.keyword.has(value)) kind='keyword';
    else if(emeraldWords.constant.has(value)) kind='constant';
    else if(emeraldWords.builtin.has(value)) kind='builtin';
    else if(emeraldWords.type.has(value)) kind='type';
    else if(/^(?:->|\|>|==|!=|<=|>=|[<>!+\-*\/%^&|])$/.test(value)) kind='operator';
    else if(/^\w/.test(value)) kind='identifier';
    html += `<span class="tok-${kind}">${escapeHtml(value)}</span>`;
    last=match.index+value.length;
  }
  return html+escapeHtml(source.slice(last));
}
function inline(text,slug=''){
  return text
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,'<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url) => {
      if(url.endsWith('.md')) {
        const base=slug.includes('/') ? slug.slice(0,slug.lastIndexOf('/')+1) : '';
        const parts=(base+url.replace(/^\.\//,'').replace(/^study_guide\//,'')).split('/');
        const resolved=[]; for(const part of parts){if(part==='..') resolved.pop();else if(part!=='.') resolved.push(part)}
        url = '#lesson/' + resolved.join('/').replace(/\.md$/,'');
      } else if(!/^(https?:|#|mailto:)/.test(url)) {
        const base=slug.includes('/') ? slug.slice(0,slug.lastIndexOf('/')+1) : '';
        url = 'study_guide/' + base + url;
      }
      const external=/^https?:/.test(url) ? ' target="_blank" rel="noreferrer"' : '';
      return `<a href="${url}"${external}>${label}</a>`;
    });
}
function markdown(source,slug){
  const lines=source.replace(/\r/g,'').split('\n'); let out='', inCode=false, code=[], list=null, quote=[], para=[];
  const closePara=()=>{if(para.length){out+=`<p>${inline(para.join(' '),slug)}</p>`;para=[]}};
  const closeList=()=>{if(list){out+=`</${list}>`;list=null}};
  const closeQuote=()=>{if(quote.length){out+=`<blockquote>${quote.map(x=>`<p>${inline(x.replace(/^>\s?/,''),slug)}</p>`).join('')}</blockquote>`;quote=[]}};
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(line.startsWith('```')){if(inCode){out+=`<pre data-language="${escapeHtml(code.lang || '')}"><code>${escapeHtml(code.join('\n'))}</code></pre>`;code=[];inCode=false}else{closePara();closeList();inCode=true;code.lang=line.slice(3).trim()}continue}
    if(inCode){code.push(line);continue}
    if(line.startsWith('>')){closePara();closeList();quote.push(line);continue}else closeQuote();
    const h=line.match(/^(#{1,4})\s+(.+)/); if(h){closePara();closeList();out+=`<h${h[1].length}>${inline(h[2],slug)}</h${h[1].length}>`;continue}
    if(/^---+$/.test(line)){closePara();closeList();out+='<hr>';continue}
    const li=line.match(/^\s*([-*]|\d+\.)\s+(.+)/); if(li){closePara();const type=/\d/.test(li[1])?'ol':'ul';if(list!==type){closeList();list=type;out+=`<${type}>`}out+=`<li>${inline(li[2],slug)}</li>`;continue}
    if(line.includes('|') && lines[i+1] && /^\s*\|?\s*:?-+/.test(lines[i+1])){closePara();closeList();const cells=line.split('|').filter(x=>x.trim()).map(x=>x.trim());out+='<table><thead><tr>'+cells.map(c=>`<th>${inline(c,slug)}</th>`).join('')+'</tr></thead><tbody>';i+=2;while(i<lines.length&&lines[i].includes('|')){const cs=lines[i].split('|').filter(x=>x.trim()).map(x=>x.trim());out+='<tr>'+cs.map(c=>`<td>${inline(c,slug)}</td>`).join('')+'</tr>';i++}i--;out+='</tbody></table>';continue}
    if(!line.trim()){closePara();closeList();continue}
    closeList();para.push(line);
  }
  closePara();closeList();closeQuote();return out;
}

// The Markdown keeps an inline copy of each example so it remains pleasant to
// read on GitHub. On the website, treat the referenced .rald file as the source
// of truth so edits to study_guide/code are reflected without a second update.
async function loadStudyGuideCode(source){
  const reference=/(`(study_guide\/(?:exercises\/)?code\/[^`\n]+\.rald)`[ \t]*(?:\n[ \t]*)+```emerald[^\n]*\n)([\s\S]*?)(\n```)/g;
  const matches=[...source.matchAll(reference)];
  if(!matches.length) return source;

  const loaded=await Promise.all(matches.map(async match=>{
    try{
      const response=await fetch(match[2]);
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      return (await response.text()).replace(/\r/g,'').replace(/\n$/,'');
    }catch(error){
      console.warn(`Could not load ${match[2]}; using the Markdown copy instead.`,error);
      return match[3];
    }
  }));

  let hydrated='', cursor=0;
  matches.forEach((match,index)=>{
    hydrated+=source.slice(cursor,match.index)+match[1]+loaded[index]+match[4];
    cursor=match.index+match[0].length;
  });
  return hydrated+source.slice(cursor);
}

function buildLessonLayout(content,slug){
  const emeraldBlocks=[...content.querySelectorAll('pre[data-language="emerald"]')];
  const article=document.createElement('div'); article.className='lesson-explanation';
  const samples=document.createElement('aside'); samples.className='lesson-code-panel'; samples.setAttribute('aria-label','Static Emerald code samples');
  samples.innerHTML='<div class="code-panel-heading"><div><span class="status-dot"></span> Code samples</div><small>READ ONLY · RUNNER COMING LATER</small></div>';
  let sample=0;
  [...content.childNodes].forEach(node=>{
    if(node.nodeType===1 && node.matches('pre[data-language="emerald"]')){
      sample++;
      const card=document.createElement('section'); card.className='static-code-card';
      card.innerHTML=`<div class="code-card-bar"><span>example ${String(sample).padStart(2,'0')}</span><span>emerald</span></div>`;
      node.querySelector('code').innerHTML=highlightEmerald(node.textContent);
      card.append(node); samples.append(card);
    } else article.append(node);
  });
  const index=lessons.findIndex(l=>l[0]===slug);
  const pager=document.createElement('nav'); pager.className='lesson-pager'; pager.setAttribute('aria-label','Lesson navigation');
  pager.innerHTML=`${index>0?`<a href="#lesson/${lessons[index-1][0]}">← <span>${lessons[index-1][1]}</span></a>`:'<span></span>'}${index<lessons.length-1?`<a href="#lesson/${lessons[index+1][0]}"><span>${lessons[index+1][1]}</span> →</a>`:'<span></span>'}`;
  article.append(pager);
  const shell=document.createElement('div'); shell.className=`lesson-shell${emeraldBlocks.length ? '' : ' solo'}`; shell.append(article); if(emeraldBlocks.length) shell.append(samples); content.append(shell);
}

async function route(){
  const hash=location.hash || '#home'; const home=document.querySelector('#home-view'), reader=document.querySelector('#reader-view');
  if(!hash.startsWith('#lesson/')){home.hidden=false;reader.hidden=true;if(hash==='#lessons') setTimeout(()=>document.querySelector('#lessons').scrollIntoView(),0);else scrollTo(0,0);return}
  const slug=hash.slice(8); home.hidden=true;reader.hidden=false;scrollTo(0,0);
  document.querySelectorAll('[data-slug]').forEach(a=>a.classList.toggle('active',a.dataset.slug===slug));
  const content=document.querySelector('#reader-content');content.innerHTML='<div class="loading">Opening the guide…</div>';
  try{const response=await fetch(`study_guide/${slug}.md`);if(!response.ok)throw Error(`HTTP ${response.status}`);const source=await loadStudyGuideCode(await response.text());content.innerHTML=markdown(source,slug);buildLessonLayout(content,slug);const title=lessons.find(l=>l[0]===slug)?.[1];document.title=`${title || 'Lesson'} · A Tour of Emerald`}catch(error){console.error(error);content.innerHTML='<h1>Page not found</h1><p>This lesson could not be loaded. Return to the <a href="#home">tour home</a>.</p>'}
}
window.addEventListener('hashchange',route);
document.querySelector('.code-window code').innerHTML=highlightEmerald(document.querySelector('.code-window code').textContent);
route();
const menu=document.querySelector('.menu-button');menu.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));
