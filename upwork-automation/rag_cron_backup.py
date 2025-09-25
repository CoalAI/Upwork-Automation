import time
import requests

while True:
    try:
        print("Fetching new jobs...")
        requests.post("http://173.249.57.177:8011/api/process_new_jobs_cron")
        # requests.post("http://localhost:8001/api/process_new_jobs_cron")
    except Exception as e:
        print("Error:", e)
    time.sleep(60)

