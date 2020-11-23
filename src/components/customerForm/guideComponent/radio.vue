<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-radio-group class="cobyRadio" v-model="value.value">
      <el-radio :label="box.label" v-for="box in value.enum" :key="box.label">{{box.label}}</el-radio>
    </el-radio-group>
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
