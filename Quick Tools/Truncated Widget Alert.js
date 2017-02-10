var msg = "";

// content stripes - columns
if ($(".form-field.col-widgets[style*='display: none;']>div.form-field-wrapper>a[data-widget-id]").length > 0)
    msg += "Hidden column! ";

// columns - rows
if ($(".form-field.row-widgets[style*='display: none;']>div.form-field-wrapper>a[data-widget-id]").length > 0)
    msg += "Hidden row! ";

if (msg !== "")
    alert(msg);