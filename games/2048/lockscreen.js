// --- game-over overlay (smooth) ---

function showGameOver({ score = 0, onRestart = () => {}, fadeMs = 400 } = {}) {
  // 1) style jen jednou
  if (!document.getElementById('gameover-ui-style')) {
    const style = document.createElement('style');
    style.id = 'gameover-ui-style';
    style.textContent = `
#gameover-overlay{
  position:fixed; inset:0; z-index:2147483647;
  display:grid; place-items:center;
  background:rgba(0,0,0,.6);
  opacity:0; transition:opacity var(--go-fade,300ms) ease;
}
#gameover-overlay .go-card{
  background:#efefef; color:rgba(48, 48, 48, 1); text-align:center;
  border-radius:16px; padding:28px 24px; width:min(92vw,520px);
  box-shadow:0 15px 60px rgba(0, 0, 0, 0.45);
  font-family:Arial, sans-serif;
}
#gameover-overlay .go-title{
  margin:0 0 6px; font-weight:800; letter-spacing:.06em;
  font-size:min(14vw,64px);
}
#gameover-overlay .go-score{
  margin:0 0 18px; color:rgba(48, 48, 48, 1); font-size:28px;
}
#gameover-overlay .go-btn{
  font:600 20px Arial, sans-serif;
  padding:12px 18px; min-width:140px;
  border:0; border-radius:10px; cursor:pointer;
  background:#3678bd; color:#fff;
}
#gameover-overlay .go-btn:active{ transform:translateY(1px); filter:brightness(.95); }
`;
    document.head.appendChild(style);
  }
  // 2) vytvoř / znovu použij overlay
  let overlay = document.getElementById('gameover-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gameover-overlay';
    overlay.innerHTML = `
      <div class="go-card" role="dialog" aria-modal="true" aria-label="Game over">
        <div class="go-title">GAME OVER</div>
        <div class="go-score">Score: <span id="go-score">0</span></div>
        <button type="button" class="go-btn" id="go-restart">Restart</button>
      </div>`;
    document.body.appendChild(overlay);
  }

  // 3) nastav score a animaci
  overlay.style.setProperty('--go-fade', `${fadeMs}ms`);
  overlay.querySelector('#go-score').textContent = String(score);

  // 4) fade-in
  overlay.style.opacity = '0';
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });

  // 5) klik na Restart -> fade-out -> remove -> callback
  const btn = overlay.querySelector('#go-restart');
  const clickHandler = () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      onRestart();              // tady si napoj novou hru atd.
    }, fadeMs);
  };

  // zamez vícenásobnému připojení handleru
  btn.replaceWith(btn.cloneNode(true));
  overlay.querySelector('#go-restart').addEventListener('click', clickHandler, { once: true });
}

// (volitelné) schování programově, když nechceš čekat na klik
function hideGameOver({ fadeMs = 400 } = {}) {
  const overlay = document.getElementById('gameover-overlay');
  if (!overlay) return;
  overlay.style.setProperty('--go-fade', `${fadeMs}ms`);
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), fadeMs);
}
