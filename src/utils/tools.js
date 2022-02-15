/**
 * Created by yinju on 2017/3/13.
 */
 import router from "../router/router";

 /**
  * 格式化时间
  * @param row 当前行
  * @param column 列
  */
 Date.prototype.format = function (fmt) {
   var o = {
     "M+": this.getMonth() + 1,                 //月份
     "d+": this.getDate(),                    //日
     "h+": this.getHours(),                   //小时
     "m+": this.getMinutes(),                 //分
     "s+": this.getSeconds(),                 //秒
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
     "S": this.getMilliseconds()             //毫秒
   };
   if (/(y+)/.test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   }
   for (var k in o) {
     if (new RegExp("(" + k + ")").test(fmt)) {
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
     }
   }
   return fmt;
 };
 
 /**
  * 判断是否
  * @date 2018-11-15 17:19:39
  */
 export const enabledRenderForAG = (value) => {
   if (value === "" || value === undefined) {
     return "";
   }
   return value ? '是' : '否';
 }
 
 /**
  * 格式化时间 （时分秒）
  * @param date
  */
 export const formatterDate = (date) => {
   date = parseInt(date);
   if (date) {
     let time = new Date(date);
     return time.format("yyyy-MM-dd hh:mm:ss");
   }
   return "";
 };
 /**
  * 格式化时间 （年月日）
  * @param date
  */
 export const formatterDateDay = (date) => {
   date = parseInt(date);
   if (date) {
     let time = new Date(date);
     return time.format("yyyy-MM-dd");
   }
   return "";
 };
 
 
 /**
  * 格式化时间
  * @param date
  * @param match
  */
 export const formatterDateMatch = (date, match) => {
   if (date) {
     let time = new Date(date);
     return time.format(match);
   }
   return "";
 };
 
 /**
  * 判断对象中的属性是否有存在null或者空的（集合判断是否length===0）
  * @param object 对象
  * @returns {boolean}
  */
 export const isNullOrEmpty = (object) => {
   if (object) {
     for (var key in object) {
       if (!object[key] || object[key].length === 0) {
         return true;
       }
     }
   } else {
     return true;
   }
   return false;
 };
 
 export const clearNull = (object) => {
   if (object) {
     for (let key in object) {
       if (!object[key] || object[key].length === 0) {
         return null;
       }
     }
   }
   return null;
 }
 
 /**
  * 去除字符串所有空格
  * @param str 字符串
  * @return {*}
  */
 export const removeAllSpace = (str) => {
   if(str)
     return str.replace(/\s+/g, "");
 };
 
 /**
  * 字符是否为null 或者 空字符串
  * @param str 字符串
  * @return {*}
  */
 export const isNullOrEmptyByStr = (str) => {
   return !removeAllSpace(str);
 };
 
 /**
  * 判断对象中的属性是否有全部是null或者空的（集合判断是否length===0）
  * @param object 对象
  * @returns {boolean}
  */
 export const isAllNullOrEmpty = (object) => {
   if (object) {
     for (var key in object) {
       if (object[key] || object[key].length > 0) {
         return false;
       }
     }
   } else {
     return true;
   }
   return true;
 };
 
 /**
  * 删除对象中的属性存在null或者空的（
  * @param object 对象
  * @returns {boolean}
  */
 export const delNullOrEmpty = (object) => {
   if (object) {
     for (var key in object) {
       if (!object[key] && object[key] !== false && object[key] !== 0) {
         delete object[key];
       }
     }
   }
 };
 
 
 /**
  * 清理树形结构中的空子集
  * @param tree
  */
 export const clearTreeNullChildren = (tree) => {
   for (let item of tree) {
     if (item.children && item.children.length > 0) {
       clearTreeNullChildren(item.children);
     } else {
       delete item.children;
     }
   }
 };
 
 /**
  * 寻找树path
  * @param tree
  */
 export const findTreePathAs = (id, tree, queryName = "resourceId") => {
   let a = {};
 
   function execute(id, tree) {
     for (let item of tree) {
       if (item[queryName] == id) {
         a = item;
         console.log(a);
       } else {
         if (item.children) {
           execute(id, item.children);
         }
       }
     }
   }
 
   execute(id, tree);
   return a;
 };
 
 /**
  * 路径拆分 如 /1/2/3 拆成  ["/1","/1/2","/1/2/3"]
  * @param path
  * @param 连接符
  */
 export const pathSplit = (path, connector = "/") => {
   if (path) {
     let resultList = [];
     let pathIds = path.split("/");
     for (let item of pathIds) {
       if (item) {
         let temp = resultList.length > 0 ? resultList[resultList.length - 1] : "";
         temp += connector + item;
         resultList.push(temp);
       }
     }
     return resultList;
   }
   return "";
 };
 
 /**
  * 文件大小显示
  * @param bSize
  */
 export const showFileSize = (bSize) => {
   if (bSize) {
     console.log((bSize / (1024 * 1024)));
     if ((bSize / (1024 * 1024)) > 1) {
       return {size: (bSize / (1024 * 1024)).toFixed(2), unit: "m"};
     } else {
       return {size: parseInt((bSize / 1024)), unit: "k"};
     }
   }
   return {size: 0, unit: "k"};
 };
 
 
 /**
  * 去除字符串左右空格
  * @param str
  */
 export const trim = (str) => {
   return str.replace(/(^\s*)|(\s*$)/g, "");
 };
 
 /**
  * 分页参数初始化
  */
 export const pageObjInit = () => {
   return {pageSize: 20, totalCount: 0, pageIndex: 0};
 };
 
 /**
  * 生成参数
  * @param bizParameter 业务参数
  * @param pageObj 分页对象（可为空）
  */
 export const generateParameter = (bizParameter, pageObj) => {
   let parameter = JSON.parse(JSON.stringify(bizParameter));
   delNullOrEmpty(parameter);
   if (pageObj) {
     parameter.pageIndex = pageObj.pageIndex;
     parameter.pageSize = pageObj.pageSize;
   }
   //默认修改时间为当前时间
   if (parameter.updateTime) {
     parameter.updateTime = new Date();
   }
   return parameter;
 };
 
 
 /**
  * 树节点状态 open展开，colse为关闭
  * @type {{open: string, close: string}}
  */
 export const treeState = {open: "open", close: "close"};
 
 /**
  * 平铺树结构
  * @param tree 树
  * @param defaultState 树节点默认状态
  */
 export const flatteningTree = (tree, defaultState) => {
   let data = [];
   if (tree) {
     let exec = (tree, defaultState, level, seq) => {
       level++;
       let i = 1;
       for (let item of tree) {
         // 1.设置默认状态
         item.state = (defaultState || level === 0) ? treeState.open : treeState.close;
         // 2.设置层级关系
         item.level = level;
         item.seq = level === 0 ? i : seq + '-' + i;
         // if(item.level!=0){
         //   data.push(item);
         // }
         data.push(item);
         i++;
         if (item.children && item.children.length > 0) {
           exec(item.children, defaultState, level, item.seq);
         }
       }
     };
     exec(tree, defaultState, -1, "");
   }
   return data;
 };
 
 
 /**
  * 给数字加逗号
  * @param num
  * @returns {string}
  */
 export const addCommas = num => {
   let string = num + '';//将数字转换成字符串形式
   if (string.length <= 3) {
     return returnFloat(num);
   }
   return returnFloat(num).toLocaleString();
 };
 
 function returnFloat(val) {
   let value = Math.round(parseFloat(val) * 100) / 100;
   let xsd = value.toString().split(".");
   if (xsd.length === 1) {
     value = value.toString() + ".00";
     return value;
   }
   if (xsd.length > 1) {
     if (xsd[1].length < 2) {
       value = value.toString() + "0";
     }
     return value;
   }
 }
 
 
 const regNumber = /\d+$/gi;
 const regString = /^[a-z|A-Z]+/gi;
 const regZore = /\b(0+)/gi;
 
 /**
  * 获取字符中的数字
  * @param str 字符
  */
 export const getNumber = str => {
   if (str) {
     let number = (str + "").match(regNumber);
     return number ? number[0] : null;
   }
   return str;
 };
 
 /**
  * 获取字符中的字母
  * @param str 字符
  */
 export const getAlphabet = str => {
   if (str) {
     let alphabet = (str + "").match(regString);
     return alphabet ? alphabet[0] : "";
   }
   return str;
 };
 
 /**
  * 获取字符前面的0
  * @param str 字符
  */
 export const getBeforeZero = str => {
   if (str) {
     let zero = (str + "").match(regZore);
     return zero ? zero[0] : "";
   }
   return str;
 };
 
 

 /**
  * 获取属性值 （根据其他属性）
  * @param objectArray 对象
  * @param propertyName 属性名
  * @param queryName 查询的属性名
  * @param queryValue 查询的属性值
  */
 export const getPropertyValue = (objectArray, queryValue, propertyName = "name", queryName = "status") => {
   for (let item of objectArray) {
     if (item[queryName] === queryValue) {
       return item[propertyName];
     }
   }
   return "未知";
 };
 
 export const getPageSize = (key) => {
   let pageSize = localStorage.getItem(key);
   return pageSize ? parseInt(pageSize) : 30;
 };
 
 export const rePage = (pageObj, newPageObj) => {
   pageObj.pageIndex = newPageObj.pageIndex;
   pageObj.pageSize = newPageObj.pageSize;
   pageObj.totalCount = newPageObj.totalCount;
 };
 
 /**
  * 获取当前登录用户信息
  */
 export const getCurrentLoginUserInfo = () => {
   let user = sessionStorage.getItem('User');
   if (user) {
     return JSON.parse(user);
   }
   return {};
 };
 
 
 /**
  * HSL颜色值转换为RGB
  * H，S，L 设定在 [0, 1] 之间
  * R，G，B 返回在 [0, 255] 之间
  *
  * @param H 色相
  * @param S 饱和度
  * @param L 亮度
  * @returns Array RGB色值
  */
 const hslToRgb = (H, S, L) => {
   let R, G, B;
   if (+S === 0) {
     R = G = B = L; // 饱和度为0 为灰色
   } else {
     let hue2Rgb = function (p, q, t) {
       if (t < 0) t += 1;
       if (t > 1) t -= 1;
       if (t < 1 / 6) return p + (q - p) * 6 * t;
       if (t < 1 / 2) return q;
       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
       return p;
     };
     let Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
     let P = 2 * L - Q;
     R = hue2Rgb(P, Q, H + 1 / 3);
     G = hue2Rgb(P, Q, H);
     B = hue2Rgb(P, Q, H - 1 / 3);
   }
   return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
 };
 
 // 获取随机HSL
 const randomHsl = () => {
   let H = Math.random();
   let S = Math.random();
   let L = Math.random();
   return [H, S, L];
 };
 
 // 获取HSL数组
 const getHslArray = (size) => {
   let HSL = [];
   let hslLength = size; // 获取数量
   for (let i = 0; i < hslLength; i++) {
     let ret = randomHsl();
     // 颜色相邻颜色差异须大于 0.25
     if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
       i--;
       continue; // 重新获取随机色
     }
     ret[1] = 0.7 + (ret[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
     ret[2] = 0.4 + (ret[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色
     // 数据转化到小数点后两位
     ret = ret.map(function (item) {
       return parseFloat(item.toFixed(2));
     });
 
     HSL.push(ret);
   }
   return HSL;
 };
 
 /**
  * 生成随机颜色
  * @param size
  * @returns {Array}
  */
 export const getRandColor = (size = 1) => {
   let colors = [];
   let hsls = getHslArray(size);
   for (let item of hsls) {
     colors.push(`rgb(${hslToRgb(item[0], item[1], item[2])})`);
   }
   return colors;
 };
 
 /**
  * 对象深度拷贝
  * @param obj
  * @returns {*}
  */
 export const objectDeepCopy = (obj) => {
   if (typeof obj !== 'object') {
     return obj;
   }
   let newObj = {};
   for (let attr in obj) {
     newObj[attr] = objectDeepCopy(obj[attr]);
   }
   return newObj;
 }
 
 /**
  * 判断是否整除
  * @param m 除数
  * @param n 被除数
  * @returns {boolean} 是否整除
  */
 export const judgeDivisor = (m, n) => {
   let num = {};
   let i = 0;
   let x = parseInt(m / n);
   m = m % n;
   return m === 0
   // let result = "";
   // while (m !== 0 && !(m in num)) {
   //   num[m] = i++;
   //   result += parseInt(m * 10 / n);
   //   m = m * 10 % n;
   // }
   // return m === 0;
 };
 
 /**
  * 生成GUID
  * @return {string} guid
  */
 export const generateGuid = () => {
   return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
 };
 
 function s4() {
   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
 }
 
 //import {Loading} from 'element-ui';
 
//  /**
//   * 设置全局加载框
//   * @param text 加载文字
//   * @param autoClose 是否自动关闭
//   */
//  export const globalLoading = (text = "服务处理中，请稍候···", autoClose = true) => {
//    window._globalLoadingAutoColse = autoClose;
//    return Loading.service({
//      lock: true,
//      text: text
//    });
//  };
 
//  /**
//   * 查看全局加载是否自动关闭
//   * @return {boolean|*}
//   */
//  export const globalLoadingIsAutoClose = () => {
//    return window._globalLoadingAutoColse;
//  };
 
//  /**
//   * 重置全局加载
//   */
//  export const globalLoadingIsAutoReSet = () => {
//    window._globalLoadingAutoColse = false;
//  };
 
//  /**
//   * 判定权限
//   * @param serverPath 服务端地址
//   */
//  export const judgePermissions = (serverPath) => {
//    let user = JSON.parse(sessionStorage.getItem('User'));
//    if (user) {
//      if (user.authResources && user.authResources.length > 0) {
//        let authList = user.authResources;
//        authList = authList.split(",");
//        // 2.判断是否拥有权限（没有，则删除此el）
//        if (authList.filter(item => {
//          let res = item.split('|')
//          if(res[0] == serverPath) {
//            return true
//          } else {
//            return false
//          }
//        }).length <= 0) {
//          return false;
//        }
//      } else {
//        return false;
//      }
//    } else {
//      return false;
//    }
//    return true;
//  };
 
//  /**
//   * 获取访问路径
//   * @param tree
//   * @return {*}
//   */
//  export const getAccessPath = (tree) => {
//    let path = "";
//    if (tree) {
//      let exec = (tree) => {
//        for (let i = 0; i < tree.length; i++) {
//          if (!path) {
//            let item = tree[i];
//            if (item.name !== 'Login') {
//              if (item.meta.serverPath) {
//                if (item.path !== "/" && !item.hidden) {
//                  if (judgePermissions(item.meta.serverPath)) {
//                    path = item.path;
//                    break;
//                  }
//                }
//                if (item.children && item.children.length > 0) {
//                  exec(item.children);
//                }
//              } else {
//                if (!item.hidden) {
//                  path = item.path;
//                  break;
//                }
//              }
//            }
//          } else {
//            break;
//          }
//        }
//      };
//      exec(tree);
//      return path;
//    }
//  };
 

 
//  /**
//   * 无权行为
//   * @param routes
//   */
//  export const notPermissionsAction = (routes, router, route, next) => {
//    return new Promise(resolve => {
//      NotPermissionsDialog.show({
//        message: "您不具有当前访问路径的权限，请选择如下操作！", callback: ({tag, instance}) => {
//          switch (tag) {
//            case "user":
//              LoginDialog.login().then(datam => {
//                instance.vm.visible = false;
//                if (judgePermissions(route.meta.serverPath)) {
//                  if (next) {
//                    next();
//                  }
//                  resolve(datam);
//                } else {
//                  notPermissionsAction(routes, router, route);
//                }
//              }).catch(() => {
//              });
//              break;
//            case "role":
//              SwitchRoleDialog.switch({
//                route, routes, callback: () => {
//                  if (next) {
//                    next();
//                  }
//                  instance.vm.visible = false;
//                  resolve();
//                }
//              });
//              break;
//            case "permissions":
//              let path = getAccessPath(routes);
//              if (!path) {
//                Notification.error({title: '失败', message: '用户没有任何系统权限！'});
//                return;
//              }
//              if (next) {
//                next(path);
//              }
//              instance.vm.visible = false;
//              resolve(path);
//              break;
//          }
//        }
//      });
//    });
//  };
 

 
//  /**
//   * 获取当前用户信息
//   * @return {any}
//   */
//  export const getCurrentUserInfo = () => {
//    let user = sessionStorage.getItem('User');
//    if (user) {
//      return JSON.parse(user);
//    } else {
//      location.reload();
//    }
//  };
 
 

 // 设置路由属性
 export const getRouterMateType = (serverPath) => {
   let user = JSON.parse(sessionStorage.getItem('User'));
   if (user) {
     if (user.authResources && user.authResources.length > 0) {
       let authList = user.authResources;
       let listMap = new Map()
       authList = authList.split(",");
       authList.forEach(item => {
         let res = item.split('|')
         listMap.set(res[0], res[1])
       })
       return listMap.get(serverPath) == 1
     } else {
       return false
     }
   } else {
     return false
   }
 }
 