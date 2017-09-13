Handlebars.registerHelper("compare",function(v1,v2,options){
    if(v1==v2){
        //满足添加继续执行
        return options.fn(this);
    }else{
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});
Handlebars.registerHelper("substring",function(string,index1,index2){
    string = string +'';
    return string.substring(index1,index2)
});
Handlebars.registerHelper("stage",function(value,type){
    var status;
    if(type == 1){
        status = {
            processing:'正在进行',
            soon:'即将开始',
            active:'正在进行',
            ended:'已结束'
        };
    }else{
        status = {
            processing:'p_bg',
            soon:'s_bg',
            active:'p_bg',
            ended:'e_bg'

        };
    }
    return status[value];
});
Handlebars.registerHelper("state",function(value){
    var state = {
        publishing:'运营',
        soon:'即将开始',
        active:'正在进行',

    };
    return state[value];
});

