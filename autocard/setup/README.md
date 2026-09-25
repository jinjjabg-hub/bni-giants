# 자동 명함(AutoCard) Phase 1 — 설치 가이드

## 파일 구성
| 파일 | 역할 |
|---|---|
| `index.html` | 제작 앱: 7단계 입력 → 미리보기 → 발행 요청 |
| `c/index.html?id=…` | 공개 명함 페이지: 명함 1개 = Firestore 문서 1개, 페이지는 이것 하나 |
| `admin.html` | 관리자 승인 화면: 승인 대기 → 승인·발행 |
| `assets/card.js`, `card.css` | 템플릿 6종 + 색상/글자 대비 계산 (미리보기와 공개 페이지가 같이 씀) |
| `assets/common.js` | Firebase 설정, Worker 주소, 가격 계산 |
| `setup/` | 카드북 쪽에 넣을 변경분 (아래 3~5단계) |

## 설치 순서 (한 번만)
1. **GitHub 레포 `autocard` 만들기** → 이 `autocard/` 폴더 안의 내용을 레포 맨 위(root)에 올리기
   → Settings → Pages → Branch `main` / `(root)` 저장
   → 주소: `https://jinjjabg-hub.github.io/autocard/`
2. **Firebase 콘솔 → Authentication → Settings → 승인된 도메인**: `jinjjabg-hub.github.io`가 이미 있으면 그대로(카드북과 같은 도메인).
3. **Firestore 규칙**: `setup/firestore.rules` 내용을 Firebase 콘솔 → Firestore → 규칙에 붙여넣고 게시.
   (기존 카드북 규칙 + `autocards` 블록 + 보호 필드 `autocard50Granted` 추가)
4. **Storage 규칙**: `setup/storage.rules` 붙여넣고 게시. 처음 게시할 때 "Firestore 접근 권한 부여" 안내가 뜨면 허용
   (사진 업로드 시 명함 주인을 Firestore에서 확인하기 때문).
5. **카드북 레포 + Worker**: `setup/cardbook.patch`를 카드북 레포에 적용(`git apply setup/cardbook.patch`)
   → 바뀐 `worker.js`를 Cloudflare Worker `cardbook-ai`에 붙여넣고 Deploy. 새 Secret은 필요 없음(기존 `ANTHROPIC_API_KEY`, `FIREBASE_SA` 그대로).

## 매일 쓰는 법
- 고객에게 `https://jinjjabg-hub.github.io/autocard/` 링크만 보내면 끝.
- 발행 요청이 오면 `…/autocard/admin.html` → 입금 확인 → **승인·발행**.
- 승인 즉시 `…/autocard/c/?id=…` 주소가 누구에게나 열림.

## 카드북 변경분(`cardbook.patch`)에 들어 있는 것
- **worker.js**
  - `POST /autocard/draft` — 질문 3개 답변 → 한 줄 소개 + 리퍼럴 문구 (Haiku 우선)
  - `POST /autocard/translate` — 확정 문구를 선택 언어로 번역 (이름은 번역 안 함)
  - `/credits/dica-bonus` — `/autocard/` 링크면 **50장**(명함 주인·발행 여부를 Firestore에서 확인, 1회), 그 외 DiCA 링크는 기존대로 500장
- **firestore.rules / storage.rules** — 위 3~4단계와 같은 내용
- **index.html(카드북 앱)** — 명함 저장 시 `url` 파라미터도 저장(카드북에서 "명함 보기"로 다시 열림), 보너스 안내 문구에 50장 표시
  기존 DiCA 저장 흐름은 그대로 동작함(추가만 했고 바꾼 것 없음).
