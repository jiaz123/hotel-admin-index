<template>
    <el-container class="main-box">
        <el-header>
            <div><img src="" alt=""></div>
            <div class="nav">
                <el-menu mode="horizontal">
                    <el-menu-item index="1">指南</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            admin
                        </template>
                        <router-link to="/Useredit"><el-menu-item index="2-1">修改密码</el-menu-item></router-link>
                        <router-link to="/login"><el-menu-item index="2-2">退出登录</el-menu-item></router-link>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
        <el-container style="background: #545c64">
            <el-row class="tac">
                <el-col :span="12">
                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-s-grid"></i>
                                <span>分类管理</span>
                            </template>
                            <router-link to="/categoryadd">
                            <el-menu-item>
                                <i class="el-icon-folder-add"></i>
                                分类添加
                            </el-menu-item>
                            </router-link>
                            <router-link :to="{path:'./categoryindex'}">
                                <el-menu-item>
                                    <i class="el-icon-folder-opened"></i>
                                    分类查看
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-grid"></i>
                                <span>民宿管理</span>
                            </template>
                            <router-link to="/homestayadd">
                            <el-menu-item>
                                <i class="el-icon-folder-add"></i>
                                民宿添加
                            </el-menu-item>
                            </router-link>
                            <router-link :to="{path:'/homestayindex'}">
                                <el-menu-item>
                                    <i class="el-icon-folder-opened"></i>
                                    民宿查看
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        name: "Main",
        methods: {
            // eslint-disable-next-line no-unused-vars
            handleOpen(key, keyPath) {
            },
            // eslint-disable-next-line no-unused-vars
            handleClose(key, keyPath) {
            }
        }
    }
</script>
<style scoped>
    .main-box{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

    }
    .el-header{
         display: flex;
         justify-content: space-between;
         background-color: #B3C0D1;
         color: #333;
     }
    .el-header .nav{
        width: 200px;
        height: 100%;
        background: red;

    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
</style>
