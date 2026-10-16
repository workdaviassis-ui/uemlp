'use strict';
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  if (focus) tab.focus();
}
for (const [i, tab] of tabs.entries()) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') index = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') index = (i + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    if (index !== undefined) { event.preventDefault(); selectTab(tabs[index], true); }
  });
}
const offer = window.ROTA_OFFER || {};
let checkout;
try { const url = new URL(offer.checkoutUrl); if (url.protocol === 'https:') checkout = url.href; } catch {}
if (typeof offer.priceBRL === 'number' && Number.isFinite(offer.priceBRL) && offer.priceBRL > 0) {
  const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(offer.priceBRL);
  const info = document.getElementById('purchase-info');
  info.replaceChildren();
  const label = document.createElement('b'); label.textContent = 'Pacote digital';
  const value = document.createElement('span'); value.className = 'price'; value.textContent = price;
  const payment = document.createElement('span'); payment.textContent = offer.paymentLabel || 'Pagamento único';
  info.append(label, value, payment);
  if (checkout) {
  const buy = document.getElementById('buy-button'); buy.href = checkout; buy.textContent = 'Quero meu pacote';
  const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); buy.append(arrow);
  document.getElementById('purchase-note').textContent = 'Você será direcionado ao checkout para conferir as condições de compra.';
}

}
