<script>
import guideComponentProperty from './guideComponentProperty'
//指引组件
// 传入组件类型  生成指定的组件
// 如传入类型：select   生成指定的select 组件
export default {
  render(h, cxt) {
    try {
      return h(require(`./${this.value.controlType}.vue`).default, {
        props: {
          value: this.value,
          form: this.form,
          mode: this.mode,
        },
      })
    } catch (error) {
      throw new Error(
        '自定义表单找不到对应' + this.value.controlType + '的组件'
      )
    }
  },
  mixins: [guideComponentProperty],
  methods: {},
  created() {},
}
</script>

<style scoped lang="scss">
</style>