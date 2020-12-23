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
        <template v-else-if="item.formColumnType === 'table-add'">
            <ele-table
                :data="currentTableData"
                v-loading="loading"
                size=""
                stripe
                style="width: 100%; margin-bottom:10px;"
                draggablerow 
                :allow-drag="allowdrag" 
                :allow-drop="allowDrop" 
                @node-drag-end="handleDragEnd"
            >
                <ele-table-column v-for="(item, index) in columns"
                    :key="index"
                    :prop="item.gridProp ? item.gridProp : item.prop"
                    :label="item.gridColumnName"
                >
                    <template  slot-scope="scope">
                        <template>{{scope.row[item.gridProp ? item.gridProp : item.prop]}}</template>
                    </template>
                </ele-table-column>

                <ele-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDeleteDialogOpen(scope.row)" v-if="auth.del">删除</el-button>
                    </template>
                </ele-table-column>
            </ele-table>
            <el-button @click="addContent">添加内容</el-button>
        </template>
    </el-form-item>
</template>

<script>
import { eleTable, eleTableColumn } from "ele-table";
import 'ele-table/dist/ele-table.css';
export default {
  props: {
    item: {
      default: {}
    },
    form: {

    }
  },
  components: {
    eleTable,
    eleTableColumn 
  },
  data () {
    return {
        dialogImageUrl: '',
        dialogVisible: false,
        columns: [
            {
                gridColumnName: 'ID',
                prop: 'region'
            },
            {
                gridColumnName: '商家名称',
                prop: 'region'
            }
        ]
    }
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      addContent() {
          this.$emit('addContent')
      },
      handleDragEnd(row, column, cell, event) {
        let data = this.tableData[row.draggingcolumn];
        if (cell == "after") {
            this.tableData.splice(column.dropcolumn + 1, 0, data);
            if (row.draggingcolumn > column.dropcolumn) {
            this.tableData.splice(row.draggingcolumn + 1, 1);
            } else {
            this.tableData.splice(row.draggingcolumn, 1);
            }
        }
        if (cell == "before") {
            this.tableData.splice(column.dropcolumn, 0, data);
            if (row.draggingcolumn > column.dropcolumn) {
            this.tableData.splice(row.draggingcolumn + 1, 1);
            } else {
            this.tableData.splice(row.draggingcolumn, 1);
            }
        }
        if (cell == "inner") {
            this.$set(
            this.tableData,
            row.draggingcolumn,
            this.tableData[column.dropcolumn]
            );
            this.$set(this.tableData, column.dropcolumn, data);
        }
      }
  },
  computed: {
  }
}
</script>
<style scoped>
</style>
