import Mock from "mockjs";
import homeApi from "@/api/mockData/home";
import userApi from "@/api/mockData/user";
//1.拦截路径
//2.方法
//3.制造假数据
Mock.mock(/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/home\/getChartData/, "get", homeApi.getChartData);
Mock.mock(/user\/getUserData/, "get", userApi.getUserList);
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser);
Mock.mock(/user\/addUser/, "post", userApi.createUser);
Mock.mock(/user\/editUser/, "post", userApi.updateUser);
