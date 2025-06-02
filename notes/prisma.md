Для того что бы использовать призму:

устанавливаем зависимость: pnpm add prisma

затем нужно инициировать призму командой npx prisma init
тут важен момент, команда создаст папку prisma. Если мы находимся в корневой папке проекта,
папка с призмой установится прям там. То есть надо сначала зайти в нужную папку:
В моем случае cd apps/nest-notes/src/db и только тогда запускать npx prisma init.
После генерации будет создана папка призма с schema.prisma, .env(с примером url подключения) и gitignore.
по сути gitignore можно удалить, так как у нас он есть в глобальной папке, c .env все сложнее. Если у нас в проекте нсколько env файлов (dev.env prod.env test.env и тд) и мы переменные окружения загружаем через какой то конфиг файл, то чисто для призмы все равно нужен .env именно туда будет заглядывать призма при генерации и миграции.

После инициализации призмы, нужно ее сгенерировать. это команда pnpm prisma generate
Так как у меня она инициализирована не в корневой папке, нужно добавить путь:
pnpm prisma generate --schema=apps/nest-notes/src/db/prisma/schema.prisma
Prisma schema loaded from apps\nest-notes\src\db\prisma\schema.prisma

все модельки сущностей будем создавать именно в файле schema.prisma и только там (так устроена призма).

model User {
id String @id @default(uuid()) @db.Uuid
login String @unique
email String @unique
Profile Profile?
}

у юзера есть айдишка с типом String и декоратором @id,  
@default() - дефолтное значение, в данном случае @default(uuid()) генерирует uuid.
обязательно указываем @db.Uuid, что бы дать понять что айдишка это не просто текст а именно uuid

Так же у юзера может быть логин, и эмейл. Это так же String. Значек @unique указывает что поле должно быть уникальным

строчка
Profile Profile? указывает что у юзера может быть
профайл, который является еще одной моделью
значек ? указывает что его может и не быть

вот модель профайла
model Profile {
id String @id @default(uuid()) @db.Uuid
bio String
userId String @unique
User User @relation(fields: [userId], references: [id])
}

userId соответсвенно указывает на айдишку юзера
а строчка
User User указывает связь с юзером.
@relation(fields: [userId], references: [userId])
fields: [userId] указывает поле на стороне профайла

references: [userId] указывает на поле на стороне юзера.

при попытке удалить юзера выйдет ошибка. Так как у профайла не может быть пустого поля юзер айди.
можно выставить onDelete: Cascade

будет выглядить вот так
model Profile {
profileId Int @id @default(autoincrement())
bio String
userId Int @unique
User User @relation(fields: [userId], references: [userId], onDelete: Cascade)
}

теперь при удалении юзера, автоматически удалится и его профиль.

можно установить onDelete: SetNull, тогда при удалении юзера, в профиле юзерайди установится null (если это допустимо)

можно установить onDelete: Restrict, тогда мы не сможем удалить юзера до того как удалим профайл.
