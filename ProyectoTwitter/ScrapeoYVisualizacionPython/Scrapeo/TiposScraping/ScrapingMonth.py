#import csv
import tweepy
import pandas as pd
from datetime import datetime, timedelta, timezone


# Claves para scrapear y coger datos de twitter
API_KEY = 'pbUomglK6nHjq0vxz2CFXg25D'
API_KEY_SECRET = 'RTrR4jRTLrLg2q5t23ui4n1oz16zrCv1Rwmwk7wIJqXB7C3Jjc'

ACCESS_TOKEN = '1581672015332888579-gBcr7OxGjnUqJ7oQMUyDmU0sD70ucs'
ACCESS_TOKEN_SECRET = 'FRTu2nnn9VUBUxR6OtKgOkQmJbB008mCf0rky23MuoU0O'

# Autenticación de Twitter
authentication = tweepy.OAuthHandler(API_KEY, API_KEY_SECRET)
authentication.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(authentication)

palabra_a_buscar = "#Ukraine"
numero_de_tweets = 2
date_format = '%Y-%m-%d %H:%M:%S'

# Calcular las fechas de inicio y fin (último mes hasta hoy)
end_date = datetime.now(timezone.utc)
start_date = end_date - timedelta(days=30)

# Obtener tweets con la palabra clave en el rango de fechas especificado
tweets_data = []
max_id = None

while True:
    if max_id is None:
        tweets = tweepy.Cursor(api.search_tweets, q=palabra_a_buscar, lang="en", tweet_mode="extended",
                               until=end_date.strftime('%Y-%m-%d')).items(numero_de_tweets)
    else:
        tweets = tweepy.Cursor(api.search_tweets, q=palabra_a_buscar, lang="en", tweet_mode="extended",
                               until=end_date.strftime('%Y-%m-%d'), max_id=max_id).items(numero_de_tweets)

    for tweet in tweets:
        tweet_date = tweet.created_at.replace(tzinfo=timezone.utc)
        if tweet_date < start_date:
            break

        tweet_data = {
            'ID': tweet.id_str,
            'Fecha_de_creacion_usuario': tweet.user.created_at.strftime(date_format),
            'Fecha_creacion_del_tweet': tweet_date.strftime(date_format),
            'nombre_usuario': tweet.user.screen_name,
            'texto': tweet.full_text,
            'localizacion': tweet.user.location,
            'numero_seguidores': tweet.user.followers_count,
            'numero_seguidos': tweet.user.friends_count,
            'numero_retweets': tweet.retweet_count,
            'numero_favoritos': tweet.favorite_count,
            'menciones': [mention["screen_name"] for mention in tweet.entities["user_mentions"]],
            'retweet': tweet.retweeted_status.user.screen_name if hasattr(tweet, "retweeted_status") else None
        }
        tweets_data.append(tweet_data)

    if tweet_date < start_date:
        break

    max_id = tweet.id - 1

# Crear un dataframe de pandas a partir de la lista de datos de tweets y guardar en un archivo JSON
tweets_df = pd.DataFrame(tweets_data)
tweets_df.to_json('datos_tweets_bruto.json', orient='records')