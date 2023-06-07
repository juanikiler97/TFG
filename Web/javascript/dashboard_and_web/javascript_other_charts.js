var myChartscatter = echarts.init(document.getElementById('scatter'));

const datos = {
      "user": ["Ukraine Queen","Herry Napitupulu","Hi keep","KK_10","News"],
      "tweets": [39,37,35,34,29],
      "seguidores": [50,60,35,34,29],
      "paises": ["Spain","Canada","Ireland","China","EEUU"]
    };

    // Opciones del gráfico
   const opciones = {

  xAxis: {
    type: 'value',
    name: 'Seguidores'
  },
  yAxis: {
    type: 'value',
    name: 'Tweets'
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.seriesName + '<br/>' + datos.user[params.dataIndex] + '<br/>' + params.data[0] + ' seguidores, ' + params.data[1] + ' tweets';
    }
  },
  series: [{
    data: datos.user.map((usuario, indice) => [datos.seguidores[indice], datos.tweets[indice]]),
    type: 'scatter',
    name: 'Usuario'
  }]
};

// Establecer las opciones en el gráfico
myChartscatter.setOption(opciones);

