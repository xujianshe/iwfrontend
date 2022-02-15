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