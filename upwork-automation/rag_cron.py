import os
import time
import requests
from dotenv import load_dotenv

# Load .env from this folder
load_dotenv()

BASE = (os.getenv("APP_URL") or "http://127.0.0.1:8011").rstrip("/")
TOKEN = os.getenv("BEARER_TOKEN", "")

URL = f"{BASE}/api/process_new_jobs_cron"
HEADERS = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}

def once():
    try:
        print(f"[cron] POST {URL}")
        resp = requests.post(URL, headers=HEADERS, timeout=30)
        print(f"[cron] {resp.status_code} {resp.text[:300]}")
    except Exception as e:
        print(f"[cron] ERROR: {e}")

if __name__ == "__main__":
    while True:
        once()
        time.sleep(60)  # every minute
