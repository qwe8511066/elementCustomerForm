<template>
  <el-form
    :disabled="preview"
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="customerForm"
  >
    <guideComponent
      class="myField"
      v-for="(item,index) in data"
      :key="index"
      :form="form"
      :value="item"
    ></guideComponent>
  </el-form>
</template>

<script>
import { checkArrayString } from '@/utils'
import guideComponent from './guideComponent/index'
import eventEmiter from '@/utils/eventEmiter'
export default {
  name: 'customerForm',
  components: {
    guideComponent,
  },
  data() {
    return {
      //表单对象
      form: {},
      //校验规则
      rules: {},

      //数组必填的类型
      // enumRequired: ['select', 'checkbox', 'cityCountyAndDistrict'],
    }
  },
  props: {
    //从父级获取的表单组件
    data: {
      type: Array,
      default() {
        return []
      },
    },

    //判断是否是预览
    preview: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.init()
    eventEmiter.on('verificationIsRequired', (value) => {
      this.$refs.ruleForm.validateField(value.fieldESthis)
    })
  },
  //数据监听
  watch: {
    data(to) {
      console.log(to)
    },
  },
  methods: {
    //初始化
    init() {
      this.form = {}
      this.rules = {}
      this.data.forEach((item) => {
        let list = []
        const type = item.controlType
        let defaultValue = item.defaultValue ? item.defaultValue : undefined
        if (type == 'textarea' || type == 'ueditor' || type == 'inputNumber') {
          this.dynamicFn(item, item.value)
        } else if (type == 'text') {
          if (item.regular) {
            const index = checkArrayString(
              this.$PublicEnumeration.formExpression,
              'value',
              item.regular
            )
            if (index == -1) {
              alert('没有找到该正则表达式')
              return false
            }
            const formExpression = this.$PublicEnumeration.formExpression[index]
            this.dynamicFn(
              item,
              item.value,
              0,
              'blur',
              (rule, value, callback) => {
                const type = formExpression.regular.test(value)
                if (!value && !item.required) {
                  callback()
                } else if (!type) {
                  callback(new Error(formExpression.error))
                } else {
                  callback()
                }
              }
            )
          } else {
            this.dynamicFn(item, item.value)
          }
        } else if (type == 'select' || type == 'datePicker') {
          this.dynamicFn(item, item.value, 0, 'change')
        } else if (type == 'checkbox') {
          item.enum.forEach((box) => {
            if (box.value == true) {
              list.push(box.label)
            }
          })
          this.dynamicFn(item, list, 1)
        } else if (type == 'cityCountyAndDistrict') {
          this.dynamicFn(
            item,
            item.enum.map((box) => {
              return box
            }),
            1
          )
        }
      })
    },
    dynamicFn(item, value, type = 0, trigger = 'blur', validator) {
      let rule =
        type == 0
          ? [
              {
                required: item.required,
                validator: validator,
                trigger: trigger,
              },
            ]
          : [
              {
                type: 'array',
                validator: validator,
                required: item.required,
                trigger: 'change',
              },
            ]
      if (!validator) {
        rule[0].message = '这是必填项目'
      } else {
        console.log(validator)
      }
      this.$set(this.form, item.fieldES, value)
      this.rules[item.fieldES] = rule
      console.log(this.form)
      console.log(this.rules)
    },
    clickRow(item, index, event) {
      this.$emit('clickRow', {
        item: item,
        //返回列表对象
        index: index,
        //返回当前点击对象
        event: event,
      })
    },
  },
}
</script>
<style scoped>
</style>