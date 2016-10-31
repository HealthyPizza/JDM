var offsetModal = 2;

function htmlEncode(value){
	//create a in-memory div, set it's inner text(which jQuery automatically encodes)
	//then grab the encoded contents back out.  The div never exists on the page.
	return $('<div/>').text(value).html();
}

function htmlDecode(value){
	return $('<div/>').html(value).text();
}

function expandAll(){
	$(".collapsible-header").addClass("active");
	$(".collapsible").collapsible({accordion: false});
	document.getElementById("button").setAttribute("onclick","collapseAll()");

}

function collapseAll(){
	$(".collapsible-header").removeClass(function(){
		return "active";
	});

	$(".collapsible").collapsible({accordion: true});
	$(".collapsible").collapsible({accordion: false});
	document.getElementById("button").setAttribute("onclick","expandAll()");
}

function selector(){
	console.log("huehue");

}

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/*Genere les accordéons en fonction des criteres de recherche séléctionnés*/
function generateAccordion(id,name){
	console.log("Generation accordion");
	$("#col").append(
		$("<li></li>").append(
			$("<div></div>").addClass("collapsible-header").text(name),$("<div></div>").addClass("collapsible-body").append(
				$("<div></div>").append(
					$("<p></p>").attr("id","p"+id),
					$("<div></div>").innerHTML="<div id='w"+id+"' class='row center'><div class='preloader-wrapper big active center'><div class='spinner-layer spinner-blue-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div></div>"
				).addClass("row")
			)
		)
	);
}

/*Genere le panneau de résultat a partir du JSON recu*/
/*Definition non supportée :( */
function generatePage(js,listItem){
	//var items=[0,0,0,0,0,0,0,0];
	//console.log(js);
	var txt;
	$("#title").text(document.getElementById("search").value);
	txt="<h5>Termes associés: "+js.length+"</h5><br/>";
	$("#p"+listItem).append(txt);
	var i;
	$("#p"+listItem).click(function(event){
		if( event.target.nodeName=="SPAN")
			tst(event.target.innerHTML);
		
	});


	for (i = 0; i < js.length; i++){
		//console.log(txt);
		if(i<500)
		{

			generateLink($("#p"+listItem),js[i].m);
			//items[js[i].t]+=1;
		}
		else
		{
			if(i<1000)
			{
				txt="<a onclick='tst(this.innerHTML,event)' href='#'>";
				txt+=js[i].m;
				txt+="</a>";
				if(i+1<js.length)
					txt+=", ";
				$('#modal1').find("p").append(txt);
			}
			else{
				console.log("modal filled");
				break;
			}
		}
	}
	if(i>500){
		$("#p"+listItem).parent().append($("<a></a>").innerHTML="<div class='row center'> <a class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>add</i></a>");
		$("#p"+listItem).parent().find('a').click(js,function() {
			$('#modal1').openModal();
			$('#modal1').find("#modalnext-2").click(js,function(){
				var txt;
				$('#modal1').find("p").text("");
				//var offset=window.offsetModal
				var offsetend=(500*window.offsetModal)+500;
				console.log("from "+500*window.offsetModal+" to "+offsetend);
				for(var i=500*window.offsetModal;i<(500*window.offsetModal)+200;i++){
					txt="<a onclick='tst(this.innerHTML,event)' href='#'>";
					txt+=js[i].m;
					txt+="</a>";
					if(i+1<js.length)
						txt+=", ";
					$('#modal1').find("p").append(txt);
				}
				window.offsetModal+=1;
				$('#modal1').find("#modalprev-2").removeClass("disabled");
			});
		});
	}
	$("#w"+listItem).remove();
	//console.log(items);
	$("#result_panel").css('display', 'inline-block');
}

function generateLink(node,linkText){
	//<a onclick='tst(this.innerHTML,event)' href='#!'>"+linkText+"</a>");
	node.append("<span class='blue-text fake-link'>"+linkText+"</span> - ");
}

function tst(arg){
	
	$("#search").val(arg);
	$('html, body').animate({
		scrollTop: $("#rdico").offset().top
	}, 1000);
}

function cleanPage(){
	$("#col").html("");
	$("#result_panel").css('display', 'none');
}

$(document).ready(function() {
	$('select').material_select();
});