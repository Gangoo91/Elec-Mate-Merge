FROM python:3.12-slim

WORKDIR /app

# System deps for lxml
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libxml2-dev \
    libxslt1-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright system deps + Chromium browser for Crawl4AI
# playwright install-deps handles all OS-specific packages automatically
RUN playwright install-deps chromium && playwright install chromium

COPY src/ src/

ENV PYTHONUNBUFFERED=1
ENV TZ=Europe/London

EXPOSE 3002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3002"]
