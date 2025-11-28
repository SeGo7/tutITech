# tutITech landing

Статический сайт из набора HTML/CSS/JS файлов. Репозиторий готов к прямой загрузке на любой хостинг или собственный VPS.

## Быстрый просмотр локально
- Откройте `index.html` в браузере прямо из файловой системы или поднимите любым статическим сервером, например: `python -m http.server 8080`.
- Убедитесь, что структура папок (`css`, `js`, директории преподавателей) сохраняется — ссылки в коде относительные.

## Подготовка к публикации
- В `<head>` всех страниц уже добавлены SEO-мета-теги (description, keywords, Open Graph, Twitter) и иконка.
- Перед релизом замените домен `https://tutitech.ru/` в канонических и OG-ссылках, если у вас другое имя сайта.
- При необходимости создайте `robots.txt` и `sitemap.xml` в корне и добавьте ссылки на них в `README`.

## Публикация на GitHub Pages

1. **Создайте репозиторий на GitHub** (например, `username.github.io` для корневого домена или любой другой репозиторий)

2. **Загрузите файлы в репозиторий**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

3. **Включите GitHub Pages**
   - Перейдите в Settings → Pages вашего репозитория
   - В разделе "Source" выберите ветку `main` и папку `/ (root)`
   - Нажмите Save

4. **Важно:**
   - Файл `.nojekyll` уже создан в корне проекта — он отключает обработку Jekyll, что необходимо для корректной работы сайта
   - Все ссылки в проекте используют относительные пути и адаптированы для GitHub Pages
   - Сайт будет доступен по адресу `https://username.github.io/repository-name/` (или `https://username.github.io/` для репозитория `username.github.io`)

5. **Обновление сайта**
   - Внесите изменения локально
   - Выполните `git add .`, `git commit -m "Update"`, `git push`
   - Изменения появятся на сайте через несколько минут

## Выгрузка на VPS с Debian + Nginx
Ниже пример для домена `tutitech.ru`. Выполняйте команды под пользователем с sudo.

1. **Установите и подготовьте окружение**
   ```bash
   sudo apt update && sudo apt install -y nginx rsync unzip
   sudo mkdir -p /var/www/tutitech
   sudo chown -R $USER:$USER /var/www/tutitech
   ```

2. **Залейте сайт с локального компьютера**
   ```bash
   rsync -avz --delete /home/x/Programming/tutITech/Repetit/tutITech_Run/ \
     user@your-vps:/var/www/tutitech/
   ```
   При необходимости замените путь и пользователя. Флаг `--delete` синхронизирует удаление лишних файлов.

3. **Создайте конфигурацию Nginx `/etc/nginx/sites-available/tutitech.ru`**
   ```nginx
   server {
     listen 80;
     listen [::]:80;
     server_name tutitech.ru www.tutitech.ru;

     root /var/www/tutitech;
     index index.html;

     access_log /var/log/nginx/tutitech.access.log;
     error_log  /var/log/nginx/tutitech.error.log;

     location / {
       try_files $uri $uri/ =404;
     }
   }
   ```

4. **Включите сайт и перезапустите Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/tutitech.ru /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **(Опционально) Включите HTTPS через Let’s Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d tutitech.ru -d www.tutitech.ru
   ```
   Certbot автоматически добавит блоки `listen 443 ssl` и задачи обновления.

6. **Обновление сайта**
   - Делайте локальные изменения.
   - Снова выполните `rsync --delete ...` или `scp -r ...` на сервер.
   - Перезагрузка Nginx не требуется, если структура статических файлов не менялась.

7. **Проверка**
   - `curl -I https://tutitech.ru` — проверка отдачи заголовков.
   - В DevTools → Lighthouse убедитесь, что страницы индексируются и нет битых ссылок.

Такой процесс подходит для любой статики. Для автоматизации можно добавить GitHub Actions с деплоем по SSH или использовать систему выкладки (Capistrano, Ansible), но базовый сценарий описан выше.