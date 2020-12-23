<template>

  <el-row>
    <el-form
      :inline="true"
      :model="form"
      ref="searchForm">

      <template v-for="(item, index) in activeColumns">
        <el-form-item :label="item.searchName" :prop="item.prop" :key="index">
          <template v-if="!item.searchType">
            <el-input v-model="form[item.prop]"
                      @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
            </el-input>
          </template>
          <template v-else-if="item.searchType === 'text'">
            <el-input v-model="form[item.prop]"
                      @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
            </el-input>
          </template>
          <template v-else-if="item.searchType === 'p-dict'">
            <el-select v-model="form[item.prop]"
                      @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
              <el-option
                      v-for="option in item.options"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button
          type="primary"
          @click="handleSearch">
          <d2-icon name="search"/>
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="handleFormReset">
          <d2-icon name="refresh"/>
          重置
        </el-button>
      </el-form-item>

    </el-form>

  </el-row>
</template>

<script>
export default {
  props: {
    columns: {
      default: () => []
    }
  },
  data () {
    return {
      form: {
      }
    }
  },
  methods: {
    handleSearch () {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSearch', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.searchForm.resetFields()
    }
  },
  computed: {
    activeColumns: {
      get: function () {
        return this.columns.filter((column) => {
          return column.searchShow
        })
      },
      set: function (value) {
        this.activeColumns = value
      }
    }
  }
}
</script>
