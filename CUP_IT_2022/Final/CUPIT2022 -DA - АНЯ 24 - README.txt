В папке расположены следующие файлы

- Презентация решения.pdf
- Приложение
	- Приложение.База Данных
	- Приложение.Обработка Датасета
	- Приложение.WEB-Сервис
	- Финасовая модель.xlsx - Описание финансовой модели расчёта потерь и
				  инвестиционных показателей 

Соотвественно в папках:
- Приложение.База Данных
	- Концептуальная модель ER диаграммы - png
	- Логическая модель ER диаграммы - png
	- Физическая модель ER диаграммы - png
	- SQL скрипт создающий физическую модель ER диаграммы - sql    
	- Описание ролевой модели работы с БД - xlsx

- Приложение.Обработка Датасета
	- Иерархия подразделений - png
	- Обработанные данные из датасета - xlsx
	- Плоская таблица из данных датасета - xlsx
	- Програмный код Python, создающий все таблицы из датасета - ipynb

- Приложение.WEB-Сервис
## Автоматизированное решение для подсчета потерь от отключения сервисов

### Как запустить
Все решение собрано с использованием `docker` и `docker-compose`. Для запуска достаточно команды `docker-compose up -d --build`. 
Так же необходимо создать `.env` файл со следующей конфигурацией:
```shell
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DBATABASE=sevstal
DATABASE_HOST=db
DATABASE_PORT=5432

APP_HOST=0.0.0.0
APP_PORT=8000

IS_DEV=0
```

### Как работает решение
В основе лежит API, написанное на питоне и БД PostgresQL, в которую были перенесены все данные из представленных таблиц.
Используя веб приложение, написанное с использованием ReactJS и TypeScript, можно получить информацию о потерях по каждому подразделению для каждого сервиса в отдельности на определнном промежутке даты и времени.
