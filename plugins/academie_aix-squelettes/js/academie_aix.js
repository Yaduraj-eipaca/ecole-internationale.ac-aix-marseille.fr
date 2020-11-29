$(document).ready(function(){

	// Menu_rubriques_horizontal en débordement (thème officiel)
	var menu_w, menu_h;
	function animer_menu() {
		menu_w = 0;
		menu_h = $("#bloc_rubriques > ul").height();
		// console.log(menu_h);
		$("#menu_rubriques_horizontal .menu_rubriques > li > .sous_menu").css({top: menu_h+'px'});
		$("#menu_rubriques_horizontal").height(menu_h);
		$("#bloc_rubriques > ul > li").each(function() {
			menu_w += $(this).width();
		});
		if (menu_w > 1020) {
			$("#bloc_rubriques").css({clip: 'rect(0px,1020px,400px,0px)', position: 'absolute'});
			$("#fl_nav_d").show();
		}
		else
			$('.fl_nav').hide();
	}
	animer_menu();
	$( window ).resize(function() {
		animer_menu();
	});
		
	$('.fl_nav').bind('click touch', function() {
		var sens = ($(this).attr('id') == 'fl_nav_d' ? -1:1);
		$("#bloc_rubriques > ul").animate({
			left: "+=" + (menu_w - 1020)*(sens)
		}, 200, function() {
			$('.fl_nav').fadeToggle();			
		});
	});
	
	// Lien sur les diapos du slideshow
	$(".lien_article").each(function(i) {
		var lien = $(this).find(".titre_diapo a").attr('href');
		if (lien) {
			$(this).bind("click touch", function(){
				location.href = lien ;
			}).css("cursor", "pointer");
		}
	});
	
	// SPIP_OUT et PDF en target="_blank"
	$("a.spip_out").attr('target', '_blank');
	$("a[type='application/pdf']").attr('target', '_blank');

	// "Spoiler"
	function toggleText(div) {
		if ($(div).hasClass('off'))
			$(div).html(masquer_spoiler).attr('title', masquer_spoiler);
		else
			$(div).html(afficher_spoiler).attr('title', afficher_spoiler);
	}
	$('.spoiler').before('<div class="afficher_spoiler">' + afficher_spoiler + '</div>' )
		.on("click touch", function() {
			$(this).slideToggle();
			$(this).prev().toggleClass('off');
			toggleText($(this).prev());
		}).hide();
	$("#colonne_centrale").on("click touch", ".afficher_spoiler", function(){
		$(this).toggleClass('off').next().slideToggle();
		toggleText($(this));
	});

	// Scroll Back to top
	$('body').backtotop({
		topOffset: 20,
		speed: 1000,
		bckTopLinkTitle: bckTopLinkTitle
	});
	$('.backtotopinstance').html("&nbsp;");

	// Smartphones et tablettes...
	$("#smart_bouton")
	.one("click touch", function(){
		$(".a_cloner").each(function() {
			var a_cloner = $(this).attr('id').replace(/smart_/, "");
			if ($("#" + a_cloner + " ul").length == 1) {
				$("#" + a_cloner + " ul").clone().appendTo($(this));
				if (a_cloner == "menu_horizontal") {
					var liste = $(this).find('ul');
					var listItems = liste.children('li');
					liste.append(listItems.get().reverse());
				}
			}
		});
		$(".smart_element").addClass("closed");
	})
	.bind("click touch", function(){
		$("#smart_contenu").slideToggle();
		$(".open").toggleClass("open closed").find("ul").slideUp();
	});
	$(".smart_element").bind("click touch", function(){
		if ($(this).hasClass('closed')) {
			$(".open").toggleClass("open closed").find("ul").slideUp();
			$(this).toggleClass("open closed").find("ul").slideDown();
		}
		else {
			$(this).toggleClass("open closed").find("ul").slideUp();
		}
	});
	$("#smart_formulaire_recherche").bind("click touch", function(e){
		e.stopPropagation();
	});
});
