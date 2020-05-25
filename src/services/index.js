import axios from 'axios'

// 用于全局处理错误信息，给出提示
import { message } from 'antd';

// webpack 里面帮我们做了一个ENV
const isDev = process.env.NODE_ENV === 'development';

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/254760': ''  // 这里就是根据环境来选择不同的URL
});

// 拦截器，对请求进行拦截，拦截后可以做一些其他工作，然后再送到后端
service.interceptors.request.use((config) => {
    // 设置config.data， Object.assign 就是把第二个和第三个参数作为数据源，赋值给第一个
    // 第二个参数写config.data，这是它自己的我们要拿过来，因为我们是要给config.data重新赋值
    // 第三个参数是我们要增加的
    config.data = Object.assign({}, config.data, {
        // token: window.localStorage.getItem('token')
        token: 'LALL0DbMUwgZr8AJIC3DQH0NysvNjxTE'
    });
    // 如果每个请求都需要带token，那么就可以在config里面加
    return config
});

// 拦截器，对响应做拦截，拦截后可以做一些其他工作，然后再送到页面
service.interceptors.response.use((resp) => {
    // 这个resp就是后端响应的整体数据，如果是JSON格式，那么通过 . 来获取数据中键的值
    // 这里具体要怎么取值，还要看后端返回的是什么。resp.data就代表的是后端返回的整体数据
    if(resp.data.code === 200){
        return resp.data.data
    }else{
        message.error(resp.data.errMsg);
    }
});

// 调用AJAX，别的代码调用这个方法。 offset 分页内容，从第一页开始先后偏移多少，0则表示就是第一页  limit 每页显示多少
export const getArticles = (offset = 0 , limit =10) => {
    return  service.post('/api/v1/articlList', {
        offset,
        limit
    })
};