/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2010, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */

EE.publish=EE.publish||{};
EE.publish.category_editor=function(){var c=[],d=$("<div />"),a=$('<div id="cat_modal_container" />').appendTo(d),i={},m={},l=EE.BASE+"&C=admin_content&M=category_editor&group_id=",b,e,g;d.dialog({autoOpen:false,height:450,width:600,modal:true});$(".edit_categories_link").each(function(){var f=this.href.substr(this.href.lastIndexOf("=")+1);$(this).data("gid",f);c.push(f)});for(g=0;g<c.length;g++){i[c[g]]=$("#cat_group_container_"+[c[g]]);i[c[g]].data("gid",c[g]);m[c[g]]=$("#cat_group_container_"+
[c[g]]).find(".cat_action_buttons").remove()}b=function(f){i[f].text("loading...").load(l+f+"&timestamp="+ +new Date+" .pageContents table",function(){e.call(i[f],i[f].html(),false)})};e=function(f,k){var h=$(this),j=h.data("gid");f=$.trim(f);if(h.hasClass("edit_categories_link"))h=$("#cat_group_container_"+j);if(f[0]!=="<"&&k)return b(j);h.closest(".cat_group_container").find("#refresh_categories").show();var n=$(f),p;if(n.find("form").length){a.html(n);n=a.find("input[type=submit]");p=a.find("form");
var s=function(r){var q=r||$(this);r=q.serialize();q=q.attr("action");$.ajax({url:q,type:"POST",data:r,dataType:"html",beforeSend:function(){h.html(EE.lang.loading)},success:function(o){o=$.trim(o);d.dialog("close");if(o[0]=="<"){o=$(o).find(".pageContents table");o.find("form").length==0&&h.html(o);e.call(h,o,true)}else e.call(h,o,true)},error:function(o){d.dialog("close");e.call(h,o.error,true)}});return false};p.submit(s);var t={};t[n.remove().attr("value")]=function(){s(p)};d.dialog("open");d.dialog("option",
"buttons",t);d.one("dialogclose",function(){b(j)})}else m[j].clone().appendTo(h).show();return false};g=function(){var f=$(this).data("gid"),k=".pageContents";if($(this).hasClass("edit_cat_order_trigger")||$(this).hasClass("edit_categories_link"))k+=" table";f||(f=$(this).closest(".cat_group_container").data("gid"));i[f].text(EE.lang.loading);$.ajax({url:this.href+"&timestamp="+ +new Date+k,success:function(h){var j="";h=$.trim(h);if(h[0]=="<"){h=$(h).find(k);j=$("<div />").append(h).html();h.find("form").length==
0&&i[f].html(j)}e.call(i[f],j,true)},error:function(h){h=eval("("+h.responseText+")");i[f].html(h.error);e.call(i[f],h.error,true)}});return false};$(".edit_categories_link").click(g);$(".cat_group_container a:not(.cats_done)").live("click",g);$(".cats_done").live("click",function(){var f=$(this).closest(".cat_group_container");f.text("loading...").load(EE.BASE+"&C=content_publish&M=ajax_update_cat_fields&group_id="+f.data("gid")+"&timestamp="+ +new Date,function(k){f.html($(k).html())});return false})};
var selected_tab="";function get_selected_tab(){return selected_tab}function tab_focus(c){$(".menu_"+c).parent().is(":visible")||$("a.delete_tab[href=#"+c+"]").trigger("click");$(".tab_menu li").removeClass("current");$(".menu_"+c).parent().addClass("current");$(".main_tab").hide();$("#"+c).fadeIn("fast");$(".main_tab").css("z-index","");$("#"+c).css("z-index","5");selected_tab=c}EE.tab_focus=tab_focus;
function setup_tabs(){var c="";$(".main_tab").sortable({handle:".handle",start:function(d,a){a.item.css("width",$(this).parent().css("width"))},stop:function(d,a){a.item.css("width","100%")}});$(".tab_menu li a").droppable({accept:".field_selector",tolerance:"pointer",deactivate:function(){clearTimeout(c);$(".tab_menu li").removeClass("highlight_tab")},drop:function(d,a){field_id=a.draggable.attr("id").substring(11);tab_id=$(this).attr("title").substring(5);$("#hold_field_"+field_id).prependTo("#"+
tab_id);$("#hold_field_"+field_id).hide().slideDown();tab_focus(tab_id);return false},over:function(){tab_id=$(this).attr("title").substring(5);$(this).parent().addClass("highlight_tab");c=setTimeout(function(){tab_focus(tab_id);return false},500)},out:function(){c!=""&&clearTimeout(c);$(this).parent().removeClass("highlight_tab")}});$("#holder .main_tab").droppable({accept:".field_selector",tolerance:"pointer",drop:function(d,a){field_id=a.draggable.attr("id")=="hide_title"||a.draggable.attr("id")==
"hide_url_title"?a.draggable.attr("id").substring(5):a.draggable.attr("id").substring(11);tab_id=$(this).attr("id");$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown()}});$(".tab_menu li.content_tab a, #publish_tab_list a.menu_focus").unbind(".publish_tabs").bind("mousedown.publish_tabs",function(d){tab_id=$(this).attr("title").substring(5);tab_focus(tab_id);d.preventDefault()}).bind("click.publish_tabs",function(){return false})}setup_tabs();
EE.publish.save_layout=function(){var c=0,d={},a={},i=0,m=false,l=$("#tab_menu_tabs li.current").attr("id");$(".main_tab").show();$("#tab_menu_tabs a:not(.add_tab_link)").each(function(){if($(this).parent("li").attr("id")&&$(this).parent("li").attr("id").substring(0,5)=="menu_"){var f=$(this).parent("li").attr("id").substring(5),k=$(this).parent("li").attr("id").substring(5),h=$(this).parent("li").attr("title");i=0;visible=true;if($(this).parent("li").is(":visible")){lay_name=f;d[lay_name]={}}else{m=
true;visible=false}d[lay_name]._tab_label=h;$("#"+k).find(".publish_field").each(function(){var j=$(this),n=this.id.replace(/hold_field_/,"");j=Math.round(j.width()/j.parent().width()*10)*10;var p=$("#sub_hold_field_"+n+" .markItUp ul li:eq(2)");p=p.html()!=="undefined"&&p.css("display")!=="none"?true:false;j={visible:$(this).css("display")==="none"||visible===false?false:true,collapse:$("#sub_hold_field_"+n).css("display")==="none"?true:false,htmlbuttons:p,width:j+"%"};if(visible===true){j.index=
i;d[lay_name][n]=j;i+=1}else a[n]=j});visible===true&&c++}});if(m==true){var b,e,g=0;for(darn in d){e=darn;for(b in d[e])if(d[e][b].index>g)g=d[e][b].index;break}$.each(a,function(){this.index=++g});jQuery.extend(d[e],a)}EE.tab_focus(l.replace(/menu_/,""));if(c===0)$.ee_notice(EE.publish.lang.tab_count_zero,{type:"error"});else $("#layout_groups_holder input:checked").length===0?$.ee_notice(EE.publish.lang.no_member_groups,{type:"error"}):$.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=content_publish&M=save_layout",
data:"XID="+EE.XID+"&json_tab_layout="+JSON.stringify(d)+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id,success:function(f){if(f.messageType==="success")$.ee_notice(f.message,{type:"success"});else f.messageType==="failure"&&$.ee_notice(f.message,{type:"error"})}})};
EE.publish.remove_layout=function(){if($("#layout_groups_holder input:checked").length===0)return $.ee_notice(EE.publish.lang.no_member_groups,{type:"error"});$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout={}&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id+"&field_group="+EE.publish.field_group,success:function(){$.ee_notice(EE.publish.lang.layout_removed+' <a href="javascript:location=location">'+EE.publish.lang.refresh_layout+
"</a>",{duration:0,type:"success"})}})};EE.date_obj_time=function(){var c=new Date,d=c.getHours();c=c.getMinutes();var a="";if(c<10)c="0"+c;if(EE.date.format=="us")if(d>11){d-=12;a=" PM"}else a=" AM";return" '"+d+":"+c+a+"'"}();file_manager_context="";
function disable_fields(c){var d=$(".main_tab input, .main_tab textarea, .main_tab select, #submit_button"),a=$("#submit_button"),i=$("#holder").find("a");if(c){d.attr("disabled",true);a.addClass("disabled_field");i.addClass("admin_mode");$("#holder div.markItUp, #holder p.spellcheck").each(function(){$(this).before('<div class="cover" style="position:absolute;width:100%;height:50px;z-index:9999;"></div>').css({})})}else{d.removeAttr("disabled");a.removeClass("disabled_field");i.removeClass("admin_mode");
$(".cover").remove()}}function removeAuthor(c){$.get(EE.BASE+"&C=content_publish&M=remove_author",{mid:c.attr("id")});c.parent().fadeOut()}function updateAuthorTable(){$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_table",data:"XID="+EE.XID+"&is_ajax=true",success:function(c){$("#authorsForm").html(c)}});$(".add_author_modal").bind("click",function(){add_authors_sidebar(this)})}
function add_authors_sidebar(c){c=$(c).attr("id").substring(16);$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_sidebar",data:"XID="+EE.XID+"&author_id="+c,success:function(d){$("#author_list_sidebar").append(d).fadeIn();updateAuthorTable()}})}
function liveUrlTitle(){var c=EE.publish.default_entry_title,d=EE.publish.word_separator,a=document.getElementById("title").value||"",i=document.getElementById("url_title"),m=RegExp(d+"{2,}","g"),l=d!=="_"?/\_/g:/\-/g,b="";if(c!=="")if(a.substr(0,c.length)===c)a=a.substr(c.length);a=EE.publish.url_title_prefix+a;a=a.toLowerCase().replace(l,d);for(c=0;c<a.length;c++){l=a.charCodeAt(c);if(l>=32&&l<128)b+=a.charAt(c);else if(l in EE.publish.foreignChars)b+=EE.publish.foreignChars[l]}a=b;a=a.replace("/<(.*?)>/g",
"");a=a.replace(/\s+/g,d);a=a.replace(/\//g,d);a=a.replace(/[^a-z0-9\-\._]/g,"");a=a.replace(/\+/g,d);a=a.replace(m,d);a=a.replace(/^[-_]|[-_]$/g,"");a=a.replace(/\.+$/g,"");if(i)i.value=a.substring(0,75)}
$(document).ready(function(){function c(b){$.get(EE.BASE+"&C=content_publish&M=remove_author",{mid:b.attr("id")});b.parent().fadeOut();$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_table",data:"is_ajax=true"+$("#publishForm").serialize(),success:function(e){$("#authorsForm").html(e);updateAuthorTable()}})}function d(b,e){var g=$("input[name="+e+"]").closest(".publish_field");b.is_image==false?g.find(".file_set").show().find(".filename").html('<img src="'+EE.PATH_CP_GBL_IMG+'default.png" alt="'+
EE.PATH_CP_GBL_IMG+'default.png" /><br />'+b.name):g.find(".file_set").show().find(".filename").html('<img src="'+b.thumb+'" alt="'+b.name+'" /><br />'+b.name);$("input[name="+e+"_hidden]").val(b.name);$("select[name="+e+"_directory]").val(b.directory);$.ee_filebrowser.reset()}var a;$("#layout_group_submit").click(function(){EE.publish.save_layout();return false});$("#layout_group_remove").click(function(){EE.publish.remove_layout();return false});$(".add_author_link").click(function(){$("#add_author_dialog").dialog("open");
return false});$("#author_list_sidebar .delete").click(function(){c($(this));return false});$("a.reveal_formatting_buttons").click(function(){$(this).parent().parent().children(".close_container").slideDown();$(this).hide();return false});$("#write_mode_header .reveal_formatting_buttons").hide();$("#holder").corner("bottom-left");if(EE.publish.smileys==true){$("a.glossary_link").click(function(){$(this).parent().siblings(".glossary_content").slideToggle("fast");$(this).parent().siblings(".smileyContent .spellcheck_content").hide();
return false});$("a.smiley_link").toggle(function(){$(this).parent().siblings(".smileyContent").slideDown("fast",function(){$(this).css("display","")})},function(){$(this).parent().siblings(".smileyContent").slideUp("fast")});$(this).parent().siblings(".glossary_content, .spellcheck_content").hide();$(".glossary_content a").click(function(){$.markItUp({replaceWith:$(this).attr("title")});return false})}if(EE.publish.autosave){a=function(){var b=$("#tools:visible"),e;b.length===1&&disable_fields(true);
e=$("#publishForm").serialize();if(b.length===0){disable_fields(false);$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=autosave_entry",data:e,success:function(g){if(isNaN(g)){if(EE.publish.autosave.error_state=="false"){$.ee_notice(g,{type:"error"});EE.publish.autosave.error_state="true"}}else{if(EE.publish.autosave.error_state=="true")EE.publish.autosave.error_state="false";$.ee_notice(EE.publish.autosave.success,{type:"success"})}}})}};setInterval(a,1E3*EE.publish.autosave.interval)}if(EE.publish.pages){a=
$("#pages_uri");var i=EE.publish.pages.pagesUri;a.value||a.val(i);a.focus(function(){this.value===i&&$(this).val("")}).blur(function(){this.value===""&&$(this).val(i)})}$.ee_filebrowser();var m="";EE.publish.show_write_mode===true&&$("#write_mode_textarea").markItUp(myWritemodeSettings);EE.publish.markitup.fields!==undefined&&$.each(EE.publish.markitup.fields,function(b){$("#"+b).markItUp(mySettings)});write_mode_height=$(window).height()-117;$("#write_mode_writer").css("height",write_mode_height+
"px");$("#write_mode_writer textarea").css("height",write_mode_height-67-17+"px");var l=$(".write_mode_trigger").overlay({mask:{color:"#262626",loadSpeed:200,opacity:0.85},onBeforeLoad:function(){var b=this.getTrigger()[0],e=$("#write_mode_textarea");m=b.id.match(/^id_\d+$/)?"field_"+b.id:b.id.replace(/id_/,"");e.val($("#"+m).val());e.focus()},top:"center",closeOnClick:false});$(".publish_to_field").click(function(){$("#"+m).val($("#write_mode_textarea").val());l.eq(0).overlay().close();return false});
$(".closeWindowButton").click(function(){l.eq(0).overlay().close();return false});$.ee_filebrowser.add_trigger(".btn_img a, .file_manipulate",function(b){var e,g="",f="",k="",h="";textareaId=$(this).closest("#markItUpWrite_mode_textarea").length?"write_mode_textarea":$(this).closest(".publish_field").attr("id").replace("hold_field_","field_id_");if(textareaId!=undefined){e=$("#"+textareaId);e.focus()}if(b.is_image){f=EE.upload_directories[b.directory].properties;k=EE.upload_directories[b.directory].pre_format;
h=EE.upload_directories[b.directory].post_format;g=EE.filebrowser.image_tag.replace(/src="[^"]*"/,"");g=g.replace("<img",'<img src="{filedir_'+b.directory+"}"+b.name+'"');g=g.replace(/\/?>$/,b.dimensions+" "+f+" />");g=k+g+h}else{f=EE.upload_directories[b.directory].file_properties;k=EE.upload_directories[b.directory].file_pre_format;k+='<a href="{filedir_'+b.directory+"}"+b.name+'" '+f+" >";h="</a>";h+=EE.upload_directories[b.directory].file_post_format}if(e.is("textarea")){if(!e.is(".markItUpEditor")){e.markItUp(myNobuttonSettings);
e.closest(".markItUpContainer").find(".markItUpHeader").hide();e.focus()}b.is_image?$.markItUp({replaceWith:g}):$.markItUp({key:"L",name:"Link",openWith:k,closeWith:h,placeHolder:b.name})}else e.val(function(j,n){return n+k+g+h});$.ee_filebrowser.reset()});$("input[type=file]","#publishForm").each(function(){var b=$(this).closest(".publish_field"),e=b.find(".choose_file");$.ee_filebrowser.add_trigger(e,$(this).attr("name"),d);b.find(".remove_file").click(function(){b.find("input[type=hidden]").val("");
b.find(".file_set").hide();return false})});$(".hide_field span").click(function(){var b=$(this).parent().parent().attr("id").substr(11),e=$("#hold_field_"+b);b=$("#sub_hold_field_"+b);if(b.css("display")=="block"){b.slideUp();e.find(".ui-resizable-handle").hide();e.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_collapse.png")}else{b.slideDown();e.find(".ui-resizable-handle").show();e.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_expand.png")}return false});$(".close_upload_bar").toggle(function(){$(this).parent().children(":not(.close_upload_bar)").hide();
$(this).children("img").attr("src",EE.THEME_URL+"publish_plus.png")},function(){$(this).parent().children().show();$(this).children("img").attr("src",EE.THEME_URL+"publish_minus.gif")});$(".ping_toggle_all").toggle(function(){$("input.ping_toggle").each(function(){this.checked=false})},function(){$("input.ping_toggle").each(function(){this.checked=true})});$(".markItUp ul").append('<li class="btn_plus"><a title="'+EE.lang.add_new_html_button+'" href="'+EE.BASE+"&C=myaccount&M=html_buttons&id="+EE.user_id+
'">+</a></li>');$(".btn_plus a").click(function(){return confirm(EE.lang.confirm_exit,"")});$(".markItUpHeader ul").prepend('<li class="close_formatting_buttons"><a href="#"><img width="10" height="10" src="'+EE.THEME_URL+'images/publish_minus.gif" alt="Close Formatting Buttons"/></a></li>');$(".close_formatting_buttons a").toggle(function(){$(this).parent().parent().children(":not(.close_formatting_buttons)").hide();$(this).parent().parent().css("height","13px");$(this).children("img").attr("src",
EE.THEME_URL+"images/publish_plus.png")},function(){$(this).parent().parent().children().show();$(this).parent().parent().css("height","22px");$(this).children("img").attr("src",EE.THEME_URL+"images/publish_minus.gif")});$(".tab_menu li:first").addClass("current");EE.publish.title_focus==true&&$("#title").focus();EE.publish.which=="new"&&$("#title").bind("keyup blur",liveUrlTitle);EE.publish.versioning_enabled=="n"?$("#revision_button").hide():$("#versioning_enabled").click(function(){$(this).attr("checked")?
$("#revision_button").show():$("#revision_button").hide()});EE.publish.category_editor()});
