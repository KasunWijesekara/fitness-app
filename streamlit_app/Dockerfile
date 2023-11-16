FROM python:3.9

WORKDIR /app

COPY .streamlit/ /root/.streamlit/

COPY requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

EXPOSE 8501

COPY . /app

ENTRYPOINT [ "streamlit", "run" ]

CMD ["demo.py"]
