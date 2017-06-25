(function () {
	document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"><\/script>');
	document.write('<link rel="stylesheet" type="text/css" href="../Style%20Library/EventCSR/event.min.css" />');
	document.write('<link rel="stylesheet" type="text/css" href="../Style%20Library/EventCSR/font-awesome/css/font-awesome.min.css" />');

	/*
	* Initialize the variable that store the overrides objects.
	*/
	var overrideCtx = {};
	overrideCtx.Templates = {};

	//	Assign functions or plain html strings to the templateset objects:
	//	header, footer and item.
	overrideCtx.Templates.Header = "<div class='center'>"; overrideCtx.Templates.Footer = "</div>";

	// 	This template is assigned to the CustomItem function.
	overrideCtx.Templates.Item = CustomItem;
	overrideCtx.BaseViewID = 1;
	overrideCtx.ListTemplateType = 106;

	// Register the template overrides.
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

/*
* This function builds the output for the item template.
* Uses the Context object to access announcement data.
*/
function CustomItem(ctx) {
	var ctrl = "<div class='event-content'><div class='event-title'><span>" + ctx.CurrentItem["Title"] + "</span> | <span>" +
		ctx.CurrentItem["Location"] + "</span> | <span>" + ctx.CurrentItem["Nice_x0020_Date"] + "</span></div><div class='event-description'>" +
		ctx.CurrentItem["Event_x0020_Description"].replace("<p>", "").replace("</p>", "") +
		"</div><div><a href='" + ctx.listUrlDir + "/DispForm.aspx?ID=" + ctx.CurrentItem["ID"] + "' target='_blank'>Read more...</a></div></div></div>";

	if (ctx.CurrentItem["Category"] == "Business") {
		ctrl = "<div class='event business'><i class='fa fa-briefcase fa-5x'></i>" + ctrl;
	} else if (ctx.CurrentItem["Category"] == "Entertainment") {
		ctrl = "<div class='event entertainment'><i class='fa fa-cutlery fa-5x'></i>" + ctrl;
	} else if (ctx.CurrentItem["Category"] == "Training") {
		ctrl = "<div class='event training'><i class='fa fa-graduation-cap fa-5x'></i>" + ctrl;
	}

	return ctrl;
}
