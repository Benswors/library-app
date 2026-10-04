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

## Висновок webpack vs Vite

(заповніть за власними вимірами: старт dev-сервера, HMR, розмір збірки, складність конфігу)
