<template>
  <el-form-item
    :myFieldES="value.fieldES"
    label-width="0px"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-divider :content-position="value.value">{{value.label}}</el-divider>
  </el-form-item>
</template>

<script>
export default {
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
