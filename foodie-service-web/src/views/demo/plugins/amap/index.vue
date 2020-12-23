<template>
  <div>
    <div style="position: absolute; z-index: 200; top: 20px; left: 20px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.province" placeholder="省份" @change="provinceChange" style="width: 180px;">
            <el-option
              v-for="item in provinceList"
              :key="item.adcode"
              :label="item.name"
              :value="item.adcode">
            </el-option>
          </el-select>
          <el-select v-model="formInline.city" placeholder="城市" @change="cityChange" style="width: 180px;">
            <el-option
              v-for="item in cityList"
              :key="item.adcode"
              :label="item.name"
              :value="item.adcode">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <div class="amap-wrapper">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap class="amap-box" vid="amap-vue" :plugin="plugin" :center="center" :zoom="14" :events="events">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :visible="componentMarker.visible" v-if="componentMarker.visible" :events="componentMarker.events"></el-amap-marker>
      </el-amap>
    </div>
    <div class="toolbar">
        <span v-if="loaded">
          经纬度: lng = {{ lng }} lat = {{ lat }} 地址：{{ address }}
        </span>
        <span v-else>正在定位</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {

      },
      center: [121.59996, 31.197646],
      zoom: 13,
      lng: 0,
      lat: 0,
      districtSearch: {},
      events: {
        init: (o) => {
          window.AMap.plugin('AMap.DistrictSearch', () => {
            this.districtSearch = new window.AMap.DistrictSearch({
              // 关键字对应的行政区级别，country表示国家
              level: 'country',
              //  显示下级行政区级数，1表示返回下一级行政区
              subdistrict: 1
            })

            // 搜索所有省/直辖市信息
            this.districtSearch.search('中国', (status, result) => {
              // 查询成功时，result即为对应的行政区信息
              console.log(result, result)
              this.changeSelect(result.districtList[0])
            })
          })
        },
        click: (e) => {
          this.setMaker(e.lnglat.lng, e.lnglat.lat)
        }
      },
      componentMarker: {
        visible: false,
        position: []
      },
      provinceList: [],
      cityList: [],
      address: '',
      loaded: false,
      searchOption: {
        city: '全国',
        citylimit: true
      },
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init: (o) => {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  this.lng = result.position.lng
                  this.lat = result.position.lat
                  this.center = [this.lng, this.lat]
                  this.componentMarker.position = this.center
                  this.address = result.formattedAddress
                  this.loaded = true
                  this.$nextTick()
                }
              })
            }
          }
        }
      ]
    }
  },
  methods: {
    setMaker (lng, lat) {
      this.componentMarker.position = [lng, lat]
      this.center = [lng, lat]
      this.componentMarker.visible = true
      this.$Geocoder({
        lnglatXY: this.componentMarker.position,
        success: (res) => {
          this.address = res.regeocode.formattedAddress
        }
      })
    },
    onSearchResult (pois) {
      // let latSum = 0
      // let lngSum = 0
      if (pois.length > 0) {
        // pois.forEach(poi => {
        //   const { lng, lat } = poi
        //   lngSum += lng
        //   latSum += lat
        // })
        // const center = {
        //   lng: lngSum / pois.length,
        //   lat: latSum / pois.length
        // }
        this.center = [pois[0].lng, pois[0].lat]
        this.setMaker(pois[0].lng, pois[0].lat)
      }
    },
    changeSelect (data, level) {
      const subList = data.districtList
      if (level === 'province') {
        this.cityList = subList
      } else {
        this.provinceList = subList
      }
    },
    provinceChange (item) {
      // 行政区级别
      this.districtSearch.setLevel('province')
      this.districtSearch.search(item, (status, result) => {
        if (status === 'complete') {
          this.changeSelect(result.districtList[0], 'province')
        }
      })
    },
    cityChange (adcode) {
      const city = this.cityList.find((city) => {
        return city.adcode === adcode
      })
      this.center = [city.center.lng, city.center.lat]
      this.searchOption.city = adcode
    },
    $Geocoder (options) {
      // 将坐标点转化为，详细地址
      options = options || {}
      if (window.AMap) {
        window.AMap.plugin(['AMap.Geocoder'], () => {
          const geocoder = new window.AMap.Geocoder({
            radius: options.radius || 1000,
            extensions: options.extensions || 'all'
          })
          const lnglatXY = options.lnglatXY || [114.397169, 30.50576]
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              options.success && options.success(result)
            } else {
              options.error && options.error(status, result)
            }
          })
        })
      }
    }
  },
  mounted () {
  }
}
</script>
<style>
  .amap-wrapper {
    width: 100%;
    height: 600px;
  }
  .search-box {
    position: absolute !important;
    top: 60px !important;
    left: 20px;
  }
  .amap-box {
    height: 400px;
  }
  .toolbar {
    height: 40px;
    line-height: 40px;
    background: #00a0e9;
  }
</style>
