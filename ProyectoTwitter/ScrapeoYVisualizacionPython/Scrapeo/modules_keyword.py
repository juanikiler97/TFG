# subir todos los datasets scrapeados a esta carpeta:
# https://liveutad-my.sharepoint.com/:f:/g/personal/sergio_tarrero_live_u-tad_com/Elt1c3nrMXBCvUYPcBuCgREBqMjmeHT-DJLKDxtDnZ49ew?e=tVqhX8


def select_credentials():

    """
    Elegir API por si se llega al límite de scrapeos con una.
    """

    print(f"\n¿Con qué \033[1;32mAPI\033[0m quieres hacer el scrapeo?")
    print(f"1. - op1")
    print(f"2. - op2")

    choice = int(input(f"Elegir opcion (1-2)): "))

    # Se
    if choice == 1:
        CONSUMER_KEY = '75O9FrfwaBUORgZCuxtNzuJJD'
        CONSUMER_SECRET = 'BAUZlM4fpbiOxfhUNj42HB6Sb4Wsx95Oh29bxGmWEAmm914Ru1'

        ACCESS_TOKEN = '1581672015332888579-UEzL2COg2zxrAvuVd687V1veVF65Qr'
        ACCESS_SECRET = 'ij5OXzaTs6SugSviRcQ5ZOgaGktt8aouPtPHRVsiPBqhJ'
        return CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET
    # Go
    elif choice == 2:
        CONSUMER_KEY = '75O9FrfwaBUORgZCuxtNzuJJD'
        CONSUMER_SECRET = 'BAUZlM4fpbiOxfhUNj42HB6Sb4Wsx95Oh29bxGmWEAmm914Ru1'

        ACCESS_TOKEN = '1581672015332888579-UEzL2COg2zxrAvuVd687V1veVF65Qr'
        ACCESS_SECRET = 'ij5OXzaTs6SugSviRcQ5ZOgaGktt8aouPtPHRVsiPBqhJ'
        return CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET
    else:
        print("\x1b[1;31m" + "Opción no válida, seleccione otra vez" + "\x1b[0m\n")
        return select_credentials()


def select_woeid():

    """
    Elegir WOEID del país de para scrappear
    """
    
    print("\nSobre qué país quieres hacer el scrapeo?")

    # WOEIDs (Where On Earth IDentifiers)
    # Referencia: https://www.eltitular.es/woeid/

    countries = [
        
        {"name": "World", "woeid": 1},
        {"name": "Spain", "woeid": 23424950},
        {"name": "USA", "woeid": 23424977},
        {"name": "Russia", "woeid": 2122265},
        {"name": "UK", "woeid": 23424975},
        {"name": "Canada", "woeid": 23424775},
        {"name": "Australia", "woeid": 23424748},
        {"name": "India", "woeid": 23424848},
        {"name": "South Africa", "woeid": 23424942},
        {"name": "New Zealand", "woeid": 23424916}
    ]

    for i, country in enumerate(countries, 1):
        print(f"{i} .- {country['name']}")

    choice = int(input("Elegir opcion (1-{}): ".format(len(countries))))

    if 1 <= choice <= len(countries):
        return countries[choice - 1]["woeid"]
    else:
        print("\x1b[1;31m" + "Opción no válida, seleccione otra vez" + "\x1b[0m\n")
        return select_woeid()





def select_keyword():

    """
    Elegir keyword para scrappear dentro del país (WOEID) elegido
    """

    print(f"\nSobre qué \x1b[1;36mpalabra\x1b[0m quieres scrapear?")
    print(f"El funcionamiento es igual que para scrapear Trending Topics\npero con una palabra elegida en este caso")

    keyword = input("Escribir palabra: ")

    return keyword

    
def select_number_tweets():
    
    """
    Elegir número de tweets a scrapear
    """
    
    print(f"\nCuántos tweets quieres scrapear?: ")
    
    num_tweets = int(input("Escribir número (máximo 5000): "))
    
    return num_tweets