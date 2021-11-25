// 格式化为echarts-series-scatter 要求的data 格式
export function convertScatterData  (data, geoData)  {
  var res = [];
  for (var i = 0; i < data.length; i++) {
      var geoCoord = geoData[data[i].name];
      if (geoCoord) {
          res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
          });
      }
  }
  return res;
}