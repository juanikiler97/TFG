#import csv
import tweepy
import pandas as pd
import datetime


# Claves para scrapear y coger datos de twitter
API_KEY = 'pbUomglK6nHjq0vxz2CFXg25D'
API_KEY_SECRET = 'RTrR4jRTLrLg2q5t23ui4n1oz16zrCv1Rwmwk7wIJqXB7C3Jjc'

ACCESS_TOKEN = '1581672015332888579-gBcr7OxGjnUqJ7oQMUyDmU0sD70ucs'
ACCESS_TOKEN_SECRET = 'FRTu2nnn9VUBUxR6OtKgOkQmJbB008mCf0rky23MuoU0O'

# Ahora autenticamos las claves
authentication = tweepy.OAuthHandler(API_KEY,API_KEY_SECRET)
authentication.set_access_token(ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
api = tweepy.API(authentication)

palabra_a_buscar = "#Ukraine"
numero_de_tweets = 950

tweets = tweepy.Cursor(api.search_tweets, q=palabra_a_buscar, lang="en", tweet_mode="extended").items(numero_de_tweets)

columnas_csv_tweets = ['ID','Fecha_de_creacion_usuario','Fecha_creacion_del_tweet','nombre_usuario','texto','localizacion','numero_seguidores','numero_seguidos','numero_retweets','numero_favoritos','menciones','retweet']
datos_tweets = []

for tweet in tweets:
    menciones = mentions = [mention["screen_name"] for mention in tweet.entities["user_mentions"]]
    retweet = None
    cita = None
    respuesta = None
    if hasattr(tweet, "retweeted_status"):
        retweet = tweet.retweeted_status.user.screen_name
    fecha_creacion_usuario = datetime.datetime.strptime(str(tweet.user.created_at), '%Y-%m-%d %H:%M:%S').strftime('%y/%m/%d')
    fecha_creacion_tweet = datetime.datetime.strptime(str(tweet.created_at), '%Y-%m-%d %H:%M:%S').strftime('%y/%m/%d')
    datos_tweets.append([tweet.id, fecha_creacion_usuario, fecha_creacion_tweet, tweet.user.screen_name, tweet.full_text,
                         tweet.user.location, tweet.user.friends_count, tweet.user.followers_count,
                         tweet.retweet_count, tweet.favourites_count, menciones,retweet])
df = pd.DataFrame(datos_tweets, columns = columnas_csv_tweets)
df.to_json('Datasets/datos_tweets_bruto.json', orient='records')