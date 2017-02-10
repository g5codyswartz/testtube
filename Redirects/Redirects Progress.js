
var RedirectsProgress = {
    count: 0,
    success: 0,
    error: 0,
    finished: 0,
    UI: undefined,
    init: function() {
        this.Hooks.watchSend();
        this.Hooks.watchError();
        this.Hooks.watchSuccess();
        this.Hooks.watchComplete();
        
        this.UI = $("#redirectProgress");
        this.AddUI();
    },
    AddUI: function() {
        var UI = $("#redirectProgress");
        if (UI.length > 0)
        {
            UI.remove();
        }
        
        $("body").append("<div id='redirectProgress' "+
            "style='position: fixed; right: 0px; bottom: 0px; background-color: #222; color: white; padding: 5px;'>"+
            "Error: <span class='error'>0</span> Success: <span class='success'>0</span> Total: <span class='count'>0</span></div>");
        this.UI = $("#redirectProgress");
    },
    Hooks: {
        watchSend: function() {
            $(document).ajaxSend(function(e) {
                RedirectsProgress.count++;
                RedirectsProgress.UpdateUI();
            });
        },
        watchError: function() {
            $(document).ajaxError(function(e) {
                RedirectsProgress.error++;
                RedirectsProgress.finished++;
            });
        },
        watchSuccess: function() {
            $(document).ajaxSuccess(function(e) {
                RedirectsProgress.success++;
                RedirectsProgress.finished++;
            });
        },
        watchComplete: function() {
            $(document).ajaxComplete(function() {
                if (RedirectsProgress.count == RedirectsProgress.finished)
                {
                    console.log("FINISHED")
                }
                RedirectsProgress.UpdateUI();
            });
        }
    },
    UpdateUI: function() {
        $('.error', this.UI).text(this.error);
        $('.success', this.UI).text(this.success);
        $('.count', this.UI).text(this.count);
    }
}

RedirectsProgress.init();