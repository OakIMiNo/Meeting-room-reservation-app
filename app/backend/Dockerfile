FROM python:3.9-slim
ENV PYTHONUNBUFFERED=1

WORKDIR /src

RUN pip install poetry

COPY pyproject.toml* poetry.lock* 
COPY ./backend .

RUN if [ -f pyproject.toml ]; then poetry install; fi


CMD ["poetry", "run", "uvicorn", "api.main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]