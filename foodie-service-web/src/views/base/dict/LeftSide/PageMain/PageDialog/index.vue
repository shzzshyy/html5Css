<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            @opened="dialogOpened"
    >
        <el-form ref="dialogForm" :model="form" label-width="80px">
            <template v-for="(item, index) in activeColumns">
                <el-form-item :label="item.formColumnName" :prop="item.prop" :key="index" :rules="item.formValidate">
                    <template v-if="!item.formColumnType">
                        <el-input v-model="form[item.prop]"
                                  @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-input>
                    </template>
                    <template v-else-if="item.formColumnType === 'text' || item.formColumnType === 'textarea'">
                        <el-input v-model="form[item.prop]" :type="item.formColumnType"
                                  @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-input>
                    </template>
                    <template v-else-if="item.formColumnType === 'date' || item.formColumnType === 'datetime'">
                        <el-date-picker
                                v-model="form[item.prop]"
                                :type="item.formColumnType"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-date-picker>
                    </template>
                    <template v-else-if="item.formColumnType === 'time'">
                        <el-time-select
                                v-model="form[item.prop]"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-time-select>
                    </template>
                    <template v-else-if="item.formColumnType === 'switch'">
                        <el-switch
                                v-model="form[item.prop]"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-switch>
                    </template>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    columns: {
      default: () => []
    },
    bizConfig: {
      default: () => {
      }
    },
    formData: {
      default: () => {}
    },
    title: {
      default: () => ''
    },
    editType: {
      default: 0
    }
  },
  data () {
    return {
      dialogVisible: false,
      form: {

      }
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    handleSave () {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          let request = null
          if (this.editType === 0) {
            request = this.$api.dict.create({ ...this.form })
          } else {
            request = this.$api.dict.update({ ...this.form })
          }
          request
            .then(res => {
              this.dialogVisible = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '成功'
              })
              this.$emit('handleSearch')
            })
            .catch(err => {
              // this.dialogVisible = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '异常'
              })
              console.log('err', err)
            })
        }
      })
    },
    dialogOpened () {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.clearValidate()
      }
      this.form = { ...this.formData }
    }
  },
  computed: {
    activeColumns: {
      get: function () {
        return this.columns.filter((column) => {
          return column.formShow
        })
      },
      set: function (value) {
        this.activeColumns = value
      }
    }
  }
}
</script>
