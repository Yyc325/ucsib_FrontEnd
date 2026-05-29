import Axios from "@/utils/axios";
import {NoticeItem} from "@/apis/backstage/type";
/* 公告管理 */

/**
 * @description: 新增公告
 * @date: 2025/7/30
 * */

export const createNotice = (data:NoticeItem)=>{
    return Axios.request({
        url:'/api/admin_role/notices/add',
        method:"POST",
        data
    })
}

/**
 * @description: 查询公告
 * @date: 2025/7/30
 * */

export const queryNotice = (data:{phone:string,publisher:string})=>{
    return Axios.request({
        url:'/api/admin_role/notices/query',
        method:"POST",
        data
    })
}

/**
 * @description: 删除单个公告
 * @date: 2025/7/30
 * */

export const deleteNotice = (data:{id:string})=>{
    return Axios.request({
        url:'/api/admin_role/notices/delete',
        method:"POST",
        data
    })
}

/**
 * @description: 编辑公告
 * @date: 2025/7/30
 * */

export const updateNotice = (data:NoticeItem)=>{
    return Axios.request({
        url:'/api/admin_role/notices/update',
        method:"POST",
        data
    })
}

/**
 * @description: 撤销公告
 * @date: 2025/7/30
 * */

export const revokeNoticeById = (data: { id:string })=>{
    return Axios.request({
        url:'/api/admin_role/notices/withdraw',
        method:"POST",
        data
    })
}

/**
 * @description: 发布公告
 * @date: 2025/7/30
 * */

export const publishNoticeById = (data: { id:string })=>{
    return Axios.request({
        url:'/api/admin_role/notices/publish',
        method:"POST",
        data
    })
}

/**
 * @description: 根据
 * @date: 2025/7/30
 * */

export const queryNoticeByLocation = (data: { publish_location:string })=>{
    return Axios.request({
        url:'/api/admin_role/notices/published_by_location',
        method:"POST",
        data
    })
}