# Important Setup

Please update the following files before running the application: 
(NOTE: THE FILE FORMAT IS IMPORTANT AND SHOULD BE MAINTAINED THE SAME WAY AS SHOWN)

1. upwork-automation\app\api\routes\agents\company_details.md

Company Markdown file should be edited in the sample format shown in the file. 
This file contains the company projects and their descriptions to match relevant jobs on Upwork

2. upwork-automation\app\api\routes\agents\company_profile.md

These files should also be updated in the format specified. This file contains the details about user's Upwork profile to match jobs to specific profile. 

3. env

In .env, please update our OPEN_API_KEY.
Rest of the fields should remain as they are. 


4. Cron Setup

You need to setup a cron in system to hit "http://localhost:8001/api/process_new_jobs_cron" after every minute. This ensures that new jobs are being fetched and saved to the system. 

To setup this cron, use Windows Scheduler, Linux Crontab or simply run the rag_cron.py file and keep it running. 

To run the file: 
cd "upwork-automation"
python rag_cron.py


----------------------------------------------------------------------------

#Frontend

cd "new-ui-upwork"
npm install
npm run dev

To check if it's running: 

http://localhost:5003/

-----------------------------------------------------------------------------

#Backend

To run the backend with Docker (Recommended): 
cd "upwork-automation"
docker build -t upwork-automation .
docker run -d --name upwork-backend -p 8001:8001 upwork-automation


To run the backend directly with Python on system:
cd "upwork-automation"
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload


To check if it's running: 

docker logs upwork-backend (if using docker)

http://localhost:8001/
http://localhost:8001/docs


To stop and remove the container:
docker stop upwork-backend
docker rm upwork-backend


--------------------------------------------------------------------------------

# Application Usage

Pages: 
1. Jobs: Shows the jobs. Use filters to alter between all jobs v/s relevant jobs
2. Settings: 

(Make sure to disable relevance check when the system is not in use to save Open AI Tokens)

3. Other Pages: Not populated yet 
