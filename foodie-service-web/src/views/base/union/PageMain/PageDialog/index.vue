<template>
  <div>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="80%"
            @open="dialogOpened"
            @closed="dialogClosed"
    >
        <el-form ref="dialogForm" :model="form" label-width="120px">
            <template v-for="(item, index) in activeColumns">
              <template v-if="index%inlineFormSize === 0" >
                <el-row v-bind:key="index">
                  <template v-for="n in inlineFormSize">
                    <el-col :span="spanSize" v-if="(index + n -1) < activeColumns.length" v-bind:key="n">
                      <single-form :item="activeColumns[index+n-1]" :form="form" :dictConfig="dictConfig" :tags="tags" @addContent="handleAddContent"></single-form>
                    </el-col>
                  </template>
                </el-row>
              </template>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveBtnLoading">确 定</el-button>
      </span>
    </el-dialog>

    <add-union-content ref="addUnionContent"></add-union-content>
  </div>
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
  components: {
    singleForm: () => import('./singleForm'),
    addUnionContent: () => import('./add-union-content')
  },

  data () {
    return {
      dialogVisible: false,
      saveBtnLoading: false,
      initForm: {
        status: true
      },
      form: {
      },
      tags: [],
      inlineFormSize: 1,
      innerVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'
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
          let request
          if (this.editType === 0) {
            request = this.$api.restaurant.create(this.form)
          } else {
            request = this.$api.restaurant.update(this.form)
          }
          request
            .then(res => {
              this.dialogVisible = false
              this.saveBtnLoading = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '成功'
              })
              this.$emit('handleSearch')
            })
            .catch(err => {
              this.dialogVisible = false
              this.saveBtnLoading = false
              this.$notify({
                title: '保存' + this.bizConfig.bizName + '异常'
              })
              console.log('err', err)
            })
        }
      })
    },
    dialogOpened () {
      if (Object.keys(this.formData).length) {
        this.form = { ...this.formData }
      } else {
        this.form = { ...this.initForm }
      }
      if (this.$refs.dialogForm) {
        this.$nextTick(() => {
          this.$refs.dialogForm.clearValidate()
        })
      }
      let temp = this.dictConfig.managingServices.map(x=>(x.label))
      let arr = temp.concat(this.form.servicesArr)
      let uniq = new Set(arr)
      this.tags = Array.form(set)
    },
    dialogClosed () {
      this.$refs.dialogForm.resetFields()
      this.saveBtnLoading = false
    },
    handleAddContent() {
      this.$refs.addUnionContent.openDialog()
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
    },
    spanSize: {
      get: function () {
        return 24 / this.inlineFormSize
      },
      set: function (spanSize) {
        this.spanSize = spanSize
      }
    }
  }
}
</script>
<style scoped>
</style>
