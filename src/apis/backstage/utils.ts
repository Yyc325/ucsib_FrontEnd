/**
 * @description: 文件上传
 * */
import Axios from "@/utils/axios";
import {ContentTypeEnum} from "@/utils/axios/types";


export const uploadFile = (data:FormData)=>{
    return Axios.request({
        headers:{
            "Content-Type":ContentTypeEnum.FORM_DATA
        },
        url:'/api/admin_role/upload_file',
        method:'post',
        data
    })
}