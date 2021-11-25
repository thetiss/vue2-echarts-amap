module.exports = {
  // 高德地图
  AMAP: {
    key: '125a4b8d87f49e0be0fc4aa666744b03', // 高德地图 key
    center: [108.320004, 22.82402], // 重庆 106.551416,29.55818 e.g.  南宁
    zoomEnable: true, // 是否开启缩放
    dragEnable: true, // 是否开启拖拽
    zoom: 8, // 初始化地图层级
    zooms: [3, 20], // 设置地图层级范围
    resizeEnable: true, // 是否监控地图容器尺寸变化
    mapStyle: 'amap://styles/grey', // 图层样式（深色） 文档：https://lbs.amap.com/api/jsapi-v2/guide/map/map-style
    viewMode: '2D', // 地图模式 2D,3D（默认2D)
    pitch: 75 // 3D地图俯仰角度，有效范围 0 度- 83 度
  }  
}