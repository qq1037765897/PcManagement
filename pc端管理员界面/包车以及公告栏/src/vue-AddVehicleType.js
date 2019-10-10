// import paging from "./components/pager";
const template = `
<div class="publicModelFrame">
    <div class="publicModelFrame_con">
        <h1>添加车辆类型</h1>
        <div class="addCommittee">
            <ul>
                <label>车辆类型:</label><input v-model="location" type="text" />
            </ul>
        </div>
        <div class="addCommittee">
            <ul>
                <label>定金:</label><input v-model="deposit" type="text" />
            </ul>
        </div>
        <button class="modelButton submitVehicleType" @click="handleAdd">添加</button>
        <h1>已添加车辆类型</h1>
        <div class="contentVehicle">
            <ul class="VehicleTitle">
                <li class="VehicleType">车辆类型</li>
                <li class="deposit">定金</li>
                <li class="deleteButtons">点击删除</li>
            </ul>
        </div>
        <div id="centent" class="contentVehicle">
           <ul class='VehicleContent' v-for="item in datas" :key="item.vehicleId">
                <li class='VehicleType'>{{item.vehicleType}}</li>
                <li class='deposit'>{{item.deposit}}</li>
                <li class='deleteButton'  @click="handledelete(item.vehicleId)">删除</li>
            </ul>
        </div>
    </div>
</div>
`;
const config = {
    el: '#addVihicleType',
    template,
    data() {
        return {
            location: "",
            deposit: "",
            totalPage: "",
            curPage: "",
            datas: [],
        }
    },
    components: {
        // paging
    },
    computed: {
        check() {
            if (this.location == "") {
                alert('车辆类型不能为空');
                return false;
            } else if (this.deposit == "") {
                alert('定金不能为空');
                return false
            } else if (isNaN(Number(this.deposit, ))) {
                alert('定金不是数字!');
                return false
            } else if ((this.deposit % 1 === 0) == false) {
                alert('定金不是整数!');
                return false
            } else if (this.deposit < 0) { //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
                alert('定金不能为负数');
                return false
            } else {
                return true
            }
        },
    },
    mounted() {
        this.setData();
    },
    methods: {
        async setData() {
            window.onscroll = (e) => e.preventDefault(); //兼容浏览器
            let data = await fetch("http://easypoint.club/getTotalPageAndFirstVehicleInfoList").then(resp => resp.json())
            console.log(data.data.vehicleInfoList);
            if (data.code == 200) {
                console.log("查询总页数和车辆类型成功");
                this.totalPage = data.data.totalPage
                this.curPage = 1;
                this.datas = data.data.vehicleInfoList;
            } else if (data.code == 201) {
                alert("暂无车辆类型数据，请管理员添加");
            }

        },
        handleAdd() {
            if (this.check == true) {
                if (confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)) {
                    let requestConfig = {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                        }),
                        body: new URLSearchParams([
                            ["vehicleType", this.location],
                            ["deposit", this.deposit],
                        ]).toString()
                    }
                    fetch("http://easypoint.club/easyPoint/addNewVehicleInfo", requestConfig).then(resp =>
                        console.log(resp)
                    )
                    alert("添加车辆类型成功");
                } else {
                    console.log("你取消了添加");
                }
            }
        },
        handledelete(vehicleId) {
            if (confirm("确定删除该车辆类型?")) {
                let requestConfig = {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                    }),
                    body: new URLSearchParams([
                        ["vehicleId", vehicleId]
                    ]).toString()
                }
                fetch("http://easypoint.club/deleteVehicleType", requestConfig).then(resp =>
                    console.log(resp)
                )
                alert("删除车辆类型成功");
            } else {
                console.log("您取消了删除！");
            }
        }
    }
}
const vm = new Vue(config)