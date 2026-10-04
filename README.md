# Система Управління Бібліотекою (TypeScript + webpack + Bootstrap)

## Запуск

    npm install
    npm start        # http://localhost:9000
    npm test         # Mocha + Chai
    npm run lint     # ESLint
    npm run build

## Git (feature branch workflow + Conventional Commits)

    git init && npm install        # npm install активує Husky (prepare)
    git checkout -b feature/initial-setup
    git add . && git commit -m "feat: add library app with webpack setup"
    # далі: feature/validation, feature/pagination, ... → merge в main

## Vite (окрема гілка)

    git checkout -b vite-migration
    npm rm webpack webpack-cli webpack-dev-server ts-loader css-loader style-loader html-webpack-plugin
    npm i -D vite && git rm webpack.config.js
    # перенести index.html в корінь з <script type="module" src="/src/index.ts">, створити vite.config.ts

## Висновок: webpack vs Vite

Порівняння виконано на цьому проєкті (невеликий SPA на TypeScript + Bootstrap).
Webpack-версія в гілці `main`, Vite-версія в гілці `vite-migration`.

| Показник                     | webpack | Vite   |
| ---------------------------- | ------- | ------ |
| Час продакшн-збірки          | 3,53 с  | 0,81 с |
| Розмір збірки                | 322 КБ  | 313 КБ |
| Старт dev-сервера (середній) | 3,22 с  | 164 мс |
| HMR                          | 299 мс  | 200 мс |
| Рядків у конфігу             | 23      | 7      |
| Пакетів для збірки           | 7       | 1      |

Сайти: [webpack](https://ТВІЙ_НІК.github.io/library-app/webpack/) · [Vite](https://ТВІЙ_НІК.github.io/library-app/vite/)

Vite значно швидший: dev-сервер стартує приблизно в 20 разів швидше, а продакшн-збірка
в 4 рази, бо він віддає модулі браузеру як нативні ES-модулі й компілює TypeScript через
esbuild, а не збирає весь граф залежностей наперед. Розмір збірки майже однаковий, адже
основну вагу дає Bootstrap.

Налаштування Vite простіше: TypeScript і CSS працюють із коробки, тож конфіг у 7 рядків
і одна залежність проти 23 рядків і 7 пакетів у webpack (`ts-loader`, `css-loader`,
`style-loader`, `html-webpack-plugin` тощо). Bootstrap підключається однаково, імпортом
із npm. Мінус Vite: він не перевіряє типи, тому потрібен окремий `tsc --noEmit`,
а в `index.html` довелося додати `<script type="module">`.

Екосистема плагінів у webpack більша, що важливо для великих і нестандартних проєктів.
Для невеликих SPA, як цей, Vite зручніший, і я обрав би його.

*Вимірювання проведені один раз на одному комп'ютері, тому абсолютні числа залежать від машини.*
