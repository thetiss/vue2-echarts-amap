<template>
  <div class="map-box">
    <div><h1>ZOOM: {{curZoom}}</h1></div>
    <div class="map" id="myMap" ref="echart" :style="{ height: mapHeight + 'px', width: mapWidth + 'px' }">
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { zoomStyleMapping, blue_icon_data } from '@/types/constant'

// 满足业务需求： 随着地图层级改变 地图上点标记的icon要改变

export default {
  name: 'IconMap',
  data() {
    return {
      mapHeight: 0,
      mapWidth: 0,
      map: null, // 高德map实例,
      curZoom: 0, // 当前缩放层级
    }
  },
  created() {
    this.initMap(); // 初始化地图
    this.getScreenInfo(); // 地图容器设置宽高
  },
  methods: {
    // 初始化地图
    initMap() {
      const that = this;
      this.$AMapLoader
        .load({
          key: config.MAP3D.key,
          version: '1.4.15',
          plugins: [
            'Map3D', 
            'ElasticMarker', // 灵活点标记来实现随层级改变图标大小
            'AMap.ElasticMarker', // 灵活点标记来实现随层级改变图标大小
          ]
        })
        .then((AMap) => {
          // 返回一个AMap而非AMap对象
          that.map =  new AMap.Map('myMap', {
                zoom: 16,
                center: config.MAP3D.center,
                // features: ['bg', 'road'],
                // Loca 自 1.2.0 起 viewMode 模式默认为 3D，如需 2D 模式，请显示配置。
                viewMode: '3D'
            });
          that.renderElasticMarkerTree(AMap)
          const markers = that.renderElasterMarker(AMap, blue_icon_data)
          that.map.add(markers);
          // 地图事件监听
          that.map.on('zoomchange', function(){
            that.curZoom = that.map.getZoom()
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    // 单个ElasticMarker, 配置项中关联地图
    renderElasticMarkerTree(AMap){
      new AMap.ElasticMarker({
              map:this.map,
              position:[116.410908,39.88057],
              styles:[{
                      icon:{
                          img:'https://a.amap.com/jsapi_demos/static/resource/img/trees.png',
                          size:[366,201],
                          ancher:[183,101],
                          imageSize:[865,1156],
                          imageOffset:[45,480],
                          fitZoom:17.5,
                          scaleFactor:2,
                          maxScale:2,
                          minScale:0.125
                      }
                  }],
              zoomStyleMapping: zoomStyleMapping
          })     
    },

    // 渲染灵活点标记 
    renderElasterMarker(AMap, data) {
      if (data.length === 0 ) return
      const markers = data.map((item) => {
        const mark = new AMap.ElasticMarker({
              position: item.position,
              styles:[{
                      icon:{
                          img:item.icon,
                          size:[16,16],
                          ancher:[8,16],//锚点 // 若配置项少了此，则会一直报错：TypeError: Cannot read properties of undefined (reading '0')
                          fitZoom:14,//最合适的级别
                          scaleFactor:2,//地图放大一级的缩放比例系数
                          maxScale:2,//最大放大比例
                          minScale:1//最小放大比例
                      }
                  }],
              zoomStyleMapping: zoomStyleMapping          
        });
        return mark;
      })
      return markers;
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
<style>

</style>
