<template>
    <div>
        <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input v-model="editForm.oldpassword" placeholder="旧密码"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newpassword">
                <el-input  v-model="editForm.newpassword" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkpassword">
                <el-input v-model="editForm.checkpassword" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('editForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {SUCCESS,URL} from "../../../lib/base";

    export default {
        name: "Useredit",

        data() {
            var newPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.editForm.newpassword !== '') {
                        this.$refs.editForm.validateField('checkpassword');
                    }
                    callback();
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editForm.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                editForm: {
                    oldpassword: '',
                    newpassword: '',
                    checkpassword: ''
                },
                rules: {
                    oldpassword: [
                        {required: true, message: '请输入旧密码', trigger: 'change'},
                    ],
                    newpassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {pattern: /^(?=.*[a-zA-Z])(?=.*\d)[\w\d]{6,20}$/, message: '新密码由数字和字母组成', trigger: 'blur'},
                        { validator: newPassword, trigger: 'blur' }
                    ],
                    checkpassword: [
                        {required: true, message: '请再次输入新密码', trigger: 'blur'},
                        { validator: checkPassword, trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //连接后台接口,检查旧密码，修改新密码
                        let url = URL+"/admin/user/edit";
                        let token = sessionStorage.getItem('token')

                        let oldpassword = this.editForm.oldpassword;
                        let newpassword = this.editForm.newpassword;

                        axios({
                            method:'POST',
                            url,
                            headers:{
                                token
                            },
                            data:{oldpassword,newpassword},
                        }).then(res=>{
                            if(res.status===200 && res.data.code===SUCCESS){
                                if(res.data.data){
                                    this.$router.push({path:'/login'});
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                            }
                        }).catch(res=>{
                            this.$message.error(res.data.msg)
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }



</script>

<style scoped>

</style>