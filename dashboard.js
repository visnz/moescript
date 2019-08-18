
var timeData = [];

var NETchart = echarts.init(document.getElementById('NET'),'vintage');
var IOchart = echarts.init(document.getElementById('IO'),'vintage');
var CPUchart = echarts.init(document.getElementById('CPU'),'vintage');
var MEMchart = echarts.init(document.getElementById('MEM'),'vintage');

IOoption = {
    title: {
        text: '磁碟读写监控',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data:['IOWrite','IORead'],
        x: 'left'
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    axisPointer: {
        link: { xAxisIndex: 'all' }
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
        },
        {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
        }
    ],
    grid: [{
        left: 50,
        right: 50,
        height: '35%'
    }, {
        left: 50,
        right: 50,
        top: '55%',
        height: '35%'
    }],
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: true },
            data: timeData
        },
        {
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: true },
            data: timeData,
            position: 'top'
        }
    ],
    yAxis: [
        {
            name: 'KB/s',
            type: 'value',
        },
        {
            gridIndex: 1,
            name: 'KB/s',
            type: 'value',
            inverse: true
        }
    ],
    series: [
        {
            name:'IOWrite',
            type: 'line',
            symbolSize: 8,
            hoverAnimation: false,
            data: []
        },
        {
            name:'IORead',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: []
        }
    ]
};
NEToption = {
    title: {
        text: '网络监视图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['传入流量(上载)', '传出流量(下载)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : timeData
        }
    ],
    yAxis : [
        {
            name: 'KB/s',
            type : 'value'
        }
    ],
    series : [
        {
            name: '传出流量',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name: '传入流量',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[]
        }
    ]
};
CPUoption = {
    tooltip : {
        formatter: "{a} {b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'CPU使用率(us&sy)',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: []
        }
    ]
};
MEMoption = {
    tooltip : {
        formatter: "{a} {b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '内存使用率(activeMemory)',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: []
        }
    ]
};
var lastTimeStamp;
function update(){
    if(timeData.length>=50){
        timeData.splice(0,1)
        NEToption.series[1].data.splice(0,1)
        NEToption.series[0].data.splice(0,1)
        IOoption.series[0].data.splice(0,1)
        IOoption.series[1].data.splice(0,1)
        CPUoption.series[0].data.splice(0,1)
        MEMoption.series[0].data.splice(0,1)
    }
    $.get("http://localhost:3000/dashboard?"+
    "lastTimeStamp="+lastTimeStamp+
    "&step="+$('input[name=step]').val()
    , (result) => {
            if(result==null)return 
            timeData.push(new Date(result["time"]).toTimeString().split(" ")[0]);
            NEToption.series[1].data.push(result["RXDataRate"])
            NEToption.series[0].data.push(result["TXDataRate"])
            IOoption.series[0].data.push(result["IOwrite"])
            IOoption.series[1].data.push(result["IOread"])
            CPUoption.series[0].data=[result["usersysCPU"].toFixed(2)]
            MEMoption.series[0].data=[(result["activeMemory"]*100/result["totalMemory"]).toFixed(2)]
            CPUchart.setOption(CPUoption)
            MEMchart.setOption(MEMoption)
            NETchart.setOption(NEToption)
            IOchart.setOption(IOoption)
        lastTimeStamp=result["time"]
    })
}
function fetchAll(){
    $.get("http://localhost:3000/dashboard?"+
        "lastTimeStamp=0"+
        "&step="+$('input[name=step]').val()
        , (result) => {
        // timeData=[]
        NEToption.series[1].data=[]
        NEToption.series[0].data=[]
        IOoption.series[0].data=[]
        IOoption.series[1].data=[]
        for (i in result) {            
            timeData.push(new Date(result[i]["time"]).toTimeString().split(" ")[0]);
            NEToption.series[1].data.push(result[i]["RXDataRate"])
            NEToption.series[0].data.push(result[i]["TXDataRate"])
            IOoption.series[0].data.push(result[i]["IOwrite"])
            IOoption.series[1].data.push(result[i]["IOread"])
            NETchart.setOption(NEToption)
            IOchart.setOption(IOoption)
        }
        CPUoption.series[0].data=[result[result.length-1]["usersysCPU"].toFixed(2)]
        CPUchart.setOption(CPUoption)
        MEMoption.series[0].data=[(result[result.length-1]["activeMemory"]*100/result[result.length-1]["totalMemory"]).toFixed(2)]
        MEMchart.setOption(MEMoption)
        lastTimeStamp=result[result.length-1]["time"]
    })
}
// 这一块的功能是创建另外的线程
// 持续更新系统信息
duration=5
setTimeout(async()=>{
    // async函数声明
    while(true){
        await new Promise(resolve=>setTimeout(resolve,(duration+2)*1000))
        // 进行同步阻塞,调用dashboard方法
        update()
    }
},0)