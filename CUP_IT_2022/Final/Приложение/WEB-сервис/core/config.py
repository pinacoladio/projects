from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DBATABASE = os.getenv('POSTGRES_DBATABASE')
DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_PORT = int(os.getenv('DATABASE_PORT')) or 5432
PSQL_URL = f'postgresql+psycopg2://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{POSTGRES_DBATABASE}'

APP_HOST = os.getenv('APP_HOST') or 'localhost'
APP_PORT = int(os.getenv('APP_PORT')) or 8000

IS_DEV = bool(os.getenv('POSTGRES_USER')) or 1
