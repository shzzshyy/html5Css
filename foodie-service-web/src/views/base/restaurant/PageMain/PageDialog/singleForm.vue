<template>
    <el-form-item :label="item.formColumnName" :prop="item.prop"  :rules="item.formValidate">
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
        <template v-else-if="item.formColumnType === 'text-limit'">
            <el-input v-model="form[item.prop]" type="text"
                      v-bind="item.formAttr"
                      :maxlength="item.limit"
                      show-word-limit
                      @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
            </el-input>
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
        <template v-else-if="item.formColumnType === 'n-dict'">
            <el-select v-model="form[item.prop]"
                       @change="$emit('form-item-change', {key: itme.formProp, value: form[item.formProp]})">
                <el-option
                        v-for="option in dictConfig[item.formDictType]"
                        :key="option.userId"
                        :label="option.name"
                        :value="option.userId ">
                </el-option>
            </el-select>
        </template>
        <template v-else-if="item.formColumnType === 'img-upload'">
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </template>
        <template v-else-if="item.formColumnType === 'text-append'">
            <el-input 
                v-model="form[item.prop]"
                v-bind="item.formAttr"
                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})"
            >
                <template slot="append">元/人</template>
            </el-input>
        </template>
        <template v-else-if="item.formColumnType === 'cascader-textarea'">
            <el-cascader
                v-model="form[item.prop]"
                :options="item.formOptions"
                ></el-cascader>
            <el-input v-model="form[item.prop]" type="textarea" style="margin-top: 10px;"
                      v-bind="item.formAttr"
                      @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
            </el-input>
        </template>
        <template v-else-if="item.formColumnType === 'checkbox'">
            <el-checkbox-group 
                v-model="form[item.formProp]"
                @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
                <el-checkbox v-for="tag in tags" :label="tag.label" :key="tag.value">{{tag.label}}</el-checkbox>
            </el-checkbox-group>
        </template>
    </el-form-item>

</template>

<script>
export default {
  props: {
    item: {
      default: {}
    },
    form: {

    },
    dictConfig: {

    },
    tags: {
        default: []
    }
  },
  data () {
    return {
        dialogImageUrl: '',
        dialogVisible: false
    }
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
  computed: {
  }
}
</script>
<style scoped>
</style>
