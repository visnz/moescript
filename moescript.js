(function() {
"use strict";
// 相关博客1：https://visn.online/post/daily6/moescript/
// 相关博客2：https://visn.online/post/daily6/moejqscript/

// ------------------------ //
//   1 常量区
// ------------------------ //
// 默认大部分事件为60秒执行一次,快速事件为15秒,慢速事件为5分钟
const defaultDelay = 60000
const fastDelay = 15000
const slowDelay = 300000
const verySlowDelay = 3600000 //一小时
const veryFastDelay = 1000 //1秒
// 提供所有按钮组件的一个类进行统一控制
const AllClassName = "moescript"
// 这个数组表示左下角合成列表的定位,通过
// div.craft:nth-child( n ) > div:nth-child(1) 获取对应材料的名字
// 
// div.craft:nth-child(1) > div:nth-child(6) > div:nth-child(1)  
// 6表示定位到"全部" 上面这行选择触发全部转换
const SourcePositionMap = {
    "木材": 1,
    // "": 2,
    "木梁": 3,
    "石板": 4,
    "金属板": 5,
    "钢": 6,
    // "": 7,
    "齿轮": 8,
    // "": 9,
    // "": 10,
    "脚手架": 11,
    "船": 12,
    // "": 13,
    // "": 14,
    "羊皮纸": 15,
    "手稿": 16,
    "概要": 17,
    "蓝图": 18,
    // "": 19,
    "巨石": 20,
}
const Jobs = {
    "伐木工": 0,
    "农民": 1,
    "学者": 2,
    "猎人": 3,
    "矿工": 4,
    "牧师": 5,
    "地质学家": 6,
    "工程师": 7,
}

// ------------------------ //
//   2 游戏操作接口
// ------------------------ //

// 指定资源进行全部生产,可传入名称与编号,配合 SourcePositionMap
// GenerateResourceAll(20,1) 巨石换算1单位(未算加成)
// GenerateResourceAll("蓝图",2) 蓝图换算25单位(未算加成)
// GenerateResourceAll("蓝图",3) 蓝图换算100单位(未算加成)
// GenerateResourceAll(1) 换算全部木材
function GenerateResourceAll(target, count = 4) {
    var sel = (count < 1 ? 1 : count > 4 ? 4 : count) + 2
    i = (typeof target === 'string' ? SourcePositionMap[target] : target)
    $("div.craft:nth-child(" + i + ") > div:nth-child(" + sel + ") > div:nth-child(1)").click()
}

// 1=1, 2=5, 3=25, 4=all
// jobIncrease(0) => +1
// jobIncrease("伐木工",2) => +5
// jobIncrease("伐木工",3) => +25
// jobIncrease("伐木工",4) => +all
// jobIncrease("伐木工",1,false) => -1
function jobIncrease(job, count = 1, increase = true) {
    var sel = ((count < 1 ? 1 : count > 4 ? 4 : count) + 2) % 4 + 1
    i = (typeof job === 'string' ? Jobs[job] : job)
    index = i * 8 + (increase ? 4 : 0) + sel - 1
    $("div.panelContainer .modern a")[index].click()
}


// ------------------------ //
//   3 脚本逻辑区
//      _开头为中间操作
// ------------------------ //

//  TBD: 
// 自动构建天文台 = () => {
//     _记录当前面板Index()
//     _进入篝火面板()
//     合成木梁()
//     合成脚手架()
//     _返回记录面板Index()
// }
// 自动最低农民=()=>{
//     _记录当前面板Index()
//     _进入管理面板()
//     var re;
//     for(let i=0;i<20;i++){
//         console.log(re);
//         if(_检查粮食增量是否为正()){
//             jobIncrease(1,1,false)//减少一个农民
//             console.log("减少了一个农民");
//             if(!_检查粮食增量是否为正())break
//         }else{
//             jobIncrease(1)//增加一个农民
//             console.log("增加了一个农民");
//             if(_检查粮食增量是否为正())break
//         }
//     }
//     _返回记录面板Index()
// }

const 自动打猎 = () => { $("#fastHuntContainerCount").click() }
const 抬头看天空 = () => { $("#observeBtn").click() }
const 赞美太阳 = () => { $("#fastPraiseContainer > a:nth-child(1)")[0].click() }
const _进入篝火面板 = () => { $("a.tab:nth-child(1)")[0].click() }
const _进入管理面板 = () => { $("a.tab:nth-child(3)")[0].click() }
const _管理Jobs = () => { $("div.panelContainer:nth-child(3) > div:nth-child(3) > table:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)").click() }
const _提拔小猫 = () => { $("div.panelContainer:nth-child(3) > div:nth-child(3) > table:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(4) > div:nth-child(1)").click() }
var preIndex = 0
const _记录当前面板Index = () => { preIndex = $(".activeTab").parent().children(".activeTab").index() }
const _返回记录面板Index = () => { $("a.tab:nth-child(" + (preIndex + 1) + ")")[0].click() }
const _检查粮食增量是否为正 = () => {
    return $("#leftColumnViewport > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4)").text().split("+").length == 2
}
const _保存游戏 = () => {
    $("div.links-block:nth-child(6) > a:nth-child(1)").click()
}
const 管理Jobs = () => {
    _记录当前面板Index()
    _进入管理面板()
    _管理Jobs()
    _返回记录面板Index()
}
const 小猫升职器 = () => {
    _记录当前面板Index()
    _进入管理面板()
    _提拔小猫()
    _返回记录面板Index()
}
var pao = 0
var paotimer = 0
const 高速卡机刨木法 = () => {
    _记录当前面板Index()
    _进入篝火面板()
    if (pao >= 6) {
        _保存游戏()
        logThis("游戏已保存")
        pao = 0
    }
    pao++
    for (i = 0; i < 36000; i++) { $(".bldGroupContainer .modern")[0].click() }
    _返回记录面板Index()
}
const 中速卡机刨木法 = () => {
    _记录当前面板Index()
    _进入篝火面板()
    if (pao >= 30) {
        _保存游戏()
        logThis("游戏已保存")
        pao = 0
    }
    pao++
    for (i = 0; i < 12000; i++) { $(".bldGroupContainer .modern")[0].click() }
    _返回记录面板Index()
}
const 五分钟中速刨 = () => {
    _记录当前面板Index()
    _进入篝火面板()
    if (pao >= 30) {
        _保存游戏()
        logThis("游戏已保存")
        pao = 0
    }
    pao++;paotimer++;
    if(paotimer>=300){paotimer=0;stop("五分钟中速刨")}
    for (i = 0; i < 12000; i++) { $(".bldGroupContainer .modern")[0].click() }
    _返回记录面板Index()
}
const 低速卡机刨木法 = () => {
    _记录当前面板Index()
    _进入篝火面板()
    if (pao >= 60) {
        _保存游戏()
        logThis("游戏已保存")
        pao = 0
    }
    pao++
    for (i = 0; i < 6000; i++) { $(".bldGroupContainer .modern")[0].click() }
    _返回记录面板Index()
}
const 合成木材 = () => { GenerateResourceAll("木材") }
const 合成钢 = () => { GenerateResourceAll("钢") }
const 合成木梁 = () => { GenerateResourceAll("木梁") }
const 合成石板 = () => { GenerateResourceAll("石板") }
const 合成金属板 = () => { GenerateResourceAll("金属板") }
const 合成齿轮 = () => { GenerateResourceAll("齿轮") }
const 合成脚手架 = () => { GenerateResourceAll("脚手架") }
const 合成船 = () => { GenerateResourceAll("船") }
const 合成羊皮纸 = () => { GenerateResourceAll("羊皮纸") }
const 合成手稿 = () => { GenerateResourceAll("手稿") }
const 合成概要 = () => { GenerateResourceAll("概要") }
const 合成蓝图 = () => { GenerateResourceAll("蓝图") }
const 合成巨石 = () => { GenerateResourceAll("巨石") }

// model 数据结构:
//  DisplayName 将会作为id在按钮上出现
//  如果没有指定scriptFunc,则默认调用同名函数
//  如果没有指定timer,则默认使用defaultDelay常量
var AllOperators = [
    {
        panel: "基本",
        list: [
            { DisplayName: "抬头看天空", timer: fastDelay },
            { DisplayName: "自动打猎" },
            { DisplayName: "赞美太阳" },
            { DisplayName: "管理Jobs", timer: verySlowDelay },
            { DisplayName: "小猫升职器", timer: verySlowDelay },
        ]
        //     }, {
        //         panel: "策略",
        //         list: [
        //             // { DisplayName: "自动最低农民" },
        //         ]
    }, {
        panel: "合成",
        list: [
            { DisplayName: "合成木材" },
            { DisplayName: "合成钢" },
            { DisplayName: "合成木梁" },
            { DisplayName: "合成石板" },
            { DisplayName: "合成金属板" },
            { DisplayName: "合成齿轮" },
            { DisplayName: "合成脚手架" },
            { DisplayName: "合成船" },
            { DisplayName: "合成羊皮纸" },
            { DisplayName: "合成手稿" },
            { DisplayName: "合成概要" },
            { DisplayName: "合成蓝图" },
            { DisplayName: "合成巨石" },
        ]
    }, {
        panel: "飞天",
        list: [
            { DisplayName: "低速卡机刨木法", timer: veryFastDelay },
            { DisplayName: "中速卡机刨木法", timer: veryFastDelay },
            { DisplayName: "高速卡机刨木法", timer: veryFastDelay },
            { DisplayName: "五分钟中速刨", timer: veryFastDelay }
        ]
    },
]

// ------------------------ //
//   4 UI逻辑
// ------------------------ //

// 在画面写入组件
$("#rightColumn").prepend(
    '<div>' +
    '<div style="display:flex;flex-wrap:wrap">' +
    AllOperators.map((i) => {
        return '<input id="' + i.panel + '按钮" type="button" style="display:inline" value="' + i.panel + '">'
    }).reduce((s, c) => s = s + c) +
    '<input id="全自动关" type="button"  style="display:inline" value="全部关闭">' +
    '<span><input id="立马执行" type="checkbox"  style="display:inline" checked><span>立马执行</span></span>' +
    '</div>' +
    AllOperators.map((j) => {
        return '<div id="' + j.panel + '" style="display:none";>' +
            '<div style="display:flex;flex-wrap:wrap">' +
            j.list.map((e) =>
                '<span style="white-space:nowrap;"><input class="' + AllClassName +
                '" id="' + e.DisplayName +
                '" type="checkbox" style="display:inline"><span>' + e.DisplayName +
                '</span></span>'
            ).reduce((s, c) => s = s + c) +
            '</div>' +
            '</div>'
    }).reduce((s, c) => s = s + c) +
    '<div>' +
    '<div id="' + AllClassName + 'log"style="min-height:300px;max-height:300px;overflow:auto;"></div>' +
    '</div>' +
    '</div>'
)

// 在组件上添加事件
AllOperators.map((k) => {
    k.list.map((i) => {
        if (i.timer == null) i.timer = defaultDelay;
        if (i.scriptFunc == null) i.scriptFunc = (() => eval(i.DisplayName + "()"));
        $("#" + i.DisplayName).click((e) => {
            if (e.currentTarget.checked) {
                logThis('[脚本建立] ' + i.DisplayName + " 间隔:" + (i.timer / 1000).toFixed(2) + "秒")
                i.AutoID = setInterval(() => {
                    i.scriptFunc()
                    logThis('[__自动__] ' + i.DisplayName)
                }, i.timer)
                if ($("#立马执行")[0].checked) {
                    i.scriptFunc()
                    logThis('[____立马] ' + i.DisplayName + "(ง •̀_•́)ง")
                }
                return
            }
            clearInterval(i.AutoID);
            logThis('[脚本清除] ' + i.DisplayName)
        })
    })
})

// 为面板设置开关基本操作
AllOperators.map((k) => {
    $("#" + k.panel + "按钮").click((e) => {
        $("#" + k.panel).attr("style", "display:" + (($("#" + k.panel).attr("style") == "display:block") ? "none" : "block"))
    })
})

// 全自动关的功能
$("#全自动关").click((e) => {
    AllOperators.map((j) => j.list.map((k) => clearInterval(k.AutoID)))
    $("." + AllClassName).each((i, e) => { $("#" + e.id)[0].checked = false });
    logThis("清除了所有脚本")
})

// 停止某个定时器
function stop(displayname) {
    AllOperators.map((j) => j.list.map((k) => {
        if (k.DisplayName == displayname) {
            clearInterval(k.AutoID)
            $("#" + k.DisplayName)[0].checked = false;
        }
    }))
}

// 输出信息到log div
function logThis(msg){
    $("#" + AllClassName + 'log').prepend('<span class="msg"> [ ' + Date().split(" ")[4] + ' ] ' + msg + "</span>")
}

})();