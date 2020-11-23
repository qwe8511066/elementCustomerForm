<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <!-- -->

    <div v-if="mode == 1">
      <el-checkbox-group v-model="dynamicValue">
        <el-checkbox v-for="(box,index) in value.enum" :key="index" :label="box.label"></el-checkbox>
      </el-checkbox-group>
    </div>

    <div v-else>
      <el-checkbox
        v-for="(box,index) in value.enum"
        v-model="box.value"
        :key="index"
        :label="box.label"
        :disabled="!value.disabled"
      ></el-checkbox>
    </div>
  </el-form-item>
</template>

<script>
import guideComponentProperty from './guideComponentProperty'
export default {
  mixins: [guideComponentProperty],
  name: 'customerFormText',
  mixins: [guideComponentProperty],
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
