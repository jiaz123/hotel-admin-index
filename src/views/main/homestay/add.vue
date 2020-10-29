<template>
    <div>
        <loading :isshow="showLoading"></loading>
        <el-form :model="homestayform" ref="homestayform">
            <el-form-item label="所属分类">
                <el-select v-model="homestayform.cid" placeholder="请选择">
                    <el-option
                            v-for="item in categorys"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="homestayform.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿描述">
                <el-input type="textarea" v-model="homestayform.sdesc"></el-input>
            </el-form-item>
            <el-form-item label="民宿标签">
                <el-input v-model="homestayform.stag"></el-input>
            </el-form-item>
            <el-form-item label="民宿评分">
                <el-input v-model="homestayform.sscore"></el-input>
            </el-form-item>
            <el-form-item label="民宿价格">
                <el-input v-model="homestayform.sprice"></el-input>
            </el-form-item>
            <el-form-item label="民宿省份" v-if="province.length">
                <el-select v-model="homestayform.sprovince">
                    <el-option v-for="(item,index) in province" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿城市" v-if="cityList.length">
                <el-select v-model="homestayform.scity">
                    <el-option v-for="(item,index) in cityList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿区域" v-if="areaList.length">
                <el-select v-model="homestayform.sarea">
                    <el-option v-for="(item,index) in areaList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿地址">
                <el-input v-model="homestayform.saddress"></el-input>
            </el-form-item>
            <el-form-item label="民宿缩略图">
            </el-form-item>
            <el-form-item>
                    <el-upload
                            class="avatar-uploader"
                            :action="uploadurl"
                            :show-file-list="false"
                            :on-success="handleThumbSuccess"
                            :before-upload="handleThumbBeforeupload"
                           >
                        <img v-if="homestayform.sthumb" :src="imgurl+homestayform.sthumb" alt="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb，最佳比例1：1</div>
                    </el-upload>
            </el-form-item>
            <el-form-item label="民宿轮播图">

            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        :show-file-list="true"
                        :on-exceed="handleExceed"
                        :on-success="handleBannerSuccess"
                        :limit="5"
                        :on-remove="handleBannerRemove"
                        :on-preview="handleBannerPreview"
                >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb，最佳比例1：1,最多只能上传5张</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿详情">

            </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setSnotice" :menus="['head','bold','italic','underline']" value="" formfiled="sdetail"></rich-text>
            </el-form-item>
            <el-form-item label="入住须知">

            </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setSnotice" :menus="['head','bold','italic','underline']" value="" formfiled="snotice"></rich-text>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="homeadd">提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogPreviewImg" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {SUCCESS, URL,IMGURL} from "../../../lib/base";
    import loading from "../../../components/loading";
    import RichText from "../../../components/rich-text/RichText";
    import city from "../../../lib/city"
    import {categoryIndex} from "../../../http/category";
    // import {homestaySave} from "../../../http/homestay";
import instance from "../../../http/http";
    export default {
        name: "add",
        components:{
            loading,
            RichText
        },
        data(){
            return{
                uploadurl:URL+'/admin/upload/index',
                imgurl :IMGURL ,
                showLoading:false,
                categorys:[],
                homestayform:{
                    sname:'',
                    sdesc:'',
                    sthumb:'',
                    sprice:'',
                    sprovince:'',
                    scity:'',
                    sarea:'',
                    saddress:'',
                    stag:'',
                    sbanner:'',
                    sscore:'',
                    sdetail:'',
                    snotice:'',
                    cid:''
                },
                bannerArr:[],
                province:[],
                city,
                dialogVisible:false,
                dialogPreviewImg:''
            }
        },
        computed:{
            cityList(){
                let cityList=[]
                let current = this.city.find(ele=>ele.name === this.homestayform.sprovince);
                if (current){
                    cityList=current.city.map(ele=>ele.name);
                }
                return cityList
            },
            areaList(){
                let areaList=[]
                let current = this.city.find(ele=>ele.name === this.homestayform.sprovince);
                if (current){
                    let citydetail=current.city.map(ele=>ele);
                    let result = citydetail.find(ele=>ele.name === this.homestayform.scity);
                    if (result){
                        areaList=result.area;
                    }
                }
                return areaList
            }
        },
        methods:{
            initCategory(){
                this.showLoading=true;
                categoryIndex().then(res=>{
                    this.showLoading=false;
                    this.categorys =res.data;
                }).catch()
                /*instance('/admin/category/indexall').then(res=>{
                    this.showLoading=false;
                    if (res.code === SUCCESS){
                        this.categorys =res.data;
                    }
                }).catch(()=>{

                })*/
            },
            // 缩略图上传成功
            handleThumbSuccess(res){
                if(res.code === SUCCESS){
                    this.homestayform.sthumb = res.imgpath;
                }
            },
            handleThumbBeforeupload(file){
                let{size,type}=file;
                let uploadMaxSize = 200*1024;
                let uploadType = ['image/jpg','image/png','image/jpeg','image/webp'];
                let sizeFlag = true,typeFlag = true;
                sizeFlag = size<uploadMaxSize;
                typeFlag = uploadType.some(ele=>ele==type);
                if(!typeFlag){
                    this.$message.error('上传头像图片只能是JPG，PNG，WEBP格式')
                }
                if (!sizeFlag){
                    this.$message.error('上传头像图片大小不能超过200kb');
                }
            },
            //轮播图
            handleBannerSuccess(res){
                this.bannerArr.push(res.imgpath);
                this.homestayform.sbanner=this.bannerArr.join(',');
            },
            handleBannerRemove(file){
                let url=file.response.imgpath
                this.bannerArr=this.bannerArr.filter(ele=>ele!=url)
                this.homestayform.sbanner=this.bannerArr.join(',');
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleBannerPreview(file){
                let url=this.imgurl+ file.response.imgpath;
                this.dialogPreviewImg=url;
                this.dialogVisible=true;
            },
            //富文本
            setSnotice(field,html){
                this.homestayform[field]=html;
            },
            //省市县
            setProvince(){
                this.province=this.city.map(ele=>ele.name);
            },
            homeadd(){
                let data=this.homestayform
                instance.post('/api/homestay',data).then(res=>{
                    if(res.status===200 && res.code===SUCCESS){
                        if(res.data){
                            this.$message.success(res.msg)

                        }
                    }
                }).catch(res=>{
                        this.$message.error(res.msg)
                    }
                )
            }
        },
        mounted() {
            this.setProvince();
            this.initCategory();
        }
    }
</script>

<style>
    .el-icon-plus.avatar-uploader-icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>