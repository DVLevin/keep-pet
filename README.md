# Keep Pet — Видение, дорожная карта, план

Внутренний документ для Олега, Юлии, Сергея и команды Keep Pet.
Опубликован как GitHub Page: **https://dvlevin.github.io/keep-pet/**

**Доступ:** по паролю (`KeepPetLoved`). Не индексируется (`noindex, nofollow`, `referrer: no-referrer`).

---

## Структура сайта

| Страница | URL | Источник | Версия |
|---|---|---|---|
| Главная | `/index.html` | этот репо (создаётся вручную) | live |
| Видение | `/vision.html` | `pipeline/concept/keep-pet/package/share/oleg-team-ru.html` | v3 (2026-05-02) |
| Дорожная карта | `/roadmap.html` | `pipeline/concept/keep-pet/proposal/team-roadmap-ru.html` | 2026-05-02 |
| План — Iteration 1 | `/plan.html` | `pipeline/concept/keep-pet/proposal/iteration-1-budget-onepager-ru-v2.html` | v2 (2026-05-02) |
| Vision (EN) | `/vision-en.html` | этот репо | summary |
| Roadmap (EN) | `/roadmap-en.html` | этот репо | summary |
| Plan (EN) | `/plan-en.html` | `pipeline/concept/keep-pet/proposal/iteration-1-budget-onepager.html` | v1 |

Старая версия (v2 от 18 апреля) сохранена в `archive/v2-vision-2026-04-18.html`.

## Общая обвязка

- `assets/site.js` — пароль-гейт (sessionStorage) + верхняя навигация + переключатель RU/EN
- `assets/site.css` — стили верхней панели и оверлея

## Как обновлять

1. Правишь нужный HTML-файл в этом репо
2. `git commit -am "update: <что>"`
3. `git push origin main`
4. GitHub Pages деплоит за 1–2 минуты

## Caveat по паролю

`KeepPetLoved` хранится в `assets/site.js` открытым текстом. Это **soft gate** — отсекает поисковые краулеры и случайных посетителей, но любой, кто откроет исходник страницы, увидит пароль. Для жёсткой защиты нужно AES-шифрование контента (staticrypt).

## Источник правды

Полные исходные материалы (research-возвраты, debriefs, transcripts, vision.md, product-spec.md, risks-track-a.md) живут в:
`/Users/dmytrolevin/Desktop/CR_sales_apr26/pipeline/concept/keep-pet/`
