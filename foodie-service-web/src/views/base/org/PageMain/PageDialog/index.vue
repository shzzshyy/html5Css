<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            @open="dialogOpened"
    >
        <el-form ref="dialogForm" :model="form" label-width="80px">
            <template v-for="(item, index) in activeColumns">
                <el-form-item :label="item.formColumnName" :prop="item.prop" :key="index" :rules="item.formValidate">
                    <template v-if="!item.formColumnType">
                        <el-input v-model="form[item.prop]"
                                  v-bind="item.formAttr"
                                  @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-input>
                    </template>
                    <template v-else-if="item.formColumnType === 'text' || item.formColumnType === 'textarea'">
                        <el-input v-model="form[item.prop]" :type="item.formColumnType"
                                  v-bind="item.formAttr"
                                  @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-input>
                    </template>
                    <template v-else-if="item.formColumnType === 'date' || item.formColumnType === 'datetime'">
                        <el-date-picker
                                v-model="form[item.prop]"
                                :type="item.formColumnType"
                                v-bind="item.formAttr"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-date-picker>
                    </template>
                    <template v-else-if="item.formColumnType === 'time'">
                        <el-time-select
                                v-model="form[item.prop]"
                                v-bind="item.formAttr"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-time-select>
                    </template>
                    <template v-else-if="item.formColumnType === 'switch'">
                        <el-switch
                                v-model="form[item.prop]"
                                v-bind="item.formAttr"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                        </el-switch>
                    </template>
                    <template v-else-if="item.formColumnType === 'p-dict'">
                        <el-select v-model="form[item.prop]"
                                   @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                            <el-option
                                    v-for="option in item.formOptions"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value">
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else-if="item.formColumnType === 'radio-group'">
                        <el-radio-group v-model="form[item.prop]"
                                        @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                            <el-radio
                                    v-for="option in item.formOptions"
                                    :key="option.value"
                                    :label="option.value">{{option.label}}</el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else-if="item.formColumnType === 'checkbox'">
                        <el-checkbox v-model="form[item.prop]"
                                     @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})"
                        ></el-checkbox>
                    </template>
                    <template v-else-if="item.formColumnType === 'dict'">
                        <el-select v-model="form[item.prop]"
                                   @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                            <el-option
                                    v-for="option in dictConfig[item.formDictType]"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    columns: {
      default: []
    },
    bizConfig: {
      default: {
      }
    },
    dictConfig: {
      default: {
      }
    },
    formData: {
      default: {}
    },
    title: {
      default: ''
    },
    editType: {
      default: 0
    }
  },
  data () {
    return {
      dialogVisible: false,
      saveBtnLoading: false,
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
          this.saveBtnLoading = true
          let request = null
          if (this.editType === 0) {
            request = this.$api.org.create({ ...this.form })
          } else {
            request = this.$api.org.update({ ...this.form })
          }
          request
            .then(res => {
              this.dialogVisible = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '成功'
              })
              this.saveBtnLoading = false
              this.$emit('handleSearch')
            })
            .catch(err => {
              this.dialogVisible = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '异常'
              })
              this.saveBtnLoading = false
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
