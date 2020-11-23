
import eventEmiter from '@/utils/eventEmiter'
export default {
  name: 'guideComponentProperty',
  props: {
    value: {
      type: Object,
    },
    form: {
      type: Object,
    },
    //模式
    //0设计 1填写 2打印
    mode: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    dynamicValue: {
      get() {
        return this.mode == 1 ? this.form[this.value.fieldES] : this.value.value
      },
      set(val) {
        if (this.mode == 1) {
          this.form[this.value.fieldES] = val
        } else {
          this.value.value = val
        }
      },
    },

    dynamicEnum: {
      get() {
        return this.mode == 1 ? this.form[this.value.fieldES] : this.value.enum
      },
      set(val) {
        if (this.mode == 1) {
          this.form[this.value.fieldES] = val
        } else {
          this.value.enum = val
        }
      },
    },
  },
  methods: {
    //对外通知 校验该项
    verificationIsRequired() {
      eventEmiter.emit('verificationIsRequired', [
        { fieldESthis: this.value.fieldES },
      ])
    },
  },
}
