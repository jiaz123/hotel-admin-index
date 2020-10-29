<template>
    <div>
        <loading :isshow="isShow"></loading>
        <el-form inline :model="search">
            <el-form-item label="所属分类">
                <el-select v-model="search.cid" placeholder="请选择">
                    <el-option
                            v-for="item in categorys"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchCategory">搜索</el-button>
            </el-form-item>
        </el-form>
        <div v-if="homestay.length">
            <el-table :data="homestay">
                <el-table-column label="ID" prop="sid"></el-table-column>
                <el-table-column label="名称" prop="sname"></el-table-column>
                <el-table-column label="描述" prop="sdesc" :show-overflow-tooltip="flag"></el-table-column>
                <el-table-column label="价格" prop="sprice"></el-table-column>
                <el-table-column label="特色" prop="stag">
                    <template slot-scope="scope">
                        <el-button v-for="item in scope.row.stag" :key="item">
                            {{item}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="位置" >
                    <template slot-scope="scope">
                        <span>{{scope.row.sprovince}}-{{scope.row.scity}}-{{scope.row.sarea}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="缩略图" prop="sthumb">
                    <template slot-scope="scope">
                        <img :src="scope.row.sthumb" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="ctime">
                    <template slot-scope="scope">
                        <span>{{scope.row.ctime | formateTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button type="text">
                        <router-link :to="{name:'homestayedit',params:{id:scope.row.sid}}">编辑</router-link>
                    </el-button>

                    <el-button type="text" @click="handleDelete(scope.row.sid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
    import loading from "../../../components/loading";
    import instance from "../../../http/http";
    import {IMGURL, SUCCESS} from "../../../lib/base";
    import {categoryIndex} from "../../../http/category";
    import "u-reset.css"

    export default {
        name: "index",
        data(){
            return{
                categorys:[],
                isShow:false,
                search:{sname:'',scity:'',cid:''},
                paginate: {limit:5,page:1},
                homestay:[],
                total:0,
                IMGURL,
                flag:true
            }
        },
        components:{
            loading
        },
        methods:{
            initHomestay(){
                this.isShow=true;
                let params = Object.assign({},this.search,this.paginate)
                instance.get('/api/homestay',{
                    params
                }).then(res=>{
                    this.isShow=false;
                     if (res.data){
                         res.data.map(ele=>{
                             ele.stag=ele.stag.split(/,|，/);
                             ele.sthumb=IMGURL+ele.sthumb;
                             let date=new Date(ele.ctime*1000);
                             ele.ctime= [date.getFullYear(),date.getMonth()+1,date.getDate()]
                             return ele;
                         })
                         this.homestay=res.data;
                         this.total=res.total
                     }else {
                         this.$message.success("暂无数据")
                     }
                }).catch(error=>{
                    error
                })
                this.isShow=false
            },
            initCategory(){
                this.isShow=true
                categoryIndex().then(res=>{
                    this.categorys=res.data
                    this.isShow=false
                }).catch(error=>{
                    error
                })
            },
            handlerCurrentPageChange(val){
                this.paginate.page = val;
                this.initHomestay();
            },
            searchCategory(){
                this.isShow=true
                this.initHomestay()
            },
            handleDelete(id){
                let url='/api/homestay/'+id;
                instance.delete(url).then(res=>{
                    if(res.code == SUCCESS){
                        this.initHomestay()
                    }
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {
            this.initCategory()
            this.initHomestay()
        }
    }
</script>

<style scoped>
    .cell img{
        width: 100%;
    }
    .hidden3{
        display: flex;
        justify-content: center;
    }
</style>