# Проект Mesto (frontend + backend)

## Реализовываем проверку токенов, регистрацию и авторизацию пользователей, возможность сохранять и отдавать карточки, запоминать, когда кто-то поставил лайк или передумал и убрал его.

[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

- Регистрация / авторизация пользователя
- Добавление / удаление лайка фото
- Удаление фото
- Редактирование информации о себе и своего аватара

## Технологии:

![Express](https://img.shields.io/badge/-Express-090909?style=for-the-badge&logo=Express)
![Node.js](https://img.shields.io/badge/-Node.js-090909?style=for-the-badge&logo=Node.js)
![MongoDB](https://img.shields.io/badge/-MongoDB-090909?style=for-the-badge&logo=MongoDB)
![Postman](https://img.shields.io/badge/-Postman-090909?style=for-the-badge&logo=Postman)

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки

## Инструкция по установке

1. Клонировать репозиторий: gir clone
   `git@github.com:JuliaKrasnova2008/express-mesto-gha.git`
2. Установить зависимости:
   `npm ci`
3. Запустить приложение:
   `npm run start`
4. Запустить сервер с hot-reload:
   `npm run dev`
