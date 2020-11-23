<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <el-cascader
      clearable
      :disabled="!value.disabled"
      v-model="dynamicEnum"
      :placeholder="value.placeholder"
      :options="positionEnum"
      @change="changeCascader"
      :props="{ checkStrictly: true }"
      popper-class="myCascader"
    ></el-cascader>
  </el-form-item>
</template>

<script>
import guideComponentProperty from './guideComponentProperty'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormSelect',
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      //市县区的json
      positionEnum: this.$PublicEnumeration.positionEnum,
    }
  },
  //数据监听
  watch: {},
  computed: {},
  created() {},
  methods: {
    changeCascader(value) {
      console.log(this.value)
      console.log(value)
    },
  },
}
</script>

<style scoped>
</style>
