<template>
  <div class="app-container">
    <el-form ref="courseForm" :model="courseForm" class="course-form" label-position="left">
      <el-form-item prop="课程名称">
        <el-input
          ref="coursename"
          v-model="courseForm.coursename"
          placeholder="课程名称"
          name="coursename"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:10%;margin-bottom:30px;" @click.native.prevent="fetchData">查询</el-button>

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="主键">
          <template slot-scope="scope" width="110">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程简介" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.profile }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdTime" label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form></div>
</template>

<script>
import { getList } from '@/api/course'

export default {
  name: 'Course',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      courseForm: {
        coursename: ''
      },
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var params = { 'name': this.courseForm.coursename }
      getList(params).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.loading = false
      })
    }
  }
}
</script>
