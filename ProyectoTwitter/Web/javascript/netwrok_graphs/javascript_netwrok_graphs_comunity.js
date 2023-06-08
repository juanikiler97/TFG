var myChart_2 = echarts.init(document.getElementById('chart_netwrok_graph_2'));
myChart_2.showLoading();
$.get('../javascript/dataset_graphs/GrafoComunidades2.json', function (webkitDep) {
   myChart_2.hideLoading();
  var categoryData = [];
  for (var i = 0; i < webkitDep.communities.length; i++) {
    categoryData.push({
      name: webkitDep.communities[i].name,
      icon: 'circle'
    });
  }
  option = {
    legend: {
      data: categoryData
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: true,
        label: {
          position: 'right',
          formatter: '{b}',
          show: true,
        },
        draggable: true,
        data: webkitDep.nodes.map(function (node) {
          return {
            name: node.node,
            category: node.community,
          };
        }),
        categories: webkitDep.communities,
        force: {
          edgeLength: 50,
          repulsion: 200,
          gravity: 0.2
        },
        edges: webkitDep.links.map(function (link) {
          return {
            source: link.source,
            target: link.target
          };
        })
      }
    ]
  };
  myChart_2.setOption(option);
  myChart_2.hideLoading();

});