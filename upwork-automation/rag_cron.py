import time
import requests

while True:
    try:
        print("Fetching new jobs...")
        requests.post("http://localhost:8001/api/process_new_jobs_cron")
    except:
        pass
    time.sleep(60)