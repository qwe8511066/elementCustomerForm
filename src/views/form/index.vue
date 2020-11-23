<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" class="occupancy">
        <affix>
          <el-card class="box-card">
            <div slot="header" class="flexBox">
              <div>组件名称</div>
            </div>
            <draggable
              class="dragArea list-group"
              :list="contentList"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :clone="cloneDog"
              :move="checkMove"
            >
              <div
                class="list-group-item contentList"
                v-for="(item,index) in contentList"
                :key="index"
              >
                <el-button class="contentButton">{{item.label}}</el-button>
              </div>
            </draggable>
          </el-card>
        </affix>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="flexBox">
            <div class="flex1">设计表单</div>
            <div v-if="data && data.length>0">
              <el-button size="mini" @click="printVisible = true">打印</el-button>
              <el-button size="mini" @click="testVisible = true">测试</el-button>
              <el-button size="mini" @click="visible = true">预览</el-button>
            </div>
          </div>
          <el-form id="customerForm" ref="form" label-width="150px" class="customerForm designForm">
            <draggable
              v-bind="dragOptions"
              class="dragArea list-group"
              :list="data"
              group="people"
              tag="transition-group"
              id="content"
            >
              <div
                class="list-group-item flexBox myField"
                @click="getActivie(item)"
                :class="{'activie':item.activie,}"
                :mycol="item.row"
                v-for="(item,index) in data"
                :key="index"
              >
                <guideComponent
                  class="flex1"
                  :mode="0"
                  :class="{'designFormRequired':item.required,}"
                  :value="item"
                ></guideComponent>
                <div class="deleteIconDiv">
                  <i class="el-icon-circle-close deleteIcon" @click="deleteRow(item)"></i>
                </div>
              </div>
            </draggable>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6">
        <affix>
          <el-card class="box-card">
            <div slot="header" class="flexBox">
              <div class="flex1">组件属性</div>
              <div class="flexContent" v-if="current">{{current.name}}</div>
            </div>

            <el-form
              ref="attributeForm"
              v-if="current && current.component"
              :model="current.component"
              label-width="100px"
            >
              <el-form-item label="占比">
                <el-select
                  class="width100"
                  v-model="current.component.row"
                  placeholder="请选择占比"
                  readonly
                >
                  <el-option
                    v-for="(item, i) in rowSelect"
                    :key="i"
                    :label="item.label "
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="标题名称">
                <el-input
                  v-model="current.component.label"
                  :placeholder="current.component.placeholder"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="文本提示语"
                v-if="current.component.controlType == 'text'||current.component.controlType == 'textarea'"
              >
                <el-input v-model="current.component.placeholder" placeholder="请输入文本提示语"></el-input>
              </el-form-item>

              <template
                label="文本提示语"
                v-if="current.component.controlType == 'radio' || current.component.controlType=='select' || current.component.controlType == 'checkbox'"
              >
                <el-form-item
                  :label="'选项'+(index+1)"
                  v-for="(box, index) in current.component.enum"
                  :key="index"
                >
                  <div class="flexBox">
                    <div class="flex1">
                      <el-input v-model="box.label" placeholder="请输入默认值"></el-input>
                    </div>
                    <div class="flexContent rowIcon" @click="addEnum(current.component)">
                      <i class="el-icon-plus pointer"></i>
                    </div>
                    <div
                      class="flexContent rowIcon"
                      v-if="current.component.enum.length>1"
                      @click="removeEnum(current.component,index)"
                    >
                      <i class="el-icon-minus pointer"></i>
                    </div>
                  </div>
                </el-form-item>
              </template>

              <template v-if="current.component.controlType == 'inputNumber'">
                <el-form-item label="最小值">
                  <el-input-number
                    v-model="current.component.nzMin"
                    placeholder="请输入最小值"
                    :min="-2147483648"
                    :max="2147483647"
                    @change="numberChange(current.component)"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="最大值">
                  <el-input-number
                    v-model="current.component.nzMax"
                    placeholder="请输入最大值"
                    :min="-2147483648"
                    :max="2147483647"
                    @change="numberChange(current.component)"
                  ></el-input-number>
                </el-form-item>
              </template>

              <template v-if="current.component.controlType == 'text'">
                <el-form-item label="正则表达式">
                  <el-select
                    class="width100"
                    v-model="current.component.regular"
                    placeholder="请选择占正则表达式"
                    readonly
                  >
                    <el-option
                      v-for="(item, i) in formExpression"
                      :key="i"
                      :label="item.label "
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>

              <template
                v-if="current.component.controlType != 'radio' && current.component.controlType != 'partitionLine' "
              >
                <el-form-item :label="current.component.controlType == 'checkbox'?'是否必选':'是否必填'">
                  <el-switch v-model="current.component.required"></el-switch>
                </el-form-item>
              </template>

              <el-form-item label="是否可填">
                <el-switch v-model="current.component.disabled"></el-switch>
              </el-form-item>
            </el-form>
          </el-card>
        </affix>
      </el-col>
    </el-row>
    <el-dialog
      title="预览表单"
      :visible="visible"
      v-if="visible"
      width="900px"
      append-to-body
      custom-class="myDialog"
      :destroy-on-close="true"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <customerForm :data="data" :preview="true"></customerForm>
      <div slot="footer">
        <el-button @click=" visible = false">取消</el-button>
        <el-button type="primary" @click=" visible = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="测试表单"
      :visible="testVisible"
      v-if="testVisible"
      width="900px"
      append-to-body
      custom-class="myDialog"
      :destroy-on-close="true"
      @close="testVisible = false"
      :close-on-click-modal="false"
    >
      <customerForm :data="data" ref="testForm"></customerForm>
      <div slot="footer">
        <el-button @click=" testVisible = false">取消</el-button>
        <el-button type="primary" @click="testSave">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="打印表单"
      :visible="printVisible"
      v-if="printVisible"
      width="900px"
      append-to-body
      custom-class="myDialog"
      :destroy-on-close="true"
      @close="printVisible = false"
      :close-on-click-modal="false"
    >
      <el-form id="printForm" label-width="100px" class="customerForm">
        <guideComponent
          class="myField"
          v-for="(item,index) in data"
          :key="index"
          :mode="2"
          :value="item"
        ></guideComponent>
      </el-form>
      <div slot="footer">
        <el-button @click=" printVisible = false">取消</el-button>
        <el-button type="primary" v-print="printObj">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { checkArrayString, checkArray, uuid } from '@/utils/index'
import draggable from 'vuedraggable'
import guideComponent from '@/components/customerForm/guideComponent/index'
import customerForm from '@/components/customerForm/index'
export default {
  name: 'formIndex',
  components: {
    guideComponent,
    draggable,
    customerForm,
  },
  data() {
    return {
      //打印的对象
      printObj: {
        id: 'printForm',
        extraCss: '/css/print.css',
        popTitle: '测试打印',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },

      contentList: [
        {
          controlType: 'text',
          label: '单行输入',
        },
        {
          controlType: 'textarea',
          label: '多行输入',
        },
        {
          controlType: 'ueditor',
          label: '富文本',
        },
        {
          controlType: 'select',
          label: '下拉框',
        },
        {
          controlType: 'datePicker',
          label: '日期框',
        },
        {
          controlType: 'inputNumber',
          label: '数字框',
        },
        {
          controlType: 'radio',
          label: '单选框',
        },
        {
          controlType: 'checkbox',
          label: '多选框',
        },
        {
          controlType: 'partitionLine',
          label: '分割线',
        },
        {
          controlType: 'cityCountyAndDistrict',
          label: '选择市县区',
        },
      ],
      data: [],
      drag: false,
      draggableDisabled: false,
      //当前组件
      current: {
        component: null,
        name: '',
      },

      //占比类型
      rowSelect: [
        { label: '1', value: '1' },
        { label: '1/2', value: '2' },
        { label: '1/3', value: '3' },
        { label: '1/4', value: '4' },
      ],

      //常用三种校验 身份证  手机 邮箱
      formExpression: this.$PublicEnumeration.formExpression,

      visible: false,

      testVisible: false,

      printVisible: false,

      //不重复的累计组件的唯一值  如A1 A2 A3
      fieldESLength: 0,
    }
  },
  created() {},

  mounted() {},
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  methods: {
    checkMove(e) {
      return e.to.id === 'content'
    },
    cloneDog(value) {
      this.fieldESLength++
      const row = {
        label: value.label,
        fieldES: 'A' + this.fieldESLength,
        controlType: value.controlType,
        value: null,
        required: true,
        disabled: true,
        placeholder: null,
        nzMax: null,
        nzMin: null,
        regular: null,
        enum: [],
        row: '1',
      }

      const type = value.controlType
      //设置默认值end
      if (type == 'radio' || type == 'select') {
        for (let i = 1; i < 4; i++) {
          const sourceDatas = {
            label: '选项' + i,
            value: '选项' + i,
          }
          row.enum.push(sourceDatas)
        }
        //默认值是第一个
        row.value = row.enum[0].value
      } else if (type == 'checkbox') {
        for (let i = 1; i < 4; i++) {
          row.enum.push({
            label: '选项' + i,
            value: false,
          })
        }
      } else if (type == 'partitionLine') {
        row.value = 'left'
        row.label = '分割线'
      }
      this.getActivie(row)
      return row
    },
    //删除行
    deleteRow(value) {
      this.data.splice(checkArrayString(this.data, 'fieldES', value.fieldES), 1)
    },
    //获取焦点
    getActivie(value) {
      this.data.forEach((item) => {
        item.activie = false
      })
      value.activie = true
      this.current.name = this.contentList[
        checkArrayString(this.contentList, 'controlType', value.controlType)
      ].label
      this.current.component = value
    },

    //新增项 类似checkbox select radio 这类组件
    addEnum(e) {
      let row = {
        label: '选项' + (e.enum.length + 1),
        value:
          e.controlType == 'checkbox' ? false : '选项' + (e.enum.length + 1),
      }
      e.enum.push(row)
    },

    //删除项  类似checkbox select radio 这类组件
    removeEnum(e, index) {
      const value = e.enum[index].value
      e.enum.splice(index, 1)
      e.value = e.value == value ? e.enum[0].value : e.value
    },

    //数字框最大值和最小值的回调
    numberChange(item) {
      item.nzMin = item.nzMin >= item.nzMax ? item.nzMax - 1 : item.nzMin
      item.value = item.value < item.nzMin ? item.nzMin : item.value
      item.value = item.value > item.nzMax ? item.nzMax : item.value
    },

    testSave() {
      this.$refs.testForm.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('通过了')
        } else {
        }
      })
    },

    testFn() {},
  },
}
</script>
<style scoped lang="scss">
.list-group {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  li {
    list-style: none;
  }
}

.contentButton {
  width: 100%;
  margin-bottom: 10px;
  display: block;
  margin-left: 0;
}

.contentBox:before,
.contentBox:after {
  display: table;
  content: '';
}

.contentBox:after {
  clear: both;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  background-color: #fff;
}

.gu-transit {
  opacity: 0.2;
  padding: 10px 0;
  border: 2px dashed;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s ease-in-out;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)';
  filter: alpha(opacity=20);
}

.gu-mirror {
  padding: 10px 0;
  box-sizing: content-box;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px dashed;
  transition: opacity 0.4s ease-in-out;
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.judgment {
  display: none !important;
}

.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
#content {
  padding-bottom: 80px;
}

#contentList,
#content {
  min-height: calc(100vh - 200px);
  overflow: auto;
  display: block;
  overflow: hidden;
}

.customer-form .noLabel .el-form-item__label {
  display: none;
}

.customer-form .mce-panel {
  width: calc(100% - 2px) !important;
}

.conten {
  overflow: hidden;
}

.activie {
  padding: 3px;
  background: rgba(0, 0, 0, 0.2);
  .el-divider--horizontal {
    // .el-divider__text {
    background: rgba(0, 0, 0, 0.2);
    // }
  }
}
.rowIcon {
  cursor: pointer;
  width: 30px;
}

.designForm {
  .el-form-item {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    float: left;
    display: flex;
  }
  .deleteIconDiv {
    padding: 10px;
    .deleteIcon {
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>
