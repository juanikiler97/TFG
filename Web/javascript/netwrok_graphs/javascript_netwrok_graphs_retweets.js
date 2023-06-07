// Configurar el gráfico
var myChart = echarts.init(document.getElementById('chart_network_graph'));

$.get('../javascript/dataset_graphs/grafoRetweets.json', function (data) {
  var nodes = [];
  var links = [];

  data.forEach(function (item) {
    var sourceNode = item.origen;
    var targetNode = item.destino;

    // Agregar los nodos al arreglo de nodos si no existen aún
    if (!nodes.includes(sourceNode)) {
      nodes.push(sourceNode);
    }
    if (!nodes.includes(targetNode)) {
      nodes.push(targetNode);
    }

    // Agregar el enlace al arreglo de enlaces
    links.push({ source: sourceNode, target: targetNode });
  });

  option = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 15,
        roam: true,
        label: {
          show: false
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 3
        },
        data: nodes.map(function (node) {
          return { name: node };
        }),
        links: links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ]
  };

  // Renderizar el gráfico
  myChart.setOption(option);
});