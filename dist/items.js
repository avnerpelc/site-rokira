(() => {
  const root = document.querySelector('#database');
  if (!root) return;

  const iconBase = 'https://static.divine-pride.net/images/items/item/';
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean = value => String(value ?? '').trim();
  const style = document.createElement('style');
  style.textContent = `
    #database .inventory-head{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap}
    #database .inventory-meta{color:#d9bd7c;font-size:14px}
    #database .inventory-controls{display:grid;grid-template-columns:minmax(220px,2fr) repeat(3,minmax(130px,1fr));gap:10px;margin:22px 0}
    #database .inventory-controls input,#database .inventory-controls select{background:#21170e;color:#f7e5bb;border:1px solid #765b32;padding:13px;border-radius:5px;font:inherit}
    #database .inventory-controls input:focus,#database .inventory-controls select:focus{outline:2px solid #d5a83f}
    #database .item-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
    #database .item-card{background:#261b10;border:1px solid #684d2b;border-radius:8px;overflow:hidden;cursor:pointer;transition:border-color .15s,transform .15s}
    #database .item-card:hover{border-color:#e1b44e;transform:translateY(-2px)}
    #database .item-card-head{display:flex;gap:13px;align-items:center;padding:14px 16px;border-bottom:1px solid #49351f}
    #database .item-icon{width:54px;height:54px;flex:none;display:grid;place-items:center;background:#1b130c;border:1px solid #644923;border-radius:8px;overflow:hidden;color:#e0bd70;font-size:11px}
    #database .item-icon img{width:44px;height:44px;object-fit:contain;image-rendering:auto}
    #database .item-card h3{margin:0;color:#e5aa25;font-size:17px}
    #database .item-card small{color:#bda981;display:block;margin-top:3px}
    #database .item-id{margin-left:auto;background:#ffe49a;color:#4a3210;border-radius:99px;padding:7px 10px;font-size:10px;white-space:nowrap}
    #database .item-row{display:grid;grid-template-columns:95px 1fr;gap:8px;padding:10px 16px;border-bottom:1px solid #3f2e1c}
    #database .item-row label{color:#b69968;text-transform:uppercase;font-size:10px;letter-spacing:1.2px}
    #database .item-row span{color:#e8d9b7;font-size:13px;line-height:1.5}
    #database .item-drop{padding:11px 16px;color:#d9ae45;font-size:12px;line-height:1.55}
    #database .item-pages{display:flex;justify-content:center;align-items:center;gap:8px;margin:22px 0 0}
    #database .item-pages button,#database .item-clear{background:#302214;color:#f5dfaa;border:1px solid #75552c;padding:9px 13px;border-radius:4px;cursor:pointer;font:inherit}
    #database .item-pages button[aria-current=true]{background:#d3a439;color:#20170e}
    #database .item-pages button:disabled{opacity:.45;cursor:default}
    #database .item-empty{padding:24px;background:#24190f;border:1px solid #5c4222;border-radius:8px;color:#c4b28c;grid-column:1/-1}
    #database .item-modal{position:fixed;inset:0;z-index:1000;background:#080d12d9;display:grid;place-items:center;padding:20px}
    #database .item-modal[hidden]{display:none}
    #database .item-modal-window{position:relative;width:min(760px,100%);max-height:88vh;overflow:auto;background:#251a10;border:2px solid #98743a;box-shadow:0 0 0 5px #17110d,0 18px 60px #000b;color:#eee0be}
    #database .item-modal-title{background:#13243a;border-bottom:1px solid #98743a;padding:16px 58px 16px 20px;font:22px Georgia,serif;color:#f5d88d}
    #database .item-modal-close{position:absolute;right:12px;top:11px;background:#392818;border:1px solid #b18a45;color:#ffe6a6;padding:6px 10px;cursor:pointer}
    #database .item-modal-content{padding:20px}
    #database .item-modal-summary{display:flex;gap:16px;align-items:center;margin-bottom:16px}
    #database .item-modal-summary .item-icon{width:78px;height:78px}
    #database .item-modal-summary .item-icon img{width:64px;height:64px}
    #database .item-detail-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#5d4527;border:1px solid #5d4527}
    #database .item-detail{background:#21170f;padding:11px 13px;min-width:0}
    #database .item-detail b{display:block;color:#c5a36a;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px}
    #database .item-detail span{font-size:13px;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}
    #database .inventory-head{display:grid;grid-template-columns:1fr;align-items:center;gap:12px;padding:22px 24px;margin:0 0 20px;border:1px solid #3d5b7b;border-top:3px solid #72cfe6;background:linear-gradient(120deg,#1d3049,#142239 68%,#1a2b40);box-shadow:inset 0 1px #ffffff12,0 8px 20px #060d18aa;position:relative;overflow:hidden}
    #database .inventory-head:after{content:'✦';position:absolute;right:30%;top:12px;color:#8bd8ee22;font-size:84px;line-height:1;pointer-events:none}
    #database .inventory-head>div:first-child{position:relative;z-index:1;text-align:center}
    #database .inventory-head h2{margin:0;color:#f2e9d5;font:clamp(28px,3.5vw,38px)/1.12 'IM Fell English SC',Georgia,serif;letter-spacing:.3px;text-shadow:0 2px 12px #62c9e633}
    #database .inventory-head h2:before{content:'✧  ARQUIVO DE PRONTERA  ✧';display:block;margin-bottom:8px;color:#79d3e8;font:800 9px Manrope,Arial,sans-serif;letter-spacing:3px}
    #database .inventory-head p{margin:8px 0;color:#bfccd8;font-size:12px;line-height:1.6}
    #database .inventory-head strong{display:inline-block;margin-top:4px;color:#f0d48d;font-size:12px;letter-spacing:.4px}
    #database .inventory-meta{position:relative;z-index:1;justify-self:end;max-width:260px;padding:8px 11px;border:1px solid #45617c;background:#101d2dbb;color:#b9d8e5;font-size:11px;text-align:center;line-height:1.5}
    #database .inventory-controls input,#database .inventory-controls select{background:#101d2e;color:#e6f1f5;border:1px solid #456482;box-shadow:inset 0 1px 4px #060d1866}
    #database .inventory-controls input::placeholder{color:#8fa4b7}
    #database .inventory-controls input:focus,#database .inventory-controls select:focus{outline:2px solid #66bfd8;border-color:#a7e9f5}
    #database .item-card{background:linear-gradient(145deg,#1b2b40,#152338);border:1px solid #405b78;box-shadow:0 5px 14px #070d16aa}
    #database .item-card:hover{border-color:#78d4e9;box-shadow:0 8px 20px #050b15cc,0 0 0 1px #78d4e933}
    #database .item-card-head{background:linear-gradient(100deg,#243a54,#192b41);border-bottom:1px solid #3e5873}
    #database .item-icon{background:linear-gradient(#20354c,#111f31);border:1px solid #64809b;color:#9be4f2}
    #database .item-card h3{color:#f1d27b}
    #database .item-card small{color:#a9bdcf}
    #database .item-id{background:linear-gradient(#ffe9a5,#e4c35f);color:#453315;border:1px solid #c7a34a}
    #database .item-row{border-bottom:1px solid #30455e}
    #database .item-row label{color:#8fd5e7}
    #database .item-row span{color:#e1e9ee}
    #database .item-drop{color:#f0cf75}
    #database .item-pages button,#database .item-clear{background:linear-gradient(#263d58,#1b2c42);color:#e5eff4;border:1px solid #55718e}
    #database .item-pages button[aria-current=true]{background:linear-gradient(#d7b85d,#b28b37);color:#1c2430;border-color:#f2dc93}
    #database .item-empty{background:#17283d;border:1px dashed #57728d;color:#bfd1df}
    #database .item-modal-window{background:#17283c;border:2px solid #7796b1;box-shadow:0 0 0 5px #101a29,0 18px 60px #000c;color:#e6edf0}
    #database .item-modal-title{background:linear-gradient(100deg,#284669,#172b43);border-bottom:1px solid #7594ae;color:#f2d988}
    #database .item-modal-close{background:#1d3450;border:1px solid #80a1bc;color:#e6f5fa}
    #database .item-detail-list{background:#45617b;border-color:#45617b}
    #database .item-detail{background:#1a2b40}
    #database .item-detail b{color:#83d5e8}
    #database .item-modal-summary .item-icon{background:#213a55;border-color:#698ba7}
    #database .item-modal-summary strong{color:#f1d27b}
    #database .item-modal-summary div div{color:#a9bdcf}
    @media(max-width:760px){#database .inventory-head{grid-template-columns:1fr;padding:19px 14px}#database .inventory-head>div:first-child{text-align:left}#database .inventory-head:after{right:10px}#database .inventory-meta{justify-self:start;max-width:none;text-align:left}#database .inventory-head h2{font-size:28px}#database .inventory-head h2:before{font-size:8px;letter-spacing:2px}}
    @media(max-width:760px){#database .item-grid{grid-template-columns:1fr}#database .inventory-controls{grid-template-columns:1fr 1fr}#database .inventory-controls input{grid-column:1/-1}#database .item-detail-list{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const old = root.querySelector('.table');
  if (old) old.remove();
  root.innerHTML = `<div class="inventory-head"><div><h2>Database de Rune-Midgard</h2><p>Consulte os itens do Rokira por nome, ID e categoria. Clique em um item para ver a ficha completa.</p><strong id="dbTotal">Carregando catálogo...</strong></div><div class="inventory-meta" id="itemCount" aria-live="polite">Carregando o catálogo...</div></div>
    <div class="inventory-controls"><input id="itemQuery" type="search" placeholder="Nome, nome original ou ID..." aria-label="Buscar itens"><select id="itemType" aria-label="Filtrar por tipo"><option value="">Todos os tipos</option></select><select id="itemSort" aria-label="Ordenar"><option value="id">Ordenar por ID</option><option value="name">Ordenar por nome</option><option value="buy">Ordenar por preço</option></select><select id="itemSize" aria-label="Itens por página"><option value="12">12 por página</option><option value="24">24 por página</option><option value="48">48 por página</option></select><button id="clearSearch" class="item-clear" type="button">Limpar busca</button></div>
    <div id="itemGrid" class="item-grid" aria-live="polite"></div><nav id="itemPages" class="item-pages" aria-label="Paginação do database"></nav>
    <div id="itemModal" class="item-modal" hidden><section class="item-modal-window" role="dialog" aria-modal="true" aria-labelledby="itemModalTitle"><button class="item-modal-close" type="button" aria-label="Fechar">✕</button><div class="item-modal-title" id="itemModalTitle"></div><div class="item-modal-content" id="modalBody"></div></section></div>`;

  const grid = root.querySelector('#itemGrid');
  const query = root.querySelector('#itemQuery');
  const type = root.querySelector('#itemType');
  const sort = root.querySelector('#itemSort');
  const size = root.querySelector('#itemSize');
  const count = root.querySelector('#itemCount');
  const total = root.querySelector('#dbTotal');
  const pages = root.querySelector('#itemPages');
  const modal = root.querySelector('#itemModal');
  const modalTitle = root.querySelector('#itemModalTitle');
  const modalBody = root.querySelector('#modalBody');
  let items = [];
  let page = 1;

  const iconMarkup = item => `<span class="item-icon"><img loading="lazy" decoding="async" src="${iconBase}${encodeURIComponent(item.id)}.png" alt="Ícone de ${escapeHtml(item.name)}" onerror="this.remove();this.parentElement.textContent='ID ${escapeHtml(item.id)}'"></span>`;
  const row = (label, value) => `<div class="item-row"><label>${escapeHtml(label)}</label><span>${escapeHtml(value || '—')}</span></div>`;
  const itemDetails = item => {
    const drops = Array.isArray(item.drops) ? item.drops.map(d => `${d.monster || 'Monstro'}${d.chance != null ? ` (${d.chance}%)` : ''}`).join('\n') : '';
    const combos = Array.isArray(item.combos) ? item.combos.map(c => typeof c === 'string' ? c : (c.name || c.description || JSON.stringify(c))).join('\n') : '';
    const fields = [
      ['ID', item.id], ['Nome interno', item.aegis || item.originalName], ['Tipo', [item.type,item.subtype].filter(Boolean).join(' · ')],
      ['Ataque / Defesa', `ATQ ${item.attack ?? '—'} · DEF ${item.defense ?? '—'}`], ['Slots', item.slots], ['Peso', item.weight],
      ['Nível mínimo', item.minLevel], ['Classes', item.jobs], ['Compra / Venda', `${item.buy ?? '—'} / ${item.sell ?? '—'}`],
      ['Descrição', item.description], ['Onde obter', item.locations || 'Origem não catalogada'], ['Monstros que dropam', drops || 'Drops não catalogados'], ['Combinações', combos || '—']
    ];
    modalTitle.textContent = `${item.name || 'Item'} · ID ${item.id}`;
    modalBody.innerHTML = `<div class="item-modal-summary">${iconMarkup(item)}<div><strong>${escapeHtml(item.name || 'Item sem nome')}</strong><div>${escapeHtml(item.originalName || item.aegis || '')}</div></div></div><div class="item-detail-list">${fields.map(([label,value])=>`<div class="item-detail"><b>${escapeHtml(label)}</b><span>${escapeHtml(value ?? '—')}</span></div>`).join('')}</div>`;
    modal.hidden = false;
    root.querySelector('.item-modal-close').focus();
  };

  function render() {
    const q = clean(query.value).toLocaleLowerCase('pt-BR');
    const selectedType = type.value;
    const pageSize = Number(size.value) || 12;
    const list = items.filter(item => (!q || [item.id,item.name,item.originalName,item.aegis].some(value => String(value ?? '').toLocaleLowerCase('pt-BR').includes(q))) && (!selectedType || item.type === selectedType));
    list.sort((a,b) => sort.value === 'name' ? clean(a.name).localeCompare(clean(b.name),'pt-BR') : sort.value === 'buy' ? Number(a.buy || 0)-Number(b.buy || 0) : Number(a.id)-Number(b.id));
    const pageCount = Math.max(1,Math.ceil(list.length/pageSize));
    page = Math.min(page,pageCount);
    const start = (page-1)*pageSize;
    count.textContent = `Exibindo ${list.length ? start+1 : 0}–${Math.min(start+pageSize,list.length)} de ${list.length.toLocaleString('pt-BR')} itens`;
    grid.innerHTML = list.slice(start,start+pageSize).map(item => {
      const dropList = Array.isArray(item.drops) ? item.drops : [];
      const dropText = dropList.length ? `DROP: ${dropList.slice(0,4).map(drop=>`${escapeHtml(drop.monster || 'Monstro')}${drop.chance != null ? ` (${escapeHtml(drop.chance)}%)` : ''}`).join(' · ')}${dropList.length>4?' · …':''}` : 'ORIGEM: Não catalogada';
      return `<article class="item-card" data-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Ver ${escapeHtml(item.name)}"><div class="item-card-head">${iconMarkup(item)}<div><h3>${escapeHtml(item.name || 'Item sem nome')}</h3><small>${escapeHtml(item.originalName || item.aegis || '—')}</small></div><span class="item-id">ID ${escapeHtml(item.id)}</span></div>${row('Tipo',[item.type,item.subtype].filter(Boolean).join(' · '))}${row('Dados',`ATQ ${item.attack ?? '—'} · DEF ${item.defense ?? '—'} · Slots ${item.slots ?? 0}`)}${row('Detalhes',`Peso ${item.weight ?? 0} · Nível ${item.minLevel ?? 0} · ${item.jobs || 'Classes não informadas'}`)}<div class="item-drop">${dropText}</div></article>`;
    }).join('') || '<div class="item-empty">Nenhum item encontrado com esses filtros.</div>';
    grid.querySelectorAll('.item-card').forEach(card => {
      const open = () => { const item = items.find(candidate => String(candidate.id) === card.dataset.id); if (item) itemDetails(item); };
      card.addEventListener('click',open);
      card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
    });
    pages.innerHTML = `<button type="button" data-page="${page-1}" ${page<=1?'disabled':''}>‹ Anterior</button><span>Página ${page} de ${pageCount}</span><button type="button" data-page="${page+1}" ${page>=pageCount?'disabled':''}>Próxima ›</button>`;
    pages.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{page=Number(button.dataset.page);render();grid.scrollIntoView({behavior:'smooth',block:'start'});}));
  }

  Promise.resolve(fetch('assets/items.json')).then(response=>{if(!response.ok)throw new Error('Catálogo indisponível');return response.json();}).then(data=>{
    items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
    total.textContent = `${items.length.toLocaleString('pt-BR')} registros no catálogo atual`;
    [...new Set(items.map(item=>item.type).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=value;type.append(option);});
    render();
  }).catch(()=>{count.textContent='Base de itens indisponível';grid.innerHTML='<div class="item-empty">Não foi possível carregar o catálogo agora. Tente novamente mais tarde.</div>';});
  [query,type,sort,size].forEach(control=>control.addEventListener(control===query?'input':'change',()=>{page=1;render();}));
  root.querySelector('#clearSearch').addEventListener('click',()=>{query.value='';type.value='';sort.value='id';page=1;render();});
  root.querySelector('.item-modal-close').addEventListener('click',()=>{modal.hidden=true;});
  modal.addEventListener('click',event=>{if(event.target===modal)modal.hidden=true;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)modal.hidden=true;});
})();
