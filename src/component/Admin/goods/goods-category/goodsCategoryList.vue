<template>
    <div>
        <div class="main-top">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>产品分类</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-btns">
            <el-button plain size='mini' class="el-icon-plus">新增</el-button>
            <el-button plain size='mini' calss="el-icon-check" @click="selectAll">全选</el-button>
            <el-button plain size='mini' class="el-icon-delete" @click="selectedDel">删除</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model='gsListQuery.searchvalue' @blur='getListMessage' style="width:300px; float:right; padding-right:30px;"
                size="mini">
            </el-input>
        </div>
        <div>
            <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData3" @selection-change="selectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="标题">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" placement="right">
                            <div slot="content">
                                <img :src="scope.row.imgurl" alt="" style="width:100px;">
                            </div>
                            <router-link :to="{name:'GoodsCategoryEdit',params:{id:scope.row.id}}">{{ scope.row.title }}</router-link>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="所属类别" width="120">
                    <template slot-scope="scope">{{ scope.row.categoryname }}</template>
                </el-table-column>
                <el-table-column label="库存" width="120">
                    <template slot-scope="scope">{{ scope.row.stock_quantity }}</template>
                </el-table-column>
                <el-table-column label="市场价" width="120">
                    <template slot-scope="scope">{{ scope.row.market_price }}</template>
                </el-table-column>
                <el-table-column label="销售价" width="120">
                    <template slot-scope="scope">{{ scope.row.sell_price }}</template>
                </el-table-column>
                <el-table-column label="属性" width="120">
                    <template slot-scope="scope">
                        <i :class="[ 'el-icon-picture',scope.row.is_slide==1? 'active':'']"></i>
                        <i :class="[ 'el-icon-upload' ,scope.row.is_top==1? 'active':'']"></i>
                        <i :class="[ 'el-icon-star-on' ,scope.row.is_hot==1? 'active':'']"></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <router-link :to="{name:'GoodsCategoryEdit',params:{id:scope.row.id}}">修改</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- @size-change="handleSizeChange"
                @current-change="handleCurrentChange" -->
            <div>
                <el-pagination @size-change='sizeChange' @current-change='currentChange' :current-page="gsListQuery.pageIndex" :page-sizes="[10, 20, 30, 40]"
                    :page-size="gsListQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [{
                        title: '骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫',
                        categoryname: "男装",
                        stock_quantity: '200',
                        market_price: 1000,
                        sell_price: 800
                    },
                    {
                        title: '骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫',
                        categoryname: "男装",
                        stock_quantity: '200',
                        market_price: 1000,
                        sell_price: 800
                    },
                    {
                        title: '骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫',
                        categoryname: "男装",
                        stock_quantity: '200',
                        market_price: 1000,
                        sell_price: 800
                    }
                ],
                gsListQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue: ''
                },
                pageInfo: {
                    total: 0
                },
                select: []
            }
        },
        methods: {
            getListMessage() {
                this.$http.get(this.$api.gsList, {
                    params: this.gsListQuery
                }).then(res => {
                    this.tableData3 = res.data.message;
                    this.pageInfo.total = res.data.totalcount;
                })
            },
            sizeChange(val) {
                this.gsListQuery.pageSize = val;
            },
            // 获取当前页
            currentChange(val) {
                this.gsListQuery.pageIndex = val;
                this.getListMessage();
            },
            selectionChange(select) {
                this.select = select;
                console.log(this.select);
            },
            selectAll() {
                document.querySelector('.el-checkbox__inner').click();
            },
            selectedDel() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.del();
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
            },
            del() {
                var arrId=this.select.map(v=>v.id).join(',');
                console.log(this.$api.gsDel+arrId);
                this.$http.get(this.$api.gsDel+arrId).then(res=>{
                    // if(res.status==0){
                        console.log(res);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getListMessage();
                    // }
                })
            }


        },
        created() {
            this.getListMessage();
        }
    }
</script>

<style lang="less" scoped>
    [class^=el-icon] {
        color: rgba(0, 0, 0, 0.2);
        &.active {
            color: #000;
        }
    }
    .main-top{
        margin:20px;

        /* font-size: 40px; */
        .el-breadcrumb {
            font-size: 20px;
        }
    }
    .main-btns{
        margin:20px;
    }
    a{
        text-decoration: none;
    }
</style>