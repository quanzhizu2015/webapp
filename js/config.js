var config = {
    /** 运行环境：dev/test/pro */
    env: "test",
    /** 系统路径定义 */
    dev: {
        //sys:"http://192.168.6.66"
        web: "http://localhost:8080/exam"
    },
    test: {
        web: "http://47.114.136.200:8080/exam"
    },
    pro: {
        web: "http://47.114.136.200:8080/exam"
    }
};

config.model = {
    rootPath: function() {
        if ("dev" == config.env) {
            return config.dev;
        } else if ("test" == config.env) {
            return config.test;
        } else {
            return config.pro;
        }
    }
};

config.ajax = {
    /**
     * post异步请求
     * @param {string} url 接口地址
     * @param {JSON} params  JSON参数
     * @param {function} callback  回调方法
     */
    post: function(url, params, callback) {
        if (!params) {
            params = {};
        }
        $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            cache: false,
            async: true,
            beforeSend: function(xhr) {
                // $.messager.progress({
                //     title: "提示",
                //     text: "数据正在处理中，请稍后...."
                // });
            },
            complete: function(xhr, ts) {
                //$.messager.progress("close");
            },
            success: function(result, textStatus, xhr) {
                if (result.success) {
                    if (callback) {
                        callback(result);
                    }
                } else {
                    $.messager.confirm('消息', result.message, function(r) {
                        if (result.code == "111" && r) {
                           // window.location.href = "/login.html";
                        }
                    });
                }
            },
            error: function(xhr, errorMsg, errorObj) {
                //$.messager.alert('消息', "服务器请求失败");
            	alert("服务器请求异常");
            }
        });
    },
    /**
     * post同步请求并返回结果
     * @param {string} url 接口地址
     * @param {JSON} params  JSON参数
     */
    postback: function(url, params) {
        if (!params) {
            params = {};
        }
        var resultJson = null;
        $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            cache: false,
            async: false,
            beforeSend: function(xhr) {
                // $.messager.progress({
                //     title: "提示",
                //     text: "数据正在处理中，请稍后...."
                // });
            },
            complete: function(xhr, ts) {
                //$.messager.progress("close");
            },
            success: function(result, textStatus, xhr) {
                resultJson = result;
                if (!result.success) {
                   /*
                   $.messager.confirm('消息', result.message, function(r) {
                        if (result.code == "111" && r) {
                            window.location.href = "/login.html";
                        }
                    });
                    */
                }
            },
            error: function(xhr, errorMsg, errorObj) {
                //$.messager.alert('消息', "服务器请求失败");
            	alert("服务器请求异常");
            }
        });
        return resultJson;
    }
};