/*******************************
 *******************************
 * LEYENDO JSON PARA LOS KPIS **
 * *****************************
 * ******************************/

/*
fetch('retweets.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    //const retweets = data.numero_retweets;
    //console.log(retweets);
    //document.getElementById('retweets').innerText = retweets;
  })
  .catch(error => console.error(error));
 */
/**
 * "**************************************" +
 * ****** KPIS EN JAVASCRIPT ************" +
 * ***************************************
 */

console.log("**************************************" +
            "****** KPIS EN JAVASCRIPT ************" +
            "*************************************");

/***
 * LECTURA JSON KPI TWEET
 * @type {string}
 */
dataset_kpi = '../javascript/dataset_dashboard/KPIs.json';
fetch(dataset_kpi).then(res => res.json()).then(data => {
    console.log(data);
    const tweets_count = data.cantidad_tweets;
    document.getElementById('tweets_count').innerText = tweets_count;
});

/***
 * LECTURA JSON KPI RETWEET
 * @type {string}
 */
//dataset_retweets = '../javascript/dataset_dashboard/retweets.json';
fetch(dataset_kpi).then(res => res.json()).then(data => {
    console.log(data);
    const retweets_count = data.cantidad_usuarios;
    document.getElementById('retweets_count').innerText = retweets_count;
});


/***
 * LECTURA JSON KPI MENCIONES
 * @type {string}
 */
//dataset_mencions = '../javascript/dataset_dashboard/menciones_count.json';
fetch(dataset_kpi).then(res => res.json()).then(data => {
    console.log(data);
    const mencion_count = data.cantidad_hastags;
    document.getElementById('mentions_count').innerText = mencion_count;
});


