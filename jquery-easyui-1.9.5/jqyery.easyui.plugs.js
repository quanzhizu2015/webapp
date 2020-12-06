/**easyui.datagrid 扩展方法 */
var datagrid = {
    /**
     * easyui.datagrid分页事件
     * @param {string} selector 表格选择器，如："#tblGrid"
     * @param {funciton} onSelectPageCall 分页事件自定义方法（pageNumber:1,pageSize:20)
     */
    onPage: function (selector, onSelectPageCall) {
        var pager = $(selector).datagrid("getPager");
        if (!pager) {
            $.messager.alert('消息', "未找到" + selector + "定义的表格");
            return;
        }
        $(pager).pagination({
            onSelectPage: function (pageNumber, pageSize) {
                onSelectPageCall(pageNumber, pageSize);
            }
        });
    },
    /**
     * 获取当前分页信息
     * @param {string} selector 表格选择器 如：#tblGrid
     * @returns {pageNumber: 1, pageSize: 10}
     */
    getPage: function (selector) {
        var options = $(selector).datagrid('getPager').data("pagination").options;
        return {
            pageNumber: options.pageNumber,
            pageSize: options.pageSize
        };
    },
    /**
     * 获取当前页码 
     * @param {string} selector 表格选择器 如：#tblGrid
     * @returns 1
     */
    getPageNumber: function (selector) {
        var options = $(selector).datagrid('getPager').data("pagination").options;
        return options.pageNumber;
    },
    /**
     * 获取分页大小
     * @param {string} selector 表格选择器 如：#tblGrid
     * @returns 30
     */
    getPageSize: function (selector) {
        var options = $(selector).datagrid('getPager').data("pagination").options;
        return options.pageSize;
    },
    /**
     * 接口数据转换成easyui.datagrid分页数据需要的格式
     * @param {JSON} result 
     * @returns {total: 1, rows: []}
     */
    dataFormat: function (result) {
        //result格式：
        var data = { "total": result.total, "rows": result.records };
        return data;
    },
    /**
     * 获取分页查询条件
     * @param {int} pageNumber  当前页码 1
     * @param {int} pageSize 分页大小 30
     * @param {JSON} jsonParams 查询条件 
     */
    pageModel: function (pageNumber, pageSize, jsonParams) {
        var params = {
            "pageIndex": pageNumber,
            "pageSize": pageSize,
            "model": jsonParams
        };
        return params;
    }
};