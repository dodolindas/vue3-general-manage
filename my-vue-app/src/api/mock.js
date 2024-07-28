import Mock from "mockjs";
import homeApi from "@/api/mockData/home";
//1.拦截路径
//2.方法
//3.制造假数据
Mock.mock(/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/home\/getChartData/, "get", homeApi.getChartData);
