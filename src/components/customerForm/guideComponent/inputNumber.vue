<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-input-number
      :disabled="!value.disabled"
      v-model="dynamicValue"
      controls-position="right"
      :min="value.nzMin?value.nzMin:-2147483648"
      :max="value.nzMax?value.nzMax:2147483647"
    ></el-input-number>
  </el-form-item>
</template>

<script>
import guideComponentProperty from './guideComponentProperty'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormText',
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    outPutForm() {},
  },
}
</script>

<style scoped>
</style>
