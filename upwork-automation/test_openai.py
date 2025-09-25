import os
from openai import OpenAI

key = os.getenv("OPEN_AI_KEY")
print("Has key?", bool(key))

try:
    client = OpenAI(api_key=key)
    r = client.embeddings.create(
        model="text-embedding-3-small",
        input="ping"
    )
    print("OK:", r.model, len(r.data[0].embedding))
except Exception as e:
    print("ERR:", e)

