<template>
    <div class="login">
        <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="uname">
                <el-input type="text" v-model="ruleForm2.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
                <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm2: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 18,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                        // ,{
                        //     pattren:/^\w{6,18}\w$ /,
                        //     message: '长度在 3 到 18 个字符0-9,a-z',
                        // }
                    ],
                    pass: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 18,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            login(){
                
                    this.$http.post(this.$api.login,this.ruleForm2).then(res=>{
                        if(res.data.status==0){
                            this.$alert('登录成功');
                            this.$router.push({name:'admin',path:'/admin'});
                        }else if(res.data.status==1){
                            this.$alert(res.data.message);
                        }
                    })
                },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        console.log('登录失败!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login {
        height: 250px;
        width: 400px;
        border: 1px solid #fff;
        border-radius: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
    }
</style>