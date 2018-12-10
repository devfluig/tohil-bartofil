<html>
  	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="/bartofil_layout_lms/resources/materialize/css/materialize.css"  media="screen,projection"/>
	
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<body class="eadbox">
	<#import "/wcm.ftl" as wcm/>
	
	<#if pageRender.isEditMode()=true>
		<@wcm.header />
		<div name="formatBar" id="formatBar"></div>
		<div id="edicaoPagina" class="clearfix">
	<#else>
		<div id="visualizacaoPagina" class="clearfix">
	</#if>
	
			<div id="layout_lms" class="super-widget wcm-widget-class" data-params="layout.instance()">
				<div class="editable-slot slot1-1" id="slotFull1">
			    	<div id="SlotA" slot="true" class="slotint sortable" decorator="false" editableSlot="true">
						<@wcm.renderSlot id="SlotA" editableSlot="true" />
					</div>
				</div>
			</div>
		</div>
      	<script type="text/javascript" src="/bartofil_layout_lms/resources/materialize/js/materialize.min.js"></script>
	</body>
</html>
	
	