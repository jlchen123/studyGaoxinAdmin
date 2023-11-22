<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">

                <el-input v-model="content" placeholder="模糊查询，结果较多。单位、部门、姓名、电话等等。" v-on:keydown.enter="searchBuContent">
                    <template #prepend>模糊查询</template>
                    <template #append>
                        <el-button :icon="Search" @click="searchBuContent" />
                    </template>
                </el-input>
                <div style="height:10px"></div>
                <el-input v-model="username" placeholder="请输入姓名" v-on:keydown.enter="searchByUsername">
                    <template #prepend>姓名查询</template>
                    <template #append>
                        <el-button :icon="Search" @click="searchByUsername" />
                    </template>
                </el-input>
            </el-col>

            <el-col :span="12">

                <el-input v-model="department" placeholder="部门查询" class="input-with-select"
                    v-on:keydown.enter="searchByDepartment">
                    <template #prepend>
                        <el-select v-model="department" placeholder="请选择" style="width: 115px">
                            <el-option v-for="item in departmentAll" :label="item.department" :value="item.department"
                                @click="searchByDepartment" />

                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
                <div style="height:10px"></div>
                <el-input v-model="role" placeholder="角色查询" class="input-with-select" v-on:keydown.enter="searchByRole">
                    <template #prepend>
                        <el-select v-model="role" placeholder="请选择" style="width: 115px">
                            <el-option label="管理员" value="管理员" @click="searchByRole" />
                            <el-option label="用户" value="用户" @click="searchByRole" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-divider>查询结果</el-divider>
        <el-table :data="account" border style="width: 100%;color: rgb(104, 104, 104);" @cell-click="cellClick" max-height="70vh" v-loading="loading"
            :editable="true">
            <el-table-column prop="id" label="用户id"></el-table-column>
            <el-table-column prop="unit" label="单位">
                <template #default="scope">
                    <el-dropdown style="width: 200px;" trigger="click" max-height="400px">
                        <span class="el-dropdown-link">
                            <span :id="'unit' + scope.$index"> {{ scope.row.unit }}</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in unit" @click="change(scope.$index, item.unit, 1)">{{
                                    item.unit }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column prop="department" label="部门">
                <template #default="scope">
                    <el-dropdown style="width: 200px;" trigger="click" max-height="400px">
                        <span class="el-dropdown-link">
                            <span :id="'department' + scope.$index"> {{ scope.row.department }}</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in departmentAll"
                                    @click="change(scope.$index, item.department, 2)">{{
                                        item.department }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名">
                <template #default="scope">
                    <input type="text" v-model="scope.row.username" class="myInput" ref="myInput1"
                        @blur="iptBlur(scope.row.username, scope.$index, $event)"
                        @focus="iptFocus(scope.row.username, $event)" />
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话">
                <template #default="scope">
                    <input type="text" v-model="scope.row.phone" class="myInput" ref="myInput1"
                        @blur="iptBlur(scope.row.phone, scope.$index, $event)" @focus="iptFocus(scope.row.phone, $event)" />
                </template>
            </el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-dropdown style="width: 200px;" trigger="click" max-height="400px">
                        <span class="el-dropdown-link">
                            <span :id="'role' + scope.$index"> {{ scope.row.role }}</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in roleAll" @click="change(scope.$index, item.role, 3)">{{
                                    item.role }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column prop="password" label="密码">
                <template #default="scope">
                    <input type="text" v-model="scope.row.password" class="myInput" ref="myInput1"
                        @blur="iptBlur(scope.row.password, scope.$index, $event)"
                        @focus="iptFocus(scope.row.password, $event)" />
                </template>
            </el-table-column>
            <el-table-column prop="personalMessage" label="个人简介">
                <template #default="scope">
                    <input type="text" v-model="scope.row.personalMessage" class="myInput" ref="myInput1"
                        @blur="iptBlur(scope.row.personalMessage, scope.$index, $event)"
                        @focus="iptFocus(scope.row.personalMessage, $event)" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">

                    <el-button link type="primary" size="small" @click="handleClick(scope.$index)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="addAccount">增加</el-button>
            <el-button @click="setChange" type="primary">提交修改</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, type HtmlHTMLAttributes, type InputHTMLAttributes } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { getAccountsByContent, getAccountsByUsername, getDepartment, getAccountsByDepartment, getAccountsByRole, updateAccounts, getUnit,delAccount } from '@/request/api'
import { ElMessage } from 'element-plus';

const content = ref('')
const username = ref('')
const department = ref('')
const role = ref('')
const myInput1 = ref()
const loading = ref(true)
const account = ref([
    {
        id: 0,
        unit: '',
        username: '',
        department: '',
        phone: '',
        role: '',
        password: '',
        personalMessage: '',
    }
]);
const changeAccount = ref([
    0
]);
let stateFocus = ''
const departmentAll = ref([
    {
        department: '',
    }
]);
const unit = ref([
    {
        unit: '',
    }
])
const roleAll = ref([
    { role: '管理员' },
    { role: '用户' }
])
const ResponseMessage = ref({
    messageClass: '',
    message: '',
    result: false,

})

const change = (index: number, item: any, n: number) => {
    let p;
    switch (n) {
        case 1:
            account.value[index].unit = item;
            p = document.querySelector('#unit' + index) as HTMLElement
            p!.style.color = '#20a0ff'
            break;
        case 2:
            account.value[index].department = item;
            p = document.querySelector('#department' + index) as HTMLElement
            p!.style.color = '#20a0ff'
            break;
        case 3:
            account.value[index].role = item;
            p = document.querySelector('#role' + index) as HTMLElement
            p!.style.color = '#20a0ff'
            break;
    }
    changeAccount.value.push(index)
    // e.target.style.background = '#20a0ff'



}
let accountUp = [{
    id: 0,
    unit: '',
    username: '',
    department: '',
    phone: '',
    role: '',
    password: '',
    personalMessage: '',
}]
function addAccount() {
    let newAccount = {
        id: 0,
        unit: '',
        username: '',
        department: '',
        phone: '',
        role: '',
        password: '',
        personalMessage: '',
    }
    changeAccount.value.push(account.value.length)
    account.value.push(newAccount)
}
function setChange() {
    const uniqueArr = new Set(changeAccount.value);
    accountUp = [];
    uniqueArr.forEach((element) => {
        accountUp.push(account.value[element])
    });
    if(accountUp.length>0){
        updateChange()
    }else{
        ElMessage("无修改")
    }
   

}
async function updateChange() {


    ResponseMessage.value = await updateAccounts(JSON.stringify(accountUp))
    if (ResponseMessage.value.result == true) {
        const my = document.querySelectorAll('.myInput')

        for (let i = 0; i < my.length; i++) {
            (my[i] as HTMLInputElement).style.color = 'rgb(104, 104, 104)';
        }
        for (let i = 0; i < account.value.length; i++) {
            let p = document.querySelector('#unit' + i) as HTMLElement
            p!.style.color = 'rgb(104, 104, 104)'
            p = document.querySelector('#department' + i) as HTMLElement
            p!.style.color = 'rgb(104, 104, 104)'
            p = document.querySelector('#role' + i) as HTMLElement
            p!.style.color = 'rgb(104, 104, 104)'
        }

        changeAccount.value = [];
        ElMessage.success(ResponseMessage.value.message)
    } else {
        ElMessage.error(ResponseMessage.value.message)
    }
}

function cellClick(cell: any) {
    //  console.log(cell)
}
//失焦事件，使用事件对象拿到dom元素并进行后续样式的修改
const iptBlur = (value: any, row: number, e: any) => {

    if (stateFocus != value) {
        e.target.style.color = '#20a0ff'
       
        changeAccount.value.push(row)
    } else {
        e.target.style.color = 'rgb(104, 104, 104)'
    }

    // console.log(value)
}
const iptFocus = (value: any, e: any) => {
    e.target.style.color = '#20a0ff'
    stateFocus = value
}
account.value = [];
changeAccount.value = [];
onMounted(() => {
    getDepartmentThis()
    getUnitThis()
   loading.value=false
});

async function searchByRole() {
    loading.value=true
    account.value = [];
    account.value = await getAccountsByRole("role=" + role.value)
    loading.value=false
}
async function searchByDepartment() {
    loading.value=true
    account.value = [];
    account.value = await getAccountsByDepartment("department=" + department.value);
    loading.value=false
}
async function getDepartmentThis() {
   
    departmentAll.value = await getDepartment();
    
}
async function getUnitThis() {
   
    unit.value = await getUnit();

}
async function searchByUsername() {
    loading.value=true
    account.value = [];
    account.value = await getAccountsByUsername("username=" + username.value)
    loading.value=false
}
async function searchBuContent() {
    loading.value=true
    account.value = [];
    if (content.value != '') {
        account.value = await getAccountsByContent("content=" + content.value);
    }
    loading.value=false

}
const handleClick = (index: number) => {
    delAccountThis(account.value[index].id)


    let newArr = [0];
    newArr = [];
    for (let i = 0; i < changeAccount.value.length; i++) {
        if (index != changeAccount.value[i]) {
            newArr.push(changeAccount.value[i])
        }
    }
    changeAccount.value = [];
    changeAccount.value = newArr;

    let newAccount = [{
        id: 0,
        unit: '',
        username: '',
        department: '',
        phone: '',
        role: '',
        password: '',
        personalMessage: '',
    }]
    newAccount=[];
    for(let i=0;i<account.value.length;i++){
        if(index!=i){
            newAccount.push(account.value[i])
        }
    }
    account.value=[];
    account.value=newAccount;
}
async function delAccountThis(id:number){
    ResponseMessage.value=await delAccount("id="+id);
    if(ResponseMessage.value.result==true){
        ElMessage.success(ResponseMessage.value.message)
    }else{
        ElMessage.error(ResponseMessage.value.message)
    }
}
</script>
<style>
.myInput {
    color: rgb(104, 104, 104);
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    height: 100%;
}

.myInput:focus {
    border: none;
    box-shadow: none;
    background-color: transparent;
}
</style>