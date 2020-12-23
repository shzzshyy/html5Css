<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="60%"
            @open="dialogOpened"
    >
        
      <el-form ref="dialogForm" :model="form" label-width="80px">
          <template v-for="(item, index) in activeColumns">
              <el-form-item :label="item.formColumnName" :prop="item.prop" :key="index" :rules="item.formValidate">
                  <template v-if="!item.formDetailType">
                      <el-input v-model="form[item.prop]"
                                v-bind="item.formAttr"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})"
                                disabled="disabled">
                      </el-input>
                  </template>
                  <template v-else-if="item.formDetailType === 'text' || item.formDetailType === 'textarea'">
                      <el-input v-model="form[item.prop]" :type="item.formDetailType"
                                v-bind="item.formAttr"
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})"
                                disabled="disabled">
                      </el-input>
                  </template>
                  <template v-else-if="item.formDetailType === 'text-limit'">
                      <el-input v-model="form[item.prop]" type="text"
                                v-bind="item.formAttr"
                                :maxlength="item.limit"
                                show-word-limit
                                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})"
                                disabled="disabled">
                      </el-input>
                  </template>
                  <template v-else-if="item.formDetailType === 'img-preview'" class="demo-image__preview" v-for="(src,index) in item.urls">
                    <el-image 
                      style="width: 100px; height: 100px; margin: 5px;"
                      :key="index"
                      :src="src" 
                      :preview-src-list="item.urls">
                    </el-image>
                  </template >
              </el-form-item>
          </template>
      </el-form>

      <el-tabs v-model="activeName">
        <el-tab-pane label="菜品编辑" name="first">
          <el-form :model="dishesForm" ref="dishesForm" label-width="110px" class="demo-dynamic">
            <el-form-item
              prop="dishes"
              label="推荐菜名称1"
              maxlength="40"
              show-word-limit
              :rules="[
                { required: true, message: '请输入推荐菜名称', trigger: 'blur' }
              ]"
            >
              <el-input v-model="dishesForm.dishes"></el-input>
            </el-form-item>
            <el-form-item
              prop="pic"
              label="餐厅图片"
              :rules="[
                { required: true, message: '请选择餐厅图片', trigger: 'blur' }
              ]"
            >
              <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item
              prop="price"
              label="价格"
              :rules="[
                { required: true, message: '请输入价格', trigger: 'blur' }
              ]"
            >
              <el-input v-model="dishesForm.price"></el-input>
            </el-form-item>
            <template v-for="(domain, index) in dishesForm.dishesDomains">
              <el-form-item
                :label="'推荐菜名称' + (index + 2)"
                :key="domain.key"
                :prop="'dishesDomains.' + index + '.'"
                maxlength="40"
                show-word-limit
                :rules="{
                  required: true, message: '请输入推荐菜名称', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.dishes" style="width:60%"></el-input>
                <el-button @click.prevent="removeDishesDomain(domain)" style="width:100px; margin-left:10px;">删除</el-button>
              </el-form-item>
              <el-form-item
                label="餐厅图片"
                :key="domain.key"
                :prop="'dishesDomains.' + index + '.'"
                :rules="{
                  required: true, message: '请选择餐厅图片', trigger: 'blur'
                }"
              >
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="imgDialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item
                label="价格"
                :key="domain.key"
                :prop="'dishesDomains.' + index + '.'"
                :rules="{
                  required: true, message: '价格不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.price"></el-input>
              </el-form-item>
            </template>
            <el-form-item>
              <el-button type="primary" @click="submitForm('dishesForm')">提交</el-button>
              <el-button @click="addDishesDomain">新增菜品</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="菜单编辑" name="second">
          <el-form :model="menuForm" ref="menuForm" label-width="120px" class="demo-dynamic">
            <el-form-item
              prop="menu"
              label="推荐菜单主题1"
              maxlength="40"
              show-word-limit
              :rules="[
                { required: true, message: '请输入推荐菜单主题', trigger: 'blur' }
              ]"
            >
              <el-input v-model="menuForm.menu"></el-input>
            </el-form-item>
            <el-form-item
              prop="order"
              label="点菜方案"
              :rules="[
                { required: true, message: '请输点菜方案', trigger: 'blur' }
              ]"
            >
              <el-input v-model="menuForm.order" type="textarea"></el-input>
            </el-form-item>
            <el-form-item
              prop="orderPic"
              label="餐厅图片"
              :rules="[
                { required: true, message: '请选择餐厅图片', trigger: 'blur' }
              ]"
            >
              <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <template v-for="(domain, index) in menuForm.menuDomains">
              <el-form-item
                :label="'推荐菜单主题' + (index + 2)"
                :key="domain.key"
                :prop="'menuDomains.' + index + '.'"
                maxlength="40"
                show-word-limit
                :rules="{
                  required: true, message: '请输入推荐菜单主题', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.mune" style="width:60%"></el-input>
                <el-button @click.prevent="removeMenuDomain(domain)" style="width:100px; margin-left:10px;">删除</el-button>
              </el-form-item>
              <el-form-item
                label="点菜方案"
                :key="domain.key"
                :prop="'menuDomains.' + index + '.'"
                :rules="{
                  required: true, message: '请输入点菜方案', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.order" type="textarea"></el-input>
              </el-form-item>
              <el-form-item
                label="餐厅图片"
                :key="domain.key"
                :prop="'menuDomains.' + index + '.'"
                :rules="{
                  required: true, message: '请选择餐厅图片', trigger: 'blur'
                }"
              >
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="imgDialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </template>
            <el-form-item>
              <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
              <el-button @click="addMenuDomain">新增菜单</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="环境" name="third">
          <el-form :model="envForm" ref="envForm" label-width="100px" class="demo-dynamic">
            <el-form-item
              prop="envPic"
              label="餐厅图片"
              :rules="[
                { required: true, message: '请选择餐厅图片', trigger: 'blur' }
              ]"
            >
              <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('envForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="食乜指数" name="fourth">
           <el-form :model="indexForm" ref="indexForm" label-width="100px" class="demo-dynamic">
            <el-form-item
              prop="appraisal"
              label="商家测评1"
              :rules="[
                { required: true, message: '请输入商家测评', trigger: 'blur' }
              ]"
            >
              <el-input v-model="indexForm.appraisal"></el-input>
            </el-form-item>
            <el-form-item
              prop="score"
              label="商家评分"
              :rules="[
                { required: true, message: '请给商家评分', trigger: 'blur' }
              ]"
            >
              <el-rate v-model="indexForm.score" style="margin-top:10px;"></el-rate>
            </el-form-item>
            <el-form-item
              prop="goal"
              label="单项得分"
              :rules="[
                { required: true, message: '请输单项得分', trigger: 'blur' }
              ]"
            >
              <el-input v-model="indexForm.goal" ></el-input>
            </el-form-item>
            <template v-for="(domain, index) in indexForm.indexDomains">
              <el-form-item
                :label="'商家测评' + (index + 2)"
                :key="domain.key"
                :prop="'indexDomains.' + index + '.'"
                :rules="{
                  required: true, message: '请输入商家测评', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.appraisal" style="width:60%"></el-input>
                <el-button @click.prevent="removeIndexDomain(domain)" style="width:100px; margin-left:10px;">删除</el-button>
              </el-form-item>
              <el-form-item
                label="商家评分"
                :key="domain.key"
                :prop="'indexDomains.' + index + '.'"
                :rules="[
                  { required: true, message: '请给商家评分', trigger: 'blur' }
                ]"
              >
                <el-rate v-model="domain.score"></el-rate>
              </el-form-item>
              <el-form-item
                label="单项得分"
                :key="domain.key"
                :prop="'indexDomains.' + index + '.'"
                :rules="{
                  required: true, message: '请输入单项得分', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.goal" style="margin-top:10px;"></el-input>
              </el-form-item>
            </template>
            <el-form-item>
              <el-button type="primary" @click="submitForm('indexForm')">提交</el-button>
              <el-button @click="addIndexDomain">新增指数</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
      initForm: {
        extended: true
      },
      form: {
      },
      activeName: 'first',
      dishesForm: {
        dishesDomains: [],
        dishes: '',
        price: ''
      },
      menuForm: {
        menuDomains: [],
        menu: '',
        order: ''
      },
      envForm: {
      },
      indexForm: {
        indexDomains: [],
        appraisal: '',
        score: '',
        goal: ''
      },
      dialogImageUrl: '',
      imgDialogVisible: false,
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
            request = this.$api.role.create(this.form)
          } else {
            request = this.$api.role.update(this.form)
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
    },
    dialogClosed () {
      this.$refs.dialogForm.resetFields()
      this.saveBtnLoading = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeDishesDomain(item) {
      var index = this.dishesForm.dishesDomains.indexOf(item)
      if (index !== -1) {
        this.dishesForm.dishesDomains.splice(index, 1)
      }
    },
    removeMenuDomain(item) {
      var index = this.menuForm.menuDomains.indexOf(item)
      if (index !== -1) {
        this.menuForm.menuDomains.splice(index, 1)
      }
    },
    removeIndexDomain(item) {
      var index = this.indexForm.indexDomains.indexOf(item)
      if (index !== -1) {
        this.indexForm.indexDomains.splice(index, 1)
      }
    },
    addDishesDomain() {
      this.dishesForm.dishesDomains.push({
        dishes: '',
        price: '',
        key: Date.now()
      });
    },
    addMenuDomain() {
      this.menuForm.menuDomains.push({
        menu: '',
        order: '',
        key: Date.now()
      });
    },
    addIndexDomain() {
      this.indexForm.indexDomains.push({
        appraisal: '',
        score: '',
        goal: '',
        key: Date.now()
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
<style scoped>
</style>
