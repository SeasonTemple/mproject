<template>
  <div class="temp">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="部门">
            <el-input v-model="formInline.user" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="项目组">
            <el-input v-model="formInline.user" placeholder="项目组"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formInline.user" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="负责项目">
            <el-select v-model="formInline.region" placeholder="负责项目">
              <el-option label="项目一" value="shanghai"></el-option>
              <el-option label="项目二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width:100%;" fit maxi-height="600" size="medium" v-loading='drawLoading'
      empty-text='暂无数据' class="tableBg" ref="tableData">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column type="expand" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="职工号">
              <span>{{ scope.row.eid }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ scope.row.username }}</span>
            </el-form-item>
            <el-form-item label="密码">
              <span>{{ scope.row.password }}</span>
            </el-form-item>
            <el-form-item label="真实姓名">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ scope.sex==0?'女':'男' }}</span>
            </el-form-item>
            <el-form-item label="角色">
              <el-tag size="medium" v-if="scope.row.role==0" effect="dark">用户</el-tag>
              <el-tag type="warning " size="medium" v-else effect="dark">管理员</el-tag>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag type="success" size="medium" v-if="scope.row.roleStatus==1" effect="dark">使用中</el-tag>
              <el-tag type="danger" size="medium" v-else effect="dark" >禁用</el-tag>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ scope.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ scope.row.email }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{ scope.row.address }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ scope.row.idNum }}</span>
            </el-form-item>
            <el-form-item label="入职日期">
              <span>{{ scope.row.enterTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="eid" label="职工号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="username" label="账号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="password" label="密码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="角色" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" v-if="scope.row.role==0" effect="dark">用户</el-tag>
            <el-tag type="warning " size="medium" v-else effect="dark">管理员</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" >
            <el-tooltip :content="scope.row.roleStatus == 0?'已禁用':'使用中'" placement="top">
              <el-switch v-model="scope.row.roleStatus" active-color="#13ce66"
                inactive-color="#ff4949" active-value="1" inactive-value="0">
              </el-switch>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="查看" placement="top" effect="dark">
            <el-button @click="toogleExpand(scope.row)" icon="el-icon-thumb" circle></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top" effect="dark">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" effect="dark">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-table-column prop="phone" label="手机号" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip>
      </el-table-column> -->
    <!-- <el-table-column prop="address" label="籍贯" width="150" show-overflow-tooltip>
      </el-table-column> -->
    <!-- <el-table-column prop="idNum" label="身份证号" width="150" show-overflow-tooltip>
      </el-table-column> -->
    <!-- <el-table-column prop="enterTime" label="入职日期" width="150" show-overflow-tooltip>
      </el-table-column> -->
    <div slot="append" style="margin-top: 20px;float:left;">
      <el-button size="small" @click="toggleSelection([tableData[1], tableData[2]])">反选</el-button>
      <el-button size="small" @click="toggleSelection()" type="danger">批量删除</el-button>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"
      style="text-align:center;">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'staff',
    data() {
      let drawLoading = true;
      return {
        drawLoading,
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        },{
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, {
          eid: '5123123',
          username: '1231231231',
          password: 'Zc42230',
          name: '王小虎',
          sex: '1',
          role: '1',
          roleStatus: '1',
          phone: '17369492851',
          email: '158133959@163.com',
          address: '上海市普陀区金沙江路1518号',
          idNum: '51025198110120212',
          enterTime: '2016-05-02'
        }, ],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      toogleExpand(row) {
        console.log(this.$refs.tableData);
      },
      toogleExpand(row) {
        let $table = this.$refs.tableData;
        this.tableData.map((item) => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false)
          }
        })
        $table.toggleRowExpansion(row)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      sexFormatter(row, column) {
        return row.sex == 0 ? '女' : '男';
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.drawLoading = false;
      }, 2000);
    }
  }
</script>
<style scoped src="@/assets/css/staff.css"></style>