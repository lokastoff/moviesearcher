# Запуск проекта
Используйте Node.js: 18 или выше и пакетный менеджер npm
## Для Linux
1. Откройте Bash
2. Используйте следующие команды для установки зависимостей: 

        cd путь/к/вашему/проекту

        npm install

3. Используйте следующую команду для запуска проекта:  

        TOKEN=<ваш_api_ключ> npm run start 

## Для Windows
### CMD
1. Откройте CMD с правами администратора
2. Используйте следующие команды для установки зависимостей:

        cd путь\к\вашему\проекту (Убедитесь, что используете обратные слеши)

        npm install

3. Используйте следующую команду для запуска проекта:

        set TOKEN=<ваш_api_ключ> && npm run start 

### PowerShell
1. Откройте PowerShell с правами администратора
2. Используйте следующие команды для установки зависимостей:

        cd путь\к\вашему\проекту (Убедитесь, что используете обратные слеши)

        npm install

3. Используйте следующую команду для запуска проекта:

        $env:TOKEN = "ваш_api_ключ" ; npm run start 

## Production build
В продакшн сборке переменные окружения (в данном случае api ключ) не будут автоматически вставлены в код. Нужно обрабатывать их вручную в процессе сборки.

В данном проекте в качестве сборщика используется Webpack, поэтому в файле webpack.config.js нужно вручную передать переменные окружения через DefinePlugin:

        module.exports = {
        // остальная конфигурация...
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.TOKEN': JSON.stringify(process.env.TOKEN),
                    }),    
                ],
        };
# Проблемы
## Фильтр по стране
Фильтр по стране чувствителен регистру, все что удалось сделать это форсировать написание страны с большой буквы, что не поможет в ситуации с аббривиатурами(США, ОАЭ)


## Метод на поиск актеров
Основной метод на поиск актеров по ID фильма вовзращает всех подряд кто связан с фильмом. Даже в случае с фильтром по профессии "Актер" может вернуться человек с профессиями "Актер", "Актер дубляжа" и тд. Плюсом ко всему не возвращает какую роль играет человек в фильме

Было принято решение использовать persons который возвращается в поиске фильма по ID с кастомной пагинацией.

## Время
Реализован весь основной функционал, но не хватило времени реализовать следующие необязательные задания:


1) Dockerfile


2) Cтраница c поиском рандомного фильма (захардкоденная авторизация реализована(user:admin password:1234))

3) Сломался редирект с /login по стейту isLogged (не успеваю переделать вовремя)


3) Все необязательные задания связанные с запросами (react query)

