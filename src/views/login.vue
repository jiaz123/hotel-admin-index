<template>
    <div class="login">
        <div class="login-content">
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" prop="name">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密 码" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL} from "../lib/base";

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    /*
                    *
                    * 同源
                    * 跨域
                    * 1.代理
                    * 2.服务器端
                    * 3.jsonp
                    * */
                    if (valid) {
                        axios.post(URL+'/admin/login/check',this.loginForm).then((res)=> {
                            if (res.status === 200 && res.data.code === 200){
                               sessionStorage.setItem('token',res.data.token);
                               let redirect = this.$route.query.redirect || 'index';
                               this.$router.push({name:redirect})
                           }else {
                               this.$message.error(res.data.msg);
                           }
                        }).catch(function (error) {
                                console.log(error);
                        })

                    }else {
                        console.log('error submit');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .login{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #42b983;
    }
    .login >.login-content{
        width: 500px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        padding: 20px;
        border-radius: 5px;
    }
</style>