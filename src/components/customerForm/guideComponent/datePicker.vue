<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-date-picker v-model="dynamicValue" type="date" :placeholder="value.placeholder"></el-date-picker>
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
