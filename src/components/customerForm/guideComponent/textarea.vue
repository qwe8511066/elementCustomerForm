<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-input
      type="textarea"
      v-model="dynamicValue"
      :disabled="!value.disabled"
      :placeholder="value.placeholder"
      :autosize="{ minRows: 2}"
    ></el-input>
  </el-form-item>
</template>

<script>
import guideComponentProperty from './guideComponentProperty'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormTextarea',
  props: {
    value: {
      type: Object,
    },
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
