<template>
    <div v-if="category">
        <el-form :model="category" :rules="categoryRules" ref="categoryform">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios";
    import {URL} from "../../../lib/base";
    import {categorySave} from "../../../http/category";

    export default {
        name: "categoryedit",
        data(){
            let validateCname=(rule,value,callback)=>{
                if (value === ''){
                    callback(new Error('分类名称不能为空'))
                }else if (!(/[\u4e00-\u9fa5]{2,6]/.test(value))){
                    callback(new Error('分类名称必须为2-6个汉字'))
                }else {
                    callback
                }
            }
            return {
                category:null,
                categoryRules:{
                    cname:[{validater:validateCname,trigger:'blur'}],
                    cdesc:[
                        {required:true,message:'请输入分类描述',trigger:'blur'},
                        {min:3,max:20,message: '长度在3-20个字符',trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.categoryform.validate(valid => {
                    if (valid) {
                        // let url = URL + '/admin/category/edit';
                        // eslint-disable-next-line no-unused-vars
                        let token = sessionStorage.getItem('token')
                        let result = Object.assign({},this.category)
                        categorySave(result).then(res=>{
                            this.$message(res.msg)
                        }).catch(error=>{
                            error
                        })
                        /*axios({
                            url,
                            method: 'get',
                            data: {category:this.category},
                            headers: {
                                token
                            }
                        }).then(res => {
                            if (res.status === 200 && res.data.code === SUCCESS) {
                                if (res.data.data) {
                                    this.$router.push({path: '/categoryindex'});
                                }
                            }
                        }).catch(() => {
                                this.$message.error("数据修改失败");
                            }
                        )*/
                    }
                })
            },
            initCategory(cid){
                let id = cid
                let url = URL +'/admin/category/read';
                let token = sessionStorage.getItem('token')
                axios({
                    method: 'GET',
                    url,
                    params:{id},
                    headers:{
                        token
                    }
                }).then((res)=>{
                    this.category = res.data.data[0];
                }).catch(()=>{

                })
            }
        },
        mounted() {
            let cid = this.$route.query.cid
            this.initCategory(cid)
        }
    }
</script>

<style scoped>

</style>