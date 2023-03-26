FROM node:18

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы проекта
COPY . .

# Собираем клиентскую часть
RUN cd client-react && npm run build

# Указываем порты
EXPOSE 3000 4000

# Запускаем оба сервиса
CMD [ "npm", "run", "start" ]
