<<<<<<< HEAD
import os
=======
# import time
# import requests

# while True:
#     try:
#         print("Fetching new jobs...")
#         requests.post("http://173.249.57.177:8012/api/process_new_jobs_cron")
#     except:
#         pass
#     time.sleep(60)
>>>>>>> 8fc78af (working login)
import time
import requests
from dotenv import load_dotenv

<<<<<<< HEAD
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
=======
API_BASE = "http://173.249.57.177:8012/api"
USERNAME = "your-username"   # load from env
PASSWORD = "your-password"   # load from env

# Get JWT token once at startup
def get_token():
    resp = requests.post(
        f"{API_BASE}/auth/login",
        json={"username": USERNAME, "password": PASSWORD}
    )
    resp.raise_for_status()
    return resp.json()["access_token"]

token = get_token()
headers = {"Authorization": f"Bearer {token}"}

while True:
    try:
        print("Fetching new jobs...")
        resp = requests.post(f"{API_BASE}/process_new_jobs_cron", headers=headers)
        print("Response:", resp.status_code, resp.text)
    except Exception as e:
        print("Error:", e)
    time.sleep(60)
>>>>>>> 8fc78af (working login)
