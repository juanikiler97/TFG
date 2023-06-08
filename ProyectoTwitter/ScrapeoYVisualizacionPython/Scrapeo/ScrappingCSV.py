#import csv
import tweepy
import pandas as pd
import datetime
# Claves para scrapear y coger datos de twitter
API_KEY = '75O9FrfwaBUORgZCuxtNzuJJD'
API_KEY_SECRET = 'BAUZlM4fpbiOxfhUNj42HB6Sb4Wsx95Oh29bxGmWEAmm914Ru1'

ACCESS_TOKEN = '1581672015332888579-UEzL2COg2zxrAvuVd687V1veVF65Qr'
ACCESS_TOKEN_SECRET = 'ij5OXzaTs6SugSviRcQ5ZOgaGktt8aouPtPHRVsiPBqhJ'

# Ahora autenticamos las claves
authentication = tweepy.OAuthHandler(API_KEY,API_KEY_SECRET)
authentication.set_access_token(ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
api = tweepy.API(authentication)

palabra_a_buscar = "elecciones madrid"
numero_de_tweets = 400

tweets = tweepy.Cursor(api.search_tweets, q=palabra_a_buscar, lang="es", tweet_mode="extended").items(numero_de_tweets)

columnas_csv_tweets = ['ID', 'Fecha_de_creacion_usuario', 'Fecha_creacion_del_tweet', 'nombre_usuario', 'texto', 'localizacion', 'numero_seguidores', 'numero_seguidos',
                       'numero_retweets', 'numero_tweets', 'numero_favoritos', 'menciones', 'retweet']
datos_tweets = []

for tweet in tweets:
    menciones = [mention["screen_name"] for mention in tweet.entities["user_mentions"]]
    retweet = None
    cita = None
    respuesta = None
    if hasattr(tweet, "retweeted_status"):
        retweet = tweet.retweeted_status.user.screen_name
    fecha_creacion_usuario = datetime.datetime.strptime(str(tweet.user.created_at), '%Y-%m-%d %H:%M:%S+00:00').strftime('%y/%m/%d')
    fecha_creacion_tweet = datetime.datetime.strptime(str(tweet.created_at), '%Y-%m-%d %H:%M:%S+00:00').strftime('%y/%m/%d')
    numero_tweets = tweet.user.statuses_count
    datos_tweets.append([tweet.id, fecha_creacion_usuario, fecha_creacion_tweet, tweet.user.screen_name, tweet.full_text,
                         tweet.user.location, tweet.user.friends_count, tweet.user.followers_count,
                         tweet.retweet_count, numero_tweets, tweet.user.favourites_count, menciones, retweet])

df = pd.DataFrame(datos_tweets, columns=columnas_csv_tweets)
df.to_csv('datos_tweets_brutoV6.csv', index=False)