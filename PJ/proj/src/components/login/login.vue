<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="pass">
        <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="go">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
     
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm.pass);
        console.log(this.ruleForm.checkPass);

        if (valid) {
          this.$http({
            url: "http://localhost:8888/api/private/v1/login",
            method: "post",
            data: {
              username: this.ruleForm.pass,
              password: this.ruleForm.checkPass
            }
          }).then(res => {
            console.log(res);

            let { msg, status } = res.data.meta;
            if (status === 200) {
              window.localStorage.setItem("token", res.data.data.token);
              this.$message({
                showClose: true,
                message: msg,
                type: "success"
              });
              setTimeout(() => {
                this.$router.push("/home");
              }, 3000);
            } else {
              this.$message({
                showClose: true,
                message: msg,
                type: "error"
              });
            }
          });
        }else {
          this.$message({
            showClose: true,
            message: "用户名和密码不能为空",
            type: "error"
          });
          return false;
        }
      });
    
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.el-form {
  width: 580px;
  height: 440px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px;
  border-radius: 5px;
}
#go > .el-button--primary {
  width: 100%;
}
</style>
