import time
import requests

while True:
    try:
        print("Fetching new jobs...")
        requests.post("http://173.249.57.177:8012/api/process_new_jobs_cron")
    except:
        pass
    time.sleep(60)