<template>
    <div>
        <div class="main-top">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>产品分类</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="内容标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <el-option v-for='item in categories' :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span v-if="item.class_layer!=1"> |-</span>
                        <span>{{ item.title}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布" prop="status">
                <el-switch v-model="ruleForm.status" active-text="是" inactive-text="否">
                </el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="ruleForm.is_slide" active-text="轮播图" inactive-text="不轮播图"></el-switch>
                <el-switch v-model="ruleForm.is_top" active-text="置顶" inactive-text="不置顶"></el-switch>
                <el-switch v-model="ruleForm.is_hop" active-text="推荐" inactive-text="不推荐"></el-switch>
            </el-form-item>
            <!-- :on-preview="handlePreview" 
            :on-remove="handleRemove" -->
            <!-- 上传图片 -->
            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                :on-success="onChangeImg" :on-remove="handleRemove">
                上传封面
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :on-success="onChangefileList" :on-remove="removeFileList"
                :file-list="ruleForm.fileList">
                上传附件
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-form-item label="商品货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="ruleForm.content" ref="myQuillEditor">
                </quill-editor>
                <!-- <el-input type="textarea" v-model="ruleForm.content"></el-input> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {
        quillEditor
    } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                id: '',
                ruleForm: {
                    title: '',
                    sub_title: '',
                    is_hot: '',
                    is_top: '',
                    is_slide: '',
                    status: '',
                    zhaiyao: '',
                    content: '',
                    market_price: '',
                    sell_price: '',
                    stock_quantity: '',
                    goods_no: '',
                    fileList: [],
                    imgList: [],
                    category_id: 0
                },
                categories: [],
                rules: {
                    title: [{
                            required: true,
                            message: '请输入内容标题名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 300,
                            message: '长度在 1 到 300 个字符',
                            trigger: 'blur'
                        }
                    ],
                    sub_title: [{
                            required: true,
                            message: '请输入内容副标题名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 300,
                            message: '长度在 1 到 300 个字符',
                            trigger: 'blur'
                        }
                    ],
                    category_id: [{
                        required: true,
                        message: '请选择所属分类',
                        trigger: 'change'
                    }],
                    market_price: [{
                            required: true,
                            message: '请输入市场价格',
                            trigger: 'blur'
                        },
                        {
                            type: 'number',
                            message: '价格必须为数字值'
                        }
                    ],
                    sell_price: [{
                            required: true,
                            message: '请输入销售价格',
                            trigger: 'blur'
                        },
                        {
                            type: 'number',
                            message: '销售价格必须为数字值'
                        }
                    ],
                    stock_quantity: [{
                            required: true,
                            message: '请输入销售价格',
                            trigger: 'blur'
                        },
                        {
                            type: 'number',
                            message: '销售价格必须为数字值'
                        }
                    ],
                    goods_no: [{
                        required: true,
                        message: '商品货号',
                        trigger: 'blur'
                    }],
                    zhaiyao: [{
                        required: true,
                        message: '内容摘要',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: true,
                        message: '内容摘要',
                        trigger: 'blur'
                    }]

                },
                fileList2: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                fileList3: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }]
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editGoods();
                    } else {
                        this.$alert('请完成填写必填项');
                        return false;
                    }
                });
            },
            editGoods() {
                this.$http.post(this.$api.gsEdit + this.id, this.ruleForm).then(res => {
                    console.log(res);
                    if (res.data.status == 0) {
                        this.$alert('编辑成功');
                        this.$router.push({
                            name: 'GoodsCategoryList'
                        });
                    } else {
                        this.$alert('编辑失败');
                    }

                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                console.log("re");
            },
            onChangeImg(res, file, fileList) {
                console.log("onChangeImg");
                console.log(res);
                res.shorturl = "/" + res.shorturl;
                this.ruleForm.imgList = [];
                this.ruleForm.imgList.push(res);
                console.log(this.imgList);
            },
            onChangefileList(res, file, fileList) {
                this.ruleForm.fileList.push(res);
            },
            removeFileList(file, fileList) {
                // console.log(file);
                // let removeUrl=file.url;
                this.ruleForm.fileList = this.ruleForm.fileList.filter(item => item.url != file.url);
                console.log(this.ruleForm.fileList);
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.$http.get(this.$api.gsDetail + this.id).then(res => {
                this.ruleForm = res.data.message;
                this.ruleForm.category_id = parseInt(this.ruleForm.category_id);
                // this.fileList2=res.data.message.imgList;
                // console.log(res);
            })
            this.$http.get(this.$api.ctList + 'goods').then(res => {
                console.log(res);
                this.categories = res.data.message;
            })
        }

    }
</script>

<style scoped>
       .main-top{
        margin:20px;

        /* font-size: 40px; */
        .el-breadcrumb {
            font-size: 20px;
        }
    }
</style>