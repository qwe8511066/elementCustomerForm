<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-select
      clearable
      v-model="dynamicValue"
      placeholder="请选择"
      class="select width10"
      :disabled="!value.disabled"
      @change="verificationIsRequired"
    >
      <el-option v-for="box in value.enum" :key="box.label" :label="box.label" :value="box.label"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import guideComponentProperty from './guideComponentProperty'
import eventEmiter from '@/utils/eventEmiter'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormSelect',
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  //数据监听
  watch: {},
  computed: {},
  created() {},
  methods: {
    changeSelect() {},
  },
}
</script>

<style scoped>
</style>
