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
    $("#col").html("<li><div class='collapsible-header'>"+name+"</div><div class='collapsible-body'><div class='row'><p id='p"+id+"' offset='0'></p></div></div></li>");
}

/*Genere le panneau de résultat a partir du JSON recu*/
/*Definition non supportée :( */
function generatePage(js,listItem){//listiem = id de la relation
    var txt;
    $("#title").text(document.getElementById("search").value);
    txt="<h5>Termes associés: "+js["m"].length+"</h5><br/>";
    $("#p"+listItem).append(txt);
    var i;
    $("#p"+listItem).click(function(event){
        if( event.target.nodeName=="SPAN")
            tst(event.target.innerHTML);
    });
    for (i = 0; i < js["m"].length; i++){
        generateLink($("#p"+listItem),js["m"][i],js["w"][i]);
    }
    if(i==150){
        $("#p"+listItem).parent().append("<div class='row center'> <a class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>add</i></a></div>");
        $("#p"+listItem).parent().find('a').click(function() {
            var query="/search2.php?mot=femme";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    var resp=JSON.parse(xmlHttp.responseText);
                    for (i = 0; i < js["m"].length; i++){
                        generateLink($("#p"+listItem),resp["m"][i],resp["w"][i]);
                    }
                    $offset=parseInt($("#p"+listItem).attr("offset"))+150;
                    $("#p"+listItem).attr("offset",$offset)
                }
            }
            $offset=parseInt($("#p"+listItem).attr("offset"))+150;
            query+="&offset="+$offset+"&rel=";
            query+=listItem;
            xmlHttp.open("GET", query, true); // true for asynchronous 
            xmlHttp.send(null);	
        });
    }
    $('.tooltipped').tooltip({delay: 50});
    $("#w"+listItem).remove();
    //console.log(items);
    $("#result_panel").css('display', 'inline-block');
}

function generateLink(node,linkText,w){
    node.append("<span class='blue-text fake-link tooltipped' data-position='bottom' data-delay='50' data-tooltip='"+w+"'>"+linkText+"</span> - ");
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