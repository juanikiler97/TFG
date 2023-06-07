/**
 * OBTENCION IDS DE LOS GRAFICOS Y DATASEETS
 */

/* IDs del gráfico */
var myChart = echarts.init(document.getElementById('chartline'));
var myChart2 = echarts.init(document.getElementById('chartbar'));
var myChart3 = echarts.init(document.getElementById('chartbarVertical'));
var myChart4 = echarts.init(document.getElementById('chartbarVerticalTweets'));
var myChartscatter = echarts.init(document.getElementById('scatter'));


/* Direccion de los datasets */
dataset_timeline = '../javascript/dataset_dashboard/tweets_por_mes.json';
dataset_hastags = '../javascript/dataset_dashboard/top_hastags.json';
dataset_user = '../javascript/dataset_dashboard/top_user.json';
dataset_retweets = '../javascript/dataset_dashboard/top_retweets.json';
dataset_tabla = '../javascript/dataset_dashboard/scatter_tweets_retweets_seguidores.json';
dataset_scatter = '../javascript/dataset_dashboard/scatter_tweets_retweets_seguidores.json';


/**
 * Creacion de la dashboard
 */

// GRAFICA TIMELINE
fetch(dataset_timeline).then(res => res.json()).then(data => {

  const date = data.map(item => item.tweet_created_at); // Recorremos la fecha
  const tweets = data.map(item => item.tweets); // Recorremos la cantidad de tweets
  option = {
   tooltip: {
  trigger: 'axis',
  axisPointer: {
    show: true,
    snap: true,
  },
  position: function (point, params, dom, rect, size) {
    return [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] - 10];
  },
},
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
        splitLine: {
      show: false
    }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
        splitLine: {
      show: false
    }
    },
    series: [
      {
        name: 'Tweets',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: tweets
      }
    ]
  };

  option.responsive = true;
  myChart.setOption(option);
  // Redimensiona el gráfico cuando la ventana del navegador cambie de tamaño
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});


// Grafica Hastag
fetch(dataset_hastags).then(res => res.json()).then(data => {
    console.log("dataset_hastags: "+data);
    const hastag = data.map(item => item.hastags);
    const Frecuencia = data.map(item => item.Frecuencia);
    console.log("Hastag y frecuencia: "+hastag+Frecuencia);
    option2 = {
        grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function(params) {
                let tooltipContent = 'Hashtag: ' + params[0].axisValueLabel + '<br>';
                tooltipContent += '<span style="color:' + params[0].color + '">' + 'Frecuencia: ' + params[0].data + '</span><br>';
                return tooltipContent;
            }
        },
        transform: {
            type: 'sort',
            config: { dimension: Frecuencia, order: 'desc' }
        },
        yAxis: {
            type: 'category',
            data: hastag.reverse(),
            splitLine: {
                show: false
            }
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false
            }
        },
        series: [{
            data: Frecuencia.reverse(),
            type: 'bar',
            encode: {
                x: 'Frecuencia',
                y: 'Hastag'
            }
        }],
        visualMap: {
            show: false,
            min: 50,
            max: 2000,
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        }
    };
    myChart2.setOption(option2);
});


// Grafica tweets
fetch(dataset_user).then(res => res.json()).then(data => {
    const user = data.map(item => item.nombre_usuario);
    const frecuency = data.map(item => item.count);
  option3 = {
    tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function(params) {
                let tooltipContent = 'Usuario: ' + params[0].axisValueLabel + '<br>';
                tooltipContent += '<span style="color:' + params[0].color + '">' + 'Frecuencia: ' + params[0].data + '</span><br>';
                return tooltipContent;
            }
          },
      transform: {
        type: 'sort',
        config: { dimension: 'tweets', order: 'desc' }
      },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
        splitLine: {
      show: false
    }
    },
    yAxis: {
      type: 'category',
      data: user,
        splitLine: {
      show: false
    }
    },
    series: [
      {
        type: 'bar',
        data: frecuency.reverse(),
        encode:
            {
               x: 'user',
               y: 'tweets'
            }
      },

    ],
    visualMap: {
            //orient: 'horizontal',
            //text: ['alto', 'bajo'],
            //left: 'center',
            show: false,
            min: 1,
            max: 40,
            dimension: 0,
            inRange: {
               color: ['#65B581', '#FFCE34', '#FD665F']
            }
  }
};
myChart3.setOption(option3);
});


// Grafica retweets
fetch(dataset_retweets).then(res => res.json()).then(data => {
   const personas = data.map(item => item.nombre_usuario);
   const retweets = data.map(item => item.numero_retweets);
  console.log(personas+retweets);
  option4 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
         formatter: function(params) {
                let tooltipContent = 'Usuario: ' + params[0].axisValueLabel + '<br>';
                tooltipContent += '<span style="color:' + params[0].color + '">' + 'Frecuencia: ' + params[0].data + '</span><br>';
                return tooltipContent;
            }
    },
    transform: {
      type: 'sort',
      config: { dimension: 'tweets', order: 'desc' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: personas
    },
    series: [
      {
        type: 'bar',
        data: retweets.reverse(),
        encode:
        {
          x: 'tweets',
          y: 'user'
        }
      }
    ],
    visualMap: {
      show: false,
      min: 3000,
      max: 9000,
      dimension: 0,
      inRange: {
        color: ['#65B581', '#87CEFA', '#00BFFF', '#1E90FF', '#4169E1']
      }
    }
  };
  myChart4.setOption(option4);
});


// Grafica scatter
fetch(dataset_scatter)
  .then(res => res.json())
  .then(data => {
    const dataTweets = data.map(item => item.numero_tweets);
    const dataUser = data.map(item => item.nombre_usuario);
    const dataSeguidores = data.map(item => item.numero_seguidores);
    /*const thresholdColor = 0.5; // Umbral para el color de los puntos
    const colorScale = d3.scaleLinear().domain([0, Math.max(...dataTweets) * thresholdColor]).range(['blue', 'red']);
    const symbolSizeScale = d3.scaleLinear().domain([0, Math.max(...dataSeguidores)]).range([5, 30]);*/
    optionScatter = {
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: 'S',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'T',
        splitLine: {
          show: false
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.seriesName + '<br/>' + dataUser[params.dataIndex] + '<br/>Seguidores: ' + params.value[0] + '<br/>Tweets: ' + params.value[1];
        }
      },
      series: [
        {
          data: dataSeguidores.map((seguidores, index) => {
            //const symbolSize = symbolSizeScale(seguidores);
            return {
              value: [seguidores, dataTweets[index]],
              name: dataUser[index],
                symbolSize: 15
              //symbolSize: symbolSize,//15
              /*itemStyle: {
                normal: {
                  color: colorScale(dataTweets[index])
                }
              }*/
            }
          }),
          type: 'scatter',
          name: 'Usuario'
        }
      ]
    };
    myChartscatter.setOption(optionScatter);
  });





// Tabla
fetch(dataset_tabla)
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#table-body');
    data.forEach(item => {
      const row = `
        <tr>         
          <td>${item.nombre_usuario}</td>
          <td>${item.Fecha_de_creacion_usuario}</td>
          <td>${item.numero_seguidores}</td>         
          <td>${item.numero_retweets}</td>
          <td>${item.numero_favoritos}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  });



