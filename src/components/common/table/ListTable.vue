<template>
  <div class="table">
    <table ref="table" class="tui-table">
      <thead>
        <tr>
          <td v-for="item in thead">{{ item }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <!-- join() 字符串转数组，split() 数组转字符串 -->
          <td>{{ item.tag.join(',') }}</td>
          <td>{{ item.is_hot ? "是" : "" }}</td>
          <td class="table-edit">
            <span>[编辑]</span>
            <span class="red">[删除]</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ListTable',
    props:  ['thead', 'items'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  * {margin: 0;padding: 0;}
  .tui-table {width: 500px;border-spacing: 0;text-align: center;}
  tr td {border-bottom: 1px solid var(--DividColor); padding: 3px 0}
  .table-edit {width: 100px;}
  .table-edit span {padding: 2px 8px 2px 4px;margin: 0;font-size: var(--text12); cursor: pointer;}
  .table-edit span:first-child {border-right: 1px solid var(--TextColor3);}
</style>
