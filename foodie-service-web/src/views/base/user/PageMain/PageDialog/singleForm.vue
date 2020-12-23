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
        <template v-else-if="item.formColumnType === 'date'">
            <el-date-picker
                    v-model="form[item.prop]"
                    :type="item.formColumnType"
                    v-bind="item.formAttr"
                    value-format="yyyy-MM-dd"
                    @change="$emit('form-item-change', {key: item.prop, value: form[item.prop]})">
            </el-date-picker>
        </template>
        <template v-else-if="item.formColumnType === 'datetime'">
            <el-date-picker
                    v-model="form[item.prop]"
                    :type="item.formColumnType"
                    v-bind="item.formAttr"
                    value-format="yyyy-MM-dd HH:mm:ss"
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
        <template v-else-if="item.formColumnType === 'single-upload'">
            <admin-single-upload
                    v-bind="item.formAttr"
                    action="file/upload"
                    v-model="form[item.prop]"
            ></admin-single-upload>
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

    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>
<style scoped>
</style>
