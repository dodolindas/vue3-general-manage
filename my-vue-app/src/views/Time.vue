<template>
  <el-row class="home" :gutter="20">
    <el-col :span="24" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="current-time">
          <h2>当前时间</h2>
          <p>{{ formattedTime }} 北京时间</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const currentTime = ref("");
const formattedTime = ref("");

// 获取当前时间的函数
const fetchCurrentTime = async () => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/ip");
    currentTime.value = response.data.datetime;
    formatTime(currentTime.value);
  } catch (error) {
    console.error("Failed to fetch current time:", error);
  }
};

// 格式化时间的函数
const formatTime = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  formattedTime.value = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// 设置定时器每秒更新一次时间
let timer;
onMounted(() => {
  fetchCurrentTime(); // 初次获取时间
  timer = setInterval(fetchCurrentTime, 1000); // 每秒更新一次时间
});

onUnmounted(() => {
  clearInterval(timer); // 清除定时器以避免内存泄漏
});
</script>

<style scoped>
.current-time {
  text-align: center;
}

.current-time h2 {
  margin-bottom: 10px;
}

.current-time p {
  font-size: 18px;
  color: #333;
}
</style>
