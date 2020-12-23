<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="60%"
            @opened="dialogOpened"
    >
        <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.templateContent" type="textarea" :rows="38">
            </el-input>
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
      type: Array,
      default: function () {
        return []
      }
    },
    bizConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dictConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      default: ''
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.template.update({ ...this.form })
            .then(res => {
              this.dialogVisible = false
              this.$notify({
                title: '保存模板成功'
              })
              this.$emit('handleSearch')
            })
            .catch(err => {
              this.dialogVisible = false
              this.$notify({
                title: '保存模板异常'
              })
              console.log('err', err)
            })
        }
      })
    },
    dialogOpened () {
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
