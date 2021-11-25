<template>
  <div class="map-box">
    <div class="map" id="myMap" ref="echart" :style="{ height: mapHeight + 'px', width: mapWidth + 'px' }"></div>
  </div>
</template>

<script>
import config from '@/config'
import { convertScatterData } from '@/utils/convert'
import { Guangxi_Map_Scatter_Data, gdGeoCoordMap } from '@/types/constant'
import { imgTxtBorder, imgDiamond } from '@/types/png'


export default {
  name: 'MigrationMap',
  data() {
    return {
      mapHeight: 0,
      mapWidth: 0,
      map: null, // 高德map实例
      mapInEchart: null, // echarts中的高德map实例
      myChart: null, // Echarts 实例
    }
  },
  created() {
    this.initMap(); // 初始化地图
    this.getScreenInfo(); // 地图容器设置宽高
  },
  methods: {
    // 初始化高德地图
    initMap() {
      this.$AMapLoader
        .load({
          key: config.AMAP.key,
          version: '1.4.15',
          plugins: [
            // 插件列表 文档 https://lbs.amap.com/api/javascript-api/guide/overlays/toolbar
            /**
             * 提示：添加该插件，修正  TypeError: AMap.CustomLayer is not a constructor 错误
             */
            'AMap.CustomLayer'
          ]          
        })
        .then((AMap) => {
          console.log('amapjs loader success')
          this.map = AMap // 拿到高德地图
          this.initEcharts()
        })
        .catch((err) => {
          console.error(err)
        })  
    },
    // 初始化echarts
    initEcharts() { 
      this.myChart = this.$echarts.init(this.$refs.echart) // 拿到echarts 所在div容器
      const option = {
        legend: {
            show: false,
        },        
        amap: { // 在echarts里配置高德地图
          ...config.AMAP
        },
        animation: false,
        series: [],
      }
      this.myChart.setOption(option)
      this.mapInEchart = this.myChart.getModel().getComponent('amap').getAMap(); // 在echarts里拿到高德地图

      // 高德地图加载完毕
      this.mapInEchart.on(
        'complete',
        function () {
          console.log('echarts中的map loader success')
        }.bind(this)()
      )
      // 赋值series, 渲染地图特效 e.g. 散点图
      this.renderScatter();
    },
    // 渲染散点
    renderScatter() {
      const series = this.getSeries(Guangxi_Map_Scatter_Data, gdGeoCoordMap);
      if (this.myChart) {
        const option = this.myChart.getOption();
        option.series = series;
        this.myChart.setOption(option)
      }
    },
    // 散点图 + 飞线 配置
    // ref: http://blog.sqber.com/articles/echarts-with-gaode-map-vue.html
    getSeries(values, coords) {
      const resData = convertScatterData(values, coords);
      let series = [];
      const effectScatter = { // 涟漪散点
        tooltip: {
            show: false,
        },
        type: 'effectScatter',
        coordinateSystem: 'amap', // 注意：本列用的高德地图 所以坐标系统使用amap, 不要用echarts官网说的geo；
        rippleEffect: {
            scale: 10,
            brushType: 'stroke',
        },
        showEffectOn: 'render',
        itemStyle: {
          color: '#00FFFF',
        },
        label: {
          color: '#fff',
        },
        symbol: 'circle',
        symbolSize: [10, 5],
        data: resData,
        zlevel: 1,
    };
    const iconScatter = { // 钻石图片显示
      type: 'scatter',
      coordinateSystem: 'amap',
      itemStyle: {
          color: '#00FFF6',
      },
      symbol: imgDiamond,
      symbolSize: [32, 41],

      symbolOffset: [0, -20],
      z: 999,
      data: resData,
    };
    const txtScatter = { // 文字框显示
      type: 'scatter',
      coordinateSystem: 'amap',
      label: {
        show: true,
        formatter: function(params) { 
            var name = params.name
            var value = params.value[2]
            var text = `{fline|${value}人}\n{tline|${name}}`
            return text;
        },   
        color:'#fff',
        rich: {
            fline: {
                padding: [0, 25],
                color: '#fff',
                fontSize: 14,
                fontWeight:400
            },
            tline: {
                padding: [0, 27],
                color: '#ABF8FF',
                fontSize: 12,
            },
        }
      },
      itemStyle: {
          color: '#00FFF6',

      },
      symbol: imgTxtBorder,
      symbolSize: [100, 50],
      symbolOffset: [0, -60],
      z: 999,
      data: resData,
    }
  
    series.push(effectScatter)
    series.push(iconScatter)
    series.push(txtScatter)
    return series;
    },
    // 根据屏幕尺寸来动态获取地图所在容器的宽高
    getScreenInfo() {
      this.mapHeight = window.screen.height;
      this.mapWidth = window.screen.width;

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-box {
  background-color: #899;
}
.map {
  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, ) */
}

</style>
