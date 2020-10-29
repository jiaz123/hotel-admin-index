<template>
    <div>
        <loading :isshow="showLoading"></loading>
        <el-form :model="homestayform" ref="homestayform" v-if="homestayform">
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
                    <img v-if="homestayform.sthumb" :src="IMGURL+homestayform.sthumb" alt="avatar">
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
                        multiple
                        :limit="5"
                        :file-list="bannerFileList"
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
                <rich-text @rich-change="setSnotice" :menus="['head','bold','italic','underline']" :value="homestayform.sdetail" formfiled="sdetail"></rich-text>
            </el-form-item>
            <el-form-item label="入住须知">

            </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setSnotice" :menus="['head','bold','italic','underline']" :value="homestayform.snotice" formfiled="snotice"></rich-text>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="homestayEdit">提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogPreviewImg" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import loading from "../../../components/loading";
    import RichText from "../../../components/rich-text/RichText";
    import {IMGURL, SUCCESS, URL} from "../../../lib/base";
    import city from "../../../lib/city";
    import {categoryIndex} from "../../../http/category";
    import {homestayRead, homestayUpdate} from "../../../http/homestay";

    export default {
        name: "edit",
        components:{
            RichText,
            loading
        },
        data(){
            return{
                uploadurl:URL+'/admin/upload/index',
                IMGURL ,
                showLoading:false,
                categorys:[],
                homestayform:null,
                bannerArr:[],
                bannerFileList:[],
                province:[],
                city,
                dialogVisible:false,
                dialogPreviewImg:'',
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
            initHomestay(sid){
                homestayRead(sid).then(res=>{
                    this.homestayform=res.data
                    this.bannerArr=res.data.sbanner1
                    this.bannerFileList=res.data.sbanner1.map(ele=>({
                        name:res.data.sname,url:this.IMGURL+ele
                    }))
                }).catch(error=>{
                    console.log(error);
                })
            },
            initCategory(){
                this.showLoading=true;
                categoryIndex().then(res=>{
                    this.showLoading=false;
                    this.categorys =res.data;
                }).catch()
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
                let url=file.response ? file.response.imgpath : file.url
                this.bannerArr=this.bannerArr.filter(ele=> !url.includes(ele))
                this.homestayform.sbanner=this.bannerArr.join(',');
                console.log(this.homestayform.sbanner);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleBannerPreview(file){
                this.dialogVisible=true;
                let url
                if (file.response){
                    url=this.IMGURL+ file.response.imgpath;
                }else {
                    url=file.url
                }
                this.dialogPreviewImg=url;
            },
            //富文本
            setSnotice(field,html){
                this.homestayform[field]=html;
            },
            //省市县
            setProvince(){
                this.province=this.city.map(ele=>ele.name);
            },
            homestayEdit(){
                homestayUpdate(this.homestayform.sid,this.homestayform).then(res=>{
                    this.$message(res.msg)
                    this.$router.back()
                }).catch(error=>{
                    error
                })
            }
        },
        mounted() {
            let sid=this.$route.params.id;
            this.initHomestay(sid)
            this.setProvince();
            this.initCategory();
        }
    }
</script>

<style scoped>

</style>