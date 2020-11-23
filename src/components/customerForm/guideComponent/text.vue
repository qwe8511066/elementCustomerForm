<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-input v-model="dynamicValue" :disabled="!value.disabled" :placeholder="value.placeholder"></el-input>
  </el-form-item>
</template>

<script>
import { checkArray, checkArrayString } from '@/utils/index'
import guideComponentProperty from './guideComponentProperty'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormText',

  data() {
    return {
      regularExpression: '',
      //常用三种校验 身份证  手机 邮箱
      formExpression: this.$PublicEnumeration.formExpression,
    }
  },

  created() {
    this.regularExpression = this.value.regular
      ? this.formExpression[
          checkArrayString(this.formExpression, 'value', this.value.regular)
        ]
      : null
  },
  methods: {
    outPutForm() {},
    validator(value) {
      return this.regularExpression && this.regularExpression.regular
        ? this.regularExpression.regular.test(value)
        : true
    },
  },
}
</script>

<style scoped>
</style>
