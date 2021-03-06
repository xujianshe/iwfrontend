/**
 * 资源列表(左侧菜单)
 * @returns 
 */
export function resourceList()
{
    return [
        {resourceId:'1',resourceName:'test1',resourcePath:'',children:[
          {resourceId:'1-1',resourceName:'test1-1',resourcePath:''},
          {resourceId:'1-2',resourceName:'test1-2',resourcePath:''},
          {resourceId:'1-3',resourceName:'test1-3',resourcePath:''}
        ]},
        {resourceId:'2',resourceName:'test2',resourcePath:'',children:[
          {resourceId:'2-1',resourceName:'test2-1',resourcePath:''},
          {resourceId:'2-2',resourceName:'test2-2',resourcePath:''},
          {resourceId:'2-3',resourceName:'test2-3',resourcePath:''}
        ]}
     ]
 
}
/**
 * 角色列表：
 * {
 * tag:'角色标识',
 * roleTempletName:'角色名称',
 * permissions:[{resourceId:'',resourceName:'',resourcePath:'',}]
 * }
 * @param {roleTempletName 模糊查询()}    
 * @returns 
 */
export function roleList(roleTempletName){
    return [{roleId:1,tag:'1',roleTempletName:'testRole1',permissions:[
          {resourceId:'1-1',resourceName:'test1-1',resourcePath:''},
          {resourceId:'1-2',resourceName:'test1-2',resourcePath:''},
          {resourceId:'1-3',resourceName:'test1-3',resourcePath:''},
          {resourceId:'2-1',resourceName:'test2-1',resourcePath:''},
          {resourceId:'2-2',resourceName:'test2-2',resourcePath:''},
          {resourceId:'2-3',resourceName:'test2-3',resourcePath:''}
        ]
     },
     {roleId:1,tag:'21',roleTempletName:'testRole2',permissions:[
          {resourceId:'2-1',resourceName:'test2-1',resourcePath:''},
          {resourceId:'2-2',resourceName:'test2-2',resourcePath:''},
          {resourceId:'2-3',resourceName:'test2-3',resourcePath:''}
     ]}
    ]
}
/**
 * 新增角色
 * @param {*} roleInfo 
 * roleInfo={
 * tag:'角色标识',
 * roleTempletName:'角色名称',
 * permissions:[{resourceId:'',resourceName:'',resourcePath:''}]
 * }
 */
export function addRole(roleInfo){

}
/**
 * 编辑角色
 * @param {*} roleInfo 
 * roleInfo={
 * roleId:'',
 * tag:'角色标识',
 * roleTempletName:'角色名称',
 * permissions:[{resourceId:'',resourceName:'',resourcePath:''}]
 * }
 */
export function updateRole(roleInfo){

}
////////////////////////////组织结构接口/////////////////////////////////////////////
/**
 * 获取组织结构列表
 * @param {*} orgName-可以按照orgName模糊查询
 */
export function orgsList(orgName){
 return[{orgId:1,orgName:"检验组",roles:[{roleId:'1',roleTempletName:'主任'}]},
 {orgId:2,orgName:"免疫组",roles:[{roleId:'1',roleTempletName:'主任'}]},
 {orgId:3,orgName:"微生物",roles:[{roleId:'2',roleTempletName:'组长'}]},
 {orgId:4,orgName:"PCR室",roles:[ {roleId:'2',roleTempletName:'组长'},{roleId:'3',roleTempletName:'组员'}]}
]
}
/**
 * 获取所有角色列表 {roleId:'1',roleTempletName:'主任'}
 */
export function getAllRoles(){
    return [ {roleId:'1',roleTempletName:'主任'},{roleId:'2',roleTempletName:'组长'},{roleId:'3',roleTempletName:'组员'}]
}

/**
 * 新增组织机构
 * org:{orgName:'111',roles:[{roleId:'1',roleTempletName:'主任'}]}
 * * @param {*} org
 */
export function addOrg(org){

}
/**
 * 更新组织机构
 * org:{orgName:'11',roles:[{roleId:'1',roleTempletName:'主任'}],orgId:1}
 * * @param {*} org
 */
export function updateOrg(org){

}
////////////////////////////////用户管理模块/////////////////////////////////////////////
/**
 * 获取用户列表(可接受用户名称模糊查询)
 * @param {*} userName
 */
export function userList(userName){
  return[{userId:1,userName:'test1',nickName:'test1',status:0,orgId:1,orgName:'检验组',telphone:'',email:'',userRoles:[{roleId:'1-1',roleName:'检验组-组长'}]},
  {userId:2,userName:'test2',nickName:'test2',status:0,orgId:1,orgName:'检验组',telphone:'',email:'',userRoles:[{roleId:'2-1',roleName:'微生物组-组长'},{roleId:'2-2',roleName:'微生物组-组员'}]},
  {userId:3,userName:'test3',nickName:'test3',status:0,orgId:1,orgName:'检验组',telphone:'',email:'',userRoles:[{roleId:'2-2',roleName:'微生物组-组员'}]},
  {userId:4,userName:'test4',nickName:'test4',status:0,orgId:1,orgName:'检验组',telphone:'',email:'',userRoles:[{roleId:'2-2',roleName:'微生物组-组员'}]}
];
}
export function getAllUserRoles(){
  return [{roleId:'1-1',roleName:'检验组-组长'},{roleId:'1-2',roleName:'检验组-组员'},
          {roleId:'2-1',roleName:'微生物组-组长'},{roleId:'2-2',roleName:'微生物组-组员'}]
}
/**
 * 更新密码
 * @param {*} obj ={userName:'',oldPassword:'',password:'',confirmPassword:''}
 */
export function updatePwd(obj){

}
/**
 * 注销用户
 * @param {*} userName(需要注销的用户名)
 */
export function cancelUser(userName){

}
/**
 *  添加新用户
 *@param {*} obj ={userId:-1,userName:'',nickName:'',telphone:'',email:'',orgId:'',orgName:'',userRoles:[{roleId:'',roleName:''}]};
 */
export function addUser(obj){

}
/**
 *  编辑新用户
 * @param {*} obj ={userId:-1,userName:'',nickName:'',telphone:'',email:'',orgId:'',orgName:'',userRoles:[{roleId:'',roleName:''}]};
 */
 export function updateUser(obj){

}