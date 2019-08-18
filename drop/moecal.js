// var currentlyMoe=$("#currentlyMoe").val();         // 现在的数量
// var maximumMoe=$("#maximumMoe").val();             // 仓库的最大数量
// var producePS=$("#producePS").val();               // 每秒产量
// var buildingCount=$("#buildingCount").val();  // 建筑加成
// var requirePS=$("#requirePS").val()                // 每秒需求
// var weather=$("#weather").val()                    // 天气 -1,0,1 表示

// 通过 扩大仓库数量 / 改变每秒产量/建筑加成/每秒需求 来使触顶时间延长
function cal(currentlyMoe,maximumMoe,producePS,buildingCount,requirePS,weather){
    result=new Array()
    index=0
    maximumMoe*=1000
    currentlyMoe*=1000
    const weatherNormal=1;
    const weatherInfluences=0.15;
    const seasonInfluences=[0.5,0,0,-0.75]
    var produceCoefficient=seasonInfluences.map((i)=>weatherNormal+i+weatherInfluences*weather)
    // 产量系数
    var avgProduceCoefficient=produceCoefficient.reduce((s,c)=>s+c)/4
    result[index++]=("产量系数(年):"+avgProduceCoefficient.toFixed(2));
    var producePSAfter=producePS*avgProduceCoefficient*(1+buildingCount*0.03);
    // 均产量
    var increasePSYearly=producePSAfter-requirePS;
    result[index++]=("每秒净增长量(年):"+increasePSYearly.toFixed(2));
    var increaseYearly=800*increasePSYearly;
    result[index++]=("年净增长量(年):"+increaseYearly.toFixed(2));
    
    // 每个季节的增长量, 用于计算波动/触顶触底
    produceSeason=produceCoefficient.map((i)=>(i*producePS*(1+buildingCount*0.03)-requirePS)*200)
    var borderTop=produceSeason.reduce((s,c)=>c>=0?s+c:s,0);
    var borderButton=produceSeason.reduce((s,c)=>c<0?s+c:s,0);
    // result[index++]=(produceSeason,borderButton,borderTop);
    
    result[index++]=("波动范围(基于现在的存量"+currentlyMoe+"): "+(currentlyMoe+borderTop+borderButton).toFixed(2)+"~"+(borderTop+currentlyMoe).toFixed(2));
    
    var timer=0;
    touchCheck=(()=>{
        var current=currentlyMoe;
        for(var year=0;;year++)
            for(var i in produceSeason){
                timer++
                current+=produceSeason[i++];
                // result[index++]=(year+"年后的第",i,"季节: ",timer*200/60,"分后",current);
                if(current>=maximumMoe){
                    return [1,year,i]
                }else if(current<=0){
                    return [0,year,i]
                }
            }
        })()
        
    result[index++]=(touchCheck[1]+"年后的第"+touchCheck[2]+"季节("+Math.round(timer*200/60)+"分钟后):"+(touchCheck[0]?"触顶":"触底"));
    return result
    
}

