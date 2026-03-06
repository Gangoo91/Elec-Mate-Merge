FROM python:3.12-slim

WORKDIR /app

# System deps for lxml
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libxml2-dev \
    libxslt1-dev \
    && rm -rf /var/lib/apt/lists/*

# Playwright system deps for Crawl4AI stealth browser
RUN apt-get update && apt-get install -y --no-install-recommends \
    libwoff1 libopus0 libwebp7 libwebpdemux2 libenchant-2-2 \
    libgudev-1.0-0 libsecret-1-0 libhyphen0 libgdk-pixbuf2.0-0 \
    libegl1 libnotify4 libevent-2.1-7 libgles2 \
    libxcomposite1 libatk1.0-0 libatk-bridge2.0-0 libgomp1 \
    libxss1 ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download Chromium browser for Crawl4AI (~200MB)
RUN crawl4ai-setup

COPY src/ src/

ENV PYTHONUNBUFFERED=1
ENV TZ=Europe/London

EXPOSE 3002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3002"]
