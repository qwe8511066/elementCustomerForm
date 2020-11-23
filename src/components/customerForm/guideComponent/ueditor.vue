<template>
  <el-form-item
    :myFieldES="value.fieldES"
    :label="value.label"
    :prop="value.fieldES"
    :myCol="value.row"
  >
    <div v-if="mode == 2" v-html="value.value"></div>

    <tinymce
      v-else
      class="tinymce"
      :class="{customerPointerf5f5f5:!value.disabled}"
      v-model="dynamicValue"
      menubar="false"
      @input="verificationIsRequired"
      :height="360"
    />
  </el-form-item>
</template>

<script>
import tinymce from '@/components/Tinymce/index'
import guideComponentProperty from './guideComponentProperty'

export default {
  mixins: [guideComponentProperty],
  name: 'customerFormUeditor',
  props: {
    value: {
      type: Object,
    },
  },
  components: {
    tinymce,
  },
  data() {
    return {}
  },
  computed: {},

  methods: {},
}
</script>

<style scoped>
</style>
