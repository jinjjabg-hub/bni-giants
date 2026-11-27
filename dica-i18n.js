/*
 * dica-i18n.js — 비즈홈 공통 문구 다국어 처리 (카드 공용)
 *
 * WHY: 카드마다 본문은 번역돼 있어도, 모든 카드에 똑같이 들어간 공통 부분
 *      (공유 창, 만두 연결 버튼, 카드 현황 보기 버튼, 알림창)은 한국어로 고정돼
 *      외국어를 고른 방문자에게 한국어가 섞여 보였다. 이 파일 하나만 고치면
 *      모든 카드의 공통 문구가 함께 바뀐다.
 *
 * 사용법: 카드 <head>에 <script src="../dica-i18n.js"></script>
 *   - 알림창 등 스크립트 문구는 dicaT('한국어 원문') 으로 감싼다. (원문이 곧 키)
 *   - 화면의 공통 문구는 언어 버튼을 누를 때 자동으로 바뀐다.
 *   - 표에 없는 문구·언어는 한국어 원문 그대로 나온다(깨지지 않음).
 *   - 같은 파일이 bni-giants, BNI-PIONEER-cards 저장소에 있다. 고칠 때 둘 다 고친다.
 */
(function () {
  // 카드마다 언어 코드가 달라서 하나로 모은다
  var CODE = { kr: 'ko', ko: 'ko', en: 'en', jp: 'ja', ja: 'ja', cn: 'zh', zh: 'zh', hk: 'hk', tw: 'hk',
               de: 'de', vi: 'vi', mn: 'mn', ru: 'ru', th: 'th', id: 'id', ne: 'ne', it: 'it' };

  var TR = {
    '비즈홈 전달하기': { en: 'Share this Biz Home', ja: 'ビズホームを共有', zh: '分享商务主页', hk: '分享商務主頁', de: 'Biz Home teilen', vi: 'Chia sẻ Biz Home này', mn: 'Биз хуудсыг хуваалцах', ru: 'Поделиться Biz Home', th: 'แชร์ Biz Home นี้', id: 'Bagikan Biz Home ini', ne: 'यो Biz Home सेयर गर्नुहोस्', it: 'Condividi questa Biz Home' },
    '카카오톡': { en: 'KakaoTalk', ja: 'カカオトーク', zh: 'KakaoTalk', hk: 'KakaoTalk', de: 'KakaoTalk', vi: 'KakaoTalk', mn: 'KakaoTalk', ru: 'KakaoTalk', th: 'KakaoTalk', id: 'KakaoTalk', ne: 'KakaoTalk', it: 'KakaoTalk' },
    '문자': { en: 'SMS', ja: 'SMS', zh: '短信', hk: '短訊', de: 'SMS', vi: 'Tin nhắn', mn: 'SMS', ru: 'SMS', th: 'SMS', id: 'SMS', ne: 'SMS', it: 'SMS' },
    '링크 복사': { en: 'Copy link', ja: 'リンクをコピー', zh: '复制链接', hk: '複製連結', de: 'Link kopieren', vi: 'Sao chép liên kết', mn: 'Холбоос хуулах', ru: 'Копировать ссылку', th: 'คัดลอกลิงก์', id: 'Salin tautan', ne: 'लिङ्क कपी गर्नुहोस्', it: 'Copia link' },
    'QR 보기': { en: 'Show QR', ja: 'QRを表示', zh: '查看二维码', hk: '查看二維碼', de: 'QR anzeigen', vi: 'Xem mã QR', mn: 'QR харах', ru: 'Показать QR', th: 'ดู QR', id: 'Lihat QR', ne: 'QR हेर्नुहोस्', it: 'Mostra QR' },
    '취소': { en: 'Cancel', ja: 'キャンセル', zh: '取消', hk: '取消', de: 'Abbrechen', vi: 'Hủy', mn: 'Болих', ru: 'Отмена', th: 'ยกเลิก', id: 'Batal', ne: 'रद्द गर्नुहोस्', it: 'Annulla' },
    '💬 본인 비즈홈이신가요? 만두 연결하기 (1회)': {
      en: '💬 Is this your Biz Home? Connect MANDU (one time)', ja: '💬 ご本人のビズホームですか？MANDUを連携（1回）',
      zh: '💬 这是您的商务主页吗？连接MANDU（仅一次）', hk: '💬 這是您的商務主頁嗎？連接MANDU（僅一次）',
      de: '💬 Ist das Ihre Biz Home? MANDU verbinden (einmalig)', vi: '💬 Đây là Biz Home của bạn? Kết nối MANDU (1 lần)',
      mn: '💬 Энэ таны Биз хуудас уу? MANDU холбох (1 удаа)', ru: '💬 Это ваша Biz Home? Подключить MANDU (один раз)',
      th: '💬 นี่คือ Biz Home ของคุณใช่ไหม? เชื่อมต่อ MANDU (ครั้งเดียว)', id: '💬 Ini Biz Home Anda? Hubungkan MANDU (sekali)',
      ne: '💬 के यो तपाईंको Biz Home हो? MANDU जोड्नुहोस् (एक पटक)', it: '💬 È la tua Biz Home? Collega MANDU (una volta)' },
    '✅ 만두 연결 완료 — 이제 이 카드로 DM을 받을 수 있어요': {
      en: '✅ MANDU connected — you can now receive DMs through this card', ja: '✅ MANDU連携完了 — このカードでDMを受け取れます',
      zh: '✅ MANDU已连接 — 现在可以通过此名片接收私信', hk: '✅ MANDU已連接 — 現在可以透過此名片接收私訊',
      de: '✅ MANDU verbunden — Sie können jetzt DMs über diese Karte empfangen', vi: '✅ Đã kết nối MANDU — giờ bạn có thể nhận tin nhắn qua thẻ này',
      mn: '✅ MANDU холбогдлоо — одоо энэ картаар мессеж хүлээн авах боломжтой', ru: '✅ MANDU подключён — теперь вы можете получать сообщения через эту карточку',
      th: '✅ เชื่อมต่อ MANDU แล้ว — ตอนนี้คุณรับข้อความผ่านการ์ดนี้ได้', id: '✅ MANDU terhubung — kini Anda dapat menerima DM melalui kartu ini',
      ne: '✅ MANDU जोडियो — अब तपाईं यो कार्डमार्फत DM पाउन सक्नुहुन्छ', it: '✅ MANDU collegato — ora puoi ricevere DM tramite questa card' },
    '✅ 만두 연결 완료 — 이제 이 비즈홈으로 DM을 받을 수 있어요': {
      en: '✅ MANDU connected — you can now receive DMs through this Biz Home', ja: '✅ MANDU連携完了 — このビズホームでDMを受け取れます',
      zh: '✅ MANDU已连接 — 现在可以通过此商务主页接收私信', hk: '✅ MANDU已連接 — 現在可以透過此商務主頁接收私訊',
      de: '✅ MANDU verbunden — Sie können jetzt DMs über diese Biz Home empfangen', vi: '✅ Đã kết nối MANDU — giờ bạn có thể nhận tin nhắn qua Biz Home này',
      mn: '✅ MANDU холбогдлоо — одоо энэ Биз хуудсаар мессеж хүлээн авах боломжтой', ru: '✅ MANDU подключён — теперь вы можете получать сообщения через эту Biz Home',
      th: '✅ เชื่อมต่อ MANDU แล้ว — ตอนนี้คุณรับข้อความผ่าน Biz Home นี้ได้', id: '✅ MANDU terhubung — kini Anda dapat menerima DM melalui Biz Home ini',
      ne: '✅ MANDU जोडियो — अब तपाईं यो Biz Home मार्फत DM पाउन सक्नुहुन्छ', it: '✅ MANDU collegato — ora puoi ricevere DM tramite questa Biz Home' },
    'ℹ️ 이미 연결된 비즈홈이에요': {
      en: 'ℹ️ This Biz Home is already connected', ja: 'ℹ️ すでに連携済みのビズホームです', zh: 'ℹ️ 此商务主页已被连接', hk: 'ℹ️ 此商務主頁已被連接',
      de: 'ℹ️ Diese Biz Home ist bereits verbunden', vi: 'ℹ️ Biz Home này đã được kết nối', mn: 'ℹ️ Энэ Биз хуудас аль хэдийн холбогдсон байна',
      ru: 'ℹ️ Эта Biz Home уже подключена', th: 'ℹ️ Biz Home นี้เชื่อมต่อแล้ว', id: 'ℹ️ Biz Home ini sudah terhubung',
      ne: 'ℹ️ यो Biz Home पहिले नै जोडिएको छ', it: 'ℹ️ Questa Biz Home è già collegata' },
    '본인 비즈홈이 맞나요?\n구글 로그인하면 이 비즈홈으로 만두 DM을 받을 수 있게 연결돼요.': {
      en: 'Is this your own Biz Home?\nSign in with Google to receive MANDU DMs through it.',
      ja: 'ご本人のビズホームですか？\nGoogleでログインすると、このビズホームでMANDUのDMを受け取れるよう連携されます。',
      zh: '这是您本人的商务主页吗？\n使用Google登录后，即可通过此主页接收MANDU私信。',
      hk: '這是您本人的商務主頁嗎？\n使用Google登入後，即可透過此主頁接收MANDU私訊。',
      de: 'Ist das Ihre eigene Biz Home?\nMelden Sie sich mit Google an, um darüber MANDU-DMs zu empfangen.',
      vi: 'Đây có phải Biz Home của bạn không?\nĐăng nhập Google để nhận tin nhắn MANDU qua Biz Home này.',
      mn: 'Энэ таны өөрийн Биз хуудас мөн үү?\nGoogle-ээр нэвтэрвэл энэ хуудсаар MANDU мессеж хүлээн авах боломжтой болно.',
      ru: 'Это ваша собственная Biz Home?\nВойдите через Google, чтобы получать через неё сообщения MANDU.',
      th: 'นี่คือ Biz Home ของคุณเองใช่ไหม?\nเข้าสู่ระบบด้วย Google เพื่อรับข้อความ MANDU ผ่าน Biz Home นี้',
      id: 'Apakah ini Biz Home milik Anda?\nMasuk dengan Google untuk menerima DM MANDU melalui Biz Home ini.',
      ne: 'के यो तपाईंको आफ्नै Biz Home हो?\nGoogle बाट लगइन गरेपछि यो Biz Home मार्फत MANDU DM पाउन सकिन्छ।',
      it: 'È la tua Biz Home?\nAccedi con Google per ricevere i DM di MANDU tramite questa pagina.' },
    '연결 중...': { en: 'Connecting...', ja: '接続中...', zh: '连接中...', hk: '連接中...', de: 'Verbinden...', vi: 'Đang kết nối...', mn: 'Холбож байна...', ru: 'Подключение...', th: 'กำลังเชื่อมต่อ...', id: 'Menghubungkan...', ne: 'जोड्दै...', it: 'Collegamento...' },
    '연결 실패. 잠시 후 다시 시도해주세요.': { en: 'Connection failed. Please try again shortly.', ja: '接続に失敗しました。しばらくしてから再度お試しください。', zh: '连接失败，请稍后再试。', hk: '連接失敗，請稍後再試。', de: 'Verbindung fehlgeschlagen. Bitte versuchen Sie es gleich noch einmal.', vi: 'Kết nối thất bại. Vui lòng thử lại sau.', mn: 'Холболт амжилтгүй. Түр хүлээгээд дахин оролдоно уу.', ru: 'Не удалось подключиться. Попробуйте чуть позже.', th: 'เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', id: 'Gagal terhubung. Silakan coba lagi nanti.', ne: 'जडान असफल भयो। केही बेरपछि फेरि प्रयास गर्नुहोस्।', it: 'Collegamento non riuscito. Riprova tra poco.' },
    '연결 중 오류가 발생했어요.': { en: 'An error occurred while connecting.', ja: '接続中にエラーが発生しました。', zh: '连接时发生错误。', hk: '連接時發生錯誤。', de: 'Beim Verbinden ist ein Fehler aufgetreten.', vi: 'Đã xảy ra lỗi khi kết nối.', mn: 'Холбох үед алдаа гарлаа.', ru: 'При подключении произошла ошибка.', th: 'เกิดข้อผิดพลาดระหว่างการเชื่อมต่อ', id: 'Terjadi kesalahan saat menghubungkan.', ne: 'जडान गर्दा त्रुटि भयो।', it: 'Si è verificato un errore durante il collegamento.' },
    '링크가 복사되었습니다!': { en: 'Link copied!', ja: 'リンクをコピーしました！', zh: '链接已复制！', hk: '連結已複製！', de: 'Link kopiert!', vi: 'Đã sao chép liên kết!', mn: 'Холбоос хуулагдлаа!', ru: 'Ссылка скопирована!', th: 'คัดลอกลิงก์แล้ว!', id: 'Tautan disalin!', ne: 'लिङ्क कपी भयो!', it: 'Link copiato!' },
    '📊 카드 현황 보기': { en: '📊 View card stats', ja: '📊 カードの状況を見る', zh: '📊 查看名片统计', hk: '📊 查看名片統計', de: '📊 Kartenstatistik', vi: '📊 Xem thống kê thẻ', mn: '📊 Картын статистик', ru: '📊 Статистика карточки', th: '📊 ดูสถิติการ์ด', id: '📊 Lihat statistik kartu', ne: '📊 कार्ड तथ्याङ्क हेर्नुहोस्', it: '📊 Statistiche della card' },
    '불러오는 중...': { en: 'Loading...', ja: '読み込み中...', zh: '加载中...', hk: '載入中...', de: 'Wird geladen...', vi: 'Đang tải...', mn: 'Ачаалж байна...', ru: 'Загрузка...', th: 'กำลังโหลด...', id: 'Memuat...', ne: 'लोड हुँदैछ...', it: 'Caricamento...' },
    '조회 {0}회 · 저장 {1}회': { en: 'Views {0} · Saves {1}', ja: '閲覧 {0}回・保存 {1}回', zh: '浏览 {0}次 · 保存 {1}次', hk: '瀏覽 {0}次 · 儲存 {1}次', de: 'Aufrufe {0} · Gespeichert {1}', vi: 'Lượt xem {0} · Lượt lưu {1}', mn: 'Үзсэн {0} · Хадгалсан {1}', ru: 'Просмотры {0} · Сохранения {1}', th: 'เข้าชม {0} · บันทึก {1}', id: 'Dilihat {0} · Disimpan {1}', ne: 'हेरिएको {0} · सेभ {1}', it: 'Visite {0} · Salvataggi {1}' }
  };
  // 같은 문구의 다른 표기(예전 카드의 '됐습니다', 새 디자인 카드의 이모지 없는 문구)도 같은 번역을 쓴다
  TR['링크가 복사됐습니다!'] = TR['링크가 복사되었습니다!'];
  Object.keys(TR).forEach(function (ko) {
    var m = ko.match(/^(💬|✅|ℹ️|📊) (.+)$/);
    if (!m) return;
    var row = {};
    Object.keys(TR[ko]).forEach(function (l) { row[l] = TR[ko][l].replace(/^(💬|✅|ℹ️|📊) /, ''); });
    TR[m[2]] = row;
  });

  // 지금 눌려 있는 언어 버튼에서 언어를 읽는다 (setLang·switchLang, active·on 모두 처리)
  function curLang() {
    var b = document.querySelector('[onclick*="etLang("].active, [onclick*="etLang("].on, [onclick*="witchLang("].active, [onclick*="witchLang("].on');
    var m = b && b.getAttribute('onclick').match(/(?:set|switch)Lang\(\s*['"](\w+)['"]/i);
    return (m && CODE[m[1]]) || 'ko';
  }

  function tr(ko, lang) {
    var row = TR[ko];
    return (row && lang !== 'ko' && row[lang]) || ko;
  }

  // 스크립트 문구용: dicaT('한국어 원문', 값0, 값1 ...)
  window.dicaT = function (ko) {
    var s = tr(ko, curLang()), args = arguments;
    return s.replace(/\{(\d)\}/g, function (_, i) { return args[+i + 1]; });
  };

  // 화면의 공통 문구: 지금 어느 언어로 적혀 있든 원문을 찾아 현재 언어로 바꾼다
  var ANY = {};
  Object.keys(TR).forEach(function (ko) {
    ANY[ko] = ko;
    Object.keys(TR[ko]).forEach(function (l) { if (!(TR[ko][l] in ANY)) ANY[TR[ko][l]] = ko; });
  });
  var SEL = '.share-title, .share-btn span, .share-cancel, #mandu-activate-btn, #mandu-activate-done, body > div';
  function refresh() {
    var lang = curLang();
    document.querySelectorAll(SEL).forEach(function (el) {
      // 바로 안쪽 글자만 바꾼다(아이콘 등 다른 태그는 그대로 둔다)
      el.childNodes.forEach(function (n) {
        if (n.nodeType !== 3) return;
        var txt = n.nodeValue.trim(), ko = ANY[txt];
        if (ko) n.nodeValue = n.nodeValue.replace(txt, tr(ko, lang));
      });
    });
  }
  window.dicaI18nRefresh = refresh;

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[onclick*="etLang("], [onclick*="witchLang("]')) setTimeout(refresh, 0);
  });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(refresh, 0); });
})();
