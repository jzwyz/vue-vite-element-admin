<template>
    <div class="login">
        <h2 class="title">{{$t('views.login.page_title')}}</h2>
        <el-form ref="formRef" :model="userInfo" class="login-form" size="large">
            <el-form-item prop="username" :rules="[
                {
                    required: true,
                    message: $t('views.login.username_error'),
                    trigger: 'blur',
                }
            ]">
                <el-input :prefix-icon="User" v-model="userInfo.username" />
            </el-form-item>
            <el-form-item prop="password" :rules="{
                required: true,
                message: $t('views.login.password_error'),
                trigger: 'blur',
            }">
                <el-input :prefix-icon="Lock" v-model="userInfo.password" :type="passwdHide ? 'password' : 'text'">
                    <template #suffix>
                        <el-icon @click="handlePasswdHide">
                            <Hide v-if="passwdHide" />
                            <View v-else />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submitForm(formRef)" :loading="loading">
                    {{$t('views.login.login_btn')}}
                </el-button>
            </el-form-item>
            <el-form-item>
                <LayoutHeaderLocale />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import LayoutHeaderLocale from '@/components/layout/LayoutHeaderLocale.vue'
import { useI18n } from 'vue-i18n';

interface UserInfo {
    username: string;
    password: string;
}

const passwdHide = ref(true)
const handlePasswdHide = () => {
    passwdHide.value = !passwdHide.value;
}

const formRef = ref<FormInstance>()
const userInfo = reactive<UserInfo>({
    username: 'admin',
    password: 'admin'
})

const {t} = useI18n()

const router = useRouter()
const loading = ref(false)
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
        if (valid) {
            loading.value = true
            setTimeout(() => {
                ElMessage.success(t('views.login.login_success'))

                setTimeout(() => {
                    router.push('/system')
                    loading.value = false
                }, 1000)
            }, 2000)
        } else {
            ElMessage.error(t('views.login.login_error'))
            loading.value = false
            return false
        }
    })
}

</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    background-color: #59687C;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
        color: #fff;
        margin-bottom: 10px;
    }

    .login-form {
        width: 20vw;
    }
}
</style>