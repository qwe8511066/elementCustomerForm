# 基于element的自定义表单项目

### 效果图
![router-tree](https://github.com/qwe8511066/vantCustomForm/blob/master/public/images/effectPicture.gif?raw=true)<br>

## 参数
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 标题    | string    | — | —  |
| fieldES     | 唯一值(类似递增不重复id)    | string    | — | —  |
| controlType     |  类型    | string    | — | text  |
| value     | 默认值    | string    | — | —  |
| required     | 必填    | boolean    | true/false | true  |
| disabled     | 可填    | boolean    | true/false | true  |
| placeholder     | 占位符    | string    | — |  '请输入'+label |
| nzMax     | 数字框最大值    | number    | — |  2147483647 |
| nzMin | 数字框最小值    | number    | - |  -2147483648 |
| regular     | 输入框的正则   | string    | - |  - |
| row     | 占比   | number    | - |  1 |
| enum     | 枚举    | Array    | [{label:选项1,value:选项1的值}] |  [] |

## 使用技术/组件
基于 element 构建的一个项目
element 动态渲染组件
vuedraggable 拖拽