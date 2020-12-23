<template>
  <div>
      <el-date-picker v-if="type === 'date-range'"
                      type="date"
                      :placeholder="this.startPlaceholder || '开始日期'"
                      v-model="outerForm[startKey]"
                      :pickerOptions="pickerOptionsStart"
                      :value-format="valueFormatData"
                      @change="handleStartDateChange">
      </el-date-picker>
      <el-date-picker v-else-if="type === 'datetime-range'"
                      type="datetime"
                      :placeholder="this.startPlaceholder || '开始时间'"
                      v-model="outerForm[startKey]"
                      :value-format="valueFormatData"
                      @change="handleStartDateChange">
      </el-date-picker>
      <el-time-select v-else-if="type === 'time-range'"
                      v-model="outerForm[startKey]"
                      :placeholder="this.startPlaceholder || '开始时间'"
                      :value-format="valueFormatData"
                      @change="handleStartDateChange"
                      >
      </el-time-select>
      -
      <el-date-picker v-if="type === 'date-range'"
                      type="date"
                      :placeholder="this.endPlaceholder || '结束日期'"
                      v-model="outerForm[endKey]"
                      :pickerOptions="pickerOptionsEnd"
                      :value-format="valueFormatData"
                      @change="handleEndDateChange">
      </el-date-picker>
      <el-date-picker v-else-if="type === 'datetime-range'"
                      type="datetime"
                      :placeholder="this.endPlaceholder || '结束时间'"
                      v-model="outerForm[endKey]"
                      :value-format="valueFormatData"
                      @change="handleEndDateChange">
      </el-date-picker>
      <el-time-select v-else-if="type === 'time-range'"
                      v-model="outerForm[endKey]"
                      :value-format="valueFormatData"
                      :placeholder="this.endPlaceholder || '结束时间'"
                      @change="handleEndDateChange">
      </el-time-select>
  </div>
</template>

<script>
import { parseDate } from 'element-ui/src/utils/date-util'
export default {
  name: 'admin-date-range',
  props: {
    startKey: {
      type: String,
      default: 'dateStart'
    },
    endKey: {
      type: String,
      default: 'dateEnd'
    },
    outerForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 'date-range'
    },
    startPlaceholder: {
      default: ''
    },
    endPlaceholder: {
      default: ''
    },
    valueFormat: {
      type: String
    }
  },
  computed: {
    startDate: {
      get: function () {
        return this.outerForm[this.startKey] ? parseDate(this.outerForm[this.startKey], this.valueFormatData) : null
      },
      set: function (value) {
        this.startDate = value
      }
    },
    endDate: {
      get: function () {
        return this.outerForm[this.endKey] ? parseDate(this.outerForm[this.endKey], this.valueFormatData) : null
      },
      set: function (value) {
        this.endDate = value
      }
    }
  },
  data () {
    return {
      valueFormatData: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endDate) {
            return time.getTime() > this.endDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.startDate) {
            return time.getTime() < this.startDate
          }
        }
      }
    }
  },
  methods: {
    handleStartDateChange () {
      // this.outerForm[this.startKey] = formatDate(this.outerForm[this.startKey], this.valueFormat)
      // this.outerForm[this.startKey] = formatDate(this.form[this.startKey], this.valueFormat)
      // let val = ((this.outerForm[this.startKey] ? this.outerForm[this.startKey] : '')) + ',' + ((this.outerForm[this.endKey] ? this.outerForm[this.endKey] : ''))
      // console.log(val)
      // this.$emit('update', val)
      this.$emit('change')
    },
    handleEndDateChange () {
      /* if (this.outerForm[this.endKey]) {
        this.form.endDate = parseDate(this.outerForm[this.endKey], this.valueFormat)
      } else {
        this.form.endDate = null
      } */
      this.$emit('change')
    },
    computeValueFormat () {
      if (this.type === 'date-range') {
        return 'yyyy-MM-dd'
      } else if (this.type === 'datetime-range') {
        return 'yyyy-MM-dd HH:mm:ss'
      } else if (this.type === 'time-range') {
        return 'HH:mm:ss'
      }
    }
  },
  mounted () {
    this.valueFormatData = this.valueFormat || this.computeValueFormat()
  }
}
</script>
<style scoped>
</style>
