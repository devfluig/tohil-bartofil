<div id="lms_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-lms"
	data-params="lms.instance({instanceId: ${instanceId}})">

	<div class="page-header">
		<h2>${i18n.getTranslation('posicao.rca.campanha')}</h2>
	</div>

    <script type="text/template" class="tpl-continuous-scroll-campanhas">
		<div class="row clearfix itens-campanha">
	        {{#items}}
				<div class="col-sm-4 col-md-3">
				    <div class="thumbnail" data-click-campanha data-id="{{id}}">
				        <img id="img{{id}}" src="{{image}}" style="height: 300px;">
				        <div class="caption">
				            <h4>{{id}} - {{descricao}}</h4>
				            <p>{{{posicao}}}<button type="button" class="btn {{classbutton}} fs-float-right"><span class="fluigicon fluigicon-query-ordered"></span>&nbsp;Prêmios</button></p>
				            <p style="padding-top: 5px;"><span class="label label-default">Iniciada {{dainiciado}}</span><span class="label {{classlabel}}">{{labelfim}}</span></p>
				        </div>
				    </div>
				</div>
	        {{/items}}
	    </div>
    </script>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

