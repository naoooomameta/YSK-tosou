/* =====================================================================
   YSK塗装 共通計測スクリプト（全ページ共通・1ファイルで管理）
   ---------------------------------------------------------------------
   IDの設定はこの CFG だけを編集する。空文字のタグは読み込まれない。

   イベント設計（HYUMA標準）
     PageView          … 全ページ到達
     InitiateCheckout  … フォームへのCTAタップ（マイクロCV）
     Contact           … 電話タップ / LINEタップ
     Lead              … /thanks.html 到達（本命CV・この1本のみ）
   ===================================================================== */
(function () {
  var CFG = {
    GA4_ID: '',                      // 例 'G-XXXXXXXXXX'
    AW_ID: 'AW-18205350045',         // Google広告（YSK塗装 373-537-5625）
    AW_LABEL_LEAD: '3oT3CIGf77sdEJ2x_uhD',  // Google広告CV：問い合わせフォーム送信（サンクス到達）
    AW_LABEL_TEL: 'zXIgCISf77sdEJ2x_uhD',   // Google広告CV：電話番号タップ
    AW_LABEL_LINE: 'UtYwCIef77sdEJ2x_uhD',  // Google広告CV：LINEボタンタップ
    META_PIXEL: '1685592229128625'   // Metaピクセル（YSK塗装）
  };
  window.YSK_TRACK = CFG;

  /* ---------- Google タグ（GA4 / Google広告） ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (!window.gtag) window.gtag = gtag;
  var gid = CFG.GA4_ID || CFG.AW_ID;
  if (gid) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gid);
    document.head.appendChild(s);
    gtag('js', new Date());
    if (CFG.GA4_ID) gtag('config', CFG.GA4_ID);
    if (CFG.AW_ID) gtag('config', CFG.AW_ID);
  }
  function ga4(name, params) {
    if (CFG.GA4_ID) gtag('event', name, params || {});
  }
  function awConv(label) {
    if (!CFG.AW_ID || !label) return;
    gtag('event', 'conversion', { send_to: CFG.AW_ID + '/' + label });
  }

  /* ---------- Meta ピクセル ---------- */
  if (CFG.META_PIXEL) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CFG.META_PIXEL);
    window.fbq('trackSingle', CFG.META_PIXEL, 'PageView');
  }
  function meta(ev, params) {
    if (CFG.META_PIXEL && window.fbq) window.fbq('trackSingle', CFG.META_PIXEL, ev, params || {});
  }

  /* ---------- Lead：サンクスページ到達（この1本のみ） ---------- */
  if (/^\/thanks(\.html)?\/?$/.test(location.pathname)) {
    meta('Lead', { content_name: 'contact_form' });
    ga4('generate_lead', { method: 'contact_form' });
    awConv(CFG.AW_LABEL_LEAD);
  }

  /* ---------- クリック計測：電話 / LINE / フォームCTA ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a,button') : null;
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (/^tel:/i.test(href)) {
      meta('Contact', { content_name: 'tel' });
      ga4('tel_click', { link_url: href, page_path: location.pathname });
      awConv(CFG.AW_LABEL_TEL);
    } else if (/lin\.ee|line\.me/i.test(href)) {
      meta('Contact', { content_name: 'line' });
      ga4('line_click', { link_url: href, page_path: location.pathname });
      awConv(CFG.AW_LABEL_LINE);
    } else if (/#contact$/.test(href) || /\/aimitsumori\/?$/.test(href) || el.classList.contains('js-form-cta')) {
      meta('InitiateCheckout', { content_name: 'form_cta' });
      ga4('form_cta_click', { link_url: href, page_path: location.pathname });
    }
  }, true);
})();
