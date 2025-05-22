После создания апи мы должны добавить его в гитхаб.
(предположим что у тебя уже установлен логин и пароль для гитхаба)

1. Нужно инициализировать репозиторий в папке проекта (если ещё не сделал):

git init

2. Добавь все файлы и сделай первый коммит:

git add .
git commit -m "Initial commit"

3. Создай новый репозиторий на github.com — без инициализации README.

4. Подключи удалённый репозиторий:

git remote add origin https://github.com/твой-ник/имя-репозитория.git
То есть в нашем случае https://github.com/waltherlg/nest-notes.git

5. Отправь код:
git branch -M main
git push -u origin main
Теперь проект залит в GitHub