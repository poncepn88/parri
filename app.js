/* Parri – app.js */
(function(){
  const qs = (s, el=document) => el.querySelector(s);

  // Mesa
  const mesaSpan = qs('#mesaNum');
  const params = new URLSearchParams(location.search);
  const mesa = params.get('mesa') || localStorage.getItem('parri:mesa') || '4';
  mesaSpan.textContent = mesa;
  localStorage.setItem('parri:mesa', mesa);

  qs('#mesaPill').addEventListener('click', ()=>{
    const next = prompt('Cambiar número de mesa:', mesaSpan.textContent);
    if(next && /^[0-9A-Za-z-]+$/.test(next)){
      mesaSpan.textContent = next;
      localStorage.setItem('parri:mesa', next);
    }
  });

  // Toast
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

  // Acciones
  qs('#btnWaiter').addEventListener('click', () => {
    showToast(`Mozo llamado en Mesa ${mesaSpan.textContent} ✅`);
    if(navigator.vibrate){ navigator.vibrate(60); }
  });

  const kissBtn = qs('#btnKiss');
  kissBtn.addEventListener('click', () => {
    showToast('Pedido de besito enviado a Pao 💕');
    if(navigator.vibrate){ navigator.vibrate([40,40,40]); }
  });

  qs('#btnPay').addEventListener('click', () => showToast('Abriendo flujo de pago…'));
  qs('#btnMenu').addEventListener('click', (e) => { e.preventDefault(); showToast('Mostrando carta (demo)…'); });

  const badge = qs('#orderBadge');
  const orderCard = qs('#btnOrder');
  orderCard.addEventListener('click', () => {
    const n = (parseInt(badge.textContent || '0',10) + 1);
    badge.textContent = n;
    showToast(`Agregado al pedido (${n})`);
  });
  orderCard.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); orderCard.click(); } });
})();
