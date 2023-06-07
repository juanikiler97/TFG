// Configurar el gráfico
var myChart = echarts.init(document.getElementById('chart_network_graph'));

$.get('../javascript/dataset_graphs/grafo.json', function (data) {
  var nodes = data.flatMap(item => [item.origen, item.destino]);
  var links = data.map(item => ({ source: item.origen, target: item.destino }));
  option = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'graph',
        layout: 'circular',
        symbolSize: 50,
        roam: true,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: nodes,
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