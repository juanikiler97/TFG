var myChart_3 = echarts.init(document.getElementById('chart_netwrok_graph_3'));
myChart_3.showLoading();
$.getJSON('../javascript/dataset_graphs/GrafoComunidades2.json', function (graph) {
  console.log(graph)
  myChart_3.hideLoading();
  option = {
    tooltip: {},
    legend: [
      {
        data: graph.communities.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
        type: 'graph',
        layout: 'circular',
        data: graph.nodes.map(function (node) {
          return {
            name: node.node,
            category: node.community,
          };
        }),
        links: graph.links.map(function (link) {
          return {
            source: link.source,
            target: link.target
          };
        }),
        categories: graph.communities,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };
  myChart_3.setOption(option);
});
