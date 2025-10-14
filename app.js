/* Parri – app.js */
(function(){
  const qs = (s, el=document) => el.querySelector(s);

  // Mesa: de ?mesa= o localStorage; fallback 4
  const mesaSpan = qs('#mesaNum');
  const mesaPill = qs('#mesaPill');
  const params = new URLSearchParams(location.search);
  const mesaFromQS = params.get('mesa');
  const mesaStored = localStorage.getItem('parri:mesa');
  const mesa = mesaFromQS || mesaStored || '4';
  mesaSpan.textContent = mesa;
  localStorage.setItem('parri:mesa', mesa);
  mesaPill.addEventListener('click', ()=>{
    const next = prompt('Cambiar número de mesa:', mesaSpan.textContent);
    if(next && /^[0-9A-Za-z-]+$/.test(next)){
      mesaSpan.textContent = next;
      localStorage.setItem('parri:mesa', next);
    }
  });

  // Toast helper
  const toast = qs('#toast');
  const toastMsg = qs('#toastMsg');
  function showToast(msg, ms=2200){
    toastMsg.textContent = msg;
    toast.hidden = false;
    toast.style.opacity = '1';
    setTimeout(()=>{
      toast.style.transition = 'opacity .4s ease';
      toast.style.opacity = '0';
      setTimeout(()=>{ toast.hidden = true; toast.style.transition=''; }, 380);
    }, ms);
  }

  // Llamar mozo
  qs('#btnWaiter').addEventListener('click', () => {
    // NOTE: Aquí harías fetch() a tu backend para notificar al panel.
    showToast(`Mozo llamado en Mesa ${mesaSpan.textContent} ✅`);
    if(navigator.vibrate){ navigator.vibrate(60); }
  });

  // Pagar cuenta
  qs('#btnPay').addEventListener('click', () => {
    showToast('Abriendo flujo de pago…');
    // Simular navegación futura
  });

  // Ver carta
  qs('#btnMenu').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Mostrando carta (modo demo)…');
  });

  // Mi pedido: incrementar badge de ejemplo
  const badge = qs('#orderBadge');
  const orderCard = qs('#btnOrder');
  orderCard.addEventListener('click', () => {
    const n = parseInt(badge.textContent || '0', 10) + 1;
    badge.textContent = n;
    showToast(`Agregado al pedido (${n})`);
  });
  orderCard.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); orderCard.click(); }
  });

  // PWA: registro opcional del SW (placeholder)
  if('serviceWorker' in navigator){
    // navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
})();
