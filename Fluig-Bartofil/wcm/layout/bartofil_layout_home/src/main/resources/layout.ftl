<html>
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<body>
	<#import "/wcm.ftl" as wcm/>
	
	<#if pageRender.isEditMode()=true>
		<@wcm.header />
		<div name="formatBar" id="formatBar"></div>
		<div id="edicaoPagina" class="clearfix">
	<#else>
		<@wcm.header />
		<div id="visualizacaoPagina" class="clearfix">
	</#if>
			<div id="layout_home" class="super-widget wcm-widget-class fluig-style-guide" data-params="layout.instance()">
				<div class="page-header custom-page-header">
					<div class="row">
						<div class="col-sm-2">
							<img src="http://www.bartofil.com.br/site/empresas/bartofil/images/Logo_Bartofil.png" width="200px" alt="" title="">
						</div>
						<div class="col-sm-9">
							 <h1>PORTAL DO REPRESENTANTE</h1>
						</div>
						<div class="col-sm-1">
							<a href="/portal/p/api/servlet/logout.do" data-logoff class="btn btn-danger" role="button" style="margin-top: 15px"><span class="fluigicon fluigicon-logout"></span></a>
						</div>
					</div>
				</div>
				<div class="editable-slot slot1-1" id="slotFull1">
			    	<div id="SlotA" slot="true" class="slotint sortable" decorator="false" editableSlot="true">
						<@wcm.renderSlot id="SlotA" editableSlot="true" />
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
	