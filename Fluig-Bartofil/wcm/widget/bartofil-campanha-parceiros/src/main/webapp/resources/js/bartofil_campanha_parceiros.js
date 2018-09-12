var campanhaparceiros = SuperWidget.extend({
	
	loading: FLUIGC.loading(window),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	foldercampanha: null,
	context: "/bartofil_campanha_parceiros",
	current: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado": ['click_showdetalhado'],
			'change-paginacao': ['change_changepaginacao'],
			'change-ordenar': ['change_changeordenacao'],
		}
	},
	

});
