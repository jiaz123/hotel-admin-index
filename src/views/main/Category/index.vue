<template>
<div>
    <el-table :data="categories">
        <el-table-column prop="cid" label="ID"></el-table-column>
        <el-table-column prop="cname" label="分类名称"></el-table-column>
        <el-table-column prop="cdesc" label="分类描述"></el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <router-link :to="{name:'categoryedit',query:{cid:scope.row.cid}}" type="text" size="small">编辑</router-link>
                <el-button type="text" size="small" @click="handledelete(scope.row.cid)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
        <el-pagination
                :total="total" :page-size.sync="paginate.limit"
                :current-page.sync="paginate.page"
                layout="total,prev,pager,next,jumper"
                @current-change="handlerCurrentPageChange"
        >

        </el-pagination>
    </div>
</div>
</template>

<script>
    import axios from "axios";
    // eslint-disable-next-line no-unused-vars
    import {URL,SUCCESS,FAIL} from "../../../lib/base";
    import {categoryDelete} from "../../../http/category";
    export default {
        name:'index',
        data(){
            return{
                // 搜索条件
                search:'',
                paginate:{
                    page : 1,
                    limit :5
                },
                categories:[],
                total:0
            }
        },
        methods:{
            initCategory(){
                let url = URL +'/admin/category/index';
                let token=sessionStorage.getItem('token')
                let params = Object.assign({},this.paginate,this.search);
                axios({
                    method:"GET",
                    url,
                    params,
                    headers: {
                        token
                    }
                }).then(res=>{
                    if (res.status && res.data.code === SUCCESS){
                        if (res.data.data){
                            this.categories = res.data.data;
                            this.total=res.data.total;
                        }else {
                            this.$message.info(res.data.msg);
                        }
                    }
                }).catch(()=>{

                })

            },
            handlerCurrentPageChange(val){
                this.paginate.page = val;
                this.initCategory();
            },
            handledelete(cid){
                categoryDelete(cid).then(res=>{
                    this.$message(res.msg)
                    this.initCategory()
                }).catch(error=>{
                    error
                })
            }
    },
        mounted() {
            this.initCategory();
        }
    }
</script>
<style>

</style>