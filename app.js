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
  ['19_reference','Reference','Keep the language cheat sheet close.'],
  ['exercises/index','Exercises','Put the ideas to work with guided problems.']
];

const grid = document.querySelector('#lesson-grid');
grid.innerHTML = lessons.slice(0,19).map((l,i) => `<a class="lesson-card" href="#lesson/${l[0]}"><small>${String(i).padStart(2,'0')}</small><h3>${l[1]}</h3><p>${l[2]}</p><b>↗</b></a>`).join('');

document.querySelector('#reader-links').innerHTML = lessons.map((l,i) => `<a href="#lesson/${l[0]}" data-slug="${l[0]}">${i < 19 ? String(i).padStart(2,'0')+' · ' : ''}${l[1]}</a>`).join('');

const escapeHtml = text => text.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function inline(text){
  return text
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,'<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url) => {
      if(url.endsWith('.md')) url = '#lesson/' + url.replace(/^\.\//,'').replace(/^study_guide\//,'').replace(/\.md$/,'');
      else if(!/^(https?:|#|mailto:)/.test(url)) url = 'study_guide/' + url;
      return `<a href="${url}">${label}</a>`;
    });
}
function markdown(source){
  const lines=source.replace(/\r/g,'').split('\n'); let out='', inCode=false, code=[], list=null, quote=[], para=[];
  const closePara=()=>{if(para.length){out+=`<p>${inline(para.join(' '))}</p>`;para=[]}};
  const closeList=()=>{if(list){out+=`</${list}>`;list=null}};
  const closeQuote=()=>{if(quote.length){out+=`<blockquote>${quote.map(x=>`<p>${inline(x.replace(/^>\s?/,''))}</p>`).join('')}</blockquote>`;quote=[]}};
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(line.startsWith('```')){if(inCode){out+=`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`;code=[];inCode=false}else{closePara();closeList();inCode=true}continue}
    if(inCode){code.push(line);continue}
    if(line.startsWith('>')){closePara();closeList();quote.push(line);continue}else closeQuote();
    const h=line.match(/^(#{1,4})\s+(.+)/); if(h){closePara();closeList();out+=`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;continue}
    if(/^---+$/.test(line)){closePara();closeList();out+='<hr>';continue}
    const li=line.match(/^\s*([-*]|\d+\.)\s+(.+)/); if(li){closePara();const type=/\d/.test(li[1])?'ol':'ul';if(list!==type){closeList();list=type;out+=`<${type}>`}out+=`<li>${inline(li[2])}</li>`;continue}
    if(line.includes('|') && lines[i+1] && /^\s*\|?\s*:?-+/.test(lines[i+1])){closePara();closeList();const cells=line.split('|').filter(x=>x.trim()).map(x=>x.trim());out+='<table><thead><tr>'+cells.map(c=>`<th>${inline(c)}</th>`).join('')+'</tr></thead><tbody>';i+=2;while(i<lines.length&&lines[i].includes('|')){const cs=lines[i].split('|').filter(x=>x.trim()).map(x=>x.trim());out+='<tr>'+cs.map(c=>`<td>${inline(c)}</td>`).join('')+'</tr>';i++}i--;out+='</tbody></table>';continue}
    if(!line.trim()){closePara();closeList();continue}
    closeList();para.push(line);
  }
  closePara();closeList();closeQuote();return out;
}

async function route(){
  const hash=location.hash || '#home'; const home=document.querySelector('#home-view'), reader=document.querySelector('#reader-view');
  if(!hash.startsWith('#lesson/')){home.hidden=false;reader.hidden=true;if(hash==='#lessons') setTimeout(()=>document.querySelector('#lessons').scrollIntoView(),0);else scrollTo(0,0);return}
  const slug=hash.slice(8); home.hidden=true;reader.hidden=false;scrollTo(0,0);
  document.querySelectorAll('#reader-links a').forEach(a=>a.classList.toggle('active',a.dataset.slug===slug));
  const content=document.querySelector('#reader-content');content.innerHTML='<div class="loading">Opening the guide…</div>';
  try{const response=await fetch(`study_guide/${slug}.md`);if(!response.ok)throw Error();content.innerHTML=markdown(await response.text());const title=lessons.find(l=>l[0]===slug)?.[1];document.title=`${title || 'Lesson'} · A Tour of Emerald`}catch{content.innerHTML='<h1>Page not found</h1><p>This lesson could not be loaded. Return to the <a href="#home">tour home</a>.</p>'}
}
window.addEventListener('hashchange',route);route();
const menu=document.querySelector('.menu-button');menu.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));
