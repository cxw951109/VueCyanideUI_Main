//条码扫描仪前端驱动

//条码扫描仪按键处理函数
function barCode_Proc(e) {
    var keyChar = String.fromCharCode(e.which);
    if (keyChar == "\r") {
        var scaner_buffer = $(this).data("barcode-scaner-buffer");
        $(this).data("barcode-scaner-buffer", "");
        e.data.proc(scaner_buffer);
    }
    else {
        var scaner_buffer = $(this).data("barcode-scaner-buffer");
        if (scaner_buffer == undefined) {
            scaner_buffer = "";
        }
        scaner_buffer += keyChar;
        $(this).data("barcode-scaner-buffer", scaner_buffer);
    }
}

//条码扫描仪jQuery拓展方法
jQuery.fn.extend({
    barCodeScanerModeEnter: function (findBarCode_Event) {
        $(this).data("barcode-scaner-buffer", "");
        $(this).off("keypress", barCode_Proc);
        $(this).on("keypress", { proc: findBarCode_Event }, barCode_Proc);
    },
    barCodeScanerModeExit: function () {
        $(this).data("barcode-scaner-buffer", "");
        $(this).off("keypress", barCode_Proc);
    }
});