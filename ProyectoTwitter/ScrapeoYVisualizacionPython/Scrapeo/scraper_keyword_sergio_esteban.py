# subir todos los datasets scrapeados a esta carpeta:
# https://liveutad-my.sharepoint.com/:f:/g/personal/sergio_tarrero_live_u-tad_com/Elt1c3nrMXBCvUYPcBuCgREBqMjmeHT-DJLKDxtDnZ49ew?e=tVqhX8

import tweepy
import csv
import os
import pandas as pd
from datetime import datetime
import time
import modules_keyword
import sys

now = datetime.now()
dt_string = now.strftime("%d_%m_%H_%M")

print("\x1b[1;36m" + "\n------------------\nSCRAPEADOR BA KEYWORD\n------------------\n" + "\x1b[0m")

CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET = modules_keyword.select_credentials()

# Create a folder to save the CSV files
if not os.path.exists("datasets"):
    os.makedirs("datasets")
    print(f"---\nFolder 'datasets' created\n---\n")

# Authenticate to Twitter
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create API object
api = tweepy.API(auth)

#print("\x1b[1;36m" + "\n------------------\nSCRAPEADOR BA TWITTER\n------------------\n" + "\x1b[0m")

woeid_id = modules_keyword.select_woeid()

#trends = api.get_place_trends(id = woeid_id)

print(f"\n\x1b[1;33mWOEID elegido:\x1b[0m {woeid_id}")

input_topic = modules_keyword.select_keyword()
print(f"\n\x1b[1;33mKeyword elegida:\x1b[0m {input_topic}")

num_tweets = modules_keyword.select_number_tweets()

# Search for tweets containing a specific hashtag
tweets = tweepy.Cursor(api.search_tweets, q=input_topic).items(num_tweets)

print(f"\nScrapeando ...")

# Guardar los tweets en un CSV
start_time = time.time()

with open(f"{input_topic}_tweets_{dt_string}.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "text", "favorite_count", "in_reply_to_status_id",
                     "in_reply_to_user_id", "in_reply_to_screen_name", "coordinates",
                     "place", "lang", "entities",
                     "source", "is_quote_status", 
                     "user.id", "user.name", "user.location",
                     "user.description", "user.url", "user.followers_count",
                     "user.friends_count", "user.listed_count", "user.created_at",
                     "user.favourites_count", "user.verified"])

    for i, tweet in enumerate(tweets):
        # Progress bar
        sys.stdout.write("\r%d%% [%s]" % (100 * (i + 1) / num_tweets, "=" * int((i + 1) * 100 / num_tweets / 2)))
        sys.stdout.flush()
        time.sleep(0.05)

        writer.writerow([tweet.id, tweet.text, tweet.favorite_count,
                         tweet.in_reply_to_status_id, tweet.in_reply_to_user_id, tweet.in_reply_to_screen_name,
                         tweet.coordinates, tweet.place, tweet.lang, tweet.entities,
                         tweet.source, tweet.is_quote_status,
                         tweet.user.id, tweet.user.name, tweet.user.location,
                         tweet.user.description, tweet.user.url, tweet.user.followers_count,
                         tweet.user.friends_count, tweet.user.listed_count, tweet.user.created_at, 
                         tweet.user.favourites_count, tweet.user.verified])

# save the dataset in the "datasets" folder
os.rename(f"{input_topic}_tweets_{dt_string}.csv", f"datasets/{input_topic}_tweets_{dt_string}.csv")
end_time = time.time()
print(f"\n\nTiempo total: {(end_time - start_time):.2f} segundos")

print(f"\n\nArchivo \033[1;32m{input_topic}_tweets_{dt_string}.csv \033[0mgenerado con éxito\n")
